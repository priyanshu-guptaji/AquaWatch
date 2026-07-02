/**
 * Utility to generate mock DWLR (Digital Water Level Recorder) data
 * for groundwater prediction and recharge estimation platform
 */

export interface DWLRData {
  timestamp: string;
  waterLevel: number; // in meters
  rainfall: number; // in mm
  temperature: number; // in Celsius
  stationId: string;
  latitude: number;
  longitude: number;
  district: string;
  state: string;
}

export interface DistrictData {
  district: string;
  state: string;
  coordinates: [number, number];
  dwlrData: DWLRData[];
  averageWaterLevel: number;
  totalRainfall: number;
  status: 'Good' | 'Moderate' | 'Low' | 'Critical';
}

/**
 * Generate mock DWLR data for a specific district
 * @param district - District name
 * @param state - State name
 * @param coordinates - [latitude, longitude] of district centroid
 * @param days - Number of days of data to generate (default: 30)
 * @returns Array of DWLR data points
 */
export const generateMockDWLRData = (
  district: string,
  state: string,
  coordinates: [number, number],
  days: number = 30
): DWLRData[] => {
  const data: DWLRData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Generate station ID based on district name
  const stationId = `DWLR_${district.replace(/\s+/g, '').toUpperCase()}_${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate seasonal water level variation
    const seasonalFactor = Math.sin((i / days) * 2 * Math.PI) * 0.8;
    const baseLevel = 3 + seasonalFactor + (Math.random() - 0.5) * 1.2;
    
    // Generate rainfall (higher probability during monsoon months)
    const month = date.getMonth();
    const isMonsoon = month >= 5 && month <= 9; // June to October
    const rainfallProbability = isMonsoon ? 0.6 : 0.2;
    const rainfall = Math.random() < rainfallProbability ? Math.random() * 25 : 0;
    
    // Generate temperature based on season
    const baseTemp = 25 + Math.sin((month / 12) * 2 * Math.PI) * 8;
    const temperature = baseTemp + (Math.random() - 0.5) * 6;
    
    // Add some random variation to coordinates
    const latVariation = (Math.random() - 0.5) * 0.1;
    const lngVariation = (Math.random() - 0.5) * 0.1;
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      waterLevel: Math.max(0, baseLevel),
      rainfall,
      temperature: Math.round(temperature * 10) / 10,
      stationId,
      latitude: coordinates[0] + latVariation,
      longitude: coordinates[1] + lngVariation,
      district,
      state,
    });
  }

  return data;
};

/**
 * Generate complete district data with analysis
 * @param district - District name
 * @param state - State name
 * @param coordinates - [latitude, longitude] of district centroid
 * @param days - Number of days of data to generate
 * @returns Complete district data with analysis
 */
export const generateDistrictData = (
  district: string,
  state: string,
  coordinates: [number, number],
  days: number = 30
): DistrictData => {
  const dwlrData = generateMockDWLRData(district, state, coordinates, days);
  
  const averageWaterLevel = dwlrData.reduce((sum, item) => sum + item.waterLevel, 0) / dwlrData.length;
  const totalRainfall = dwlrData.reduce((sum, item) => sum + item.rainfall, 0);
  
  // Determine status based on average water level
  let status: 'Good' | 'Moderate' | 'Low' | 'Critical';
  if (averageWaterLevel >= 6) {
    status = 'Good';
  } else if (averageWaterLevel >= 4) {
    status = 'Moderate';
  } else if (averageWaterLevel >= 2) {
    status = 'Low';
  } else {
    status = 'Critical';
  }

  return {
    district,
    state,
    coordinates,
    dwlrData,
    averageWaterLevel: Math.round(averageWaterLevel * 100) / 100,
    totalRainfall: Math.round(totalRainfall * 10) / 10,
    status,
  };
};

/**
 * Get color for district based on water level status
 * @param status - Water level status
 * @returns Tailwind CSS color class
 */
export const getDistrictColor = (status: 'Good' | 'Moderate' | 'Low' | 'Critical'): string => {
  switch (status) {
    case 'Good':
      return '#22c55e'; // green-500
    case 'Moderate':
      return '#eab308'; // yellow-500
    case 'Low':
      return '#f97316'; // orange-500
    case 'Critical':
      return '#ef4444'; // red-500
    default:
      return '#6b7280'; // gray-500
  }
};

/**
 * Calculate groundwater recharge using Δh × Sy formula
 * @param dwlrData - Array of DWLR data points
 * @param sy - Specific yield (default: 0.15)
 * @returns Array of recharge values
 */
export const calculateRecharge = (dwlrData: DWLRData[], sy: number = 0.15): number[] => {
  const recharge: number[] = [];
  
  for (let i = 1; i < dwlrData.length; i++) {
    const deltaH = dwlrData[i].waterLevel - dwlrData[i - 1].waterLevel;
    recharge.push(deltaH * sy);
  }
  
  return recharge;
};

/**
 * Generate alerts based on data thresholds
 * @param dwlrData - Array of DWLR data points
 * @returns Array of alert messages
 */
export const generateAlerts = (dwlrData: DWLRData[]): string[] => {
  const alerts: string[] = [];
  
  // Check for low water levels
  const lowLevels = dwlrData.filter(item => item.waterLevel < 2);
  if (lowLevels.length > 0) {
    alerts.push(`⚠️ Low water level detected: ${lowLevels.length} readings below 2 meters`);
  }
  
  // Check for low recharge despite rainfall
  const recentData = dwlrData.slice(-7); // Last 7 days
  if (recentData.length > 0) {
    const avgRainfall = recentData.reduce((sum, item) => sum + item.rainfall, 0) / recentData.length;
    const waterLevelChange = recentData[recentData.length - 1]?.waterLevel - recentData[0]?.waterLevel || 0;
    
    if (avgRainfall > 5 && waterLevelChange < 0.5) {
      alerts.push(`⚠️ Low recharge detected despite rainfall: ${avgRainfall.toFixed(1)}mm avg rainfall`);
    }
  }
  
  return alerts;
};
