
import React, { useState } from "react";
import { 
  BadgeCheck, 
  Wallet, 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  Filter, 
  Download,
  DollarSign,
  Building,
  CreditCard,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

// Dados fictícios para saldo financeiro
const saldoInfo = {
  saldoDisponivel: 12580.45,
  saldoBloqueado: 3240.60,
  proximoSaque: "15/04/2025",
  ultimoSaque: "15/03/2025",
};

// Dados fictícios para gráfico financeiro
const dadosFinanceiros = [
  { name: "Jan", saldo: 5400 },
  { name: "Fev", saldo: 7200 },
  { name: "Mar", saldo: 9100 },
  { name: "Abr", saldo: 8500 },
  { name: "Mai", saldo: 10200 },
  { name: "Jun", saldo: 11500 },
  { name: "Jul", saldo: 12580 },
];

// Dados fictícios para transações
const transacoes = [
  { 
    id: 1, 
    data: "09/04/2025", 
    tipo: "venda", 
    descricao: "Venda de produto - Curso de Marketing Digital", 
    valor: 249.90,
    status: "confirmado" 
  },
  { 
    id: 2, 
    data: "08/04/2025", 
    tipo: "saque", 
    descricao: "Saque para conta bancária", 
    valor: -5000.00,
    status: "processando" 
  },
  { 
    id: 3, 
    data: "05/04/2025", 
    tipo: "venda", 
    descricao: "Venda de produto - E-book Finanças Pessoais", 
    valor: 39.90,
    status: "confirmado" 
  },
  { 
    id: 4, 
    data: "01/04/2025", 
    tipo: "taxa", 
    descricao: "Taxa de processamento", 
    valor: -24.50,
    status: "confirmado" 
  },
  { 
    id: 5, 
    data: "29/03/2025", 
    tipo: "venda", 
    descricao: "Assinatura - Plano Premium", 
    valor: 99.90,
    status: "confirmado" 
  },
  { 
    id: 6, 
    data: "25/03/2025", 
    tipo: "venda", 
    descricao: "Venda de produto - Curso Completo", 
    valor: 497.00,
    status: "estornado" 
  },
  { 
    id: 7, 
    data: "20/03/2025", 
    tipo: "venda", 
    descricao: "Venda de produto - Template Premium", 
    valor: 147.00,
    status: "confirmado" 
  },
  { 
    id: 8, 
    data: "15/03/2025", 
    tipo: "saque", 
    descricao: "Saque para conta bancária", 
    valor: -4000.00,
    status: "confirmado" 
  },
];

// Lista de contas bancárias cadastradas
const contasBancarias = [
  { id: 1, banco: "Banco Digital", tipo: "Corrente", agencia: "0001", conta: "12345-6", titular: "Usuário Teste" },
  { id: 2, banco: "Banco Tradicional", tipo: "Poupança", agencia: "4567", conta: "78901-2", titular: "Usuário Teste" },
];

// Formas de pagamento aceitas
const formasPagamento = [
  { id: 1, nome: "Cartão de Crédito", ativa: true, taxa: "2.99% + R$ 0,39 por transação" },
  { id: 2, nome: "Boleto Bancário", ativa: true, taxa: "R$ 3,49 por boleto" },
  { id: 3, nome: "Pix", ativa: true, taxa: "0.99% por transação" },
  { id: 4, nome: "PayPal", ativa: false, taxa: "4.99% por transação" },
];

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState("extrato");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  
  // Filtrar transações com base no status
  const transacoesFiltradas = filtroStatus === "todos" 
    ? transacoes 
    : transacoes.filter(t => t.status === filtroStatus);

  const handleSolicitarSaque = () => {
    toast("Solicitação de saque enviada com sucesso!", {
      description: "O valor solicitado será processado em até 2 dias úteis."
    });
  };
  
  const handleAdicionarConta = () => {
    toast("Em breve você poderá adicionar novas contas bancárias.", {
      description: "Esta funcionalidade está em desenvolvimento."
    });
  };

  const handleAtivarFormaPagamento = (id: number) => {
    toast("Forma de pagamento atualizada com sucesso!", {
      description: "As alterações foram salvas."
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Gerencie seu saldo, saques e formas de pagamento.
        </p>
      </div>

      {/* Cards de Saldo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="premium-card">
          <CardHeader className="pb-2">
            <CardDescription>Saldo Disponível</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-green-500">
              R$ {saldoInfo.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <Button 
              onClick={handleSolicitarSaque}
              className="w-full grok-button"
            >
              Solicitar Saque
            </Button>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              Próximo saque programado: {saldoInfo.proximoSaque}
            </p>
          </CardFooter>
        </Card>

        <Card className="premium-card">
          <CardHeader className="pb-2">
            <CardDescription>Saldo Bloqueado</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-amber-500">
              R$ {saldoInfo.saldoBloqueado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm">Valor em análise ou processamento</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">
              Liberação em até 14 dias úteis
            </p>
          </CardFooter>
        </Card>

        <Card className="premium-card sm:col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Evolução do Saldo</CardDescription>
          </CardHeader>
          <CardContent className="h-[160px] sm:h-[200px] lg:h-[240px]">
            <ChartContainer
              config={{
                saldo: {
                  label: "Saldo",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dadosFinanceiros} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    className="text-xs"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    width={45}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        className="bg-card/95 backdrop-blur-sm"
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="saldo"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSaldo)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para Extrato, Contas e Formas de Pagamento */}
      <Tabs defaultValue="extrato" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 sm:mb-8 h-auto sm:h-10">
          <TabsTrigger value="extrato" className="text-sm">Extrato</TabsTrigger>
          <TabsTrigger value="contas" className="text-sm">Contas Bancárias</TabsTrigger>
          <TabsTrigger value="pagamentos" className="text-sm">Formas de Pagamento</TabsTrigger>
        </TabsList>

        {/* Tab Extrato */}
        <TabsContent value="extrato" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar transação..." 
                  className="max-w-[300px] pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="confirmado">Confirmados</SelectItem>
                  <SelectItem value="processando">Em processamento</SelectItem>
                  <SelectItem value="estornado">Estornados</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Exportar
              </Button>
            </div>
          </div>

          <Card className="premium-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[90px]">Data</TableHead>
                    <TableHead className="min-w-[200px]">Descrição</TableHead>
                    <TableHead className="min-w-[100px]">Valor</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                {transacoesFiltradas.length > 0 ? (
                  transacoesFiltradas.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>{transacao.data}</TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <div className={cn(
                            "rounded-full p-1.5 mt-0.5",
                            transacao.tipo === "venda" ? "bg-green-100" : 
                            transacao.tipo === "saque" ? "bg-amber-100" : "bg-slate-100"
                          )}>
                            {transacao.tipo === "venda" ? (
                              <ArrowUp size={14} className="text-green-600" />
                            ) : transacao.tipo === "saque" ? (
                              <ArrowDown size={14} className="text-amber-600" />
                            ) : (
                              <DollarSign size={14} className="text-slate-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transacao.descricao}</p>
                            <p className="text-xs text-muted-foreground">
                              {transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={cn(
                        "font-medium",
                        transacao.valor > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {transacao.valor > 0 ? "+" : ""}
                        R$ {Math.abs(transacao.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          transacao.status === "confirmado" ? "default" : 
                          transacao.status === "processando" ? "outline" : 
                          "destructive"
                        }>
                          {transacao.status === "confirmado" ? "Confirmado" : 
                           transacao.status === "processando" ? "Processando" : 
                           "Estornado"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      Nenhuma transação encontrada com os filtros atuais.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab Contas Bancárias */}
        <TabsContent value="contas" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Contas para Saque</h3>
            <Button onClick={handleAdicionarConta}>Adicionar Conta</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {contasBancarias.map((conta) => (
              <Card key={conta.id} className="premium-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{conta.banco}</CardTitle>
                    <Badge variant="outline">{conta.tipo}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Agência</p>
                      <p className="font-medium">{conta.agencia}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conta</p>
                      <p className="font-medium">{conta.conta}</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Titular: </span>
                    <span className="font-medium">{conta.titular}</span>
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button variant="destructive" size="sm">Remover</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <BadgeCheck className="text-primary mt-1" size={20} />
              <div>
                <h4 className="font-medium">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• A conta bancária precisa estar no mesmo CPF/CNPJ cadastrado na plataforma.</li>
                  <li>• Saques são processados em até 2 dias úteis após a solicitação.</li>
                  <li>• Valor mínimo para saque: R$ 50,00.</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab Formas de Pagamento */}
        <TabsContent value="pagamentos" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Formas de Pagamento Aceitas</h3>
            <p className="text-sm text-muted-foreground">
              Defina quais métodos de pagamento você deseja aceitar em sua loja.
            </p>
          </div>

          <div className="space-y-4">
            {formasPagamento.map((forma) => (
              <Card key={forma.id} className="premium-card">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                  <div className="flex-1 flex items-center gap-3">
                    {forma.nome === "Cartão de Crédito" ? (
                      <CreditCard className="text-primary" size={24} />
                    ) : forma.nome === "Boleto Bancário" ? (
                      <Building className="text-primary" size={24} />
                    ) : forma.nome === "Pix" ? (
                      <Wallet className="text-primary" size={24} />
                    ) : (
                      <DollarSign className="text-primary" size={24} />
                    )}
                    <div>
                      <h4 className="font-medium">{forma.nome}</h4>
                      <p className="text-xs text-muted-foreground">
                        Taxa: {forma.taxa}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Badge variant={forma.ativa ? "default" : "outline"}>
                      {forma.ativa ? "Ativo" : "Desativado"}
                    </Badge>
                    <Button 
                      variant={forma.ativa ? "outline" : "default"} 
                      size="sm"
                      onClick={() => handleAtivarFormaPagamento(forma.id)}
                    >
                      {forma.ativa ? "Desativar" : "Ativar"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>
                Personalize como os pagamentos são processados em sua loja.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Split de Pagamentos</label>
                  <Select defaultValue="automatico">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatico">Automático (padrão)</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Prazo de Estorno</label>
                  <Select defaultValue="14">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="14">14 dias (padrão)</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Button className="w-full mt-4">Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
