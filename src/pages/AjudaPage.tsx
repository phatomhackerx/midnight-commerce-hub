
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MessageCircle, Video, FileText, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AjudaPage() {
  const categories = [
    { icon: BookOpen, title: "Primeiros Passos", articles: 12, color: "text-blue-500" },
    { icon: MessageCircle, title: "Vendas", articles: 24, color: "text-green-500" },
    { icon: Video, title: "Tutoriais em Vídeo", articles: 8, color: "text-purple-500" },
    { icon: FileText, title: "Documentação", articles: 45, color: "text-orange-500" },
    { icon: HelpCircle, title: "FAQ", articles: 18, color: "text-pink-500" },
  ];

  const popularArticles = [
    "Como criar meu primeiro produto?",
    "Configurando meios de pagamento",
    "Sistema de afiliados: guia completo",
    "Personalizando seu checkout",
    "Criando cupons de desconto",
    "Integrações disponíveis",
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Search */}
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Como podemos ajudar?</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Busque por tutoriais, guias e documentação</p>
            </div>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Buscar na central de ajuda..." 
                className="grok-input pl-12 h-12 sm:h-14 text-base sm:text-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Categorias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Card key={cat.title} className="premium-card p-6 hover-lift cursor-pointer">
                  <cat.icon className={`${cat.color} mb-3`} size={32} />
                  <h3 className="font-semibold mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.articles} artigos</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Artigos Populares</h2>
            <div className="premium-card divide-y divide-border">
              {popularArticles.map((article) => (
                <div key={article} className="p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-sm sm:text-base">{article}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="premium-card p-6 sm:p-8 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Ainda precisa de ajuda?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Nossa equipe de suporte está pronta para ajudar você
            </p>
            <button className="grok-button">Falar com Suporte</button>
          </div>
        </div>
      </main>
    </div>
  );
}
