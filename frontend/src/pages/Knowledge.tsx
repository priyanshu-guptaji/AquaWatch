import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const resources = [
  { id: 1, title: "GHI Methodology", type: "PDF", link: "#" },
  { id: 2, title: "Rainwater Harvesting Guide", type: "Tutorial", link: "#" },
  { id: 3, title: "District Groundwater Reports", type: "Dataset", link: "#" },
];

export default function Knowledge() {
  const [q, setQ] = useState("");
  const filtered = resources.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <Card>
        <CardHeader><CardTitle>Search Materials</CardTitle></CardHeader>
        <CardContent>
          <Input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <Card key={r.id} className="shadow-card">
            <CardHeader><CardTitle className="text-base">{r.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{r.type} • <a href={r.link}>Open</a></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
