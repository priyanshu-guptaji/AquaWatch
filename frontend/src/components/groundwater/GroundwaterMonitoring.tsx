import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, BarChart3, Activity } from 'lucide-react';
import GroundwaterMap from '../GroundwaterMap';
import GroundwaterDashboard from '../GroundwaterDashboard';
import { WaterQualityData, generateMockWaterData } from '@/data/waterData';

interface GroundwaterMonitoringProps {
  data?: WaterQualityData[];
  className?: string;
}

const GroundwaterMonitoring: React.FC<GroundwaterMonitoringProps> = ({ 
  data, 
  className = "" 
}) => {
  // Use provided data or generate mock data
  const waterData = useMemo(() => {
    return data || generateMockWaterData();
  }, [data]);

  const [selectedStation, setSelectedStation] = useState<WaterQualityData | null>(null);

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Map View</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Groundwater Quality Map</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Click on markers to view detailed water quality information
              </p>
            </CardHeader>
            <CardContent>
              <GroundwaterMap 
                data={waterData}
                onMarkerClick={setSelectedStation}
                className="h-[600px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="mt-6">
          <GroundwaterDashboard data={waterData} />
        </TabsContent>
      </Tabs>

      {/* Selected Station Details */}
      {selectedStation && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Selected Station Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-600">Station Information</h4>
                <p className="text-lg font-bold">{selectedStation.stationCode}</p>
                <p className="text-sm text-gray-600">{selectedStation.location}, {selectedStation.state}</p>
                <p className="text-xs text-gray-500">Year: {selectedStation.year}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-600">Coordinates</h4>
                <p className="text-sm">Lat: {selectedStation.latitude?.toFixed(4)}</p>
                <p className="text-sm">Lng: {selectedStation.longitude?.toFixed(4)}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-600">Key Parameters</h4>
                <p className="text-sm">pH: {selectedStation.ph}</p>
                <p className="text-sm">DO: {selectedStation.dissolvedOxygen} mg/l</p>
                <p className="text-sm">Temp: {selectedStation.temp}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroundwaterMonitoring;
