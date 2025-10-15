import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ml";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof messages) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "krishi:lang";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang,
    t: (key) => messages[key][lang],
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

// Translations
export const messages = {
  appName: {
    en: "Krishi Sakhi",
    ml: "കൃഷി സഖി",
  },
  slogan: {
    en: "Smarter crop choices for better yields",
    ml: "മികച്ച വിളവിന് ബുദ്ധിമാനായ വിള തിരഞ്ഞെടുപ്പ്",
  },
  loginTitle: { en: "Welcome back", ml: "തിരികെ സ്വാഗതം" },
  signupTitle: { en: "Create account", ml: "അക്കൗണ്ട് സൃഷ്ടിക്കുക" },
  phone: { en: "Phone number", ml: "ഫോൺ നമ്പർ" },
  password: { en: "Password", ml: "പാസ്‌വേഡ്" },
  name: { en: "Full name", ml: "പൂർണ്ണ പേര്" },
  login: { en: "Login", ml: "ലോഗിൻ" },
  signup: { en: "Sign up", ml: "സൈൻ അപ്" },
  or: { en: "or", ml: "അല്ലെങ്കിൽ" },
  dashboard: { en: "Farmer Dashboard", ml: "കർഷക ഡാഷ്ബോർഡ്" },
  inputParams: { en: "Input Parameters", ml: "ഇൻപുട്ട് പാരാമീറ്ററുകൾ" },
  pincode: { en: "Pincode", ml: "പിന്ന്‌കോഡ്" },
  landArea: { en: "Land area (acres)", ml: "ഭൂവിസ്തൃതി (ഏക്കർ)" },
  soilType: { en: "Soil type", ml: "മണ്ണിന്റെ ഇനം" },
  season: { en: "Season", ml: "സീസൺ" },
  budget: { en: "Budget (INR)", ml: "ബജറ്റ് (രൂപ)" },
  micHint: { en: "Tap mic to speak (coming soon)", ml: "മൈക്ക് തൊടുക (വേദിയിൽ വരുന്നു)" },
  getRecommendation: { en: "Get Recommendation", ml: "പരാമർശം നേടുക" },
  results: { en: "Recommended Crops", ml: "പരാമർശിക്കപ്പെട്ട വിളകൾ" },
  estimatedBudget: { en: "Estimated Budget", ml: "കണക്കാക്കിയ ബജറ്റ്" },
  pesticide: { en: "Best Pesticide", ml: "മികച്ച കീടനാശിനി" },
  advisories: { en: "Advisories", ml: "അഡ്വൈസറികൾ" },
  logout: { en: "Logout", ml: "ലോഗൗട്ട്" },
  theme: { en: "Theme", ml: "തീം" },
  language: { en: "Language", ml: "ഭാഷ" },
  english: { en: "English", ml: "ഇംഗ്ലീഷ്" },
  malayalam: { en: "Malayalam", ml: "മലയാളം" },
  heroCta: { en: "Start now", ml: "ഇപ്പോൾ ആരംഭിക്കുക" },
  heroSub: {
    en: "Login to get crop, budget and pesticide suggestions tailored to your farm.",
    ml: "ലോഗിൻ ചെയ്ത് നിങ്ങളുടെ വയലിന് അനുയോജ്യമായ വിള, ബജറ്റ്, കീടനാശിനി നിർദേശങ്ങൾ നേടൂ.",
  },
} as const;
