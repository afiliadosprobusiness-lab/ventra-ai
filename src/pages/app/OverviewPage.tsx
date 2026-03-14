import {
  Users, MessageSquare, AlertTriangle, Clock, RefreshCw, Target, TrendingUp, BarChart3, Zap, Eye, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { kpiCards, revenueChartData, insights, hotLeads, recentActivity } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, MessageSquare, AlertTriangle, Clock, RefreshCw, Target, TrendingUp, BarChart3,
};

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.slice(0, 4).map((card, i) => {
          const Icon = iconMap[card.icon];
          return (
            <div key={i} className="group rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all hover:border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  {Icon && <Icon className="h-4 w-4 text-primary" />}
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${card.trend === 'up' ? 'text-success' : card.trend === 'down' ? 'text-destructive' : 'text-warning'}`}>
                  {card.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : card.trend === 'down' ? <ArrowDownRight className="h-3 w-3" /> : null}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.slice(4).map((card, i) => {
          const Icon = iconMap[card.icon];
          return (
            <div key={i} className="group rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all hover:border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  {Icon && <Icon className="h-4 w-4 text-primary" />}
                </div>
                <span className="text-xs font-semibold text-success flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />{card.change}
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Rendimiento comercial</h3>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
              <button className="px-3 py-1 text-xs text-muted-foreground rounded-md">7d</button>
              <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md font-medium">30d</button>
              <button className="px-3 py-1 text-xs text-muted-foreground rounded-md">90d</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueChartData}>
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Ingresos"]} />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-semibold mb-4">Insights inteligentes</h3>
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className={`rounded-lg border-l-4 p-4 bg-muted/30 ${
                insight.color === 'warning' ? 'border-l-warning' : insight.color === 'success' ? 'border-l-success' : 'border-l-info'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {insight.type === 'opportunity' ? <Zap className="h-3.5 w-3.5 text-warning" /> :
                   insight.type === 'trend' ? <TrendingUp className="h-3.5 w-3.5 text-success" /> :
                   <Eye className="h-3.5 w-3.5 text-info" />}
                  <span className="text-sm font-semibold">{insight.title}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hot Leads */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-semibold mb-4">Leads más calientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground border-b">
                  <th className="text-left pb-3 font-medium">Lead</th>
                  <th className="text-left pb-3 font-medium">Score</th>
                  <th className="text-left pb-3 font-medium">Estado</th>
                  <th className="text-right pb-3 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {hotLeads.map((lead, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 text-sm font-medium">{lead.name}</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lead.score >= 85 ? 'bg-success/10 text-success' : lead.score >= 70 ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                        {lead.score}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{lead.status}</td>
                    <td className="py-3 text-sm font-semibold text-right tabular-nums">{lead.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-semibold mb-4">Actividad reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
