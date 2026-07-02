import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leaderboard } from "@/data/mock";

export function Leaderboard() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Sustainability Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">#{idx + 1}</span>
              <span className="font-medium">{row.region}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-water-safe/10 text-water-safe text-sm">{row.score}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Leaderboard;
