import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Droplets, 
  CloudRain, 
  Thermometer, 
  Calendar,
  Activity,
  AlertTriangle,
  X
} from 'lucide-react';
import { DistrictData } from '@/utils/generateMockDWLRData';

interface MapInfoCardProps {
  districtData: DistrictData | null;
  onClose: () => void;
  className?: string;
}

const MapInfoCard: React.FC<MapInfoCardProps> = ({ 
  districtData, 
  onClose, 
  className = "" 
}) => {
  if (!districtData) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No District Selected</h3>
          <p className="text-muted-foreground">
            Click on a district in the map to view detailed groundwater information
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const recentData = districtData.dwlrData.slice(-5); // Last 5 days

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-blue-600" />
            {districtData.district}
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {districtData.state}
          </Badge>
          <Badge className={`text-xs ${getStatusColor(districtData.status)}`}>
            {districtData.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Water Level</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {districtData.averageWaterLevel}m
            </div>
            <div className="text-xs text-blue-600">Average</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CloudRain className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Rainfall</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              {districtData.totalRainfall}mm
            </div>
            <div className="text-xs text-green-600">Total</div>
          </div>
        </div>

        {/* Station Information */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Station Information
          </h4>
          <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-600">Station ID:</span>
              <span className="font-mono">{districtData.dwlrData[0]?.stationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Coordinates:</span>
              <span className="font-mono text-xs">
                {districtData.coordinates[0].toFixed(4)}, {districtData.coordinates[1].toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Points:</span>
              <span className="font-mono">{districtData.dwlrData.length}</span>
            </div>
          </div>
        </div>

        {/* Recent Readings */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Readings (Last 5 days)
          </h4>
          <div className="space-y-2">
            {recentData.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span className="text-xs">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">
                      {item.waterLevel.toFixed(2)}m
                    </span>
                  </div>
                  {item.rainfall > 0 && (
                    <div className="flex items-center gap-1">
                      <CloudRain className="h-3 w-3 text-green-500" />
                      <span className="text-xs">
                        {item.rainfall.toFixed(1)}mm
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3 text-orange-500" />
                    <span className="text-xs">
                      {item.temperature}°C
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="font-semibold text-gray-700">Min Level</div>
            <div className="text-blue-600">
              {Math.min(...districtData.dwlrData.map(d => d.waterLevel)).toFixed(2)}m
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="font-semibold text-gray-700">Max Level</div>
            <div className="text-blue-600">
              {Math.max(...districtData.dwlrData.map(d => d.waterLevel)).toFixed(2)}m
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapInfoCard;
