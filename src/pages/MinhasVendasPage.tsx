import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Calendar,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Venda {
  id: string;
  produto: string;
  cliente: string;
  email: string;
  valor: number;
  status: "aprovado" | "pendente" | "cancelado" | "reembolsado";
  data: string;
  metodo: string;
}

const vendasMock: Venda[] = [
  {
    id: "VND-2024-001",
    produto: "Curso de Marketing Digital",
    cliente: "João Silva",
    email: "joao@email.com",
    valor: 297,
    status: "aprovado",
    data: "2024-01-15 14:30",
    metodo: "Cartão de Crédito"
  },
  {
    id: "VND-2024-002",
    produto: "Ebook Finanças",
    cliente: "Maria Santos",
    email: "maria@email.com",
    valor: 47,
    status: "aprovado",
    data: "2024-01-15 10:20",
    metodo: "PIX"
  },
  {
    id: "VND-2024-003",
    produto: "Mentoria Premium",
    cliente: "Carlos Oliveira",
    email: "carlos@email.com",
    valor: 997,
    status: "pendente",
    data: "2024-01-14 18:45",
    metodo: "Boleto"
  },
  {
    id: "VND-2024-004",
    produto: "Template Design",
    cliente: "Ana Costa",
    email: "ana@email.com",
    valor: 67,
    status: "cancelado",
    data: "2024-01-14 09:15",
    metodo: "Cartão de Crédito"
  },
  {
    id: "VND-2024-005",
    produto: "Curso Copywriting",
    cliente: "Rafael Lima",
    email: "rafael@email.com",
    valor: 197,
    status: "reembolsado",
    data: "2024-01-13 16:00",
    metodo: "PIX"
  }
];

const statusConfig = {
  aprovado: { label: "Aprovado", icon: CheckCircle2, color: "text-success bg-success/10 border-success/30" },
  pendente: { label: "Pendente", icon: Clock, color: "text-warning bg-warning/10 border-warning/30" },
  cancelado: { label: "Cancelado", icon: XCircle, color: "text-danger bg-danger/10 border-danger/30" },
  reembolsado: { label: "Reembolsado", icon: AlertCircle, color: "text-muted-foreground bg-muted/10 border-muted/30" }
};

export default function MinhasVendasPage() {
  const [pesquisa, setPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todas");

  const vendasFiltradas = vendasMock.filter(venda => {
    const matchPesquisa = pesquisa === "" || 
      venda.produto.toLowerCase().includes(pesquisa.toLowerCase()) ||
      venda.cliente.toLowerCase().includes(pesquisa.toLowerCase()) ||
      venda.id.toLowerCase().includes(pesquisa.toLowerCase());
    
    const matchStatus = filtroStatus === "todas" || venda.status === filtroStatus;
    
    return matchPesquisa && matchStatus;
  });

  const totalVendas = vendasFiltradas.length;
  const totalAprovado = vendasFiltradas.filter(v => v.status === "aprovado").reduce((acc, v) => acc + v.valor, 0);
  const totalPendente = vendasFiltradas.filter(v => v.status === "pendente").length;

  return (
    <div className="flex-1 flex flex-col min-h-screen cosmic-bg neural-pattern">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-card border-primary/30 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="text-primary animate-glow-pulse" size={24} />
                <span className="text-sm font-medium text-primary">Gestão de Vendas</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-cosmic">
                Minhas Vendas
              </h1>
              <p className="text-lg text-muted-foreground">
                Acompanhe todas as suas transações e gerencie pedidos em tempo real
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="glass-card border-border/50 hover-lift glow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/30">
                    <DollarSign className="text-primary" size={24} />
                  </div>
                  <TrendingUp className="text-success" size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Total Aprovado</p>
                  <p className="text-3xl font-bold text-gradient-cosmic">
                    R$ {totalAprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50 hover-lift glow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-secondary/10 ring-1 ring-secondary/30">
                    <Package className="text-secondary" size={24} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Total de Vendas</p>
                  <p className="text-3xl font-bold text-gradient-cosmic">{totalVendas}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50 hover-lift glow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-warning/10 ring-1 ring-warning/30">
                    <Clock className="text-warning" size={24} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Pendentes</p>
                  <p className="text-3xl font-bold text-gradient-cosmic">{totalPendente}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="glass-card border-border/50 animate-fade-in">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-gradient-cosmic">Lista de Vendas</CardTitle>
                  <CardDescription>Gerencie e acompanhe todas as transações</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2 glass-card border-primary/30">
                    <Filter size={16} />
                    Filtrar
                  </Button>
                  <Button variant="outline" className="gap-2 glass-card border-primary/30">
                    <Download size={16} />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Buscar por produto, cliente ou ID..."
                    className="pl-10 glass-card border-border/50"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                  />
                </div>
                <Tabs value={filtroStatus} onValueChange={setFiltroStatus} className="w-full md:w-auto">
                  <TabsList className="glass-card">
                    <TabsTrigger value="todas">Todas</TabsTrigger>
                    <TabsTrigger value="aprovado">Aprovadas</TabsTrigger>
                    <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                    <TabsTrigger value="cancelado">Canceladas</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Sales Table */}
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20 border-b border-border/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">ID</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Produto</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Valor</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Data</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendasFiltradas.map((venda, index) => {
                        const StatusIcon = statusConfig[venda.status].icon;
                        return (
                          <tr 
                            key={venda.id} 
                            className={cn(
                              "border-b border-border/30 hover:bg-primary/5 transition-colors",
                              index % 2 === 0 && "bg-muted/5"
                            )}
                          >
                            <td className="p-4">
                              <span className="font-mono text-sm text-primary">{venda.id}</span>
                            </td>
                            <td className="p-4">
                              <div>
                                <p className="font-semibold">{venda.produto}</p>
                                <p className="text-sm text-muted-foreground">{venda.metodo}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div>
                                <p className="font-medium">{venda.cliente}</p>
                                <p className="text-sm text-muted-foreground">{venda.email}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-gradient-cosmic">
                                R$ {venda.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </td>
                            <td className="p-4">
                              <Badge className={cn("gap-1 border", statusConfig[venda.status].color)}>
                                <StatusIcon size={14} />
                                {statusConfig[venda.status].label}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={14} />
                                {venda.data}
                              </div>
                            </td>
                            <td className="p-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Eye size={16} />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
