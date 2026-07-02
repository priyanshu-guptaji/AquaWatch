import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MapPin, 
  Droplets, 
  Thermometer, 
  CloudRain,
  Calendar,
  Activity
} from 'lucide-react';

interface StateData {
  name: string;
  code: string;
  coordinates: [number, number];
  dwlrData: {
    timestamp: string;
    waterLevel: number;
    rainfall: number;
    temperature: number;
    stationId: string;
    latitude: number;
    longitude: number;
  }[];
}

interface ClickableIndiaMapProps {
  onStateClick?: (stateData: StateData) => void;
  className?: string;
}

// Mock data for Indian states
const generateMockStateData = (stateName: string, stateCode: string, coordinates: [number, number]): StateData => {
  const mockData = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Last 30 days

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate realistic data based on state
    const baseLevel = 3 + Math.random() * 4; // 3-7 meters
    const rainfall = Math.random() > 0.7 ? Math.random() * 25 : 0;
    const temperature = 20 + Math.sin((i / 30) * 2 * Math.PI) * 8 + (Math.random() - 0.5) * 4;
    
    mockData.push({
      timestamp: date.toISOString().split('T')[0],
      waterLevel: Math.max(0, baseLevel + (Math.random() - 0.5) * 0.5),
      rainfall,
      temperature: Math.round(temperature * 10) / 10,
      stationId: `DWLR_${stateCode}_${String(i + 1).padStart(3, '0')}`,
      latitude: coordinates[0] + (Math.random() - 0.5) * 0.5,
      longitude: coordinates[1] + (Math.random() - 0.5) * 0.5,
    });
  }

  return {
    name: stateName,
    code: stateCode,
    coordinates,
    dwlrData: mockData
  };
};

const statesData: StateData[] = [
  generateMockStateData('Andhra Pradesh', 'AP', [15.9129, 79.7400]),
  generateMockStateData('Arunachal Pradesh', 'AR', [28.2180, 94.7278]),
  generateMockStateData('Assam', 'AS', [26.2006, 92.9376]),
  generateMockStateData('Bihar', 'BR', [25.0961, 85.3131]),
  generateMockStateData('Chhattisgarh', 'CG', [21.2787, 81.8661]),
  generateMockStateData('Goa', 'GA', [15.2993, 74.1240]),
  generateMockStateData('Gujarat', 'GJ', [23.0225, 72.5714]),
  generateMockStateData('Haryana', 'HR', [29.0588, 76.0856]),
  generateMockStateData('Himachal Pradesh', 'HP', [31.1048, 77.1734]),
  generateMockStateData('Jharkhand', 'JH', [23.6102, 85.2799]),
  generateMockStateData('Karnataka', 'KA', [15.3173, 75.7139]),
  generateMockStateData('Kerala', 'KL', [10.8505, 76.2711]),
  generateMockStateData('Madhya Pradesh', 'MP', [22.9734, 78.6569]),
  generateMockStateData('Maharashtra', 'MH', [19.7515, 75.7139]),
  generateMockStateData('Manipur', 'MN', [24.6637, 93.9063]),
  generateMockStateData('Meghalaya', 'ML', [25.4670, 91.3662]),
  generateMockStateData('Mizoram', 'MZ', [23.1645, 92.9376]),
  generateMockStateData('Nagaland', 'NL', [26.1584, 94.5624]),
  generateMockStateData('Odisha', 'OR', [20.9517, 85.0985]),
  generateMockStateData('Punjab', 'PB', [31.1471, 75.3412]),
  generateMockStateData('Rajasthan', 'RJ', [27.0238, 74.2179]),
  generateMockStateData('Sikkim', 'SK', [27.5330, 88.5122]),
  generateMockStateData('Tamil Nadu', 'TN', [11.1271, 78.6569]),
  generateMockStateData('Telangana', 'TG', [18.1124, 79.0193]),
  generateMockStateData('Tripura', 'TR', [23.9408, 91.9882]),
  generateMockStateData('Uttar Pradesh', 'UP', [26.8467, 80.9462]),
  generateMockStateData('Uttarakhand', 'UK', [30.0668, 79.0193]),
  generateMockStateData('West Bengal', 'WB', [22.9868, 87.8550]),
  generateMockStateData('Delhi', 'DL', [28.7041, 77.1025]),
  generateMockStateData('Puducherry', 'PY', [11.9416, 79.8083]),
  generateMockStateData('Chandigarh', 'CH', [30.7333, 76.7794]),
  generateMockStateData('Jammu and Kashmir', 'JK', [34.0837, 74.7973]),
  generateMockStateData('Ladakh', 'LA', [34.1526, 77.5771]),
];

