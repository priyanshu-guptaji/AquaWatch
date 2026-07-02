import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, Droplets } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Mock data for water level trends
const waterLevelData = [
  { month: "Jan", level: 15.2, recharge: 2.1, year: "2024" },
  { month: "Feb", level: 14.8, recharge: 1.8, year: "2024" },
  { month: "Mar", level: 13.9, recharge: 1.2, year: "2024" },
  { month: "Apr", level: 12.5, recharge: 0.8, year: "2024" },
  { month: "May", level: 11.2, recharge: 0.3, year: "2024" },
  { month: "Jun", level: 10.8, recharge: 0.1, year: "2024" },
  { month: "Jul", level: 12.4, recharge: 3.5, year: "2024" },
  { month: "Aug", level: 14.1, recharge: 4.2, year: "2024" },
  { month: "Sep", level: 15.8, recharge: 3.8, year: "2024" },
  { month: "Oct", level: 16.2, recharge: 2.9, year: "2024" },
  { month: "Nov", level: 15.9, recharge: 2.3, year: "2024" },
  { month: "Dec", level: 15.5, recharge: 2.0, year: "2024" },
];

const predictiveData = [
  { month: "Jan 25", level: 15.1, predicted: true },
  { month: "Feb 25", level: 14.5, predicted: true },
  { month: "Mar 25", level: 13.8, predicted: true },
  { month: "Apr 25", level: 12.2, predicted: true },
];

interface WaterLevelChartProps {
  region?: string;
  className?: string;
}

export const WaterLevelChart = ({ region = "National Average", className }: WaterLevelChartProps) => {
  const currentLevel = waterLevelData[waterLevelData.length - 1].level;
  const previousLevel = waterLevelData[waterLevelData.length - 2].level;
  const trend = currentLevel > previousLevel ? "up" : "down";
  const trendValue = Math.abs(((currentLevel - previousLevel) / previousLevel) * 100);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-card border">
          <p className="font-medium">{label}</p>
          <p className="text-accent">
            Water Level: {payload[0].value} meters
          </p>
          {payload[1] && (
            <p className="text-water-safe">
              Recharge: {payload[1].value} mm/day
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`shadow-card hover:shadow-water transition-all duration-300 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Water Level Trends</CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">2024</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">{region}</p>
          <Badge variant={trend === "up" ? "default" : "destructive"} className="flex items-center gap-1">
            {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trendValue.toFixed(1)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Level Display */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-gradient-water/10">
            <div className="text-2xl font-bold text-primary">{currentLevel}m</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Droplets className="h-3 w-3" />
              Current Level
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-flow/10">
            <div className="text-2xl font-bold text-accent">
              {waterLevelData[waterLevelData.length - 1].recharge}mm
            </div>
            <div className="text-sm text-muted-foreground">Daily Recharge</div>
          </div>
        </div>

        {/* Water Level Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-foreground">Water Level & Recharge Pattern</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={waterLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={customTooltip} />
              <Line 
                type="monotone" 
                dataKey="level" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "hsl(var(--accent))" }}
              />
              <Line 
                type="monotone" 
                dataKey="recharge" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Predictive Forecast */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            AI Prediction (Next 4 Months)
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card p-3 rounded-lg shadow-card border">
                        <p className="font-medium">{label}</p>
                        <p className="text-accent">
                          Predicted Level: {payload[0].value} meters
                        </p>
                        <p className="text-xs text-muted-foreground">AI Forecast</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="level" 
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent) / 0.2)"
                strokeWidth={2}
                strokeDasharray="8 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
