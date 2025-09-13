import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Bell, X, MapPin, Clock, TrendingDown } from "lucide-react";

interface AlertItem {
  id: string;
  type: "critical" | "warning" | "info";
  region: string;
  message: string;
  timestamp: string;
  ghi: number;
  acknowledged: boolean;
}

const mockAlerts: AlertItem[] = [
  {
    id: "1",
    type: "critical",
    region: "Rajasthan - Jaisalmer District",
    message: "Groundwater level dropped below critical threshold. Immediate intervention required.",
    timestamp: "2 hours ago",
    ghi: 28,
    acknowledged: false,
  },
  {
    id: "2",
    type: "warning", 
    region: "Maharashtra - Marathwada Region",
    message: "Declining water levels observed. Recommend conservation measures.",
    timestamp: "6 hours ago",
    ghi: 45,
    acknowledged: false,
  },
  {
    id: "3",
    type: "info",
    region: "Kerala - Coastal Areas",
    message: "Seasonal recharge rates improving due to recent rainfall.",
    timestamp: "1 day ago",
    ghi: 82,
    acknowledged: true,
  },
  {
    id: "4",
    type: "critical",
    region: "Gujarat - Kutch District",
    message: "Water table showing rapid decline. Emergency measures advised.",
    timestamp: "3 hours ago",
    ghi: 31,
    acknowledged: false,
  },
];

const getAlertVariant = (type: string) => {
  switch (type) {
    case "critical": return { color: "bg-water-critical", icon: AlertTriangle, textColor: "text-water-critical" };
    case "warning": return { color: "bg-water-caution", icon: AlertTriangle, textColor: "text-water-caution" };
    default: return { color: "bg-accent", icon: Bell, textColor: "text-accent" };
  }
};

export const AlertSystem = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === "all" || alert.type === filter
  );

  const unacknowledgedCount = alerts.filter(alert => 
    !alert.acknowledged && alert.type === "critical"
  ).length;

  return (
    <Card className="shadow-card hover:shadow-water transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            Alert System
            {unacknowledgedCount > 0 && (
              <Badge className="bg-water-critical text-white animate-pulse">
                {unacknowledgedCount} Critical
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {["all", "critical", "warning", "info"].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType as any)}
                className="capitalize"
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No alerts for selected filter</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const { color, icon: Icon, textColor } = getAlertVariant(alert.type);
              return (
                <Alert
                  key={alert.id}
                  className={`
                    relative border-l-4 pl-4 transition-all duration-300
                    ${alert.acknowledged ? 'opacity-60 bg-muted/30' : 'bg-card shadow-sm hover:shadow-md'}
                    ${alert.type === 'critical' ? 'border-l-water-critical' : 
                      alert.type === 'warning' ? 'border-l-water-caution' : 'border-l-accent'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon className={`h-4 w-4 mt-0.5 ${textColor}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {alert.type.toUpperCase()}
                          </Badge>
                          <Badge className={`${color} text-white text-xs`}>
                            GHI: {alert.ghi}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {alert.region}
                          </span>
                        </div>
                        
                        <AlertDescription className="text-sm">
                          {alert.message}
                        </AlertDescription>
                        
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 ml-4">
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="h-8 px-2 text-xs"
                        >
                          Acknowledge
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dismissAlert(alert.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {alert.type === "critical" && !alert.acknowledged && (
                    <div className="mt-3 p-2 bg-water-critical/10 rounded border-l-2 border-water-critical">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-water-critical" />
                        <span className="text-xs text-water-critical font-medium">
                          Immediate Action Required
                        </span>
                      </div>
                    </div>
                  )}
                </Alert>
              );
            })
          )}
        </div>
        
        {filteredAlerts.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Showing {filteredAlerts.length} alerts</span>
              <Button variant="outline" size="sm">
                View All Alerts
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
