
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, ArrowDownToLine, Tag, Percent, Calendar, Clock, Trash, Copy, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for coupons
const mockCoupons = [
  { 
    id: 1, 
    codigo: "BLACK30", 
    tipo: "percentual", 
    valor: 30, 
    ativo: true, 
    usos: 157, 
    validade: "2025-11-30", 
    produtos: "Todos", 
    limitePorUsuario: 1 
  },
  { 
    id: 2, 
    codigo: "WELCOME20", 
    tipo: "percentual", 
    valor: 20, 
    ativo: true, 
    usos: 89, 
    validade: "2025-06-30", 
    produtos: "Curso Básico", 
    limitePorUsuario: 1 
  },
  { 
    id: 3, 
    codigo: "FRETE0", 
    tipo: "fixo", 
    valor: 15, 
    ativo: true, 
    usos: 43, 
    validade: "2025-05-15", 
    produtos: "Produtos Físicos", 
    limitePorUsuario: 1 
  },
  { 
    id: 4, 
    codigo: "ANIVERSARIO40", 
    tipo: "percentual", 
    valor: 40, 
    ativo: false, 
    usos: 203, 
    validade: "2024-02-28", 
    produtos: "Todos", 
    limitePorUsuario: 1 
  },
  { 
    id: 5, 
    codigo: "INFLUENCER50", 
    tipo: "percentual", 
    valor: 50, 
    ativo: true, 
    usos: 76, 
    validade: "2025-12-31", 
    produtos: "Curso Avançado", 
    limitePorUsuario: 5 
  },
];

// Estatísticas dos cupons
const estatisticas = [
  { label: "Cupons Ativos", valor: 4, icone: Tag, cor: "default" },
  { label: "Uso Médio", valor: "112 resgates", icone: Percent, cor: "success" },
  { label: "Impacto na Receita", valor: "-R$ 8.953,00", icone: ArrowDownToLine, cor: "warning" },
  { label: "Conversão Via Cupom", valor: "24%", icone: Calendar, cor: "info" },
];

export default function CuponsDescontoPage() {
  const [loaded, setLoaded] = useState(false);
  const [cupons, setCupons] = useState(mockCoupons);
  
  // Simula carregamento para animação
  useEffect(() => {
    if (!loaded) setLoaded(true);
  }, [loaded]);
  
  // Função para copiar código do cupom para o clipboard
  const copiarCupom = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    // Aqui poderia usar um toast para notificar que o cupom foi copiado
  };
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Cupons de Desconto</h1>
                <p className="text-muted-foreground">Gerencie cupons para aumentar suas vendas e conversões</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Novo Cupom
                </Button>
              </div>
            </div>
          </div>
          
          {/* Cards de estatísticas */}
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
            {estatisticas.map((item, index) => (
              <Card key={index} className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardDescription>{item.label}</CardDescription>
                    <item.icone size={20} className="text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{item.valor}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant={item.cor as any} className="text-xs">
                    {item.cor === "warning" ? "-12% na receita" : "+18% vs. mês anterior"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Lista de cupons */}
          <Card className={cn("bg-card border-border shadow-sm", loaded && "animate-fade-in")}>
            <CardHeader className="pb-2">
              <CardTitle>Meus Cupons</CardTitle>
              <CardDescription>Visualize e gerencie todos os seus cupons de desconto</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="inativos">Inativos</TabsTrigger>
                  <TabsTrigger value="expirados">Expirados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Pesquisar cupons..."
                        className="pl-9 bg-background"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Usos</TableHead>
                          <TableHead>Validade</TableHead>
                          <TableHead>Produtos</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cupons.map((cupom) => (
                          <TableRow key={cupom.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Tag size={16} className="text-muted-foreground" />
                                {cupom.codigo}
                              </div>
                            </TableCell>
                            <TableCell>
                              {cupom.tipo === "percentual" ? "Percentual" : "Valor Fixo"}
                            </TableCell>
                            <TableCell>
                              {cupom.tipo === "percentual" ? `${cupom.valor}%` : `R$ ${cupom.valor},00`}
                            </TableCell>
                            <TableCell>
                              <Badge variant={cupom.ativo ? "success" : "destructive"} className="text-xs">
                                {cupom.ativo ? "Ativo" : "Inativo"}
                              </Badge>
                            </TableCell>
                            <TableCell>{cupom.usos} resgates</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock size={14} className="text-muted-foreground" />
                                {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs font-normal">
                                {cupom.produtos}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" title="Copiar código" onClick={() => copiarCupom(cupom.codigo)}>
                                  <Copy size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" title="Ver detalhes">
                                  <Eye size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" title="Excluir cupom">
                                  <Trash size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="ativos">
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Visualizando cupons ativos...</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="inativos">
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Visualizando cupons inativos...</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="expirados">
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Visualizando cupons expirados...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Formulário para criar novo cupom - Placeholder */}
          <Card className={cn("bg-card border-border shadow-sm", loaded && "animate-fade-in")}>
            <CardHeader>
              <CardTitle>Como funcionam os Cupons</CardTitle>
              <CardDescription>Dicas para criar cupons eficientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Tipos de descontos</h3>
                <p className="text-sm text-muted-foreground">Você pode criar cupons com descontos percentuais (ex: 20% off) ou de valor fixo (ex: R$ 50 off).</p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Estratégias eficientes</h3>
                <p className="text-sm text-muted-foreground">Use cupons com tempo limitado para criar urgência, ou cupons para recuperação de carrinhos abandonados.</p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Limitações e regras</h3>
                <p className="text-sm text-muted-foreground">Defina limites por usuário, valor mínimo de compra ou produtos específicos para otimizar suas campanhas.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
