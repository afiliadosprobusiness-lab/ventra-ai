import { Calendar, Heart, MessageCircle, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { communityPosts } from "@/lib/mock-data";

const stats = [
  { icon: Users, label: "Miembros", value: "342", sub: "+28 esta semana" },
  { icon: MessageSquare, label: "Publicaciones", value: "156", sub: "12 hoy" },
  { icon: Calendar, label: "Eventos", value: "8", sub: "2 proximos" },
  { icon: Heart, label: "Interaccion", value: "78%", sub: "+5% vs mes anterior" },
];

const events = [
  { title: "Masterclass: ventas por WhatsApp", date: "18 mar 2026 - 3:00 PM", attendees: 42 },
  { title: "Preguntas con el equipo Ventra", date: "22 mar 2026 - 5:00 PM", attendees: 28 },
];

const topMembers = [
  { name: "Maria Rodriguez", initials: "MR", points: "2,340" },
  { name: "Carlos Vega", initials: "CV", points: "1,890" },
  { name: "Ana Torres", initials: "AT", points: "1,560" },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Comunidad</h2>
          <p className="text-sm text-muted-foreground">Todo lo que aprende tu equipo en un solo sitio.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">Configurar comunidad</Button>
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h3 className="font-semibold">Novedades</h3>
          {communityPosts.map((post) => (
            <div key={post.id} className="rounded-xl border bg-card p-5 shadow-card">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {post.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed">{post.content}</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 text-xs transition-colors hover:text-primary">
                  <Heart className="h-3.5 w-3.5" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 text-xs transition-colors hover:text-primary">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Proximos eventos</h3>
          {events.map((event) => (
            <div key={event.title} className="rounded-xl border bg-card p-4 shadow-card">
              <h4 className="mb-1 text-sm font-semibold">{event.title}</h4>
              <p className="mb-2 text-xs text-muted-foreground">{event.date}</p>
              <p className="text-xs text-muted-foreground">{event.attendees} asistentes</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Registrarme
              </Button>
            </div>
          ))}

          <h3 className="mt-6 font-semibold">Top miembros</h3>
          {topMembers.map((member, index) => (
            <div key={member.name} className="flex items-center gap-3 py-2">
              <span className="w-5 text-xs font-bold text-muted-foreground">{index + 1}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {member.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
