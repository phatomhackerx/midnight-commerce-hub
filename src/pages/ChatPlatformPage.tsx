import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Check, 
  ChevronRight, 
  CircleUser, 
  ExternalLink, 
  Globe, 
  HelpCircle, 
  Info, 
  MessageSquare, 
  Plus, 
  BotIcon, 
  Settings, 
  Share2, 
  BarChart2, 
  Users, 
  Phone,
  Mail,
  Instagram,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatPlatformPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState("overview");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Plataforma de Comunicação</h1>
                <p className="text-muted-foreground mt-1">Gerencie canais e bots de atendimento</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings size={16} />
                  <span>Configurações</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Novo Bot</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", loaded && "animate-fade-in")}>
            <Card className="md:col-span-3 minimal-card">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-xl font-bold">Marketing Conversacional Completo</h2>
                    <p className="text-muted-foreground mt-2">Atendimento automatizado e bots inteligentes</p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                      <Button size="sm" className="gap-1">
                        <Plus size={16} />
                        <span>Criar Bot</span>
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Globe size={16} />
                        <span>Configurar</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-all minimal-card" onClick={() => setCurrentPage("chats")}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Conversas</CardTitle>
                  <Badge className="bg-success/80">Ativo</Badge>
                </div>
                <CardDescription>Gerencie mensagens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted rounded-md p-3 text-center">
                    <p className="text-2xl font-semibold">24</p>
                    <p className="text-xs text-muted-foreground">Conversas ativas</p>
                  </div>
                  <div className="bg-muted rounded-md p-3 text-center">
                    <p className="text-2xl font-semibold">87%</p>
                    <p className="text-xs text-muted-foreground">Taxa de resolução</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="ghost" className="gap-1 w-full justify-between">
                  <span>Ver conversas</span>
                  <ChevronRight size={16} />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-all border-primary/20" onClick={() => setCurrentPage("bots")}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Bots de IA</CardTitle>
                  <Badge variant="purple">3 Ativos</Badge>
                </div>
                <CardDescription>Crie bots inteligentes de atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <div className="bg-muted rounded-md p-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <BotIcon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Bot de Suporte</p>
                      <p className="text-xs text-muted-foreground">156 ativações hoje</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-md p-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <BotIcon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Bot de Vendas</p>
                      <p className="text-xs text-muted-foreground">89 ativações hoje</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="ghost" className="gap-1 w-full justify-between">
                  <span>Gerenciar bots</span>
                  <ChevronRight size={16} />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-all border-primary/20" onClick={() => setCurrentPage("links")}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Smart Bio Links</CardTitle>
                  <Badge>7 Links</Badge>
                </div>
                <CardDescription>Links inteligentes para conversão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <div className="bg-muted rounded-md p-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                      <Share2 size={16} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">meusite.com/bio</p>
                      <p className="text-xs text-muted-foreground">452 cliques hoje</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-md p-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                      <Share2 size={16} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">meusite.com/promo</p>
                      <p className="text-xs text-muted-foreground">213 cliques hoje</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="ghost" className="gap-1 w-full justify-between">
                  <span>Ver links</span>
                  <ChevronRight size={16} />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className={cn("space-y-6", loaded && "animate-fade-in transition-delay-100")}>
            <h2 className="text-xl font-semibold">Recursos Disponíveis</h2>
            
            <Tabs defaultValue="channels" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="channels">Canais</TabsTrigger>
                <TabsTrigger value="agents">Agentes de IA</TabsTrigger>
                <TabsTrigger value="biolinks">Links Inteligentes</TabsTrigger>
                <TabsTrigger value="analytics">Análises</TabsTrigger>
              </TabsList>
              
              <TabsContent value="channels" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {channels.map((channel, i) => (
                    <Card key={i} className={cn(
                      "border border-muted transition-all hover:shadow-md cursor-pointer",
                      channel.active ? "bg-card" : "bg-card/50 opacity-70"
                    )}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <channel.icon className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-base">{channel.name}</CardTitle>
                          </div>
                          {channel.active ? (
                            <Badge variant="success" size="sm">Ativo</Badge>
                          ) : (
                            <Badge variant="outline" size="sm">Inativo</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-xs text-muted-foreground">{channel.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" className="w-full gap-1">
                          {channel.active ? "Configurar" : "Ativar"}
                          <ChevronRight size={14} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <Alert className="bg-primary/5 border-primary/20">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Integre múltiplos canais</AlertTitle>
                  <AlertDescription>
                    Conecte todos os seus canais de comunicação e gerencie de um único lugar.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="agents" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Agentes de IA</CardTitle>
                      <CardDescription>Crie assistentes inteligentes treinados com seus dados</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-success" />
                          <p className="text-sm">Treinamento com base em perguntas frequentes</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-success" />
                          <p className="text-sm">Upload de PDFs, documentos e links</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-success" />
                          <p className="text-sm">Respostas naturais e personalizadas</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-success" />
                          <p className="text-sm">Escalabilidade para milhares de conversas</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        <BotIcon className="h-4 w-4" />
                        <span>Criar Novo Agente</span>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Bot Builder</CardTitle>
                      <CardDescription>Editor visual de fluxos de conversa</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border border-dashed border-muted-foreground/50 h-40 flex items-center justify-center bg-muted/50">
                        <div className="text-center">
                          <MessageSquare className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Arraste e solte módulos para criar fluxos</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full gap-2">
                        <span>Abrir Bot Builder</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="biolinks" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Smart Bio Links</CardTitle>
                      <CardDescription>Crie páginas personalizadas para conversão</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-success" />
                            <p className="text-sm">Layout personalizado</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-success" />
                            <p className="text-sm">Múltiplos links e botões</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-success" />
                            <p className="text-sm">Temas personalizáveis</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-success" />
                            <p className="text-sm">Formulários de captura</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-success" />
                            <p className="text-sm">Análises detalhadas</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-success" />
                            <p className="text-sm">Redirecionamento inteligente</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Criar Smart Bio Link</span>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="overflow-hidden border border-muted">
                    <div className="aspect-[9/16] bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="bg-primary/10 p-4 text-center">
                          <div className="w-16 h-16 rounded-full bg-background/90 mx-auto flex items-center justify-center">
                            <CircleUser className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="mt-2 font-bold">@seuperfil</h3>
                          <p className="text-xs text-muted-foreground">Bio personalizada</p>
                        </div>
                        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                          <div className="bg-background/80 rounded-lg p-2 text-center text-sm">
                            Link 1
                          </div>
                          <div className="bg-background/80 rounded-lg p-2 text-center text-sm">
                            Link 2
                          </div>
                          <div className="bg-background/80 rounded-lg p-2 text-center text-sm">
                            Link 3
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Análises Avançadas</CardTitle>
                      <CardDescription>Métricas detalhadas e insights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Desempenho dos canais</h4>
                          <Select defaultValue="7days">
                            <SelectTrigger className="w-[120px] h-7 text-xs">
                              <SelectValue placeholder="Período" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Hoje</SelectItem>
                              <SelectItem value="7days">7 dias</SelectItem>
                              <SelectItem value="30days">30 dias</SelectItem>
                              <SelectItem value="custom">Personalizado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="h-40 flex items-center justify-center bg-muted/30 rounded-md">
                          <BarChart2 className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full gap-2">
                        <span>Ver relatórios completos</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Métricas em tempo real</CardTitle>
                      <CardDescription>Monitore seus resultados agora</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Conversas hoje</p>
                          <p className="text-2xl font-semibold">159</p>
                          <p className="text-xs text-success mt-1 flex items-center gap-1">
                            <Check className="h-3 w-3" /> 
                            <span>+12% vs ontem</span>
                          </p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Conversões</p>
                          <p className="text-2xl font-semibold">27</p>
                          <p className="text-xs text-success mt-1 flex items-center gap-1">
                            <Check className="h-3 w-3" /> 
                            <span>+5% vs ontem</span>
                          </p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Tempo médio</p>
                          <p className="text-2xl font-semibold">2:47</p>
                          <p className="text-xs text-success mt-1 flex items-center gap-1">
                            <Check className="h-3 w-3" /> 
                            <span>-18s vs ontem</span>
                          </p>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Satisfação</p>
                          <p className="text-2xl font-semibold">94%</p>
                          <p className="text-xs text-success mt-1 flex items-center gap-1">
                            <Check className="h-3 w-3" /> 
                            <span>+2% vs ontem</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <span>Dashboard completo</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className={cn("pt-2", loaded && "animate-fade-in transition-delay-200")}>
            <Card className="bg-secondary/10 shadow-sm border-secondary/20">
              <CardHeader>
                <CardTitle className="text-lg">Precisa de ajuda para começar?</CardTitle>
                <CardDescription>
                  Explore nossos tutoriais e recursos para configurar sua plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background shadow-sm rounded-lg p-4 flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BotIcon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Configure seu primeiro bot</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Aprenda a criar e treinar um bot de atendimento em minutos
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs gap-1">
                      <span>Ver tutorial</span>
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-background shadow-sm rounded-lg p-4 flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Share2 size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Crie seu primeiro Smart Bio Link</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Saiba como criar uma página de links personalizada
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs gap-1">
                      <span>Ver tutorial</span>
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-background shadow-sm rounded-lg p-4 flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Integre com o WhatsApp</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Conecte sua conta do WhatsApp Business com a plataforma
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs gap-1">
                      <span>Ver tutorial</span>
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <HelpCircle size={16} />
                  <span>Central de ajuda</span>
                </Button>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <span>Preciso de Suporte</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Como podemos ajudar?</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                          <MessageCircle size={16} />
                          <div className="text-left">
                            <p className="font-medium text-sm">Chat com suporte</p>
                            <p className="text-xs text-muted-foreground">Tempo de resposta: ~5 min</p>
                          </div>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                          <Mail size={16} />
                          <div className="text-left">
                            <p className="font-medium text-sm">Email</p>
                            <p className="text-xs text-muted-foreground">suporte@exemplo.com</p>
                          </div>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                          <Users size={16} />
                          <div className="text-left">
                            <p className="font-medium text-sm">Comunidade</p>
                            <p className="text-xs text-muted-foreground">Fórum de usuários</p>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const channels = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    description: "Integração com WhatsApp Business API",
    active: true
  },
  {
    name: "Instagram",
    icon: Instagram,
    description: "Direct Messages via Meta API",
    active: true
  },
  {
    name: "Messenger",
    icon: MessageSquare,
    description: "Facebook Messenger para páginas",
    active: false
  },
  {
    name: "Telegram",
    icon: MessageSquare,
    description: "Bot API para automações",
    active: false
  },
  {
    name: "Chat Widget",
    icon: MessageCircle,
    description: "Widget para seu site ou loja",
    active: true
  },
  {
    name: "SMS",
    icon: Phone,
    description: "Envio e recebimento de SMS",
    active: false
  },
  {
    name: "Email",
    icon: Mail,
    description: "Integração com seu provedor de email",
    active: false
  },
  {
    name: "API Personalizada",
    icon: Globe,
    description: "Conecte com qualquer plataforma",
    active: false
  }
];
