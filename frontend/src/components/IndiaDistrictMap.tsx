import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DistrictData, getDistrictColor, generateDistrictData } from '@/utils/generateMockDWLRData';
import * as turf from '@turf/turf';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IndiaDistrictMapProps {
  onDistrictClick: (districtData: DistrictData) => void;
  className?: string;
}

interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    NAME_1: string; // State name
    NAME_2: string; // District name
    [key: string]: any;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

const IndiaDistrictMap: React.FC<IndiaDistrictMapProps> = ({ 
  onDistrictClick, 
  className = "" 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState<GeoJSONFeature[] | null>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<L.Map | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Load GeoJSON data
    fetch('/geojson/india_districts.geojson')
      .then(response => response.json())
      .then(data => {
        setGeoJsonData(data.features);
      })
      .catch(error => {
        console.error('Error loading GeoJSON:', error);
        setGeoJsonData([]);
      });
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet map directly
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (!mapInstanceRef.current || !geoJsonData || geoJsonData.length === 0) return;

    // Add GeoJSON data when available
    const geoJsonLayer = L.geoJSON(geoJsonData as any, {
      style: (feature) => {
        const statuses = ['Good', 'Moderate', 'Low', 'Critical'] as const;
        const color = getDistrictColor(statuses[Math.floor(Math.random() * statuses.length)]);
        return {
          fillColor: color,
          weight: 1,
          opacity: 1,
          color: '#ffffff',
          dashArray: '3',
          fillOpacity: 0.7,
        };
      },
        onEachFeature: (feature, layer) => {
          layer.on({
            click: () => {
              const districtName = feature.properties?.NAME_2;
              const stateName = feature.properties?.NAME_1;
              
              // Calculate centroid using turf
              let coordinates: [number, number];
              try {
                const centroid = turf.centroid(feature.geometry as any);
                coordinates = [centroid.geometry.coordinates[1], centroid.geometry.coordinates[0]]; // [lat, lng]
              } catch (error) {
                console.warn('Error calculating centroid, using fallback:', error);
                coordinates = [20.5937, 78.9629]; // Fallback to center of India
              }
              
              const districtData = generateDistrictData(districtName, stateName, coordinates);
              onDistrictClick(districtData);
            },
          mouseover: (e) => {
            const target = e.target as L.Path;
            target.setStyle({ weight: 3, color: '#666', dashArray: '', fillOpacity: 0.9 });
            target.bringToFront();
          },
          mouseout: (e) => {
            const target = e.target as L.Path;
            target.setStyle({ weight: 1, color: '#ffffff', dashArray: '3', fillOpacity: 0.7 });
          },
        });
      }
    }).addTo(mapInstanceRef.current);
  }, [geoJsonData, onDistrictClick]);

  if (!isClient) {
    return (
      <div className={`w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default IndiaDistrictMap;
