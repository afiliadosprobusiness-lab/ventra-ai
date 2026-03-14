import { User, Bell, Shield, CreditCard, Globe, Palette, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const tabs = [
  { id: "general", label: "General", icon: User },
  { id: "notifications", label: "Notificaciones", icon: Bell },
  { id: "security", label: "Seguridad", icon: Shield },
  { id: "billing", label: "Facturación", icon: CreditCard },
  { id: "integrations", label: "Integraciones", icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <div className="animate-fade-in max-w-4xl">
      <h2 className="text-lg font-semibold mb-6">Settings</h2>
      <div className="flex gap-6">
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === t.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`}>
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
        </div>
        <div className="flex-1">
          {activeTab === "general" && (
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-6">
              <h3 className="font-semibold">Perfil</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">CD</div>
                <Button variant="outline" size="sm">Cambiar foto</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nombre</Label><Input defaultValue="Demo" className="mt-1.5" /></div>
                <div><Label>Apellido</Label><Input defaultValue="Dashboard" className="mt-1.5" /></div>
                <div><Label>Email</Label><Input defaultValue="demo@ventra.io" className="mt-1.5" /></div>
                <div><Label>Teléfono</Label><Input defaultValue="+52 55 1234 5678" className="mt-1.5" /></div>
              </div>
              <div><Label>Empresa</Label><Input defaultValue="Ventra Demo" className="mt-1.5" /></div>
              <Button className="gradient-ventra text-primary-foreground shadow-ventra">Guardar cambios</Button>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">
              <h3 className="font-semibold">Notificaciones</h3>
              {["Nuevos leads", "Mensajes entrantes", "Deals cerrados", "Campañas completadas", "Alertas de Voice AI"].map((n, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <span className="text-sm">{n}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" defaultChecked className="rounded" />Email</label>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" defaultChecked className="rounded" />Push</label>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab !== "general" && activeTab !== "notifications" && (
            <div className="rounded-xl border bg-card p-6 shadow-card text-center py-16">
              <p className="text-muted-foreground text-sm">Configuración de {tabs.find(t => t.id === activeTab)?.label} — próximamente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
