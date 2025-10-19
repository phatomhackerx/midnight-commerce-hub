
import { useState } from "react";
import Header from "@/components/Header";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Download, 
  FileText, 
  Filter, 
  PieChart, 
  RefreshCw, 
  Share2, 
  TrendingUp 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function RelatoriosPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Relatórios</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw size={16} />
                  <span>Atualizar</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download size={16} />
                  <span>Exportar</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <FileText size={16} />
                  <span>Novo Relatório</span>
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Analise e gerencie todos os relatórios da sua loja.</p>
          </div>
          
          <Tabs defaultValue="vendas" className={cn(loaded && "animate-fade-in transition-all duration-500")}>
            <div className="border-b">
              <TabsList className="bg-transparent w-full justify-start">
                <TabsTrigger value="vendas" className="data-[state=active]:bg-background">
                  Vendas
                </TabsTrigger>
                <TabsTrigger value="clientes" className="data-[state=active]:bg-background">
                  Clientes
                </TabsTrigger>
                <TabsTrigger value="produtos" className="data-[state=active]:bg-background">
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="data-[state=active]:bg-background">
                  Financeiro
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="vendas" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Vendas Totais</span>
                      <BarChart size={20} className="text-primary" />
                    </CardTitle>
                    <CardDescription>Total acumulado no período</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">R$ 67.890,00</div>
                    <div className="flex items-center gap-1 text-sm text-success mt-1">
                      <TrendingUp size={16} />
                      <span>+12,5% vs. mês anterior</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Ticket Médio</span>
                      <PieChart size={20} className="text-primary" />
                    </CardTitle>
                    <CardDescription>Valor médio por pedido</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">R$ 157,32</div>
                    <div className="flex items-center gap-1 text-sm text-success mt-1">
                      <TrendingUp size={16} />
                      <span>+3,8% vs. mês anterior</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Conversão</span>
                      <TrendingUp size={20} className="text-primary" />
                    </CardTitle>
                    <CardDescription>Taxa de conversão do período</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3.7%</div>
                    <div className="flex items-center gap-1 text-sm text-success mt-1">
                      <TrendingUp size={16} />
                      <span>+0,5% vs. mês anterior</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Relatórios de Vendas</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Filter size={16} />
                        <span>Filtrar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share2 size={16} />
                        <span>Compartilhar</span>
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Relatórios gerados nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatorios.map((relatorio) => (
                          <TableRow key={relatorio.id} className="transition-colors hover:bg-muted/30">
                            <TableCell className="font-medium">{relatorio.nome}</TableCell>
                            <TableCell>{relatorio.tipo}</TableCell>
                            <TableCell>{relatorio.data}</TableCell>
                            <TableCell>
                              <Badge variant={relatorio.status === "Concluído" ? "default" : "outline"}>
                                {relatorio.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clientes" className="pt-4">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Relatórios de Clientes</CardTitle>
                  <CardDescription>Analise o comportamento dos seus clientes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Input placeholder="Buscar relatório..." className="w-[250px]" />
                      <Button variant="outline" size="icon">
                        <Filter size={16} />
                      </Button>
                    </div>
                    <Button className="gap-1">
                      <FileText size={16} />
                      <span>Gerar Relatório</span>
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Atualização</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Novos Clientes</TableCell>
                          <TableCell>Relatório de novos clientes cadastrados</TableCell>
                          <TableCell>Diária</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Segmentação</TableCell>
                          <TableCell>Segmentação de clientes por comportamento</TableCell>
                          <TableCell>Semanal</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Retenção</TableCell>
                          <TableCell>Taxas de retenção e recorrência</TableCell>
                          <TableCell>Mensal</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="produtos" className="pt-4">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Relatórios de Produtos</CardTitle>
                  <CardDescription>Analise o desempenho dos seus produtos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Input placeholder="Buscar relatório..." className="w-[250px]" />
                      <Button variant="outline" size="icon">
                        <Filter size={16} />
                      </Button>
                    </div>
                    <Button className="gap-1">
                      <FileText size={16} />
                      <span>Gerar Relatório</span>
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Atualização</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Mais Vendidos</TableCell>
                          <TableCell>Lista de produtos mais vendidos</TableCell>
                          <TableCell>Diária</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Estoque Baixo</TableCell>
                          <TableCell>Produtos com estoque abaixo do mínimo</TableCell>
                          <TableCell>Diária</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Desempenho</TableCell>
                          <TableCell>Análise completa de desempenho</TableCell>
                          <TableCell>Semanal</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financeiro" className="pt-4">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Relatórios Financeiros</CardTitle>
                  <CardDescription>Análise financeira e contábil do seu negócio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Input placeholder="Buscar relatório..." className="w-[250px]" />
                      <Button variant="outline" size="icon">
                        <Filter size={16} />
                      </Button>
                    </div>
                    <Button className="gap-1">
                      <FileText size={16} />
                      <span>Gerar Relatório</span>
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Atualização</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Faturamento</TableCell>
                          <TableCell>Relatório completo de faturamento</TableCell>
                          <TableCell>Mensal</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Lucratividade</TableCell>
                          <TableCell>Análise de margem e lucratividade</TableCell>
                          <TableCell>Mensal</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">Impostos</TableCell>
                          <TableCell>Relatório fiscal e tributário</TableCell>
                          <TableCell>Trimestral</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download size={16} />
                              <span>Baixar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

// Dados fictícios para a tabela de relatórios
const relatorios = [
  {
    id: 1,
    nome: "Vendas Mensais - Maio/2024",
    tipo: "Vendas",
    data: "01/06/2024",
    status: "Concluído"
  },
  {
    id: 2,
    nome: "Produtos Mais Vendidos",
    tipo: "Produtos",
    data: "28/05/2024",
    status: "Concluído"
  },
  {
    id: 3,
    nome: "Análise de Conversão",
    tipo: "Marketing",
    data: "25/05/2024",
    status: "Concluído"
  },
  {
    id: 4,
    nome: "Faturamento Trimestral",
    tipo: "Financeiro",
    data: "01/04/2024",
    status: "Em processamento"
  },
  {
    id: 5,
    nome: "Projeção de Vendas",
    tipo: "Análise",
    data: "15/05/2024",
    status: "Concluído"
  }
];
