import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useDemoAuth } from "@/lib/demo-auth";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useDemoAuth();

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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-ventra items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <VentraLogo theme="light" markClassName="h-14 w-14" wordmarkClassName="text-4xl" />
          <h2 className="mt-8 text-3xl font-bold mb-4">Comienza a cerrar mas ingresos</h2>
          <p className="text-primary-foreground/80 text-lg">Crea tu cuenta y configura tu Revenue OS en 2 minutos.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex">
            <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
          </Link>
          <h1 className="text-2xl font-bold mb-1">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground mb-6">Completa tus datos para comenzar</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" placeholder="Juan" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" placeholder="Perez" value={lastName} onChange={(event) => setLastName(event.target.value)} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="registerEmail">Email</Label>
              <Input id="registerEmail" type="email" placeholder="tu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="registerPassword">Contrasena</Label>
              <Input id="registerPassword" type="password" placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5" />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full gradient-ventra text-primary-foreground shadow-ventra">
              Crear cuenta
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
