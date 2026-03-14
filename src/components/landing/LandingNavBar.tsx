import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { LandingThemeToggle } from "@/components/landing/LandingThemeToggle";

type LandingNavBarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
};

export function LandingNavBar({ isDarkMode, onToggleDarkMode }: LandingNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4"
    >
      <div className="container mx-auto">
        <div className="glass rounded-2xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="inline-flex">
              <VentraLogo markClassName="h-9 w-9" wordmarkClassName="text-[1.45rem]" />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              <a href="#solution" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Solucion</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Como funciona</a>
              <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Precios</a>
              <a href="#quiz" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Diagnostico</a>
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <LandingThemeToggle checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
              <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Iniciar sesion
              </Link>
              <Link to="/register">
                <Button className="rounded-xl gradient-ventra text-primary-foreground shadow-ambient-lg">
                  Solicitar implementacion
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <LandingThemeToggle checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
              <button
                type="button"
                className="rounded-xl border border-border bg-background/60 p-2 text-foreground"
                onClick={() => setIsMenuOpen((current) => !current)}
                aria-label="Abrir menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isMenuOpen ? (
            <div className="border-t border-border px-1 pb-4 pt-3 lg:hidden">
              <div className="flex flex-col gap-3">
                <a href="#solution" className="text-sm text-muted-foreground" onClick={() => setIsMenuOpen(false)}>Solucion</a>
                <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setIsMenuOpen(false)}>Como funciona</a>
                <a href="#pricing" className="text-sm text-muted-foreground" onClick={() => setIsMenuOpen(false)}>Precios</a>
                <a href="#quiz" className="text-sm text-muted-foreground" onClick={() => setIsMenuOpen(false)}>Diagnostico</a>
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">Iniciar sesion</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full rounded-xl gradient-ventra text-primary-foreground shadow-ambient-lg">
                      Solicitar implementacion
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.header>
  );
}
