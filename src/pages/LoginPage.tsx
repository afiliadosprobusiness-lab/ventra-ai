import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDemoAuth } from "@/lib/demo-auth";
import { getInitialThemeMode, persistThemeMode } from "@/lib/theme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(getInitialThemeMode);
  const navigate = useNavigate();
  const { demoCredentials, login, loginAsDemo } = useDemoAuth();

  useEffect(() => {
    persistThemeMode(isDarkMode);
  }, [isDarkMode]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login(email, password);

    if (!result.ok) {
      setError(result.message ?? "No se pudo iniciar sesion.");
      return;
    }

    setError("");
    navigate("/app");
  };

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] mesh-hero opacity-80" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex">
              <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
            </Link>
            <ThemeToggle checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>

          <div className="flex flex-1 items-center py-10">
            <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <section className="surface-panel flex flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Implementacion comercial
                  </div>
                  <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                    Vuelve a tu centro de operaciones comercial.
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Entra para revisar adquisicion, atencion automatica y cierre dentro de una sola experiencia premium.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Adquisicion", "Mensajes y campanas con mejor encaje."],
                    ["Atencion automatica", "Respuestas con criterio comercial."],
                    ["Cierre", "Seguimiento simple para convertir mejor."],
                  ].map(([title, description]) => (
                    <div key={title} className="surface-subtle p-4">
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="surface-panel p-8 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Acceso</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Iniciar sesion</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Accede al entorno demo para recorrer la implementacion comercial de Ventra.
                </p>

                <div className="mt-6 rounded-[1.4rem] border border-primary/20 bg-primary/5 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Demo inmediata</p>
                  <p className="mt-3 text-sm font-semibold text-foreground">{demoCredentials.email}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{demoCredentials.password}</p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4 w-full rounded-2xl border-primary/25"
                    onClick={() => {
                      loginAsDemo();
                      navigate("/app");
                    }}
                  >
                    Entrar al demo
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-1.5 h-12 rounded-2xl"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contrasena</Label>
                      <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                        Recuperar acceso
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-1.5 h-12 rounded-2xl"
                    />
                  </div>
                  {error ? <p className="text-sm text-destructive">{error}</p> : null}
                  <Button type="submit" className="w-full rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
                    Entrar al dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Aun no tienes acceso?{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    Crear cuenta
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
