import FarmerForm from "@/components/krishi/FarmerForm";
import { useI18n } from "@/context/i18n";
import { getUser } from "@/lib/auth";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  const { t } = useI18n();
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;
  return (
    <div className="container py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("dashboard")}</h1>
          <p className="text-muted-foreground">{user.name} · {user.phone}</p>
        </div>
        <Link className="text-sm underline text-muted-foreground" to="/">Home</Link>
      </div>
      <FarmerForm />
    </div>
  );
}
