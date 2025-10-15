import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login, signup, demoCredentials } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/context/i18n";

export default function AuthCard() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mode === "login" ? login(phone, password) : signup(name, phone, password);
    if (user) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please check your phone and password.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? t("loginTitle") : t("signupTitle")}</CardTitle>
        <CardDescription>
          Secure access to personalized crop insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm">{t("name")}</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required={mode === "signup"} />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm">{t("phone")}</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm">{t("password")}</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center gap-2">
            <Button type="submit" className="flex-1">{mode === "login" ? t("login") : t("signup")}</Button>
            <span className="text-sm text-muted-foreground">{t("or")}</span>
            <Button type="button" variant="outline" className="flex-1" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? t("signup") : t("login")}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
