import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WaterQualityData, calculateWQI, getSafetyStatus } from '@/data/waterData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Droplets, Thermometer, Zap, Activity, AlertTriangle } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GroundwaterMapProps {
  data: WaterQualityData[];
  onMarkerClick?: (data: WaterQualityData) => void;
  className?: string;
}

// Custom marker icon based on water quality
const createCustomIcon = (wqi: number) => {
  const color = wqi >= 80 ? '#22c55e' : wqi >= 60 ? '#eab308' : '#ef4444';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
      font-weight: bold;
    ">${Math.round(wqi)}</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to handle map events
const MapEvents = ({ onMarkerClick }: { onMarkerClick?: (data: WaterQualityData) => void }) => {
  const [mousePosition, setMousePosition] = useState<{ lat: number; lng: number } | null>(null);
  
  useMapEvents({
    mousemove: (e) => {
      setMousePosition({
        lat: Math.round(e.latlng.lat * 1000) / 1000,
        lng: Math.round(e.latlng.lng * 1000) / 1000,
      });
    },
    mouseout: () => {
      setMousePosition(null);
    },
  });

  return mousePosition ? (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-[1000] text-sm font-mono">
      <div>Lat: {mousePosition.lat}</div>
      <div>Lng: {mousePosition.lng}</div>
    </div>
  ) : null;
};

// Popup content component
const MarkerPopup: React.FC<{ data: WaterQualityData }> = ({ data }) => {
  const wqi = calculateWQI(data);
  const safetyStatus = getSafetyStatus(data);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': return 'bg-green-100 text-green-800';
      case 'Unsafe': return 'bg-red-100 text-red-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Contaminated': return 'bg-red-100 text-red-800';
      case 'Adequate': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-80 p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{data.stationCode}</h3>
            <p className="text-sm text-gray-600">{data.location}, {data.state}</p>
          </div>
          <Badge variant={wqi >= 80 ? 'default' : wqi >= 60 ? 'secondary' : 'destructive'}>
            WQI: {wqi}
          </Badge>
        </div>

        {/* Water Quality Parameters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm font-medium">Temperature</div>
              <div className="text-xs text-gray-600">{data.temp}°C</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-cyan-500" />
            <div>
              <div className="text-sm font-medium">Dissolved O₂</div>
              <div className="text-xs text-gray-600">{data.dissolvedOxygen} mg/l</div>
              <Badge className={`text-xs ${getStatusColor(safetyStatus.dissolvedOxygen)}`}>
                {safetyStatus.dissolvedOxygen}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-sm font-medium">pH</div>
              <div className="text-xs text-gray-600">{data.ph}</div>
              <Badge className={`text-xs ${getStatusColor(safetyStatus.ph)}`}>
                {safetyStatus.ph}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <div>
              <div className="text-sm font-medium">Conductivity</div>
              <div className="text-xs text-gray-600">{data.conductivity} µmhos/cm</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <div>
              <div className="text-sm font-medium">BOD</div>
              <div className="text-xs text-gray-600">{data.bod} mg/l</div>
              <Badge className={`text-xs ${getStatusColor(safetyStatus.bod)}`}>
                {safetyStatus.bod}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-sm font-medium">Nitrate/Nitrite</div>
              <div className="text-xs text-gray-600">{data.nitrateNitrite} mg/l</div>
            </div>
          </div>
        </div>

        {/* Coliform Information */}
        <div className="border-t pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-sm font-medium">Fecal Coliform</div>
              <div className="text-xs text-gray-600">{data.fecalColiform} MPN/100ml</div>
              <Badge className={`text-xs ${getStatusColor(safetyStatus.fecalColiform)}`}>
                {safetyStatus.fecalColiform}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium">Total Coliform</div>
              <div className="text-xs text-gray-600">{data.totalColiform} MPN/100ml</div>
              <Badge className={`text-xs ${getStatusColor(safetyStatus.totalColiform)}`}>
                {safetyStatus.totalColiform}
              </Badge>
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="text-center text-sm text-gray-500">
          Data from {data.year}
        </div>
      </div>
    </div>
  );
};

