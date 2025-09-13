import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Satellite, BellRing, BarChart3, Database, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Data Collection",
    description:
      "5,260+ Digital Water Level Recorders (DWLR) across India transmit hourly groundwater level readings.",
    icon: Satellite,
    detail: "Stations stream depth-to-water and rainfall data with GPS metadata.",
    color: "bg-water-safe",
  },
  {
    title: "Ingestion & Validation",
    description:
      "A secure pipeline ingests, cleans, and validates raw telemetry to remove spikes and gaps.",
    icon: Database,
    detail:
      "Quality checks include range validation, rate-of-change limits, and sensor heartbeat monitoring.",
    color: "bg-accent",
  },
  {
    title: "Analysis & Indexing",
    description:
      "Time-series analytics compute trends, anomalies, and the Groundwater Health Index (GHI).",
    icon: BarChart3,
    detail:
      "Seasonal normalization and basin-level aggregation produce district and state rollups.",
    color: "bg-primary",
  },
  {
    title: "Alerts & Insights",
    description:
      "Threshold breaches trigger alerts for drought risk, rapid decline, and contamination signals.",
    icon: BellRing,
    detail:
      "Smart rules combine historical baselines with recent change to reduce false positives.",
    color: "bg-water-caution",
  },
  {
    title: "Secure Access",
    description:
      "Role-based access delivers the right views for officials, farmers, industry, and researchers.",
    icon: ShieldCheck,
    detail:
      "Fine-grained permissions protect sensitive geospatial and station-level data.",
    color: "bg-muted",
  },
];

export function HowItWorks() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-accent" />
          How AquaWatch Works
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="p-4 rounded-lg border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${step.color}/10`}>
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <Badge variant="outline" className="text-xs">{step.detail}</Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default HowItWorks;
