# Groundwater Monitoring Components

This directory contains comprehensive groundwater quality monitoring components for the AquaWatch application.

## Components

### 1. GroundwaterMap
Interactive map component using React Leaflet that displays water quality monitoring stations across India.

**Features:**
- Interactive map with zoom and pan support
- Custom markers with color-coded water quality indicators
- Detailed popups with water quality parameters
- Real-time coordinate display on hover
- Responsive design

**Usage:**
```tsx
import { GroundwaterMap } from '@/components/groundwater';

<GroundwaterMap 
  data={waterData}
  onMarkerClick={(station) => console.log(station)}
  className="h-96"
/>
```

### 2. GroundwaterDashboard
Comprehensive dashboard with charts, filters, and analytics for water quality data.

**Features:**
- Summary statistics cards
- Interactive trend charts using Recharts
- State and location filters
- Water Quality Index (WQI) distribution
- State-wise station distribution
- Parameter trend analysis

**Usage:**
```tsx
import { GroundwaterDashboard } from '@/components/groundwater';

<GroundwaterDashboard data={waterData} />
```

### 3. GroundwaterMonitoring
Combined component with tabbed interface for both map and dashboard views.

**Features:**
- Tabbed interface (Map View / Dashboard)
- Selected station details panel
- Responsive layout

**Usage:**
```tsx
import { GroundwaterMonitoring } from '@/components/groundwater';

<GroundwaterMonitoring data={waterData} />
```

### 4. GroundwaterWidget
Compact widget for displaying key metrics and quick access to full monitoring features.

**Features:**
- Quick statistics overview
- Recent stations list
- Action buttons for navigation
- Compact design for dashboard integration

**Usage:**
```tsx
import { GroundwaterWidget } from '@/components/groundwater';

<GroundwaterWidget 
  onViewFull={() => navigate('/groundwater')}
  className="w-full"
/>
```

## Data Structure

The components expect data in the following format:

```typescript
interface WaterQualityData {
  stationCode: string;
  location: string;
  state: string;
  temp: number;
  dissolvedOxygen: number; // mg/l
  ph: number;
  conductivity: number; // µmhos/cm
  bod: number; // mg/l
  nitrateNitrite: number; // mg/l
  fecalColiform: number; // MPN/100ml
  totalColiform: number; // MPN/100ml
  year: number;
  latitude?: number;
  longitude?: number;
}
```

## Utilities

### Data Generation
- `generateMockWaterData()`: Generates realistic mock data for all Indian states
- `calculateWQI(data)`: Calculates Water Quality Index
- `getSafetyStatus(data)`: Determines safety status for each parameter
- `filterWaterData(data, stateFilter, locationFilter)`: Filters data by state/location

### Geocoding
The system includes mock coordinates for all Indian states. In production, you can replace the mock geocoding with a real geocoding service.

## Styling

The components use TailwindCSS for styling and include custom CSS for map components in `groundwater.css`.

## Dependencies

- `react-leaflet`: For interactive maps
- `leaflet`: Map library
- `recharts`: For charts and graphs
- `@radix-ui/*`: For UI components
- `lucide-react`: For icons

## Integration

To integrate into existing pages:

1. **Add to navigation**: Add a link to `/groundwater` in your navigation
2. **Import components**: Use the individual components or the combined `GroundwaterMonitoring`
3. **Add data**: Provide your water quality data or use the mock data generator
4. **Customize styling**: Override Tailwind classes as needed

## Example Integration

```tsx
// In your main dashboard
import { GroundwaterWidget } from '@/components/groundwater';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Other dashboard widgets */}
      <GroundwaterWidget 
        onViewFull={() => navigate('/groundwater')}
      />
    </div>
  );
}
```

## Production Considerations

1. **Real Data**: Replace mock data with actual API calls
2. **Geocoding**: Implement real geocoding service for location coordinates
3. **Performance**: Consider implementing data pagination for large datasets
4. **Caching**: Add data caching for better performance
5. **Error Handling**: Add proper error boundaries and loading states
