import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg gradient-ventra flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">V</span>
          </div>
          <span className="font-bold text-xl">Ventra</span>
        </Link>
        <h1 className="text-2xl font-bold mb-1">Recuperar contraseña</h1>
        <p className="text-sm text-muted-foreground mb-6">Te enviaremos un enlace para restablecer tu contraseña</p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div><Label>Email</Label><Input type="email" placeholder="tu@email.com" className="mt-1.5" /></div>
          <Button type="submit" className="w-full gradient-ventra text-primary-foreground shadow-ventra">Enviar enlace</Button>
        </form>
        <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver al login
        </Link>
      </div>
    </div>
  );
}
