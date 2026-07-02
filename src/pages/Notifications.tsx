import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notifications } from "@/data/mock";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className={`p-3 rounded border flex items-center justify-between ${n.severity === 'critical' ? 'bg-water-critical/10 border-water-critical' : n.severity === 'warning' ? 'bg-water-caution/10 border-water-caution' : 'bg-accent/10 border-accent'}`}>
              <div>
                <div className="font-medium">{n.text}</div>
                <div className="text-xs text-muted-foreground">{n.date}</div>
              </div>
              <span className="text-xs uppercase">{n.severity}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
