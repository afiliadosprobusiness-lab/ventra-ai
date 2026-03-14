import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { LandingQuizWizard } from "@/components/landing/LandingQuizWizard";
import { LandingThemeToggle } from "@/components/landing/LandingThemeToggle";
import { getInitialLandingDarkMode, persistLandingTheme } from "@/lib/landing-theme";

export default function QuizPage() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialLandingDarkMode);

  useEffect(() => {
    persistLandingTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
            <Link to="/" className="inline-flex">
              <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-[1.6rem]" />
            </Link>
            <div className="flex items-center gap-3">
              <LandingThemeToggle checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Link to="/">
                <Button variant="outline" className="rounded-xl">Volver a la landing</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="relative overflow-hidden py-12 md:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_28%)]" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Diagnostico comercial
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
                Descubre que capa deberia activar primero tu negocio.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Este wizard usa la misma logica consultiva de la landing para recomendar si hoy necesitas mejorar
                adquisicion, atencion automatica o cierre.
              </p>
            </div>

            <div className="mx-auto max-w-5xl">
              <LandingQuizWizard standalone ctaLabel="Solicitar implementacion ahora" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
