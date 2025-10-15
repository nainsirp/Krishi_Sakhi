import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic } from "lucide-react";
import { useI18n } from "@/context/i18n";
import { getRecommendation, getDatasetSamples, type InputParams, type Recommendation } from "@/lib/fakeBackend";
import { useMemo, useState } from "react";

const SOILS = ["Laterite", "Alluvial", "Sandy Loam", "Clay", "Peat"] as const;
const SEASONS = ["Kharif", "Rabi", "Summer", "Monsoon"] as const;

export default function FarmerForm() {
  const { t } = useI18n();
  const [form, setForm] = useState<InputParams>({ pincode: "", landArea: 1, soilType: "Laterite", season: "Kharif", budget: 20000 });
  const [result, setResult] = useState<Recommendation | null>(null);

  const micButton = (
    <button type="button" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground" title={t("micHint")}> <Mic className="h-4 w-4" /> </button>
  );

  const parseNum = (v: unknown) => {
    const s = String(v).replace(/[^\d.]/g, "");
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned: InputParams = {
      pincode: String(form.pincode).trim(),
      landArea: parseNum(form.landArea),
      soilType: String(form.soilType).trim(),
      season: String(form.season).trim(),
      budget: parseNum(form.budget),
    };
    const rec = getRecommendation(cleaned);
    setResult(rec);
  };

  const resultView = useMemo(() => {
    if (!result)
      return <p className="text-sm text-muted-foreground">No results for these inputs. Please verify values or try a predefined example.</p>;
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">{t("results")}</h3>
          <ul className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {result.topCrops.map((c) => (
              <li key={c} className="rounded-md bg-accent px-3 py-2 text-sm">{c}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="py-3"><CardTitle className="text-base">{t("estimatedBudget")}</CardTitle></CardHeader>
            <CardContent className="pt-0"><p className="text-lg font-semibold">{result.estimatedBudget}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3"><CardTitle className="text-base">{t("pesticide")}</CardTitle></CardHeader>
            <CardContent className="pt-0"><p className="text-lg font-semibold">{result.pesticide}</p></CardContent>
          </Card>
        </div>
        <div>
          <h3 className="font-semibold">{t("advisories")}</h3>
          <div className="mt-2 grid gap-3 md:grid-cols-3">
            {result.advisories.map((a, i) => (
              <Card key={i}>
                <CardContent className="pt-4">
                  <p className="text-sm">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }, [result, t]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("inputParams")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm">{t("pincode")}</label>
              <div className="flex items-center gap-2">
                <Input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="e.g. 682001" />
                {micButton}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm">{t("landArea")}</label>
              <div className="flex items-center gap-2">
                <Input type="number" step="0.1" value={form.landArea} onChange={(e) => setForm({ ...form, landArea: Number(e.target.value) })} placeholder="e.g. 1.5" />
                {micButton}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm">{t("soilType")}</label>
              <div className="flex items-center gap-2">
                <Select value={form.soilType} onValueChange={(v) => setForm({ ...form, soilType: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {SOILS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {micButton}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm">{t("season")}</label>
              <div className="flex items-center gap-2">
                <Select value={form.season} onValueChange={(v) => setForm({ ...form, season: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {SEASONS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {micButton}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm">{t("budget")}</label>
              <div className="flex items-center gap-2">
                <Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} placeholder="e.g. 30000" />
                {micButton}
              </div>
            </div>
            <Button type="submit" className="w-full">{t("getRecommendation")}</Button>
          </form>
        </CardContent>
      </Card>
      <div>
        {resultView}
      </div>
    </div>
  );
}