const GroundwaterMap: React.FC<GroundwaterMapProps> = ({ 
  data, 
  onMarkerClick, 
  className = "" 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [clickedLatLng, setClickedLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<{ city?: string; district?: string; state?: string; displayName?: string } | null>(null);
  const [matchedStation, setMatchedStation] = useState<WaterQualityData | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Haversine distance in km
  const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  };

  // Find nearest station within 25 km
  const findNearestStation = (lat: number, lng: number): WaterQualityData | null => {
    let best: { d: number; s: WaterQualityData } | null = null;
    for (const s of data) {
      if (typeof s.latitude !== 'number' || typeof s.longitude !== 'number') continue;
      const d = haversineKm({ lat, lng }, { lat: s.latitude, lng: s.longitude });
      if (!best || d < best.d) best = { d, s };
    }
    if (best && best.d <= 25) return best.s;
    return null;
  };

  // Reverse geocode when clicked
  useEffect(() => {
    if (!clickedLatLng) return;
    let cancelled = false;
    const controller = new AbortController();
    const run = async () => {
      setIsLoadingInfo(true);
      setLocationName(null);
      setMatchedStation(null);
      try {
        // Try Nominatim reverse geocoding
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${clickedLatLng.lat}&lon=${clickedLatLng.lng}`;
        const resp = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            // Nominatim usage policy requires a valid UA; browsers may override, but we set a descriptive one
            'User-Agent': 'AquaWatch-Groundwater-Demo/1.0 (contact: demo@example.com)'
          },
          signal: controller.signal,
        });
        let loc: { city?: string; state?: string; county?: string; suburb?: string; village?: string; town?: string; display_name?: string } | null = null;
        if (resp.ok) {
          const json = await resp.json();
          loc = {
            city: json.address?.city || json.address?.town || json.address?.village || json.address?.hamlet,
            state: json.address?.state,
            county: json.address?.county,
            suburb: json.address?.suburb,
            village: json.address?.village,
            town: json.address?.town,
            display_name: json.display_name,
          } as any;
        }
        if (!cancelled) {
          setLocationName({
            city: loc?.city,
            district: loc?.county, // Nominatim often puts district-level in county
            state: loc?.state,
            displayName: loc?.display_name,
          });
          setMatchedStation(findNearestStation(clickedLatLng.lat, clickedLatLng.lng));
        }
      } catch (e) {
        if (!cancelled) {
          // Fallback: no geocode, but still compute nearest
          setLocationName(null);
          setMatchedStation(findNearestStation(clickedLatLng.lat, clickedLatLng.lng));
        }
      } finally {
        if (!cancelled) setIsLoadingInfo(false);
      }
    };
    run();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [clickedLatLng, data]);

  // Handle map click to set clickedLatLng and clear previous
  const ClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        setClickedLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
      // Touch support
      touchend: (e: any) => {
        if (e?.latlng) setClickedLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  const categoryBadge = useMemo(() => {
    if (!matchedStation) return { text: 'No Data', className: 'bg-gray-100 text-gray-800' };
    const wqi = calculateWQI(matchedStation);
    if (wqi >= 80) return { text: 'Safe', className: 'bg-green-100 text-green-800' };
    if (wqi >= 60) return { text: 'Moderate Stress', className: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Critical', className: 'bg-red-100 text-red-800' };
  }, [matchedStation]);

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
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEvents onMarkerClick={onMarkerClick} />
        <ClickHandler />
        
        {data.map((station, index) => {
          if (!station.latitude || !station.longitude) return null;
          
          const wqi = calculateWQI(station);
          
          return (
            <Marker
              key={`${station.stationCode}-${index}`}
              position={[station.latitude, station.longitude]}
              icon={createCustomIcon(wqi)}
              eventHandlers={{
                click: () => onMarkerClick?.(station),
              }}
            >
              <Popup maxWidth={400} className="custom-popup">
                <MarkerPopup data={station} />
              </Popup>
            </Marker>
          );
        })}

        {/* Click popup marker */}
        {clickedLatLng && (
          <Marker position={[clickedLatLng.lat, clickedLatLng.lng]}>
            <Popup maxWidth={380} autoPan>
              <div className="w-[320px] p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-base">Selected Location</h3>
                      <p className="text-xs text-gray-600">{locationName?.displayName || 'Unknown place'}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${categoryBadge.className}`}>{categoryBadge.text}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500">Latitude</div>
                      <div className="font-mono">{clickedLatLng.lat.toFixed(5)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Longitude</div>
                      <div className="font-mono">{clickedLatLng.lng.toFixed(5)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">City/Town</div>
                      <div>{locationName?.city || '—'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">District</div>
                      <div>{locationName?.district || '—'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">State</div>
                      <div>{locationName?.state || '—'}</div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    {isLoadingInfo ? (
                      <div className="text-sm text-gray-500">Fetching location and groundwater info…</div>
                    ) : matchedStation ? (
                      <div className="space-y-2 text-sm">
                        <div className="font-medium">Nearest Station: {matchedStation.stationCode}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-gray-500">Temp</div>
                            <div>{matchedStation.temp}°C</div>
                          </div>
                          <div>
                            <div className="text-gray-500">DO</div>
                            <div>{matchedStation.dissolvedOxygen} mg/l</div>
                          </div>
                          <div>
                            <div className="text-gray-500">pH</div>
                            <div>{matchedStation.ph}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">BOD</div>
                            <div>{matchedStation.bod} mg/l</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No data available for this location.</div>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default GroundwaterMap;
