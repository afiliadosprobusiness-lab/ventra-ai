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

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(getInitialThemeMode);
  const navigate = useNavigate();
  const { register } = useDemoAuth();

  useEffect(() => {
    persistThemeMode(isDarkMode);
  }, [isDarkMode]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = `${firstName} ${lastName}`.trim();
    const result = register({ name, email, password });

    if (!result.ok) {
      setError(result.message ?? "No se pudo crear la cuenta.");
      return;
    }

    setError("");
    navigate("/onboarding");
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
            <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <section className="surface-panel flex flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Acceso a implementacion
                  </div>
                  <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                    Crea tu cuenta para empezar el diagnostico y la puesta en marcha.
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Ventra no se presenta como una app vacia. Entraras a un entorno donde la promesa comercial, el
                    dashboard y el funnel ya hablan el mismo idioma.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    "Diagnostico consultivo para detectar la capa correcta.",
                    "Software incluido dentro de una implementacion mas seria.",
                    "Ruta lista para adquisicion, atencion automatica y cierre.",
                  ].map((item) => (
                    <div key={item} className="surface-subtle flex gap-3 p-4">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="surface-panel p-8 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Crear cuenta</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Abrir workspace demo</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Completa tus datos y te llevamos al onboarding comercial del workspace.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Carla" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-1.5 h-12 rounded-2xl" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Diaz" value={lastName} onChange={(event) => setLastName(event.target.value)} className="mt-1.5 h-12 rounded-2xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input id="registerEmail" type="email" placeholder="tu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 h-12 rounded-2xl" />
                  </div>
                  <div>
                    <Label htmlFor="registerPassword">Contrasena</Label>
                    <Input id="registerPassword" type="password" placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 h-12 rounded-2xl" />
                  </div>
                  {error ? <p className="text-sm text-destructive">{error}</p> : null}
                  <Button type="submit" className="w-full rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
                    Crear cuenta y continuar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Ya tienes cuenta?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Iniciar sesion
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
