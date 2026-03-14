import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-ventra items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Bienvenido de vuelta a Ventra</h2>
          <p className="text-primary-foreground/80 text-lg">Accede a tu Revenue OS y sigue cerrando más ingresos.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg gradient-ventra flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">V</span>
            </div>
            <span className="font-bold text-xl">Ventra</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground mb-6">Ingresa tus credenciales para continuar</p>
          <form onSubmit={(e) => { e.preventDefault(); navigate("/app"); }} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full gradient-ventra text-primary-foreground shadow-ventra">Iniciar sesión</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta? <Link to="/register" className="text-primary font-medium hover:underline">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
