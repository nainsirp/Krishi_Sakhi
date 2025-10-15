import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useI18n, messages } from "@/context/i18n";
import { getUser, logout } from "@/lib/auth";
import { Moon, Sun } from "lucide-react";

function useTheme() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("krishi:theme") || "light");
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("krishi:theme", theme);
  }, [theme]);
  return { theme, setTheme } as const;
}

export function Header() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(getUser());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald-500 to-lime-500" />
          <span className="text-lg font-bold tracking-tight">{t("appName")}</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun /> : <Moon />} {t("theme")}
          </Button>
          <div className="inline-flex rounded-md border">
            <button className={`px-3 py-1 text-sm ${lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={`px-3 py-1 text-sm ${lang === "ml" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`} onClick={() => setLang("ml")}>
              മലയാളം
            </button>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:inline">{user.name}</span>
              <Button size="sm" onClick={() => { logout(); setUser(null); if (location.pathname !== "/") navigate("/"); }}>
                {t("logout")}
              </Button>
            </div>
          ) : (
            <Button size="sm" asChild>
              <Link to="/">{t("login")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
