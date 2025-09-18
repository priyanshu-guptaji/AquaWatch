import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, BarChart3, Activity, ExternalLink } from 'lucide-react';
import { WaterQualityData, generateMockWaterData, calculateWQI } from '@/data/waterData';

interface GroundwaterWidgetProps {
  className?: string;
  showFullView?: boolean;
  onViewFull?: () => void;
}

const GroundwaterWidget: React.FC<GroundwaterWidgetProps> = ({ 
  className = "",
  showFullView = true,
  onViewFull
}) => {
  const [data] = useState<WaterQualityData[]>(() => generateMockWaterData());
  
  // Calculate quick stats
  const totalStations = data.length;
  const averageWQI = Math.round(
    data.reduce((sum, item) => sum + calculateWQI(item), 0) / data.length
  );
  const safeStations = data.filter(item => calculateWQI(item) >= 60).length;
  const unsafeStations = data.filter(item => calculateWQI(item) < 60).length;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span>Groundwater Monitoring</span>
          </CardTitle>
          {showFullView && onViewFull && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewFull}
              className="flex items-center space-x-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span>View Full</span>
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Real-time water quality monitoring across India
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalStations}</div>
              <div className="text-xs text-gray-600">Total Stations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{averageWQI}</div>
              <div className="text-xs text-gray-600">Avg WQI</div>
            </div>
          </div>

          {/* Safety Status */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Safe: {safeStations}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Unsafe: {unsafeStations}</span>
            </div>
          </div>

          {/* Recent Stations */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Stations</h4>
            <div className="space-y-2">
              {data.slice(0, 3).map((station, index) => {
                const wqi = calculateWQI(station);
                return (
                  <div key={station.stationCode} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="font-medium">{station.stationCode}</span>
                    </div>
                    <Badge 
                      variant={wqi >= 80 ? 'default' : wqi >= 60 ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {wqi}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MapPin className="h-3 w-3 mr-1" />
              Map View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <BarChart3 className="h-3 w-3 mr-1" />
              Analytics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroundwaterWidget;
