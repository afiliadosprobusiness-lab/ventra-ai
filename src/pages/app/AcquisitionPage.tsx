import { Megaphone, Globe, MousePointerClick, BarChart3, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AcquisitionPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Acquisition</h2>
          <p className="text-sm text-muted-foreground">Gestiona tus canales de adquisición comercial</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">Nuevo canal</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Globe, label: "Landing Pages", value: "12", sub: "3 activas" },
          { icon: MousePointerClick, label: "Formularios", value: "8", sub: "2,340 envíos" },
          { icon: Megaphone, label: "Ads activos", value: "5", sub: "$2,100 invertido" },
          { icon: BarChart3, label: "Conversión", value: "4.2%", sub: "+0.8% vs mes anterior" },
        ].map((c, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <c.icon className="h-5 w-5 text-primary mb-3" />
            <p className="text-2xl font-bold tabular-nums">{c.value}</p>
            <p className="text-sm font-medium mt-1">{c.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-card">
        <h3 className="font-semibold mb-4">Canales de adquisición</h3>
        <table className="w-full">
          <thead><tr className="text-xs text-muted-foreground border-b">
            <th className="text-left pb-3 font-medium">Canal</th>
            <th className="text-right pb-3 font-medium">Visitantes</th>
            <th className="text-right pb-3 font-medium">Leads</th>
            <th className="text-right pb-3 font-medium">Conversión</th>
            <th className="text-right pb-3 font-medium">Revenue</th>
          </tr></thead>
          <tbody>
            {[
              { canal: "Instagram Ads", visitantes: "12,400", leads: "342", conversion: "2.8%", revenue: "$14,200" },
              { canal: "Google Ads", visitantes: "8,600", leads: "258", conversion: "3.0%", revenue: "$18,900" },
              { canal: "WhatsApp Orgánico", visitantes: "—", leads: "189", conversion: "—", revenue: "$9,400" },
              { canal: "Landing Page", visitantes: "5,200", leads: "156", conversion: "3.0%", revenue: "$7,800" },
              { canal: "Referidos", visitantes: "—", leads: "94", conversion: "—", revenue: "$12,100" },
            ].map((r, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 text-sm font-medium">{r.canal}</td>
                <td className="py-3 text-sm text-right tabular-nums text-muted-foreground">{r.visitantes}</td>
                <td className="py-3 text-sm text-right tabular-nums">{r.leads}</td>
                <td className="py-3 text-sm text-right tabular-nums">{r.conversion}</td>
                <td className="py-3 text-sm text-right tabular-nums font-semibold">{r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
