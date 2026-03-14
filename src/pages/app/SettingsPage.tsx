import { User, Bell, Shield, CreditCard, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDemoAuth } from "@/lib/demo-auth";

const tabs = [
  { id: "general", label: "General", icon: User },
  { id: "notifications", label: "Notificaciones", icon: Bell },
  { id: "security", label: "Seguridad", icon: Shield },
  { id: "billing", label: "Facturacion", icon: CreditCard },
  { id: "integrations", label: "Integraciones", icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { user } = useDemoAuth();
  const [firstName = "Demo", lastName = "User"] = (user?.name ?? "Demo User").split(" ");
  const initials = user?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "VD";

  return (
    <div className="animate-fade-in max-w-4xl">
      <h2 className="text-lg font-semibold mb-6">Settings</h2>
      <div className="flex gap-6">
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1">
          {activeTab === "general" ? (
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-6">
              <h3 className="font-semibold">Perfil</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">{initials}</div>
                <Button variant="outline" size="sm">Cambiar foto</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nombre</Label><Input defaultValue={firstName} className="mt-1.5" /></div>
                <div><Label>Apellido</Label><Input defaultValue={lastName} className="mt-1.5" /></div>
                <div><Label>Email</Label><Input defaultValue={user?.email ?? "demo@ventra.io"} className="mt-1.5" /></div>
                <div><Label>Telefono</Label><Input defaultValue="+52 55 1234 5678" className="mt-1.5" /></div>
              </div>
              <div><Label>Empresa</Label><Input defaultValue={user?.workspace ?? "Ventra Demo"} className="mt-1.5" /></div>
              <Button className="gradient-ventra text-primary-foreground shadow-ventra">Guardar cambios</Button>
            </div>
          ) : null}

          {activeTab === "notifications" ? (
            <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">
              <h3 className="font-semibold">Notificaciones</h3>
              {["Nuevos leads", "Mensajes entrantes", "Deals cerrados", "Campanas completadas", "Alertas de Voice AI"].map((item) => (
                <div key={item} className="flex items-center justify-between py-3 border-b last:border-0">
                  <span className="text-sm">{item}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" defaultChecked className="rounded" />Email</label>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" defaultChecked className="rounded" />Push</label>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab !== "general" && activeTab !== "notifications" ? (
            <div className="rounded-xl border bg-card p-6 shadow-card text-center py-16">
              <p className="text-muted-foreground text-sm">
                Configuracion de {tabs.find((tab) => tab.id === activeTab)?.label} - proximamente
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
