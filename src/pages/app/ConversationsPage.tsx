import { useState } from "react";
import { Search, Phone, Star, Send, MoreHorizontal, Paperclip, Smile, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { conversations, chatMessages } from "@/lib/mock-data";

export default function ConversationsPage() {
  const [selected, setSelected] = useState(0);
  const conv = conversations[selected];

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl border bg-card shadow-card overflow-hidden animate-fade-in">
      {/* List */}
      <div className="w-80 border-r flex flex-col shrink-0">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversaciones..." className="pl-10 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {conversations.map((c, i) => (
            <button key={c.id} onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 transition-colors border-b ${selected === i ? 'bg-muted/50' : ''}`}>
              <div className="relative">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold ${selected === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {c.initials}
                </div>
                {c.status === 'online' && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-card" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{conv.initials}</div>
            <div>
              <p className="text-sm font-semibold">{conv.name}</p>
              <p className="text-xs text-muted-foreground">En línea · Lead caliente · Score: {conv.score}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm"><Star className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm"><Tag className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-2xl px-4 py-3 ${
                msg.sender === 'agent'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted rounded-bl-md'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'agent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1">✨ Sugerencias IA</span>
            {["Enviar recordatorio del descuento", "Preguntar si necesita más información", "Ofrecer muestra gratis"].map((s, i) => (
              <button key={i} className="text-xs px-3 py-1.5 rounded-full border hover:bg-muted transition-colors">{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Paperclip className="h-4 w-4" /></Button>
            <Input placeholder="Escribe un mensaje..." className="flex-1" />
            <Button variant="ghost" size="sm"><Smile className="h-4 w-4" /></Button>
            <Button size="sm" className="gradient-ventra text-primary-foreground"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* Contact Detail */}
      <div className="w-72 border-l p-4 hidden xl:block">
        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">{conv.initials}</div>
          <h3 className="font-semibold">{conv.name}</h3>
          <p className="text-xs text-muted-foreground">ana@gmail.com</p>
          <p className="text-xs text-muted-foreground">+52 55 1234 5678</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Información</h4>
          {[["Estado", "Interesado"], ["Score", "92"], ["Prob. cierre", "88%"], ["Valor", "$3,200"], ["Fuente", "Instagram Ads"], ["Asesor", "María R."]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Etiquetas</h4>
          <div className="flex flex-wrap gap-1.5">
            {["Premium", "Instagram", "WhatsApp", "Descuento"].map((t) => (
              <span key={t} className="px-2 py-1 rounded-md border text-xs">{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</h4>
          <Button variant="outline" size="sm" className="w-full justify-center">Programar seguimiento</Button>
          <Button variant="outline" size="sm" className="w-full justify-center">Asignar a asesor</Button>
          <Button variant="outline" size="sm" className="w-full justify-center">Marcar como cerrado</Button>
        </div>
      </div>
    </div>
  );
}
