import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CloudRain, Droplets, TrendingUp, Calculator, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for recharge estimation
const monthlyRecharge = [
  { month: "Jan", recharge: 1.8, rainfall: 12, efficiency: 85 },
  { month: "Feb", recharge: 1.5, rainfall: 8, efficiency: 82 },
  { month: "Mar", recharge: 1.2, rainfall: 15, efficiency: 75 },
  { month: "Apr", recharge: 0.8, rainfall: 25, efficiency: 68 },
  { month: "May", recharge: 0.3, rainfall: 35, efficiency: 45 },
  { month: "Jun", recharge: 0.1, rainfall: 85, efficiency: 20 },
  { month: "Jul", recharge: 3.8, rainfall: 245, efficiency: 95 },
  { month: "Aug", recharge: 4.2, rainfall: 280, efficiency: 98 },
  { month: "Sep", recharge: 3.5, rainfall: 195, efficiency: 92 },
  { month: "Oct", recharge: 2.1, rainfall: 65, efficiency: 88 },
  { month: "Nov", recharge: 1.9, rainfall: 25, efficiency: 85 },
  { month: "Dec", recharge: 1.7, rainfall: 18, efficiency: 82 },
];

interface RechargeEstimatorProps {
  region?: string;
  className?: string;
}

export const RechargeEstimator = ({ region = "Rayagada - Odisha", className }: RechargeEstimatorProps) => {
  const currentMonth = new Date().getMonth();
  const currentData = monthlyRecharge[currentMonth];
  const annualRecharge = monthlyRecharge.reduce((sum, month) => sum + month.recharge, 0);
  const avgEfficiency = Math.round(monthlyRecharge.reduce((sum, month) => sum + month.efficiency, 0) / 12);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg shadow-card border">
          <p className="font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-accent text-sm">
              Recharge: {data.recharge} mm/day
            </p>
            <p className="text-blue-500 text-sm">
              Rainfall: {data.rainfall} mm
            </p>
            <p className="text-water-safe text-sm">
              Efficiency: {data.efficiency}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`shadow-card hover:shadow-water transition-all duration-300 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            Recharge Estimation Tool
          </CardTitle>
          <Badge className="bg-gradient-flow text-white">
            AI-Powered
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{region}</p>
      </CardHeader>
      <CardContent>
        {/* Current Month Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-gradient-water/10">
            <div className="text-2xl font-bold text-primary">{currentData.recharge}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Droplets className="h-3 w-3" />
              mm/day
            </div>
            <div className="text-xs text-muted-foreground mt-1">Current Rate</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-flow/10">
            <div className="text-2xl font-bold text-accent">{annualRecharge.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              mm/year
            </div>
            <div className="text-xs text-muted-foreground mt-1">Annual Total</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-water-safe/10">
            <div className="text-2xl font-bold text-water-safe">{avgEfficiency}%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
            <div className="text-xs text-muted-foreground mt-1">Average</div>
          </div>
        </div>

        {/* Efficiency Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Recharge Efficiency</span>
            <span className="text-sm text-muted-foreground">{currentData.efficiency}%</span>
          </div>
          <Progress value={currentData.efficiency} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Monthly Recharge Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-accent" />
            Monthly Recharge Pattern
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRecharge}>
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
              <Bar 
                dataKey="recharge" 
                fill="hsl(var(--accent))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Seasonal Insights */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Monsoon Season</span>
            </div>
            <div className="text-lg font-semibold text-accent">11.5 mm/day</div>
            <div className="text-xs text-muted-foreground">Jul-Sep Average</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Dry Season</span>
            </div>
            <div className="text-lg font-semibold text-primary">0.7 mm/day</div>
            <div className="text-xs text-muted-foreground">Apr-Jun Average</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Detailed Report
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Forecast Trends
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
