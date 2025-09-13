import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GHIProps {
  score: number;
  region: string;
  trend: "up" | "down" | "stable";
  className?: string;
}

const getHealthStatus = (score: number) => {
  if (score >= 80) return { status: "Safe", color: "bg-water-safe", textColor: "text-water-safe" };
  if (score >= 60) return { status: "Moderate", color: "bg-water-caution", textColor: "text-water-caution" };
  if (score >= 40) return { status: "Stressed", color: "bg-orange-500", textColor: "text-orange-500" };
  return { status: "Critical", color: "bg-water-critical", textColor: "text-water-critical" };
};

const getTrendIcon = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up": return <TrendingUp className="h-4 w-4 text-water-safe" />;
    case "down": return <TrendingDown className="h-4 w-4 text-water-critical" />;
    default: return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

export const GroundwaterHealthIndex = ({ score, region, trend, className }: GHIProps) => {
  const { status, color, textColor } = getHealthStatus(score);

  return (
    <Card className={`relative overflow-hidden shadow-card hover:shadow-water transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-water opacity-5" />
      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Groundwater Health Index</CardTitle>
          <Droplets className="h-5 w-5 text-accent" />
        </div>
        <p className="text-sm text-muted-foreground">{region}</p>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{score}</div>
            <div className="text-xs text-muted-foreground">out of 100</div>
          </div>
          <div className="text-right">
            <Badge className={`${color} text-white font-medium mb-2`}>
              {status}
            </Badge>
            <div className="flex items-center gap-1">
              {getTrendIcon(trend)}
              <span className="text-sm text-muted-foreground">
                {trend === "up" ? "Improving" : trend === "down" ? "Declining" : "Stable"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${score}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Critical</span>
          <span>Safe</span>
        </div>
      </CardContent>
    </Card>
  );
};
