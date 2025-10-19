
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Clock, 
  File, 
  Image, 
  Info, 
  Paperclip, 
  Plus, 
  Search, 
  Send, 
  Settings, 
  User, 
  XCircle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [loaded, setLoaded] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number>(1);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1400px] mx-auto h-[calc(100vh-12rem)] flex overflow-hidden rounded-xl border border-border/50 minimal-card">
          <div className={cn(
            "w-80 border-r flex flex-col transition-all", 
            loaded && "animate-fade-in"
          )}>
            <div className="p-4 border-b border-border/50 flex justify-between items-center">
              <h2 className="font-semibold text-foreground">Conversas</h2>
              <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-lg">
                <Settings size={18} />
              </Button>
            </div>
            
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 grok-input" placeholder="Buscar conversa..." />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {conversas.map((conversa) => (
                <div 
                  key={conversa.id}
                  onClick={() => setSelectedChat(conversa.id)}
                  className={cn(
                    "p-3 rounded-md cursor-pointer transition-all hover:bg-muted flex gap-3 items-start mb-1",
                    selectedChat === conversa.id && "bg-primary/10"
                  )}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground">
                      <User size={16} />
                    </div>
                    {conversa.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-medium text-sm truncate">{conversa.nome}</h3>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock size={12} className="mr-1" />
                        {conversa.hora}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conversa.ultimaMensagem}</p>
                  </div>
                  {conversa.naoLidas > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {conversa.naoLidas}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t">
              <Button className="w-full gap-1">
                <Plus size={16} />
                <span>Nova Conversa</span>
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "flex-1 flex flex-col transition-all", 
            loaded && "animate-fade-in transition-delay-100"
          )}>
            {selectedChat ? (
              <>
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-foreground">
                      <User size={14} />
                    </div>
                    <div>
                      <h2 className="font-semibold">{conversas.find(c => c.id === selectedChat)?.nome}</h2>
                      <p className="text-xs text-muted-foreground">
                        {conversas.find(c => c.id === selectedChat)?.online ? (
                          <span className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-success mr-1"></span>
                            Online
                          </span>
                        ) : (
                          "Offline"
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Search size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info size={18} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mensagens.map((mensagem, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex gap-2 max-w-[80%]",
                        mensagem.remetente === "eu" ? "ml-auto" : ""
                      )}
                    >
                      {mensagem.remetente !== "eu" && (
                        <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0 flex items-center justify-center text-foreground mt-1">
                          <User size={14} />
                        </div>
                      )}
                      <div className={cn(
                        "rounded-lg p-3",
                        mensagem.remetente === "eu" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}>
                        <p className="text-sm">{mensagem.texto}</p>
                        {mensagem.anexo && (
                          <div className="mt-2 flex items-center gap-1 text-xs bg-background/10 p-1.5 rounded">
                            {mensagem.anexo.tipo === "imagem" ? (
                              <Image size={14} />
                            ) : (
                              <File size={14} />
                            )}
                            <span>{mensagem.anexo.nome}</span>
                          </div>
                        )}
                        <div className={cn(
                          "text-xs mt-1 flex justify-end",
                          mensagem.remetente === "eu" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        )}>
                          {mensagem.hora}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip size={18} />
                    </Button>
                    <div className="relative flex-1">
                      <Input 
                        className="pr-12" 
                        placeholder="Digite sua mensagem..." 
                      />
                      <Button 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0" 
                        size="icon"
                      >
                        <Send size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-xl font-semibold mb-2">Nenhuma conversa selecionada</h2>
                <p className="text-muted-foreground mb-4">
                  Selecione uma conversa ou inicie uma nova para começar a conversar.
                </p>
                <Button className="gap-1">
                  <Plus size={16} />
                  <span>Nova Conversa</span>
                </Button>
              </div>
            )}
          </div>
          
          <div className={cn(
            "w-80 border-l hidden lg:flex flex-col transition-all",
            loaded && "animate-fade-in transition-delay-200"
          )}>
            <div className="p-4 border-b">
              <h2 className="font-semibold">Informações</h2>
            </div>
            
            <div className="p-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-foreground mb-3">
                <User size={32} />
              </div>
              <h3 className="font-bold text-lg">Suporte MidnightSales</h3>
              <p className="text-xs text-muted-foreground">Online</p>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Ver Perfil</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <XCircle size={14} className="mr-1" />
                  <span>Bloquear</span>
                </Button>
              </div>
            </div>
            
            <div className="p-4 border-t border-b">
              <h3 className="font-medium text-sm mb-3">Anexos Compartilhados</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                  <File size={16} className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">manual-usuario.pdf</p>
                    <p className="text-xs text-muted-foreground">250 KB - 27/05/2024</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ArrowRight size={14} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                  <Image size={16} className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">screenshot.png</p>
                    <p className="text-xs text-muted-foreground">1.2 MB - 26/05/2024</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-sm mb-3">Tópicos Relacionados</h3>
              <div className="space-y-2">
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-3">
                    <p className="font-medium text-xs">Como configurar meu primeiro produto?</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Aprenda a configurar produtos em sua loja virtual
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-3">
                    <p className="font-medium text-xs">Métodos de pagamento disponíveis</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confira todos os métodos de pagamento disponíveis
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Componente MessageSquare para o ícone de mensagem
const MessageSquare = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Dados fictícios para as conversas
const conversas = [
  {
    id: 1,
    nome: "Suporte MidnightSales",
    ultimaMensagem: "Claro, posso ajudá-lo com isso. Vou verificar e...",
    hora: "10:42",
    naoLidas: 2,
    online: true
  },
  {
    id: 2,
    nome: "Carlos Vendas",
    ultimaMensagem: "Oi, posso te ajudar com as vendas hoje?",
    hora: "09:15",
    naoLidas: 0,
    online: false
  },
  {
    id: 3,
    nome: "Equipe Técnica",
    ultimaMensagem: "O problema foi resolvido. Tente acessar novamente.",
    hora: "Ontem",
    naoLidas: 0,
    online: true
  },
  {
    id: 4,
    nome: "Márcia Financeiro",
    ultimaMensagem: "Enviamos o relatório financeiro conforme solicitado.",
    hora: "Ontem",
    naoLidas: 0,
    online: false
  },
  {
    id: 5,
    nome: "Departamento de Marketing",
    ultimaMensagem: "Vamos agendar uma reunião para discutir a nova campanha.",
    hora: "28/05",
    naoLidas: 0,
    online: false
  }
];

// Dados fictícios para as mensagens
const mensagens = [
  {
    remetente: "outro",
    texto: "Olá! Como posso ajudá-lo hoje?",
    hora: "10:30"
  },
  {
    remetente: "eu",
    texto: "Olá! Estou com uma dúvida sobre como configurar um novo produto na plataforma.",
    hora: "10:32"
  },
  {
    remetente: "outro",
    texto: "Claro, posso ajudar com isso. Para configurar um novo produto, você precisa acessar a seção 'Produtos' no menu lateral e clicar em 'Novo Produto'.",
    hora: "10:34"
  },
  {
    remetente: "outro",
    texto: "Depois, preencha todos os campos obrigatórios como nome, descrição, preço e imagens.",
    hora: "10:34"
  },
  {
    remetente: "eu",
    texto: "Entendi, mas estou com problemas para fazer upload das imagens. Quando tento adicionar, aparece uma mensagem de erro.",
    hora: "10:36"
  },
  {
    remetente: "outro",
    texto: "Pode me enviar um print da tela com a mensagem de erro? Isso vai me ajudar a entender melhor o problema.",
    hora: "10:38"
  },
  {
    remetente: "eu",
    texto: "Claro, segue o print da tela.",
    hora: "10:40",
    anexo: {
      tipo: "imagem",
      nome: "screenshot.png"
    }
  },
  {
    remetente: "outro",
    texto: "Obrigado pelo print. Parece que o arquivo está muito grande. Tente redimensionar a imagem para no máximo 1MB ou usar o formato JPG que costuma ser mais leve.",
    hora: "10:41"
  },
  {
    remetente: "outro",
    texto: "Também estou enviando um manual com mais informações sobre o upload de imagens.",
    hora: "10:42",
    anexo: {
      tipo: "arquivo",
      nome: "manual-usuario.pdf"
    }
  }
];
