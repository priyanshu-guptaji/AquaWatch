// Water quality data types and mock data
export interface WaterQualityData {
  stationCode: string;
  location: string;
  state: string;
  temp: number;
  dissolvedOxygen: number; // D.O. (mg/l)
  ph: number;
  conductivity: number; // µmhos/cm
  bod: number; // B.O.D. (mg/l)
  nitrateNitrite: number; // NITRATENAN N+ NITRITENANN (mg/l)
  fecalColiform: number; // FECAL COLIFORM (MPN/100ml)
  totalColiform: number; // TOTAL COLIFORM (MPN/100ml)
  year: number;
  latitude?: number;
  longitude?: number;
}

// Mock coordinates for Indian states (approximate center points)
const stateCoordinates: Record<string, { lat: number; lng: number }> = {
  'Andhra Pradesh': { lat: 15.9129, lng: 79.7400 },
  'Arunachal Pradesh': { lat: 28.2180, lng: 94.7278 },
  'Assam': { lat: 26.2006, lng: 92.9376 },
  'Bihar': { lat: 25.0961, lng: 85.3131 },
  'Chhattisgarh': { lat: 21.2787, lng: 81.8661 },
  'Goa': { lat: 15.2993, lng: 74.1240 },
  'Gujarat': { lat: 23.0225, lng: 72.5714 },
  'Haryana': { lat: 29.0588, lng: 76.0856 },
  'Himachal Pradesh': { lat: 31.1048, lng: 77.1734 },
  'Jharkhand': { lat: 23.6102, lng: 85.2799 },
  'Karnataka': { lat: 15.3173, lng: 75.7139 },
  'Kerala': { lat: 10.8505, lng: 76.2711 },
  'Madhya Pradesh': { lat: 22.9734, lng: 78.6569 },
  'Maharashtra': { lat: 19.7515, lng: 75.7139 },
  'Manipur': { lat: 24.6637, lng: 93.9063 },
  'Meghalaya': { lat: 25.4670, lng: 91.3662 },
  'Mizoram': { lat: 23.1645, lng: 92.9376 },
  'Nagaland': { lat: 26.1584, lng: 94.5624 },
  'Odisha': { lat: 20.9517, lng: 85.0985 },
  'Punjab': { lat: 31.1471, lng: 75.3412 },
  'Rajasthan': { lat: 27.0238, lng: 74.2179 },
  'Sikkim': { lat: 27.5330, lng: 88.5122 },
  'Tamil Nadu': { lat: 11.1271, lng: 78.6569 },
  'Telangana': { lat: 18.1124, lng: 79.0193 },
  'Tripura': { lat: 23.9408, lng: 91.9882 },
  'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
  'Uttarakhand': { lat: 30.0668, lng: 79.0193 },
  'West Bengal': { lat: 22.9868, lng: 87.8550 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Puducherry': { lat: 11.9416, lng: 79.8083 },
  'Chandigarh': { lat: 30.7333, lng: 76.7794 },
  'Jammu and Kashmir': { lat: 34.0837, lng: 74.7973 },
  'Ladakh': { lat: 34.1526, lng: 77.5771 },
};

// Generate mock water quality data
export const generateMockWaterData = (): WaterQualityData[] => {
  const states = Object.keys(stateCoordinates);
  const locations = [
    'Central Station', 'North Station', 'South Station', 'East Station', 'West Station',
    'Industrial Area', 'Residential Zone', 'Agricultural Zone', 'Rural Station', 'Urban Station'
  ];
  
  const data: WaterQualityData[] = [];
  
  states.forEach((state, stateIndex) => {
    const stateCoords = stateCoordinates[state];
    
    // Generate 3-8 stations per state
    const numStations = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < numStations; i++) {
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      // Add some random variation to coordinates within the state
      const lat = stateCoords.lat + (Math.random() - 0.5) * 2;
      const lng = stateCoords.lng + (Math.random() - 0.5) * 2;
      
      // Generate realistic water quality parameters
      const temp = 20 + Math.random() * 15; // 20-35°C
      const ph = 6.5 + Math.random() * 2; // 6.5-8.5
      const dissolvedOxygen = 4 + Math.random() * 8; // 4-12 mg/l
      const conductivity = 200 + Math.random() * 800; // 200-1000 µmhos/cm
      const bod = Math.random() * 6; // 0-6 mg/l
      const nitrateNitrite = Math.random() * 10; // 0-10 mg/l
      const fecalColiform = Math.random() * 1000; // 0-1000 MPN/100ml
      const totalColiform = fecalColiform + Math.random() * 500; // Higher than fecal
      
      data.push({
        stationCode: `WS${String(stateIndex * 10 + i + 1).padStart(3, '0')}`,
        location,
        state,
        temp: Math.round(temp * 10) / 10,
        dissolvedOxygen: Math.round(dissolvedOxygen * 10) / 10,
        ph: Math.round(ph * 10) / 10,
        conductivity: Math.round(conductivity),
        bod: Math.round(bod * 10) / 10,
        nitrateNitrite: Math.round(nitrateNitrite * 10) / 10,
        fecalColiform: Math.round(fecalColiform),
        totalColiform: Math.round(totalColiform),
        year: 2020 + Math.floor(Math.random() * 4), // 2020-2023
        latitude: lat,
        longitude: lng,
      });
    }
  });
  
  return data;
};

