import AuthCard from "@/components/krishi/AuthCard";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/i18n";
import { Link } from "react-router-dom";
import { Sprout, Wallet, ShieldCheck } from "lucide-react";

const HERO_IMG = "https://images.pexels.com/photos/11194861/pexels-photo-11194861.jpeg"; // Kerala field

export default function Index() {
  const { t } = useI18n();
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <img src={HERO_IMG} alt="Kerala paddy fields" className="h-[60vh] w-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background" />
      </div>

      <section className="container flex min-h-[60vh] items-center py-16">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {t("appName")}
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-90">{t("slogan")}</p>
            <p className="mt-4 max-w-xl opacity-90">{t("heroSub")}</p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="lg"><Link to="#login">{t("heroCta")}</Link></Button>
            </div>
          </div>
          <div id="login" className="justify-self-end">
            <AuthCard />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Why Krishi Sakhi</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Feature title="Smart crop choices" desc="Recommendations tailored to your soil, season and location." icon="sprout" />
          <Feature title="Budget planning" desc="Estimate costs and plan inputs with confidence." icon="wallet" />
          <Feature title="Pest protection" desc="Best-practice pesticide guidance to protect yields." icon="shield" />
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <GalleryCard src="https://images.pexels.com/photos/20527480/pexels-photo-20527480.jpeg" alt="Indian rural field" />
          <GalleryCard src="https://images.pexels.com/photos/20445168/pexels-photo-20445168.jpeg" alt="Farmers in India" />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, desc, icon }: { title: string; desc: string; icon: "sprout" | "wallet" | "shield" }) {
  const IconComp = icon === "sprout" ? Sprout : icon === "wallet" ? Wallet : ShieldCheck;
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"><IconComp size={20} /></div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}

function GalleryCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <img src={src} alt={alt} className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105" />
    </div>
  );
}
