import { Plus, Image, Layout, FileText, MoreHorizontal, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const assets = [
  { name: "Banner Black Friday", type: "Banner", size: "1200x628", status: "Publicado", date: "Hace 2 días" },
  { name: "Story Instagram - Promo", type: "Story", size: "1080x1920", status: "Borrador", date: "Hace 5h" },
  { name: "Post Carousel - Features", type: "Carousel", size: "1080x1080", status: "Publicado", date: "Hace 1 semana" },
  { name: "Email Header - Newsletter", type: "Email", size: "600x200", status: "En revisión", date: "Ayer" },
  { name: "Ad Creative - Retargeting", type: "Ad", size: "1080x1080", status: "Publicado", date: "Hace 3 días" },
  { name: "Landing Hero Image", type: "Hero", size: "1920x1080", status: "Borrador", date: "Hoy" },
];

const templates = ["Post promocional", "Story con CTA", "Banner de descuento", "Email header", "Ad creative", "Carousel de producto"];

export default function CreativeStudioPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Creative Studio</h2>
          <p className="text-sm text-muted-foreground">Crea activos de marketing listos para convertir</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nuevo diseño</Button>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Plantillas rápidas</h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {templates.map((t, i) => (
            <button key={i} className="rounded-xl border bg-card p-4 hover:shadow-card-hover hover:border-primary/20 transition-all text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Image className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs font-medium">{t}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Activos recientes</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((a, i) => (
            <div key={i} className="rounded-xl border bg-card shadow-card hover:shadow-card-hover transition-all overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-primary/10 to-info/10 flex items-center justify-center">
                <Layout className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium truncate">{a.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    a.status === 'Publicado' ? 'bg-success/10 text-success' : a.status === 'Borrador' ? 'bg-muted text-muted-foreground' : 'bg-warning/10 text-warning'
                  }`}>{a.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.type} · {a.size} · {a.date}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1 text-xs"><Download className="h-3 w-3 mr-1" />Descargar</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs"><Copy className="h-3 w-3 mr-1" />Duplicar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
