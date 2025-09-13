import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seasonal, predictive, historicalHeatmap, states } from "@/data/mock";

export default function Analytics() {
  const [region, setRegion] = useState(states[0]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3 items-center">
            <div className="text-sm text-muted-foreground">Region:</div>
            <select className="border rounded px-2 py-1" value={region} onChange={(e) => setRegion(e.target.value)}>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="seasonal">
        <TabsList>
          <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Forecasting</TabsTrigger>
          <TabsTrigger value="historical">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="seasonal">
          <Card className="mt-4">
            <CardHeader><CardTitle>Seasonal Bar Chart</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-2 items-end h-48">
                {seasonal.map((m) => (
                  <div key={m.month} className="flex flex-col items-center gap-1">
                    <div className="w-full bg-accent rounded" style={{ height: `${m.value}%` }} />
                    <div className="text-xs text-muted-foreground">{m.month}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive">
          <Card className="mt-4">
            <CardHeader><CardTitle>Predictive Line (Mock)</CardTitle></CardHeader>
            <CardContent>
              <div className="relative h-48 w-full">
                <svg viewBox="0 0 400 160" className="absolute inset-0 w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="3"
                    points={predictive.map((p, i) => `${(i/11)*380+10},${150 - p.expected}`).join(" ")}
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical">
          <Card className="mt-4">
            <CardHeader><CardTitle>Historical Heatmap (Mock)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-1">
                {historicalHeatmap.map((h) => (
                  <div key={h.month} className="h-8" style={{ backgroundColor: `rgba(14,165,233, ${h.intensity/100})` }} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
