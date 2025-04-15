
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  CalendarClock, 
  Filter, 
  Plus, 
  RefreshCw, 
  Settings, 
  Tag, 
  Download, 
  CreditCard, 
  Mail, 
  Users, 
  AlertTriangle,
  Search
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AssinaturasPage() {
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const { toast } = useToast();
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);

  // Filtrar assinaturas
  const filteredAssinaturas = assinaturas.filter(assinatura => {
    const matchSearchTerm = searchTerm === "" || 
      assinatura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assinatura.plano.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === "all" || assinatura.status === statusFilter;
    
    return matchSearchTerm && matchStatus;
  });

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleExportData = () => {
    toast({
      title: "Exportação Iniciada",
      description: "Os dados das assinaturas estão sendo exportados para CSV.",
    });
  };

  const handleRenovarAssinatura = (cliente: string) => {
    toast({
      title: "Renovação processada",
      description: `A assinatura de ${cliente} foi renovada com sucesso.`,
      variant: "default",
    });
  };

  const handleCancelarAssinatura = (cliente: string) => {
    toast({
      title: "Assinatura cancelada",
      description: `A assinatura de ${cliente} foi cancelada.`,
      variant: "destructive",
    });
  };

  const handleSendEmail = () => {
    setShowComposeEmail(false);
    toast({
      title: "Email enviado",
      description: "O email foi enviado para todos os assinantes selecionados.",
      variant: "default",
    });
  };
  
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar cliente ou plano..."
                      className="pl-10 pr-4 py-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="Ativa">Ativa</SelectItem>
                      <SelectItem value="Atrasada">Atrasada</SelectItem>
                      <SelectItem value="Suspensa">Suspensa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Dialog open={showComposeEmail} onOpenChange={setShowComposeEmail}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Mail size={16} />
                        <span>Email em Massa</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Enviar Email para Assinantes</DialogTitle>
                        <DialogDescription>
                          Envie um email para todos os assinantes filtrados atualmente.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Assunto</label>
                          <Input placeholder="Digite o assunto do email" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mensagem</label>
                          <textarea 
                            className="w-full min-h-[150px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                            placeholder="Digite sua mensagem aqui..."
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="incluir-atrasados" className="rounded" />
                          <label htmlFor="incluir-atrasados" className="text-sm">Incluir apenas assinantes com pagamento atrasado</label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowComposeEmail(false)}>Cancelar</Button>
                        <Button onClick={handleSendEmail}>Enviar Email</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" className="gap-1" onClick={handleExportData}>
                    <Download size={16} />
                    <span>Exportar</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw size={16} />
                    <span>Atualizar</span>
                  </Button>
                </div>
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
                      {filteredAssinaturas.length > 0 ? (
                        filteredAssinaturas.map((assinatura, index) => (
                          <TableRow key={index} className="transition-colors hover:bg-muted/30">
                            <TableCell className="font-medium">{assinatura.cliente}</TableCell>
                            <TableCell>{assinatura.plano}</TableCell>
                            <TableCell>{assinatura.valor}</TableCell>
                            <TableCell>
                              <Badge variant={
                                assinatura.status === "Ativa" ? "success" : 
                                assinatura.status === "Atrasada" ? "destructive" : 
                                assinatura.status === "Suspensa" ? "warning" : 
                                "outline"
                              }>
                                {assinatura.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{assinatura.proximaCobranca}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="sm" 
                                  onClick={() => handleRenovarAssinatura(assinatura.cliente)}
                                  className="text-green-600"
                                >
                                  <CreditCard size={16} />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" 
                                  onClick={() => handleCancelarAssinatura(assinatura.cliente)}
                                  className="text-destructive"
                                >
                                  <AlertTriangle size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            Nenhuma assinatura encontrada com os filtros selecionados.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between p-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">{filteredAssinaturas.length}</span> de <span className="font-medium">{assinaturas.length}</span> assinaturas
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
