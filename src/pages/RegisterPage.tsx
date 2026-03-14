import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-ventra items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Comienza a cerrar más ingresos</h2>
          <p className="text-primary-foreground/80 text-lg">Crea tu cuenta y configura tu Revenue OS en 2 minutos.</p>
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
          <h1 className="text-2xl font-bold mb-1">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground mb-6">Completa tus datos para comenzar</p>
          <form onSubmit={(e) => { e.preventDefault(); navigate("/onboarding"); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Nombre</Label><Input placeholder="Juan" className="mt-1.5" /></div>
              <div><Label>Apellido</Label><Input placeholder="Pérez" className="mt-1.5" /></div>
            </div>
            <div><Label>Email</Label><Input type="email" placeholder="tu@email.com" className="mt-1.5" /></div>
            <div><Label>Contraseña</Label><Input type="password" placeholder="••••••••" className="mt-1.5" /></div>
            <Button type="submit" className="w-full gradient-ventra text-primary-foreground shadow-ventra">Crear cuenta</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
