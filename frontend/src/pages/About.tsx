import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Users, 
  Target, 
  Lightbulb, 
  Shield, 
  Globe,
  Database,
  TrendingUp,
  AlertTriangle,
  Droplets
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Real-time Data Processing",
      description: "Process DWLR CSV files and generate instant insights using advanced algorithms."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "AI-Powered Predictions",
      description: "30-day and 90-day groundwater level predictions using machine learning models."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Smart Alert System",
      description: "Automated alerts for low water levels and recharge anomalies."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Interactive Mapping",
      description: "Clickable India map with state-wise groundwater data visualization."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Security",
      description: "Client-side processing ensures your data never leaves your device."
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Recharge Analysis",
      description: "Calculate groundwater recharge using Δh × Sy formula with Sy = 0.15."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Data Scientist",
      expertise: "Machine Learning, Hydrology",
      avatar: "👩‍🔬"
    },
    {
      name: "Rajesh Kumar",
      role: "Frontend Developer",
      expertise: "React, Data Visualization",
      avatar: "👨‍💻"
    },
    {
      name: "Priya Sharma",
      role: "Water Resources Engineer",
      expertise: "Groundwater Modeling, GIS",
      avatar: "👩‍💼"
    },
    {
      name: "Amit Patel",
      role: "UI/UX Designer",
      expertise: "User Experience, Design Systems",
      avatar: "👨‍🎨"
    }
  ];

  const technologies = [
    "React 18", "TypeScript", "Tailwind CSS", "Recharts", "React Simple Maps",
    "PapaParse", "Vite", "Radix UI", "Lucide Icons"
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AquaWatch India
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive groundwater prediction platform built for Smart India Hackathon 2024. 
          Empowering water resource management through AI-driven insights and real-time monitoring.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Award className="h-4 w-4 mr-1" />
            SIH 2024 Project
          </Badge>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <Target className="h-4 w-4 mr-1" />
            Water Conservation
          </Badge>
        </div>
      </div>

      {/* Problem Statement */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            The Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-red-700">
              India faces a severe groundwater crisis with over 70% of districts experiencing 
              water stress. Traditional monitoring systems lack predictive capabilities and 
              real-time analysis, making it difficult for policymakers and farmers to make 
              informed decisions about water resource management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">70%</div>
                <div className="text-sm text-red-700">Districts Under Water Stress</div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">5,260+</div>
                <div className="text-sm text-red-700">DWLR Stations Nationwide</div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-red-700">Monitoring Required</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Lightbulb className="h-5 w-5" />
            Our Solution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-6">
            AquaWatch India provides a comprehensive, frontend-only solution that processes 
            DWLR data in real-time, generates AI-powered predictions, and offers interactive 
            visualization tools for better water resource management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-white rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-blue-600">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                CSV file upload and parsing using PapaParse
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Real-time data validation and error handling
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Client-side processing for data privacy
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Support for multiple data formats
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Predictions & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                30-day and 90-day water level predictions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Groundwater recharge calculations (Δh × Sy)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Interactive charts and visualizations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Automated alert generation
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Our Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-4xl mb-2">{member.avatar}</div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-blue-600">{member.role}</p>
                <p className="text-xs text-gray-600 mt-1">{member.expertise}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Target className="h-5 w-5" />
            Expected Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-sm text-blue-700">Farmers Benefited</div>
              <div className="text-xs text-blue-600 mt-1">Through better water management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-blue-700">Districts Covered</div>
              <div className="text-xs text-blue-600 mt-1">Real-time monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-sm text-blue-700">Water Savings</div>
              <div className="text-xs text-blue-600 mt-1">Through predictive insights</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <CardContent className="pt-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Water Management?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join us in revolutionizing groundwater monitoring and prediction. 
            Upload your DWLR data and experience the power of AI-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Start Monitoring
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              View Predictions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
