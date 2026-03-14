import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contacts } from "@/lib/mock-data";

export default function ContactsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Contactos</h2>
          <p className="text-sm text-muted-foreground">Ten a la mano tu base para dar seguimiento rapido.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo contacto
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar contactos..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-xs text-muted-foreground">
              <th className="p-4 text-left font-medium">Contacto</th>
              <th className="p-4 text-left font-medium">Empresa</th>
              <th className="p-4 text-left font-medium">Estado</th>
              <th className="p-4 text-left font-medium">Etiquetas</th>
              <th className="p-4 text-left font-medium">Asesor</th>
              <th className="p-4 text-left font-medium">Ultimo contacto</th>
              <th className="p-4 text-right font-medium">Valor</th>
              <th className="p-4 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t transition-colors hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {contact.name.split(" ").map((name) => name[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{contact.company}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    contact.status === "Activo"
                      ? "bg-success/10 text-success"
                      : contact.status === "Cerrado"
                        ? "bg-primary/10 text-primary"
                        : contact.status === "Negociando"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    {contact.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded border px-1.5 py-0.5 text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{contact.owner}</td>
                <td className="p-4 text-xs text-muted-foreground">{contact.lastContact}</td>
                <td className="p-4 text-right text-sm font-semibold tabular-nums">{contact.value}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
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
