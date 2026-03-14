import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getInitialThemeMode, persistThemeMode } from "@/lib/theme";

export default function ForgotPasswordPage() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialThemeMode);

  useEffect(() => {
    persistThemeMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] mesh-hero opacity-80" />
        <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex">
              <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
            </Link>
            <ThemeToggle checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <section className="surface-panel w-full max-w-xl p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Recuperar acceso</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Reactivar tu acceso al workspace</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Introduce tu email y te enviaremos el siguiente paso para volver al entorno demo de Ventra.
              </p>

              <form onSubmit={(event) => event.preventDefault()} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="forgotEmail">Email</Label>
                  <Input id="forgotEmail" type="email" placeholder="tu@email.com" className="mt-1.5 h-12 rounded-2xl" />
                </div>
                <Button type="submit" className="w-full rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
                  Enviar acceso
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Volver al login
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
