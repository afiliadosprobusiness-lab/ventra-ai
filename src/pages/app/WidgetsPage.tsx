import { Code, Eye, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const widgets = [
  { name: "Formulario de contacto", type: "Formulario", status: "Activo", views: "2,340", submissions: 186, conversion: "7.9%" },
  { name: "Widget de chat", type: "Chat", status: "Activo", views: "5,100", submissions: 342, conversion: "6.7%" },
  { name: "Pop-up descuento", type: "Popup", status: "Pausado", views: "1,800", submissions: 94, conversion: "5.2%" },
  { name: "Salida con oferta", type: "Popup", status: "Activo", views: "3,200", submissions: 128, conversion: "4.0%" },
  { name: "Quiz de producto", type: "Quiz", status: "Borrador", views: "0", submissions: 0, conversion: "-" },
];

export default function WidgetsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Widgets</h2>
          <p className="text-sm text-muted-foreground">Crea captadores para web, chat y formularios.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo widget
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget) => (
          <div key={widget.name} className="rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-card-hover">
            <div className="mb-3 flex items-center justify-between">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                widget.status === "Activo" ? "bg-success/10 text-success" : widget.status === "Pausado" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
              }`}>
                {widget.status}
              </span>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </div>
            <h3 className="mb-1 text-sm font-semibold">{widget.name}</h3>
            <p className="mb-4 text-xs text-muted-foreground">{widget.type}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Vistas</p>
                <p className="text-sm font-bold tabular-nums">{widget.views}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Envios</p>
                <p className="text-sm font-bold tabular-nums">{widget.submissions}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conv.</p>
                <p className="text-sm font-bold tabular-nums">{widget.conversion}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="mr-1 h-3.5 w-3.5" />
                Vista previa
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Code className="mr-1 h-3.5 w-3.5" />
                Codigo
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
