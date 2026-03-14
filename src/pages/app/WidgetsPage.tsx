import { Plus, Eye, BarChart3, Code, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const widgets = [
  { name: "Formulario de contacto", type: "Form", status: "Activo", views: "2,340", submissions: 186, conversion: "7.9%" },
  { name: "Chat widget", type: "Chat", status: "Activo", views: "5,100", submissions: 342, conversion: "6.7%" },
  { name: "Pop-up descuento", type: "Popup", status: "Pausado", views: "1,800", submissions: 94, conversion: "5.2%" },
  { name: "Exit intent", type: "Popup", status: "Activo", views: "3,200", submissions: 128, conversion: "4.0%" },
  { name: "Quiz de producto", type: "Quiz", status: "Borrador", views: "0", submissions: 0, conversion: "—" },
];

export default function WidgetsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Widgets</h2>
          <p className="text-sm text-muted-foreground">Crea y gestiona widgets de captación</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nuevo widget</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((w, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                w.status === 'Activo' ? 'bg-success/10 text-success' : w.status === 'Pausado' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
              }`}>{w.status}</span>
              <Button variant="ghost" size="sm"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
            </div>
            <h3 className="font-semibold text-sm mb-1">{w.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{w.type}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><p className="text-xs text-muted-foreground">Vistas</p><p className="text-sm font-bold tabular-nums">{w.views}</p></div>
              <div><p className="text-xs text-muted-foreground">Envíos</p><p className="text-sm font-bold tabular-nums">{w.submissions}</p></div>
              <div><p className="text-xs text-muted-foreground">Conv.</p><p className="text-sm font-bold tabular-nums">{w.conversion}</p></div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1"><Eye className="h-3.5 w-3.5 mr-1" />Preview</Button>
              <Button variant="outline" size="sm" className="flex-1"><Code className="h-3.5 w-3.5 mr-1" />Código</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
