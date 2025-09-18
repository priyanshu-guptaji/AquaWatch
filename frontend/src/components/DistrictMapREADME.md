# District-Level Interactive India Map

## Overview
This implementation provides a fully responsive, district-level interactive India map for the groundwater prediction platform. The map allows users to click on districts to view detailed groundwater data, charts, and analysis.

## Features Implemented

### ✅ 1. Interactive District Map
- **Technology**: React Leaflet + GeoJSON
- **Responsive Design**: Works on desktop and mobile
- **Color-coded Districts**: Visual indicators based on water level status
- **Hover Effects**: Interactive feedback on district hover
- **Zoom & Pan**: Full map navigation support

### ✅ 2. District Data Generation
- **Mock DWLR Data**: Realistic data generation for each district
- **Seasonal Variation**: Simulates natural water level fluctuations
- **Rainfall Patterns**: Monsoon season simulation
- **Temperature Data**: Seasonal temperature variations
- **Station IDs**: Unique identifiers based on district names

### ✅ 3. Real-time Analysis
- **Water Level Status**: Good, Moderate, Low, Critical classifications
- **Recharge Calculations**: Using Δh × Sy formula (Sy = 0.15)
- **Alert System**: Automated threshold-based alerts
- **Trend Analysis**: Historical data visualization

### ✅ 4. Interactive Components
- **MapInfoCard**: Detailed district information display
- **Charts Integration**: Line, Bar, and Scatter plots
- **Responsive Layout**: Mobile-first design approach
- **TypeScript Support**: Full type safety throughout

## File Structure

```
src/
├── components/
│   ├── IndiaDistrictMap.tsx      # Main map component
│   └── MapInfoCard.tsx           # District info display
├── utils/
│   └── generateMockDWLRData.ts   # Data generation utilities
├── pages/
│   ├── EnhancedDashboard.tsx     # Main dashboard page
│   └── Index.tsx                 # Updated with map integration
└── public/
    └── geojson/
        └── india_districts.geojson # Sample GeoJSON data
```

## Key Components

### IndiaDistrictMap.tsx
- Renders the interactive map using React Leaflet
- Handles district clicks and data generation
- Provides color-coded district visualization
- Includes hover effects and tooltips

### MapInfoCard.tsx
- Displays detailed district information
- Shows recent DWLR readings
- Provides station information and coordinates
- Responsive design for all screen sizes

### generateMockDWLRData.ts
- Generates realistic mock data for districts
- Calculates water level status and alerts
- Provides recharge calculations
- Handles seasonal variations and patterns

## Usage

1. **Load the Map**: The map loads automatically with district boundaries
2. **Click Districts**: Click on any district to view detailed information
3. **View Charts**: Charts update automatically with district data
4. **Check Alerts**: Alerts appear for districts with critical conditions
5. **Navigate**: Use zoom and pan to explore different regions

## Data Flow

1. User clicks on a district
2. Map calculates district centroid coordinates
3. Mock DWLR data is generated for the district
4. Data is passed to charts and info card
5. Alerts are generated based on thresholds
6. UI updates with new district information

## Responsive Design

- **Desktop**: Full map with side panel for district info
- **Tablet**: Stacked layout with full-width map
- **Mobile**: Optimized touch interactions and compact layout

## Color Coding

- **Green**: Good water levels (6m+)
- **Yellow**: Moderate levels (4-6m)
- **Orange**: Low levels (2-4m)
- **Red**: Critical levels (<2m)

## Technical Features

- **TypeScript**: Full type safety
- **React Hooks**: Modern React patterns
- **Tailwind CSS**: Responsive styling
- **Recharts**: Professional chart library
- **React Leaflet**: Interactive mapping
- **GeoJSON**: Standard geographic data format

## Future Enhancements

- Real-time data integration
- More detailed district boundaries
- Advanced prediction algorithms
- Export functionality
- Historical data comparison
- Multi-district selection

## Dependencies

- react-leaflet
- leaflet
- @turf/turf (for advanced calculations)
- recharts
- tailwindcss
- lucide-react (icons)

This implementation provides a solid foundation for a district-level groundwater monitoring system that can be easily extended with real data sources and additional features.
