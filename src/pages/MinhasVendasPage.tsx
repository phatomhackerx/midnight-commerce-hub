
import { useState } from "react";
import Header from "@/components/Header";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Filter, 
  Search, 
  MoreVertical, 
  Eye, 
  FileText,
  ArrowUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for orders
const orders = [
  {
    id: "#9834",
    customer: "João Silva",
    product: "Curso de Marketing Digital",
    date: "09/04/2025",
    amount: "R$ 297,00",
    status: "completed",
    paymentMethod: "credit_card"
  },
  {
    id: "#9833",
    customer: "Maria Oliveira",
    product: "E-book: Vendas Online",
    date: "09/04/2025",
    amount: "R$ 47,90",
    status: "processing",
    paymentMethod: "pix"
  },
  {
    id: "#9832",
    customer: "Carlos Eduardo",
    product: "Mentoria Premium",
    date: "08/04/2025",
    amount: "R$ 1.997,00",
    status: "completed",
    paymentMethod: "credit_card"
  },
  {
    id: "#9831",
    customer: "Ana Beatriz",
    product: "Planilha de Gestão Financeira",
    date: "08/04/2025",
    amount: "R$ 37,00",
    status: "refunded",
    paymentMethod: "boleto"
  },
  {
    id: "#9830",
    customer: "Pedro Henrique",
    product: "Curso de Copywriting",
    date: "07/04/2025",
    amount: "R$ 197,00",
    status: "failed",
    paymentMethod: "credit_card"
  },
  {
    id: "#9829",
    customer: "Juliana Santos",
    product: "Template de Email Marketing",
    date: "07/04/2025",
    amount: "R$ 67,00",
    status: "completed",
    paymentMethod: "pix"
  },
  {
    id: "#9828",
    customer: "Roberto Almeida",
    product: "Acesso ao Grupo VIP",
    date: "06/04/2025",
    amount: "R$ 97,00",
    status: "processing",
    paymentMethod: "picpay"
  }
];

export default function MinhasVendasPage() {
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
            <h1 className="text-2xl font-bold">Minhas Vendas</h1>
            <p className="text-muted-foreground">Gerencie todas as suas vendas e acompanhe o status dos pedidos.</p>
          </div>
          
          <div className={cn("flex flex-col gap-6", loaded && "animate-fade-in")}>
            {/* Resumo das vendas em cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Total de Vendas (Hoje)</CardDescription>
                  <CardTitle className="text-2xl">R$ 2.367,90</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-success flex items-center">
                    <span className="inline-block mr-1">+12%</span> comparado a ontem
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Pedidos (Hoje)</CardDescription>
                  <CardTitle className="text-2xl">17</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-success flex items-center">
                    <span className="inline-block mr-1">+5</span> comparado a ontem
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Taxa de Aprovação</CardDescription>
                  <CardTitle className="text-2xl">96.7%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Últimos 30 dias
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Ticket Médio</CardDescription>
                  <CardTitle className="text-2xl">R$ 139,29</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-warning flex items-center">
                    <span className="inline-block mr-1">-3.5%</span> últimos 7 dias
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Filtros e tabela de vendas */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Pedidos Recentes</CardTitle>
                    <CardDescription>Gerencie seus pedidos e acompanhe o status.</CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="todos" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="processando">Processando</TabsTrigger>
                    <TabsTrigger value="completos">Completos</TabsTrigger>
                    <TabsTrigger value="falhas">Falhas</TabsTrigger>
                    <TabsTrigger value="reembolsos">Reembolsos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="todos">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Pesquisar pedido, cliente ou produto..."
                          className="pl-9 bg-background"
                        />
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Pedido</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Pagamento</TableHead>
                          <TableHead className="w-[70px]">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "bg-muted border-0 text-foreground",
                                  order.status === "completed" && "bg-success/10 border-success text-success",
                                  order.status === "processing" && "bg-info/10 text-info",
                                  order.status === "failed" && "bg-danger/10 text-danger",
                                  order.status === "refunded" && "bg-warning/10 text-warning",
                                )}
                              >
                                {order.status === "completed" && "Completo"}
                                {order.status === "processing" && "Processando"}
                                {order.status === "failed" && "Falha"}
                                {order.status === "refunded" && "Reembolsado"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-0 bg-secondary"
                              >
                                {order.paymentMethod === "credit_card" && "Cartão"}
                                {order.paymentMethod === "pix" && "PIX"}
                                {order.paymentMethod === "boleto" && "Boleto"}
                                {order.paymentMethod === "picpay" && "PicPay"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Ações</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background border-border">
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>Ver detalhes</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span>Gerar nota</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Mostrando 7 de 243 pedidos
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled>Anterior</Button>
                        <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm">Próximo</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="processando">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando pedidos em processamento...</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completos">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando pedidos completos...</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="falhas">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando pedidos com falhas...</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reembolsos">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando pedidos reembolsados...</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
