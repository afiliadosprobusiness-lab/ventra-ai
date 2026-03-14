import { BarChart3, Globe, Megaphone, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

const channels = [
  { icon: Globe, label: "Paginas de aterrizaje", value: "12", sub: "3 activas" },
  { icon: MousePointerClick, label: "Formularios", value: "8", sub: "2,340 envios" },
  { icon: Megaphone, label: "Ads activos", value: "5", sub: "$2,100 invertido" },
  { icon: BarChart3, label: "Conversion", value: "4.2%", sub: "+0.8% vs mes anterior" },
];

const channelRows = [
  { canal: "Instagram Ads", visitantes: "12,400", leads: "342", conversion: "2.8%", revenue: "$14,200" },
  { canal: "Google Ads", visitantes: "8,600", leads: "258", conversion: "3.0%", revenue: "$18,900" },
  { canal: "WhatsApp organico", visitantes: "-", leads: "189", conversion: "-", revenue: "$9,400" },
  { canal: "Landing principal", visitantes: "5,200", leads: "156", conversion: "3.0%", revenue: "$7,800" },
  { canal: "Referidos", visitantes: "-", leads: "94", conversion: "-", revenue: "$12,100" },
];

export default function AcquisitionPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Captacion</h2>
          <p className="text-sm text-muted-foreground">
            Gestiona los canales que hoy te estan trayendo leads y plata.
          </p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">Nuevo canal</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {channels.map((channel) => (
          <div key={channel.label} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <channel.icon className="mb-3 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold tabular-nums">{channel.value}</p>
            <p className="mt-1 text-sm font-medium">{channel.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{channel.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-card">
        <h3 className="mb-4 font-semibold">Canales de captacion</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="pb-3 text-left font-medium">Canal</th>
              <th className="pb-3 text-right font-medium">Visitantes</th>
              <th className="pb-3 text-right font-medium">Leads</th>
              <th className="pb-3 text-right font-medium">Conversion</th>
              <th className="pb-3 text-right font-medium">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {channelRows.map((row) => (
              <tr key={row.canal} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 text-sm font-medium">{row.canal}</td>
                <td className="py-3 text-right text-sm tabular-nums text-muted-foreground">{row.visitantes}</td>
                <td className="py-3 text-right text-sm tabular-nums">{row.leads}</td>
                <td className="py-3 text-right text-sm tabular-nums">{row.conversion}</td>
                <td className="py-3 text-right text-sm font-semibold tabular-nums">{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
