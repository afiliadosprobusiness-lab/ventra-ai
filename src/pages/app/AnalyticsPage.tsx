import { TrendingUp, Users, MessageSquare, Phone, Target, DollarSign, ArrowUpRight, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const moduleData = [
  { name: "Prospector", leads: 284, conversion: "12%", revenue: "$18,200" },
  { name: "Conversations", leads: 127, conversion: "18%", revenue: "$22,860" },
  { name: "Voice AI", leads: 89, conversion: "22%", revenue: "$15,400" },
  { name: "Campaigns", leads: 342, conversion: "8%", revenue: "$12,600" },
];

const weeklyData = [
  { day: "Lun", leads: 42, closed: 8 },
  { day: "Mar", leads: 38, closed: 12 },
  { day: "Mié", leads: 55, closed: 10 },
  { day: "Jue", leads: 48, closed: 15 },
  { day: "Vie", leads: 62, closed: 18 },
  { day: "Sáb", leads: 28, closed: 6 },
  { day: "Dom", leads: 15, closed: 3 },
];

const pieData = [
  { name: "Cerrado", value: 35, color: "hsl(160, 84%, 39%)" },
  { name: "En progreso", value: 40, color: "hsl(221, 83%, 53%)" },
  { name: "Perdido", value: 25, color: "hsl(220, 14%, 90%)" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-lg font-semibold">Analytics</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Leads", value: "1,842", change: "+12%" },
          { icon: DollarSign, label: "Revenue Total", value: "$128,430", change: "+23%" },
          { icon: Target, label: "Tasa de Cierre", value: "18.4%", change: "+3.2%" },
          { icon: MessageSquare, label: "Engagement", value: "72%", change: "+5%" },
        ].map((m, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <m.icon className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-success flex items-center gap-1"><ArrowUpRight className="h-3 w-3" />{m.change}</span>
            </div>
            <p className="text-2xl font-bold tabular-nums">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-semibold mb-4">Leads vs Cierres (semanal)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="leads" fill="hsl(220, 14%, 90%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="closed" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-semibold mb-4">Distribución de deals</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                <span className="text-muted-foreground">{p.name}: {p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-card">
        <h3 className="font-semibold mb-4">Rendimiento por módulo</h3>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b">
              <th className="text-left pb-3 font-medium">Módulo</th>
              <th className="text-right pb-3 font-medium">Leads</th>
              <th className="text-right pb-3 font-medium">Conversión</th>
              <th className="text-right pb-3 font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {moduleData.map((m, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-3 text-sm font-medium">{m.name}</td>
                <td className="py-3 text-sm text-right tabular-nums">{m.leads}</td>
                <td className="py-3 text-sm text-right tabular-nums">{m.conversion}</td>
                <td className="py-3 text-sm text-right tabular-nums font-semibold">{m.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
