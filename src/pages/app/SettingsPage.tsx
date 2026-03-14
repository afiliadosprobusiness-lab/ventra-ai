import { useState } from "react";
import { Bell, CreditCard, Globe, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [firstName = "Demo", lastName = "Usuario"] = (user?.name ?? "Demo Usuario").split(" ");
  const initials = user?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "VD";

  return (
    <div className="w-full animate-fade-in">
      <h2 className="mb-6 text-lg font-semibold">Configuracion</h2>
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex gap-1 overflow-x-auto rounded-xl bg-secondary p-1 xl:w-52 xl:shrink-0 xl:flex-col xl:space-y-1 xl:bg-transparent xl:p-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors xl:w-full ${
                activeTab === tab.id ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1">
          {activeTab === "general" ? (
            <div className="space-y-6 rounded-xl border bg-card p-6 shadow-card">
              <h3 className="font-semibold">Perfil</h3>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {initials}
                </div>
                <Button variant="outline" size="sm">
                  Cambiar foto
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Nombre</Label>
                  <Input defaultValue={firstName} className="mt-1.5" />
                </div>
                <div>
                  <Label>Apellido</Label>
                  <Input defaultValue={lastName} className="mt-1.5" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue={user?.email ?? "demo@ventra.io"} className="mt-1.5" />
                </div>
                <div>
                  <Label>Telefono</Label>
                  <Input defaultValue="+51 999 123 456" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>Empresa</Label>
                <Input defaultValue={user?.workspace ?? "Ventra Demo"} className="mt-1.5" />
              </div>
              <Button className="gradient-ventra text-primary-foreground shadow-ventra">Guardar cambios</Button>
            </div>
          ) : null}

          {activeTab === "notifications" ? (
            <div className="space-y-4 rounded-xl border bg-card p-6 shadow-card">
              <h3 className="font-semibold">Notificaciones</h3>
              {[
                "Nuevos leads",
                "Mensajes entrantes",
                "Negocios cerrados",
                "Campanas completadas",
                "Alertas de llamadas IA",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between border-b py-3 last:border-0">
                  <span className="text-sm">{item}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Email
                    </label>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Push
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab !== "general" && activeTab !== "notifications" ? (
            <div className="rounded-xl border bg-card py-16 text-center shadow-card">
              <p className="text-sm text-muted-foreground">
                Configuracion de {tabs.find((tab) => tab.id === activeTab)?.label} - proximamente
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
