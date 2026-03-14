import { Globe, Users, Calendar, MessageSquare, Settings, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { communityPosts } from "@/lib/mock-data";

export default function CommunityPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Community</h2>
          <p className="text-sm text-muted-foreground">Tu comunidad integrada en Ventra</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">Configurar comunidad</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Miembros", value: "342", sub: "+28 esta semana" },
          { icon: MessageSquare, label: "Posts", value: "156", sub: "12 hoy" },
          { icon: Calendar, label: "Eventos", value: "8", sub: "2 próximos" },
          { icon: Heart, label: "Engagement", value: "78%", sub: "+5% vs mes anterior" },
        ].map((c, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-card">
            <c.icon className="h-5 w-5 text-primary mb-3" />
            <p className="text-2xl font-bold tabular-nums">{c.value}</p>
            <p className="text-sm font-medium mt-1">{c.label}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold">Feed</h3>
          {communityPosts.map((post) => (
            <div key={post.id} className="rounded-xl border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{post.avatar}</div>
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors"><Heart className="h-3.5 w-3.5" />{post.likes}</button>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors"><MessageCircle className="h-3.5 w-3.5" />{post.comments}</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Próximos eventos</h3>
          {[
            { title: "Masterclass: Ventas por WhatsApp", date: "Mar 18, 2026 · 3:00 PM", attendees: 42 },
            { title: "Q&A con el equipo Ventra", date: "Mar 22, 2026 · 5:00 PM", attendees: 28 },
          ].map((e, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
              <h4 className="text-sm font-semibold mb-1">{e.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{e.date}</p>
              <p className="text-xs text-muted-foreground">{e.attendees} asistentes</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">Registrarse</Button>
            </div>
          ))}

          <h3 className="font-semibold mt-6">Top miembros</h3>
          {[
            { name: "María Rodríguez", initials: "MR", points: "2,340" },
            { name: "Carlos Vega", initials: "CV", points: "1,890" },
            { name: "Ana Torres", initials: "AT", points: "1,560" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{m.initials}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
