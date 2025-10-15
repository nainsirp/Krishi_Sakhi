import { Card, CardContent } from "@/components/ui/card";

export default function Advisory({ tips }: { tips: string[] }) {
  if (!tips?.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {tips.map((t, i) => (
        <Card key={i}><CardContent className="pt-4"><p className="text-sm">{t}</p></CardContent></Card>
      ))}
    </div>
  );
}
