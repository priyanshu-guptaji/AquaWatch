import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mapPoints } from "@/data/mock";

// Placeholder: In a real app we'd render Leaflet choropleth. For now, simple SVG map mock.
export default function HeatmapIndia() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>India Groundwater Heatmap (Mock)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Map visualization placeholder
          </div>
          <div className="absolute bottom-2 right-2 text-xs bg-white/80 px-2 py-1 rounded border">{mapPoints.length} stations</div>
        </div>
      </CardContent>
    </Card>
  );
}
