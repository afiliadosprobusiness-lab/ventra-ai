import { ArrowUpRight, DollarSign, MessageSquare, Target, Users } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const moduleData = [
  { name: "Prospeccion IA", leads: 284, conversion: "12%", revenue: "$18,200" },
  { name: "Conversaciones", leads: 127, conversion: "18%", revenue: "$22,860" },
  { name: "Llamadas IA", leads: 89, conversion: "22%", revenue: "$15,400" },
  { name: "Campanas", leads: 342, conversion: "8%", revenue: "$12,600" },
];

const weeklyData = [
  { day: "Lun", leads: 42, closed: 8 },
  { day: "Mar", leads: 38, closed: 12 },
  { day: "Mie", leads: 55, closed: 10 },
  { day: "Jue", leads: 48, closed: 15 },
  { day: "Vie", leads: 62, closed: 18 },
  { day: "Sab", leads: 28, closed: 6 },
  { day: "Dom", leads: 15, closed: 3 },
];

const pieData = [
  { name: "Cerrado", value: 35, color: "#10b981" },
  { name: "En progreso", value: 40, color: "#38bdf8" },
  { name: "Perdido", value: 25, color: "#94a3b8" },
];

const stats = [
  { icon: Users, label: "Leads totales", value: "1,842", change: "+12%" },
  { icon: DollarSign, label: "Ingresos totales", value: "$128,430", change: "+23%" },
  { icon: Target, label: "Tasa de cierre", value: "18.4%", change: "+3.2%" },
  { icon: MessageSquare, label: "Interaccion", value: "72%", change: "+5%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-lg font-semibold">Analitica</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="flex items-center gap-1 text-xs font-semibold text-success">
                <ArrowUpRight className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="mb-4 font-semibold">Leads vs cierres</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="leads" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="closed" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="mb-4 font-semibold">Distribucion de oportunidades</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-center gap-6">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                <span className="text-muted-foreground">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-card">
        <h3 className="mb-4 font-semibold">Rendimiento por modulo</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="pb-3 text-left font-medium">Modulo</th>
              <th className="pb-3 text-right font-medium">Leads</th>
              <th className="pb-3 text-right font-medium">Conversion</th>
              <th className="pb-3 text-right font-medium">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {moduleData.map((module) => (
              <tr key={module.name} className="border-b last:border-0">
                <td className="py-3 text-sm font-medium">{module.name}</td>
                <td className="py-3 text-right text-sm tabular-nums">{module.leads}</td>
                <td className="py-3 text-right text-sm tabular-nums">{module.conversion}</td>
                <td className="py-3 text-right text-sm font-semibold tabular-nums">{module.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
