import { Search, Filter, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contacts } from "@/lib/mock-data";

export default function ContactsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Contacts</h2>
          <p className="text-sm text-muted-foreground">Gestiona tu base de contactos</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nuevo contacto</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar contactos..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filtros</Button>
      </div>

      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-xs text-muted-foreground">
              <th className="text-left p-4 font-medium">Contacto</th>
              <th className="text-left p-4 font-medium">Empresa</th>
              <th className="text-left p-4 font-medium">Estado</th>
              <th className="text-left p-4 font-medium">Tags</th>
              <th className="text-left p-4 font-medium">Owner</th>
              <th className="text-left p-4 font-medium">Último contacto</th>
              <th className="text-right p-4 font-medium">Valor</th>
              <th className="text-right p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{c.company}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    c.status === 'Activo' ? 'bg-success/10 text-success' :
                    c.status === 'Cerrado' ? 'bg-primary/10 text-primary' :
                    c.status === 'Negociando' ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>{c.status}</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">{c.tags.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded border">{t}</span>
                  ))}</div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{c.owner}</td>
                <td className="p-4 text-xs text-muted-foreground">{c.lastContact}</td>
                <td className="p-4 text-sm font-semibold text-right tabular-nums">{c.value}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