// Calculate Water Quality Index (WQI)
export const calculateWQI = (data: WaterQualityData): number => {
  // Simplified WQI calculation based on DO, pH, and BOD
  const doScore = Math.min(100, (data.dissolvedOxygen / 8) * 100);
  const phScore = data.ph >= 6.5 && data.ph <= 8.5 ? 100 : 
                  data.ph < 6.5 ? (data.ph / 6.5) * 100 : 
                  ((8.5 - data.ph) / 1.5) * 100;
  const bodScore = Math.max(0, 100 - (data.bod / 6) * 100);
  
  return Math.round((doScore + phScore + bodScore) / 3);
};

// Get safety status for different parameters
export const getSafetyStatus = (data: WaterQualityData) => {
  const status = {
    ph: data.ph < 6.5 || data.ph > 8.5 ? 'Unsafe' : 'Safe',
    dissolvedOxygen: data.dissolvedOxygen < 5 ? 'Low' : 'Adequate',
    bod: data.bod > 3 ? 'High' : 'Low',
    fecalColiform: data.fecalColiform > 100 ? 'Contaminated' : 'Safe',
    totalColiform: data.totalColiform > 500 ? 'High' : 'Low',
  };
  
  return status;
};

// Filter data by state or location
export const filterWaterData = (
  data: WaterQualityData[], 
  stateFilter?: string, 
  locationFilter?: string
): WaterQualityData[] => {
  return data.filter(item => {
    const stateMatch = !stateFilter || item.state.toLowerCase().includes(stateFilter.toLowerCase());
    const locationMatch = !locationFilter || item.location.toLowerCase().includes(locationFilter.toLowerCase());
    return stateMatch && locationMatch;
  });
};

// Get unique states from data
export const getUniqueStates = (data: WaterQualityData[]): string[] => {
  return [...new Set(data.map(item => item.state))].sort();
};

// Get unique locations from data
export const getUniqueLocations = (data: WaterQualityData[]): string[] => {
  return [...new Set(data.map(item => item.location))].sort();
};

// Get data for trend analysis
export const getTrendData = (data: WaterQualityData[], parameter: keyof WaterQualityData) => {
  const yearGroups = data.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item[parameter] as number);
    return acc;
  }, {} as Record<number, number[]>);
  
  return Object.entries(yearGroups).map(([year, values]) => ({
    year: parseInt(year),
    average: values.reduce((sum, val) => sum + val, 0) / values.length,
    count: values.length,
  })).sort((a, b) => a.year - b.year);
};
