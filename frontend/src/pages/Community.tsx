import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { communityReports, advisories } from "@/data/mock";

export default function Community() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Community Reports</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {communityReports.map((r) => (
                <div key={r.id} className="p-3 rounded border">
                  <div className="font-medium">{r.name} • {r.location}</div>
                  <div className="text-sm text-muted-foreground">{r.message}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Submit Report</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Name" />
                <Input placeholder="Location" />
              </div>
              <Textarea placeholder="Message" />
              <Button disabled>Submit (coming soon)</Button>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Government Advisories</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {advisories.map((a) => (
                <div key={a.id} className="p-3 rounded border bg-muted/30">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.body}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
