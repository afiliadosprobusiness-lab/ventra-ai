import { Phone, PhoneCall, PhoneOff, Clock, BarChart3, Bot, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const callLogs = [
  { contact: "Ana García", duration: "3:24", status: "Completada", summary: "Interesada en paquete premium. Solicita cotización formal.", score: 92, time: "Hace 15 min" },
  { contact: "Carlos Mendoza", duration: "5:12", status: "Completada", summary: "Confirmó interés. Programar demo para el viernes.", score: 88, time: "Hace 1h" },
  { contact: "Laura Sánchez", duration: "1:45", status: "No contestó", summary: "Sin respuesta. Reintento programado para mañana.", score: 65, time: "Hace 2h" },
  { contact: "Roberto Díaz", duration: "4:30", status: "Completada", summary: "Cerró deal. Enviar factura y confirmación.", score: 95, time: "Hace 3h" },
  { contact: "Diana López", duration: "0:00", status: "Programada", summary: "Llamada de seguimiento automática.", score: 71, time: "En 2h" },
];

export default function VoiceAIPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Voice AI</h2>
          <p className="text-sm text-muted-foreground">Llamadas automatizadas con inteligencia artificial</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Phone className="h-4 w-4 mr-2" />Nueva llamada</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: PhoneCall, label: "Llamadas hoy", value: "24", sub: "8 completadas" },
          { icon: Clock, label: "Duración promedio", value: "3:42", sub: "+0:30 vs ayer" },
          { icon: Bot, label: "Tasa de contacto", value: "68%", sub: "+5% esta semana" },
          { icon: BarChart3, label: "Conversiones", value: "12", sub: "50% de contactados" },
        ].map((c, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-card">
            <c.icon className="h-5 w-5 text-primary mb-3" />
            <p className="text-2xl font-bold tabular-nums">{c.value}</p>
            <p className="text-sm font-medium mt-1">{c.label}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="p-4 border-b"><h3 className="font-semibold">Call Logs</h3></div>
        <table className="w-full">
          <thead><tr className="bg-muted/50 text-xs text-muted-foreground">
            <th className="text-left p-4 font-medium">Contacto</th>
            <th className="text-left p-4 font-medium">Duración</th>
            <th className="text-left p-4 font-medium">Estado</th>
            <th className="text-left p-4 font-medium">Resumen AI</th>
            <th className="text-left p-4 font-medium">Score</th>
            <th className="text-left p-4 font-medium">Tiempo</th>
            <th className="text-right p-4 font-medium"></th>
          </tr></thead>
          <tbody>
            {callLogs.map((c, i) => (
              <tr key={i} className="border-t hover:bg-muted/30 transition-colors">
                <td className="p-4 text-sm font-medium">{c.contact}</td>
                <td className="p-4 text-sm tabular-nums text-muted-foreground">{c.duration}</td>
                <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  c.status === 'Completada' ? 'bg-success/10 text-success' : c.status === 'No contestó' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                }`}>{c.status}</span></td>
                <td className="p-4 text-xs text-muted-foreground max-w-xs truncate">{c.summary}</td>
                <td className="p-4"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.score >= 85 ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{c.score}</span></td>
                <td className="p-4 text-xs text-muted-foreground">{c.time}</td>
                <td className="p-4 text-right"><Button variant="ghost" size="sm"><Play className="h-3.5 w-3.5" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
