import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Compass, LayoutDashboard, Megaphone } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useDemoAuth } from "@/lib/demo-auth";

const suggestedLinks = [
  { label: "Overview", to: "/app", icon: LayoutDashboard },
  { label: "Adquisicion", to: "/app/acquisition", icon: Megaphone },
  { label: "Landing", to: "/", icon: Compass },
];

const NotFound = () => {
  const location = useLocation();
  const { isAuthenticated } = useDemoAuth();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 rounded-[32px] border bg-card p-8 shadow-card lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="flex flex-col justify-between rounded-[28px] gradient-ventra p-8 text-primary-foreground shadow-ventra">
            <div>
              <VentraLogo theme="light" markClassName="h-14 w-14" wordmarkClassName="text-4xl" />
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/80">Ruta no encontrada</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">Esta vista no existe dentro del sistema comercial actual de Ventra.</h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80">
                La URL <span className="font-semibold text-primary-foreground">{location.pathname}</span> no corresponde a una ruta valida del producto actual.
              </p>
            </div>
            <p className="mt-10 text-sm text-primary-foreground/75">
              Si recargaste una ruta interna en produccion, esta version ya incluye rewrite SPA para evitar ese 404 del servidor.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Error 404
            </span>
            <h2 className="mt-6 text-3xl font-bold text-foreground">Vuelve al flujo correcto</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              La navegacion de Ventra fue consolidada para mantener una sola experiencia enfocada en adquisicion, atencion automatica y cierre. Usa alguno de estos accesos para retomar el contexto.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {suggestedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-2xl border bg-background px-4 py-4 shadow-card transition-all hover:border-primary/20 hover:shadow-card-hover"
                >
                  <link.icon className="h-5 w-5 text-primary" />
                  <p className="mt-5 text-sm font-semibold text-foreground">{link.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Abrir modulo</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={isAuthenticated ? "/app" : "/"}>
                <Button className="gradient-ventra text-primary-foreground shadow-ventra">
                  {isAuthenticated ? "Ir al dashboard" : "Volver al inicio"}
                </Button>
              </Link>
              <Link to={isAuthenticated ? "/app" : "/login"}>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {isAuthenticated ? "Abrir overview" : "Ir al login"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
