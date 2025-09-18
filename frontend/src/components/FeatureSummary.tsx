import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  TrendingUp, 
  MapPin, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Droplets,
  Calendar,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureSummary: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "CSV Data Upload",
      description: "Upload DWLR CSV files with drag-and-drop support and automatic parsing",
      status: "✅ Complete",
      color: "text-green-600"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Charts",
      description: "Line charts, bar charts, and scatter plots for comprehensive data analysis",
      status: "✅ Complete",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "AI Predictions",
      description: "30-day and 90-day groundwater level predictions using machine learning",
      status: "✅ Complete",
      color: "text-green-600"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Interactive India Map",
      description: "Clickable state-wise map with real-time groundwater data visualization",
      status: "✅ Complete",
      color: "text-green-600"
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Smart Filters",
      description: "Date range, station selection, and rainfall toggle filters",
      status: "✅ Complete",
      color: "text-green-600"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Alert System",
      description: "Automated alerts for low water levels and recharge anomalies",
      status: "✅ Complete",
      color: "text-green-600"
    }
  ];

  const calculations = [
    {
      formula: "Recharge = Δh × Sy",
      description: "Groundwater recharge calculation with Sy = 0.15",
      example: "Δh = 2m, Sy = 0.15 → Recharge = 0.3m"
    },
    {
      formula: "WQI = (DO + pH + BOD) / 3",
      description: "Water Quality Index calculation",
      example: "DO=8, pH=7, BOD=2 → WQI = 5.67"
    },
    {
      formula: "Prediction = LastValue + Trend × Days",
      description: "Simple trend-based prediction algorithm",
      example: "LastValue=5m, Trend=-0.1, Days=30 → Prediction = 2m"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            AquaWatch Features - Implementation Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                    <Badge className={`text-xs mt-2 ${feature.color}`}>
                      {feature.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Key Calculations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {calculations.map((calc, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-mono text-sm font-semibold text-blue-600">
                    {calc.formula}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {calc.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Example: {calc.example}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload DWLR Data
              </Button>
              <Button 
                onClick={() => navigate('/predict')} 
                className="w-full justify-start"
                variant="outline"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Predictions
              </Button>
              <Button 
                onClick={() => navigate('/about')} 
                className="w-full justify-start"
                variant="outline"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Project Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeatureSummary;
