import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Upload, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Droplets,
  BarChart3
} from 'lucide-react';

interface DWLRData {
  timestamp: string;
  waterLevel: number;
  rainfall?: number;
  temperature?: number;
  stationId: string;
  latitude?: number;
  longitude?: number;
}

interface PredictionData {
  date: string;
  historical: number | null;
  predicted30: number | null;
  predicted90: number | null;
}

const Predict: React.FC = () => {
  const [data, setData] = useState<DWLRData[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  // Generate mock data for demonstration
  const generateMockData = (): DWLRData[] => {
    const mockData: DWLRData[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365); // Last year

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Simulate seasonal water level variation
      const seasonalFactor = Math.sin((i / 365) * 2 * Math.PI) * 0.5;
      const baseLevel = 5 + seasonalFactor + (Math.random() - 0.5) * 0.5;
      
      mockData.push({
        timestamp: date.toISOString().split('T')[0],
        waterLevel: Math.max(0, baseLevel),
        rainfall: Math.random() > 0.7 ? Math.random() * 20 : 0,
        temperature: 20 + Math.sin((i / 365) * 2 * Math.PI) * 10 + (Math.random() - 0.5) * 5,
        stationId: 'DWLR001',
        latitude: 28.6139 + (Math.random() - 0.5) * 0.1,
        longitude: 77.2090 + (Math.random() - 0.5) * 0.1,
      });
    }
    
    return mockData;
  };

  // Simulate prediction logic
  const generatePredictions = (historicalData: DWLRData[]): PredictionData[] => {
    const result: PredictionData[] = [];
    const lastValue = historicalData[historicalData.length - 1]?.waterLevel || 0;
    const trend = historicalData.length > 1 ? 
      (historicalData[historicalData.length - 1].waterLevel - historicalData[historicalData.length - 2].waterLevel) : 0;

    // Add historical data
    historicalData.forEach((item, index) => {
      result.push({
        date: item.timestamp,
        historical: item.waterLevel,
        predicted30: null,
        predicted90: null,
      });
    });

    // Generate 30-day predictions
    for (let i = 1; i <= 30; i++) {
      const futureDate = new Date(historicalData[historicalData.length - 1].timestamp);
      futureDate.setDate(futureDate.getDate() + i);
      
      const predictedValue = lastValue + (trend * i) + (Math.random() - 0.5) * 0.2;
      
      result.push({
        date: futureDate.toISOString().split('T')[0],
        historical: null,
        predicted30: Math.max(0, predictedValue),
        predicted90: null,
      });
    }

    // Generate 90-day predictions
    for (let i = 31; i <= 90; i++) {
      const futureDate = new Date(historicalData[historicalData.length - 1].timestamp);
      futureDate.setDate(futureDate.getDate() + i);
      
      const predictedValue = lastValue + (trend * i) + (Math.random() - 0.5) * 0.3;
      
      result.push({
        date: futureDate.toISOString().split('T')[0],
        historical: null,
        predicted30: null,
        predicted90: Math.max(0, predictedValue),
      });
    }

    return result;
  };

  // Check for alerts
  const checkAlerts = (data: DWLRData[]) => {
    const newAlerts: string[] = [];
    
    // Check for low water levels
    const lowLevels = data.filter(item => item.waterLevel < 2);
    if (lowLevels.length > 0) {
      newAlerts.push(`⚠️ Low water level detected: ${lowLevels.length} readings below 2 meters`);
    }

    // Check for low recharge despite rainfall
    const recentData = data.slice(-30); // Last 30 days
    const avgRainfall = recentData.reduce((sum, item) => sum + (item.rainfall || 0), 0) / recentData.length;
    const waterLevelChange = recentData[recentData.length - 1]?.waterLevel - recentData[0]?.waterLevel || 0;
    
    if (avgRainfall > 5 && waterLevelChange < 0.5) {
      newAlerts.push(`⚠️ Low recharge detected despite rainfall: ${avgRainfall.toFixed(1)}mm avg rainfall`);
    }

    setAlerts(newAlerts);
  };

  const handleLoadMockData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockData = generateMockData();
      setData(mockData);
      const predData = generatePredictions(mockData);
      setPredictions(predData);
      checkAlerts(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const calculateRecharge = (data: DWLRData[]) => {
    const monthlyRecharge: { [key: string]: number } = {};
    const Sy = 0.15; // Specific yield

    data.forEach((item, index) => {
      if (index > 0) {
        const month = item.timestamp.substring(0, 7); // YYYY-MM
        const deltaH = item.waterLevel - data[index - 1].waterLevel;
        const recharge = deltaH * Sy;
        
        if (!monthlyRecharge[month]) {
          monthlyRecharge[month] = 0;
        }
        monthlyRecharge[month] += recharge;
      }
    });

    return Object.entries(monthlyRecharge).map(([month, recharge]) => ({
      month,
      recharge: Math.max(0, recharge),
    }));
  };

  const monthlyRecharge = calculateRecharge(data);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Groundwater Predictions
          </h1>
          <p className="text-muted-foreground">AI-powered groundwater level forecasting and analysis</p>
        </div>
        <Button onClick={handleLoadMockData} disabled={isLoading} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          {isLoading ? 'Loading...' : 'Load Sample Data'}
        </Button>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <Alert key={index} className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{alert}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Data Summary */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{data.length}</div>
              <div className="text-sm text-muted-foreground">Data Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {data[data.length - 1]?.waterLevel.toFixed(2)}m
              </div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {data.reduce((sum, item) => sum + (item.rainfall || 0), 0).toFixed(1)}mm
              </div>
              <div className="text-sm text-muted-foreground">Total Rainfall</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {monthlyRecharge.reduce((sum, item) => sum + item.recharge, 0).toFixed(2)}m
              </div>
              <div className="text-sm text-muted-foreground">Total Recharge</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Water Level Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Water Level Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value: number, name: string) => [
                        `${value?.toFixed(2)}m`, 
                        name === 'historical' ? 'Historical' : 
                        name === 'predicted30' ? '30-day Prediction' : '90-day Prediction'
                      ]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="historical" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={false}
                      name="Historical"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted30" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="30-day Prediction"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted90" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="90-day Prediction"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Recharge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Groundwater Recharge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRecharge}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'Recharge (m)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(3)}m`, 'Recharge']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="recharge" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Station Information */}
      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Station Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-600">Station ID</h4>
                <p className="text-lg">{data[0]?.stationId}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-600">Coordinates</h4>
                <p className="text-sm">
                  {data[0]?.latitude?.toFixed(4)}, {data[0]?.longitude?.toFixed(4)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-600">Data Period</h4>
                <p className="text-sm">
                  {data[0]?.timestamp} to {data[data.length - 1]?.timestamp}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Upload className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
            <p className="text-muted-foreground mb-4">
              Load sample data to see groundwater predictions and analysis
            </p>
            <Button onClick={handleLoadMockData} disabled={isLoading}>
              <Upload className="h-4 w-4 mr-2" />
              Load Sample Data
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Predict;
