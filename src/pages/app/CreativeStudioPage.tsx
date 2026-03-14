import { Copy, Download, Image, Layout, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const assets = [
  { name: "Banner Black Friday", type: "Banner", size: "1200x628", status: "Publicado", date: "Hace 2 dias" },
  { name: "Historia Instagram - Promo", type: "Historia", size: "1080x1920", status: "Borrador", date: "Hace 5h" },
  { name: "Carrusel - Beneficios", type: "Carrusel", size: "1080x1080", status: "Publicado", date: "Hace 1 semana" },
  { name: "Cabecera de email", type: "Email", size: "600x200", status: "En revision", date: "Ayer" },
  { name: "Creativo para retargeting", type: "Anuncio", size: "1080x1080", status: "Publicado", date: "Hace 3 dias" },
  { name: "Hero de landing", type: "Hero", size: "1920x1080", status: "Borrador", date: "Hoy" },
];

const templates = [
  "Post promocional",
  "Historia con CTA",
  "Banner de descuento",
  "Cabecera de email",
  "Creativo para anuncio",
  "Carrusel de producto",
];

export default function CreativeStudioPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Estudio creativo</h2>
          <p className="text-sm text-muted-foreground">Crea piezas listas para vender sin salir del flujo.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo diseno
        </Button>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Plantillas rapidas</h3>
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
          {templates.map((template) => (
            <button key={template} className="rounded-xl border bg-card p-4 text-center transition-all hover:border-primary/20 hover:shadow-card-hover">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Image className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs font-medium">{template}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Activos recientes</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div key={asset.name} className="overflow-hidden rounded-xl border bg-card shadow-card transition-all hover:shadow-card-hover">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/10 to-info/10">
                <Layout className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h4 className="truncate text-sm font-medium">{asset.name}</h4>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    asset.status === "Publicado"
                      ? "bg-success/10 text-success"
                      : asset.status === "Borrador"
                        ? "bg-muted text-muted-foreground"
                        : "bg-warning/10 text-warning"
                  }`}>
                    {asset.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {asset.type} · {asset.size} · {asset.date}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Download className="mr-1 h-3 w-3" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Copy className="mr-1 h-3 w-3" />
                    Duplicar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