const ClickableIndiaMap: React.FC<ClickableIndiaMapProps> = ({ onStateClick, className = "" }) => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (state: StateData) => {
    setSelectedState(state);
    onStateClick?.(state);
  };

  const getWaterLevelStatus = (level: number) => {
    if (level < 2) return { status: 'Critical', color: 'bg-red-500' };
    if (level < 4) return { status: 'Low', color: 'bg-orange-500' };
    if (level < 6) return { status: 'Moderate', color: 'bg-yellow-500' };
    return { status: 'Good', color: 'bg-green-500' };
  };

  const getAverageWaterLevel = (data: StateData['dwlrData']) => {
    return data.reduce((sum, item) => sum + item.waterLevel, 0) / data.length;
  };

  const getTotalRainfall = (data: StateData['dwlrData']) => {
    return data.reduce((sum, item) => sum + item.rainfall, 0);
  };

  return (
    <div className={`w-full ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive India Map - Click on States
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on any state to view detailed DWLR data and groundwater information
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {statesData.map((state) => {
                  const avgLevel = getAverageWaterLevel(state.dwlrData);
                  const { status, color } = getWaterLevelStatus(avgLevel);
                  const isHovered = hoveredState === state.code;
                  
                  return (
                    <div
                      key={state.code}
                      className={`
                        relative p-2 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${isHovered ? 'border-blue-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
                        ${color} text-white text-center
                      `}
                      onClick={() => handleStateClick(state)}
                      onMouseEnter={() => setHoveredState(state.code)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      <div className="text-xs font-medium">{state.code}</div>
                      <div className="text-xs opacity-90">{avgLevel.toFixed(1)}m</div>
                      {isHovered && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          {state.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Good (6m+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Moderate (4-6m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Low (2-4m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Critical (&lt;2m)</span>
                </div>
              </div>
            </div>

            {/* State Details */}
            <div className="space-y-4">
              {selectedState ? (
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedState.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {selectedState.code}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          {getAverageWaterLevel(selectedState.dwlrData).toFixed(2)}m
                        </div>
                        <div className="text-xs text-gray-600">Avg Water Level</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          {getTotalRainfall(selectedState.dwlrData).toFixed(1)}mm
                        </div>
                        <div className="text-xs text-gray-600">Total Rainfall</div>
                      </div>
                    </div>

                    {/* Recent Data */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Recent Data (Last 5 days)</h4>
                      <div className="space-y-2">
                        {selectedState.dwlrData.slice(-5).map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Droplets className="h-3 w-3 text-blue-500" />
                                <span>{item.waterLevel.toFixed(2)}m</span>
                              </div>
                              {item.rainfall > 0 && (
                                <div className="flex items-center gap-1">
                                  <CloudRain className="h-3 w-3 text-blue-500" />
                                  <span>{item.rainfall.toFixed(1)}mm</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Station Information */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Station Information</h4>
                      <div className="text-xs space-y-1">
                        <div>Station ID: {selectedState.dwlrData[0]?.stationId}</div>
                        <div>Coordinates: {selectedState.coordinates[0].toFixed(4)}, {selectedState.coordinates[1].toFixed(4)}</div>
                        <div>Data Points: {selectedState.dwlrData.length}</div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedState(null)} 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      Close Details
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed border-2">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click on a state to view detailed groundwater information
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClickableIndiaMap;
