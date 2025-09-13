import { useState } from "react";
import { IndiaMap } from "@/components/IndiaMap";
import { GroundwaterHealthIndex } from "@/components/GroundwaterHealthIndex";
import { WaterLevelChart } from "@/components/WaterLevelChart";
import { AlertSystem } from "@/components/AlertSystem";
import { RechargeEstimator } from "@/components/RechargeEstimator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, TrendingUp, TrendingDown, MapPin, Users, Building, Wheat } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Mock national statistics
  const nationalStats = {
    averageGHI: 64,
    criticalStates: 8,
    activeStations: 5260,
    totalRecharge: 156.8,
    lastUpdated: "2 hours ago"
  };

  const userTypes = [
    { type: "Government", icon: Building, count: "245 Officials", color: "bg-primary" },
    { type: "Farmers", icon: Wheat, count: "12,450 Users", color: "bg-water-safe" },
    { type: "Industries", icon: Building, count: "892 Companies", color: "bg-accent" },
    { type: "Researchers", icon: Users, count: "156 Active", color: "bg-water-caution" },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="relative mb-8 p-8 rounded-2xl bg-gradient-hero text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-teal-900/50" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  India Groundwater Monitoring System
                </h1>
                <p className="text-xl opacity-90 mb-4">
                  Real-time insights from {nationalStats.activeStations.toLocaleString()} DWLR stations across the nation
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    Last Updated: {nationalStats.lastUpdated}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    National GHI: {nationalStats.averageGHI}
                  </Badge>
                </div>
              </div>
              <div className="hidden lg:block">
                <Droplets className="h-32 w-32 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {userTypes.map((userType, index) => {
            const Icon = userType.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-water transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${userType.color}/10`}>
                      <Icon className={`h-5 w-5 text-${userType.color.replace('bg-', '')}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{userType.type}</div>
                      <div className="text-xs text-muted-foreground">{userType.count}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* India Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <IndiaMap />
          </div>
          
          {/* GHI Card */}
          <div>
            <GroundwaterHealthIndex 
              score={nationalStats.averageGHI}
              region="National Average"
              trend="down"
            />
          </div>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WaterLevelChart />
          <RechargeEstimator />
        </div>

        {/* Alert System */}
        <div className="mb-8">
          <AlertSystem />
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <HowItWorks />
        </div>

        {/* Knowledge Hub Preview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Regional Insights & Success Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-water-safe/10">
                <h3 className="font-semibold text-water-safe mb-2">Success Story</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Gujarat's Kutch district improved GHI from 35 to 78 through community-led water conservation initiatives.
                </p>
                <Badge className="bg-water-safe text-white">+43 GHI Points</Badge>
              </div>
              <div className="p-4 rounded-lg bg-accent/10">
                <h3 className="font-semibold text-accent mb-2">Best Practice</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Rajasthan's rainwater harvesting program shows 25% improvement in groundwater recharge rates.
                </p>
                <Badge className="bg-accent text-white">25% Improvement</Badge>
              </div>
              <div className="p-4 rounded-lg bg-water-caution/10">
                <h3 className="font-semibold text-water-caution mb-2">Action Needed</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Maharashtra's Marathwada region requires immediate intervention with declining water tables.
                </p>
                <Badge className="bg-water-caution text-white">Priority Zone</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
