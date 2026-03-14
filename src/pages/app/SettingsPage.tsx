import { useState } from "react";
import { Building2, ShieldCheck, Sparkles, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDemoAuth } from "@/lib/demo-auth";

export default function SettingsPage() {
  const { user } = useDemoAuth();
  const [workspaceName, setWorkspaceName] = useState(user?.workspace ?? "Workspace principal");
  const [positioning, setPositioning] = useState(
    "Te implementamos un sistema comercial para atraer clientes, atender consultas y cerrar mas ventas.",
  );
  const [brandNote, setBrandNote] = useState(
    "VENTRA se presenta como servicio premium con software incluido, no como una suite barata de herramientas.",
  );

  return (
    <div className="space-y-6">
      <section className="surface-panel overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Base del sistema
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Configuracion alineada con la promesa comercial real de Ventra.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Esta pantalla deja clara la narrativa del producto, la identidad del workspace y como se presenta la
              implementacion dentro del demo.
            </p>
          </div>

          <div className="surface-subtle p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Resumen</p>
            <div className="mt-4 space-y-4">
              {[
                "Producto orientado a atraer, atender y cerrar.",
                "Servicio premium con software incluido.",
                "Dashboard corto, sobrio y pensado para conversion.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div id="workspace-profile" className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Workspace</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Perfil base</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Nombre del owner</label>
              <Input defaultValue={user?.name ?? "Carla Diaz"} className="h-12 rounded-2xl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <Input defaultValue={user?.email ?? "demo@ventra.io"} className="h-12 rounded-2xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Nombre del workspace</label>
              <Input value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} className="h-12 rounded-2xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Nota de marca</label>
              <Textarea value={brandNote} onChange={(event) => setBrandNote(event.target.value)} className="min-h-[110px] rounded-2xl" />
            </div>
          </div>
        </div>

        <div id="commercial-model" className="space-y-6">
          <div className="surface-panel p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Narrativa</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Promesa central</h2>
              </div>
            </div>

            <Textarea value={positioning} onChange={(event) => setPositioning(event.target.value)} className="mt-6 min-h-[130px] rounded-2xl" />
          </div>

          <div className="surface-panel p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Capas activas</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Modelo comercial</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Adquisicion", "Atraer mejores oportunidades con una promesa y campana mas claras."],
                ["Atencion automatica", "Responder, filtrar y derivar mejor sin depender del dueno."],
                ["Cierre", "Seguir, insistir y convertir mas con un pipeline corto."],
              ].map(([title, description]) => (
                <div key={title} className="surface-subtle p-4">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold">Demo lista para siguiente integracion backend.</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              La estructura ya separa experiencia, narrativa y mock data para luego conectar auth, CRM, mensajeria y
              billing sin rehacer el frontend.
            </p>
            <Button className="mt-5 rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
              Guardar configuracion
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
