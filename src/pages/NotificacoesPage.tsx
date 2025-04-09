
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Archive, 
  Bell, 
  BellOff, 
  Check, 
  ChevronDown, 
  Clock, 
  Dollar, 
  Filter, 
  MoreHorizontal, 
  Settings, 
  ShoppingCart, 
  Trash, 
  User 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function NotificacoesPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[800px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Notificações</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings size={16} />
                  <span>Configurações</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Check size={16} />
                  <span>Marcar Todas como Lidas</span>
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Gerencie suas notificações e atualizações do sistema.</p>
          </div>
          
          <Tabs defaultValue="todas" className={cn(loaded && "animate-fade-in transition-all duration-500")}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="nao-lidas">
                  Não Lidas
                  <Badge className="ml-1.5 bg-primary">{notificacoes.filter(n => !n.lida).length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="arquivadas">Arquivadas</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Filter size={16} />
                  <span>Filtrar</span>
                  <ChevronDown size={14} />
                </Button>
              </div>
            </div>
            
            <TabsContent value="todas" className="space-y-4">
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Hoje</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {notificacoes
                    .filter(n => n.tempo.includes("minutos") || n.tempo.includes("hora"))
                    .map((notificacao, index) => (
                      <NotificacaoItem key={index} notificacao={notificacao} />
                    ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Esta Semana</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {notificacoes
                    .filter(n => n.tempo.includes("dia") || n.tempo.includes("dias"))
                    .map((notificacao, index) => (
                      <NotificacaoItem key={index} notificacao={notificacao} />
                    ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Anteriores</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {notificacoes
                    .filter(n => n.tempo.includes("semana") || n.tempo.includes("mês"))
                    .map((notificacao, index) => (
                      <NotificacaoItem key={index} notificacao={notificacao} />
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nao-lidas" className="space-y-4">
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Não Lidas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {notificacoes
                    .filter(n => !n.lida)
                    .map((notificacao, index) => (
                      <NotificacaoItem key={index} notificacao={notificacao} />
                    ))}
                </CardContent>
              </Card>
              
              {notificacoes.filter(n => !n.lida).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                    <Bell size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Sem notificações não lidas</h3>
                  <p className="text-sm text-muted-foreground">
                    Você está em dia com todas as suas notificações.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="arquivadas" className="space-y-4">
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Arquivadas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {notificacoesArquivadas.map((notificacao, index) => (
                    <NotificacaoItem key={index} notificacao={notificacao} arquivada />
                  ))}
                </CardContent>
              </Card>
              
              {notificacoesArquivadas.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                    <Archive size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Sem notificações arquivadas</h3>
                  <p className="text-sm text-muted-foreground">
                    Você não tem notificações arquivadas.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <Card className={cn("border-primary/20", loaded && "animate-fade-in")}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>Preferências de Notificação</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Controle quais tipos de notificações você deseja receber.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Vendas</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Notificações sobre novas vendas e pedidos.
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Marketing</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Dicas e atualizações sobre marketing e promoções.
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Atualizações do Sistema</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Notificações sobre novas funcionalidades e melhorias.
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Segurança</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Alertas de segurança e atividades suspeitas.
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" className="gap-1">
                  <BellOff size={16} />
                  <span>Desativar Todas</span>
                </Button>
                <Button className="gap-1">
                  <Save size={16} />
                  <span>Salvar Preferências</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Componente para exibir um item de notificação
function NotificacaoItem({ notificacao, arquivada = false }) {
  return (
    <div className={cn(
      "p-4 flex gap-3 border-b last:border-b-0 transition-colors",
      !notificacao.lida && !arquivada && "bg-primary/5",
      !arquivada && "hover:bg-muted/50"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        notificacao.tipo === "venda" && "bg-success/10 text-success",
        notificacao.tipo === "sistema" && "bg-primary/10 text-primary",
        notificacao.tipo === "financeiro" && "bg-info/10 text-info",
        notificacao.tipo === "alerta" && "bg-warning/10 text-warning",
        notificacao.tipo === "usuario" && "bg-secondary/30 text-secondary-foreground"
      )}>
        {notificacao.tipo === "venda" && <ShoppingCart size={18} />}
        {notificacao.tipo === "sistema" && <Bell size={18} />}
        {notificacao.tipo === "financeiro" && <Dollar size={18} />}
        {notificacao.tipo === "alerta" && <AlertTriangle size={18} />}
        {notificacao.tipo === "usuario" && <User size={18} />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={cn(
              "font-medium",
              !notificacao.lida && !arquivada && "text-foreground",
              (notificacao.lida || arquivada) && "text-muted-foreground"
            )}>{notificacao.titulo}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{notificacao.descricao}</p>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
            <Clock size={12} />
            <span>{notificacao.tempo}</span>
          </div>
        </div>
        
        {notificacao.acao && (
          <div className="mt-2">
            <Button variant="outline" size="sm" className="text-xs h-8">
              {notificacao.acao}
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
        
        {!arquivada ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Archive size={16} />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
            <Trash size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}

// Componente Save para o ícone de salvar
const Save = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

// Componente AlertTriangle para o ícone de alerta
const AlertTriangle = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// Dados fictícios para as notificações
const notificacoes = [
  {
    tipo: "venda",
    titulo: "Nova venda realizada",
    descricao: "Você recebeu um novo pedido no valor de R$ 297,00.",
    tempo: "10 minutos atrás",
    lida: false,
    acao: "Ver Pedido"
  },
  {
    tipo: "sistema",
    titulo: "Atualização do sistema",
    descricao: "Uma nova versão do sistema está disponível com melhorias de desempenho.",
    tempo: "1 hora atrás",
    lida: false
  },
  {
    tipo: "financeiro",
    titulo: "Pagamento recebido",
    descricao: "Você recebeu um pagamento de R$ 1.250,00 em sua conta.",
    tempo: "3 horas atrás",
    lida: true,
    acao: "Ver Transação"
  },
  {
    tipo: "venda",
    titulo: "Pedido enviado",
    descricao: "O pedido #12345 foi enviado com sucesso.",
    tempo: "1 dia atrás",
    lida: true
  },
  {
    tipo: "alerta",
    titulo: "Estoque baixo",
    descricao: "O produto 'Curso Avançado' está com estoque baixo.",
    tempo: "2 dias atrás",
    lida: false,
    acao: "Gerenciar Estoque"
  },
  {
    tipo: "usuario",
    titulo: "Novo seguidor",
    descricao: "Maria Silva começou a seguir sua loja.",
    tempo: "3 dias atrás",
    lida: true
  },
  {
    tipo: "sistema",
    titulo: "Nova funcionalidade disponível",
    descricao: "A função de relatórios avançados já está disponível para seu plano.",
    tempo: "5 dias atrás",
    lida: false,
    acao: "Explorar"
  },
  {
    tipo: "financeiro",
    titulo: "Fatura emitida",
    descricao: "A fatura do mês de maio foi emitida.",
    tempo: "1 semana atrás",
    lida: true,
    acao: "Ver Fatura"
  },
  {
    tipo: "sistema",
    titulo: "Lembrete de backup",
    descricao: "Faça o backup dos seus dados regularmente para evitar perdas.",
    tempo: "2 semanas atrás",
    lida: true
  },
  {
    tipo: "venda",
    titulo: "Relatório mensal",
    descricao: "Seu relatório mensal de vendas está disponível.",
    tempo: "1 mês atrás",
    lida: true,
    acao: "Ver Relatório"
  }
];

// Dados fictícios para as notificações arquivadas
const notificacoesArquivadas = [
  {
    tipo: "sistema",
    titulo: "Manutenção programada",
    descricao: "Haverá uma manutenção programada no sistema no dia 15/04.",
    tempo: "2 meses atrás",
    lida: true
  },
  {
    tipo: "financeiro",
    titulo: "Alteração de tarifas",
    descricao: "As tarifas de processamento de pagamento serão atualizadas.",
    tempo: "3 meses atrás",
    lida: true
  },
  {
    tipo: "usuario",
    titulo: "Aniversário de conta",
    descricao: "Parabéns! Sua conta completou 1 ano conosco.",
    tempo: "6 meses atrás",
    lida: true
  }
];
