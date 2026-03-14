import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useDemoAuth } from "@/lib/demo-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { demoCredentials, login, loginAsDemo } = useDemoAuth();

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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-ventra items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <VentraLogo theme="light" markClassName="h-14 w-14" wordmarkClassName="text-4xl" />
          <h2 className="mt-8 text-3xl font-bold mb-4">Bienvenido de vuelta a Ventra</h2>
          <p className="text-primary-foreground/80 text-lg">Accede a tu Revenue OS y sigue cerrando mas ingresos.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex">
            <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
          </Link>
          <h1 className="text-2xl font-bold mb-1">Iniciar sesion</h1>
          <p className="text-sm text-muted-foreground mb-6">Ingresa tus credenciales para continuar</p>

          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Usuario de prueba</p>
            <p className="mt-3 text-sm text-foreground">{demoCredentials.email}</p>
            <p className="text-sm text-muted-foreground">{demoCredentials.password}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full border-primary/30"
              onClick={() => {
                loginAsDemo();
                navigate("/app");
              }}
            >
              Entrar con demo
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contrasena</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Olvidaste tu contrasena?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5"
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full gradient-ventra text-primary-foreground shadow-ventra">
              Iniciar sesion
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No tienes cuenta?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
