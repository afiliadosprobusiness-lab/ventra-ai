import { BarChart3, Bot, Clock, Phone, PhoneCall, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const callLogs = [
  { contact: "Ana Garcia", duration: "3:24", status: "Completada", summary: "Interesada en paquete premium. Solicita cotizacion formal.", score: 92, time: "Hace 15 min" },
  { contact: "Carlos Mendoza", duration: "5:12", status: "Completada", summary: "Confirmo interes. Programar demo para el viernes.", score: 88, time: "Hace 1h" },
  { contact: "Laura Sanchez", duration: "1:45", status: "No contesto", summary: "Sin respuesta. Reintento programado para manana.", score: 65, time: "Hace 2h" },
  { contact: "Roberto Diaz", duration: "4:30", status: "Completada", summary: "Cerro negocio. Enviar factura y confirmacion.", score: 95, time: "Hace 3h" },
  { contact: "Diana Lopez", duration: "0:00", status: "Programada", summary: "Llamada de seguimiento automatica.", score: 71, time: "En 2h" },
];

const stats = [
  { icon: PhoneCall, label: "Llamadas hoy", value: "24", sub: "8 completadas" },
  { icon: Clock, label: "Duracion promedio", value: "3:42", sub: "+0:30 vs ayer" },
  { icon: Bot, label: "Tasa de contacto", value: "68%", sub: "+5% esta semana" },
  { icon: BarChart3, label: "Conversiones", value: "12", sub: "50% de contactados" },
];

export default function VoiceAIPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Llamadas IA</h2>
          <p className="text-sm text-muted-foreground">Llamadas automaticas para avanzar negociaciones mas rapido.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">
          <Phone className="mr-2 h-4 w-4" />
          Nueva llamada
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-5 shadow-card">
            <stat.icon className="mb-3 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            <p className="mt-1 text-sm font-medium">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <div className="border-b p-4">
          <h3 className="font-semibold">Historial de llamadas</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-xs text-muted-foreground">
              <th className="p-4 text-left font-medium">Contacto</th>
              <th className="p-4 text-left font-medium">Duracion</th>
              <th className="p-4 text-left font-medium">Estado</th>
              <th className="p-4 text-left font-medium">Resumen IA</th>
              <th className="p-4 text-left font-medium">Score</th>
              <th className="p-4 text-left font-medium">Tiempo</th>
              <th className="p-4 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {callLogs.map((call) => (
              <tr key={`${call.contact}-${call.time}`} className="border-t transition-colors hover:bg-muted/30">
                <td className="p-4 text-sm font-medium">{call.contact}</td>
                <td className="p-4 text-sm tabular-nums text-muted-foreground">{call.duration}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    call.status === "Completada"
                      ? "bg-success/10 text-success"
                      : call.status === "No contesto"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-warning/10 text-warning"
                  }`}>
                    {call.status}
                  </span>
                </td>
                <td className="max-w-xs truncate p-4 text-xs text-muted-foreground">{call.summary}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${call.score >= 85 ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {call.score}
                  </span>
                </td>
                <td className="p-4 text-xs text-muted-foreground">{call.time}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">
                    <Play className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
