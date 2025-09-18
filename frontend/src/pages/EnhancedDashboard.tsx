import React, { useState, useMemo } from 'react';
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
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Droplets,
  BarChart3,
  CloudRain,
  Activity,
  ArrowLeft
} from 'lucide-react';
import IndiaDistrictMap from '@/components/IndiaDistrictMap';
import MapInfoCard from '@/components/MapInfoCard';
import { DistrictData, calculateRecharge, generateAlerts } from '@/utils/generateMockDWLRData';

interface EnhancedDashboardProps {
  onBack?: () => void;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ onBack }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);

  // Calculate recharge data for charts
  const rechargeData = useMemo(() => {
    if (!selectedDistrict) return [];
    
    const recharge = calculateRecharge(selectedDistrict.dwlrData);
    const monthlyRecharge: { [key: string]: number } = {};
    
    selectedDistrict.dwlrData.forEach((item, index) => {
      if (index > 0) {
        const month = item.timestamp.substring(0, 7); // YYYY-MM
        if (!monthlyRecharge[month]) {
          monthlyRecharge[month] = 0;
        }
        monthlyRecharge[month] += recharge[index - 1] || 0;
      }
    });

    return Object.entries(monthlyRecharge).map(([month, recharge]) => ({
      month,
      recharge: Math.max(0, recharge),
    }));
  }, [selectedDistrict]);

  // Calculate scatter plot data for rainfall vs water level
  const scatterData = useMemo(() => {
    if (!selectedDistrict) return [];
    
    return selectedDistrict.dwlrData
      .filter(item => item.rainfall > 0)
      .map(item => ({
        rainfall: item.rainfall,
        waterLevel: item.waterLevel,
        timestamp: item.timestamp
      }));
  }, [selectedDistrict]);

  // Handle district click
  const handleDistrictClick = (districtData: DistrictData) => {
    setSelectedDistrict(districtData);
    
    // Generate alerts for this district
    const districtAlerts = generateAlerts(districtData.dwlrData);
    setAlerts(districtAlerts);
  };

  // Close district info
  const handleCloseDistrict = () => {
    setSelectedDistrict(null);
    setAlerts([]);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button onClick={onBack} variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              District-Level Groundwater Dashboard
            </h1>
            <p className="text-muted-foreground">
              Interactive India map with district-wise groundwater analysis and predictions
            </p>
          </div>
        </div>
        {selectedDistrict && (
          <Button onClick={handleCloseDistrict} variant="outline" size="sm">
            Clear Selection
          </Button>
        )}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map Section */}
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive India District Map
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Click on any district to view detailed groundwater information
              </p>
            </CardHeader>
            <CardContent>
              <IndiaDistrictMap 
                onDistrictClick={handleDistrictClick}
                className="h-[500px]"
              />
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }}></div>
                  <span>Good (6m+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#eab308' }}></div>
                  <span>Moderate (4-6m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f97316' }}></div>
                  <span>Low (2-4m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                  <span>Critical (&lt;2m)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <div className="xl:col-span-1">
          <MapInfoCard 
            districtData={selectedDistrict}
            onClose={handleCloseDistrict}
          />
        </div>
      </div>

      {/* Charts Section */}
      {selectedDistrict && (
        <div className="space-y-6">
          {/* Water Level Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Water Level Trends - {selectedDistrict.district}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedDistrict.dwlrData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value: number) => [`${value.toFixed(2)}m`, 'Water Level']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="waterLevel" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Recharge Chart */}
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
                    <BarChart data={rechargeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Recharge (m)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(3)}m`, 'Recharge']}
                      />
                      <Bar dataKey="recharge" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Rainfall vs Water Level Scatter Plot */}
            {scatterData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudRain className="h-5 w-5" />
                    Rainfall vs Water Level Correlation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={scatterData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="rainfall" 
                          name="Rainfall"
                          label={{ value: 'Rainfall (mm)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          dataKey="waterLevel" 
                          name="Water Level"
                          label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value: number, name: string) => [
                            `${value.toFixed(2)}${name === 'rainfall' ? 'mm' : 'm'}`, 
                            name === 'rainfall' ? 'Rainfall' : 'Water Level'
                          ]}
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <Scatter dataKey="waterLevel" fill="#10b981" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* District Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                District Summary - {selectedDistrict.district}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedDistrict.averageWaterLevel}m
                  </div>
                  <div className="text-sm text-muted-foreground">Average Water Level</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedDistrict.totalRainfall}mm
                  </div>
                  <div className="text-sm text-muted-foreground">Total Rainfall</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {rechargeData.reduce((sum, item) => sum + item.recharge, 0).toFixed(2)}m
                  </div>
                  <div className="text-sm text-muted-foreground">Total Recharge</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {selectedDistrict.dwlrData.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Data Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!selectedDistrict && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No District Selected</h3>
            <p className="text-muted-foreground mb-4">
              Click on any district in the map above to view detailed groundwater analysis
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedDashboard;