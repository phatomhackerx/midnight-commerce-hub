
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CalendarClock, Filter, Plus, RefreshCw, Settings, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AssinaturasPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Assinaturas</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings size={16} />
                  <span>Configurações</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Nova Assinatura</span>
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Gerencie todas as assinaturas ativas e recorrentes.</p>
          </div>
          
          <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
            <Card className="bg-primary/5 border-primary/20 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total de Assinaturas</CardTitle>
                <CardDescription>Assinaturas ativas no momento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">347</div>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Receita Mensal</CardTitle>
                <CardDescription>Faturamento recorrente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 12.450,00</div>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Assinaturas Novas</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">29</div>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cancelamentos</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="assinaturas" className={cn(loaded && "animate-fade-in transition-all duration-500")}>
            <TabsList>
              <TabsTrigger value="assinaturas">Assinaturas</TabsTrigger>
              <TabsTrigger value="planos">Planos</TabsTrigger>
              <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assinaturas" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter size={16} />
                  <span>Filtrar</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw size={16} />
                  <span>Atualizar</span>
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Próx. Cobrança</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assinaturas.map((assinatura, index) => (
                        <TableRow key={index} className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">{assinatura.cliente}</TableCell>
                          <TableCell>{assinatura.plano}</TableCell>
                          <TableCell>{assinatura.valor}</TableCell>
                          <TableCell>
                            <Badge variant={
                              assinatura.status === "Ativa" ? "default" : 
                              assinatura.status === "Atrasada" ? "destructive" : 
                              "outline"
                            }>
                              {assinatura.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{assinatura.proximaCobranca}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Settings size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between p-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">10</span> de <span className="font-medium">347</span> assinaturas
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>Anterior</Button>
                    <Button variant="outline" size="sm">Próxima</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="planos" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter size={16} />
                  <span>Filtrar</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Novo Plano</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {planos.map((plano, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{plano.nome}</CardTitle>
                        <Badge className="bg-primary">{plano.tipo}</Badge>
                      </div>
                      <CardDescription>{plano.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Valor:</span>
                          <span className="font-bold">{plano.valor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Período:</span>
                          <span>{plano.periodo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inscritos:</span>
                          <span>{plano.inscritos}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Settings size={16} />
                        <span>Editar</span>
                      </Button>
                      <Button size="sm" className="w-full gap-1">
                        <CalendarClock size={16} />
                        <span>Assinantes</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="configuracoes" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Assinaturas</CardTitle>
                  <CardDescription>Defina as configurações gerais para todas as assinaturas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">Opções de Cobranças</h3>
                    <p className="text-sm text-muted-foreground">Configure as opções de cobranças automáticas</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Métodos de Pagamento</Button>
                      <Button variant="outline" size="sm">Notificações</Button>
                      <Button variant="outline" size="sm">Tentativas de Cobrança</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-medium">Políticas de Cancelamento</h3>
                    <p className="text-sm text-muted-foreground">Defina as políticas de cancelamento e reembolso</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Período Mínimo</Button>
                      <Button variant="outline" size="sm">Reembolsos</Button>
                      <Button variant="outline" size="sm">Pesquisa de Saída</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-medium">Descontos e Promoções</h3>
                    <p className="text-sm text-muted-foreground">Configure descontos automáticos e promoções</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Tag size={16} />
                        <span>Cupons</span>
                      </Button>
                      <Button variant="outline" size="sm">Descontos por Tempo</Button>
                      <Button variant="outline" size="sm">Pacotes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

// Dados fictícios para a lista de assinaturas
const assinaturas = [
  { cliente: "Bruno Silva", plano: "Premium Anual", valor: "R$ 97,00/mês", status: "Ativa", proximaCobranca: "15/06/2024" },
  { cliente: "Maria Santos", plano: "Pro Mensal", valor: "R$ 49,90/mês", status: "Ativa", proximaCobranca: "03/06/2024" },
  { cliente: "Carlos Gomes", plano: "Basic Mensal", valor: "R$ 29,90/mês", status: "Atrasada", proximaCobranca: "01/06/2024" },
  { cliente: "Ana Ferreira", plano: "Pro Anual", valor: "R$ 39,90/mês", status: "Ativa", proximaCobranca: "12/06/2024" },
  { cliente: "Lucas Oliveira", plano: "Premium Mensal", valor: "R$ 119,90/mês", status: "Ativa", proximaCobranca: "08/06/2024" },
  { cliente: "Juliana Costa", plano: "Pro Mensal", valor: "R$ 49,90/mês", status: "Suspensa", proximaCobranca: "10/06/2024" },
  { cliente: "Fernando Lima", plano: "Basic Anual", valor: "R$ 19,90/mês", status: "Ativa", proximaCobranca: "20/06/2024" },
  { cliente: "Rafaela Souza", plano: "Premium Anual", valor: "R$ 97,00/mês", status: "Ativa", proximaCobranca: "05/06/2024" },
  { cliente: "Ricardo Martins", plano: "Pro Mensal", valor: "R$ 49,90/mês", status: "Ativa", proximaCobranca: "22/06/2024" },
  { cliente: "Patrícia Santos", plano: "Basic Mensal", valor: "R$ 29,90/mês", status: "Ativa", proximaCobranca: "17/06/2024" }
];

// Dados fictícios para os planos de assinatura
const planos = [
  {
    nome: "Basic",
    tipo: "Mensal",
    descricao: "Plano básico com funcionalidades essenciais",
    valor: "R$ 29,90/mês",
    periodo: "Mensal",
    inscritos: "127 assinantes"
  },
  {
    nome: "Basic",
    tipo: "Anual",
    descricao: "Plano básico com desconto anual",
    valor: "R$ 19,90/mês",
    periodo: "Anual",
    inscritos: "48 assinantes"
  },
  {
    nome: "Pro",
    tipo: "Mensal",
    descricao: "Plano profissional com mais recursos",
    valor: "R$ 49,90/mês",
    periodo: "Mensal",
    inscritos: "96 assinantes"
  },
  {
    nome: "Pro",
    tipo: "Anual",
    descricao: "Plano profissional com desconto anual",
    valor: "R$ 39,90/mês",
    periodo: "Anual",
    inscritos: "52 assinantes"
  },
  {
    nome: "Premium",
    tipo: "Mensal",
    descricao: "Plano premium com todos os recursos",
    valor: "R$ 119,90/mês",
    periodo: "Mensal",
    inscritos: "13 assinantes"
  },
  {
    nome: "Premium",
    tipo: "Anual",
    descricao: "Plano premium com desconto anual",
    valor: "R$ 97,00/mês",
    periodo: "Anual",
    inscritos: "11 assinantes"
  }
];
