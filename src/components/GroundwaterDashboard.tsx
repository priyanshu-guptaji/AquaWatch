import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Droplets, 
  MapPin, 
  Activity, 
  TrendingUp, 
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  WaterQualityData, 
  calculateWQI, 
  filterWaterData, 
  getUniqueStates, 
  getUniqueLocations,
  getTrendData 
} from '@/data/waterData';

interface GroundwaterDashboardProps {
  data: WaterQualityData[];
  className?: string;
}

const GroundwaterDashboard: React.FC<GroundwaterDashboardProps> = ({ 
  data, 
  className = "" 
}) => {
  const [stateFilter, setStateFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [selectedParameter, setSelectedParameter] = useState<keyof WaterQualityData>('dissolvedOxygen');

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return filterWaterData(data, stateFilter, locationFilter);
  }, [data, stateFilter, locationFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalStations: 0,
        averageWQI: 0,
        safeStations: 0,
        unsafeStations: 0,
        states: 0,
        averageTemp: 0,
        averagePH: 0,
        averageDO: 0,
      };
    }

    const wqiValues = filteredData.map(calculateWQI);
    const averageWQI = wqiValues.reduce((sum, wqi) => sum + wqi, 0) / wqiValues.length;
    const safeStations = wqiValues.filter(wqi => wqi >= 60).length;
    const unsafeStations = wqiValues.filter(wqi => wqi < 60).length;
    const uniqueStates = new Set(filteredData.map(item => item.state)).size;

    return {
      totalStations: filteredData.length,
      averageWQI: Math.round(averageWQI),
      safeStations,
      unsafeStations,
      states: uniqueStates,
      averageTemp: Math.round((filteredData.reduce((sum, item) => sum + item.temp, 0) / filteredData.length) * 10) / 10,
      averagePH: Math.round((filteredData.reduce((sum, item) => sum + item.ph, 0) / filteredData.length) * 10) / 10,
      averageDO: Math.round((filteredData.reduce((sum, item) => sum + item.dissolvedOxygen, 0) / filteredData.length) * 10) / 10,
    };
  }, [filteredData]);

  // Get trend data for the selected parameter
  const trendData = useMemo(() => {
    return getTrendData(filteredData, selectedParameter);
  }, [filteredData, selectedParameter]);

  // Get state-wise distribution
  const stateDistribution = useMemo(() => {
    const stateGroups = filteredData.reduce((acc, item) => {
      if (!acc[item.state]) {
        acc[item.state] = 0;
      }
      acc[item.state]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stateGroups)
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 states
  }, [filteredData]);

  // Get WQI distribution
  const wqiDistribution = useMemo(() => {
    const wqiValues = filteredData.map(calculateWQI);
    const excellent = wqiValues.filter(wqi => wqi >= 90).length;
    const good = wqiValues.filter(wqi => wqi >= 70 && wqi < 90).length;
    const fair = wqiValues.filter(wqi => wqi >= 50 && wqi < 70).length;
    const poor = wqiValues.filter(wqi => wqi < 50).length;

    return [
      { name: 'Excellent (90+)', value: excellent, color: '#22c55e' },
      { name: 'Good (70-89)', value: good, color: '#84cc16' },
      { name: 'Fair (50-69)', value: fair, color: '#eab308' },
      { name: 'Poor (<50)', value: poor, color: '#ef4444' },
    ];
  }, [filteredData]);

  const uniqueStates = getUniqueStates(data);
  const uniqueLocations = getUniqueLocations(data);

  const parameterOptions = [
    { value: 'dissolvedOxygen', label: 'Dissolved Oxygen (mg/l)' },
    { value: 'ph', label: 'pH' },
    { value: 'temp', label: 'Temperature (°C)' },
    { value: 'conductivity', label: 'Conductivity (µmhos/cm)' },
    { value: 'bod', label: 'BOD (mg/l)' },
    { value: 'nitrateNitrite', label: 'Nitrate/Nitrite (mg/l)' },
    { value: 'fecalColiform', label: 'Fecal Coliform (MPN/100ml)' },
    { value: 'totalColiform', label: 'Total Coliform (MPN/100ml)' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Groundwater Quality Dashboard</h2>
          <p className="text-gray-600">Monitor water quality across {summaryStats.states} states</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All States</SelectItem>
                {uniqueStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalStations}</div>
            <p className="text-xs text-muted-foreground">
              Across {summaryStats.states} states
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average WQI</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.averageWQI}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.averageWQI >= 80 ? 'Good' : 
               summaryStats.averageWQI >= 60 ? 'Fair' : 'Poor'} quality
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safe Stations</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summaryStats.safeStations}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.totalStations > 0 ? 
                Math.round((summaryStats.safeStations / summaryStats.totalStations) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsafe Stations</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryStats.unsafeStations}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.totalStations > 0 ? 
                Math.round((summaryStats.unsafeStations / summaryStats.totalStations) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Parameter Trends Over Time</span>
            </CardTitle>
            <div className="mt-2">
              <Select value={selectedParameter} onValueChange={(value) => setSelectedParameter(value as keyof WaterQualityData)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {parameterOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(2), parameterOptions.find(p => p.value === selectedParameter)?.label]}
                    labelFormatter={(year) => `Year: ${year}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* WQI Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5" />
              <span>Water Quality Index Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wqiDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wqiDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Top States by Station Count</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="state" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Temperature</p>
                <p className="text-2xl font-bold">{summaryStats.averageTemp}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average pH</p>
                <p className="text-2xl font-bold">{summaryStats.averagePH}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Droplets className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Dissolved Oxygen</p>
                <p className="text-2xl font-bold">{summaryStats.averageDO} mg/l</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroundwaterDashboard;
