import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { ConsultativeFunnel } from "@/components/landing/funnel/ConsultativeFunnel";
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[860px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.26),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.3),transparent_52%)]" />

        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Volver a la landing"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link to="/" className="inline-flex">
                <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-[1.6rem]" />
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:block">
                Embudo consultivo
              </div>
              <LandingThemeToggle checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            </div>
          </div>
        </header>

        <main className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
          <div className="container mx-auto">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Implementacion Ventra
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
                Diagnostica tu proceso comercial y filtra si esta implementacion encaja contigo.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Primero entendemos tu situacion. Luego te mostramos la forma correcta de implementar el sistema y
                desbloqueamos la oferta solo despues de consumir el video.
              </p>
            </div>

            <ConsultativeFunnel />
          </div>
        </main>
      </div>
    </div>
  );
}
