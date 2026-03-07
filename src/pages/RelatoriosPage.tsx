import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie } from "recharts";
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, 
  Download, Calendar, ArrowUpRight, BarChart3, Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const revenueData = [
  { name: "01", value: 2400 }, { name: "02", value: 1398 }, { name: "03", value: 4800 },
  { name: "04", value: 3908 }, { name: "05", value: 4800 }, { name: "06", value: 3800 },
  { name: "07", value: 5200 }, { name: "08", value: 4300 }, { name: "09", value: 6100 },
  { name: "10", value: 5900 }, { name: "11", value: 7200 }, { name: "12", value: 6800 },
  { name: "13", value: 7859 }, { name: "14", value: 5400 }, { name: "15", value: 8200 },
];

const conversionData = [
  { name: "Seg", visitors: 1200, sales: 42 }, { name: "Ter", visitors: 1400, sales: 51 },
  { name: "Qua", visitors: 1100, sales: 38 }, { name: "Qui", visitors: 1600, sales: 62 },
  { name: "Sex", visitors: 1800, sales: 71 }, { name: "Sáb", visitors: 900, sales: 28 },
  { name: "Dom", visitors: 700, sales: 19 },
];

const topProducts = [
  { name: "Curso de Marketing Digital", revenue: 28450, sales: 96, conversion: 4.2 },
  { name: "Ebook Finanças Pessoais", revenue: 12350, sales: 247, conversion: 6.1 },
  { name: "Mentoria Premium", revenue: 9970, sales: 10, conversion: 2.8 },
  { name: "Template Design Pack", revenue: 6700, sales: 100, conversion: 5.5 },
  { name: "Curso Copywriting", revenue: 5910, sales: 30, conversion: 3.9 },
];

const sourceData = [
  { name: "Orgânico", value: 35, fill: "hsl(var(--foreground))" },
  { name: "Afiliados", value: 28, fill: "hsl(var(--muted-foreground))" },
  { name: "Ads", value: 22, fill: "hsl(var(--border))" },
  { name: "Social", value: 15, fill: "hsl(var(--accent))" },
];

const metrics = [
  { label: "Receita Total", value: "R$ 67.890", change: 12.5, icon: DollarSign, prefix: "" },
  { label: "Total de Vendas", value: "483", change: 8.2, icon: ShoppingCart, prefix: "" },
  { label: "Visitantes", value: "12.456", change: -2.1, icon: Eye, prefix: "" },
  { label: "Taxa de Conversão", value: "3.87%", change: 0.5, icon: Target, prefix: "" },
];

export default function RelatoriosPage() {
  const [period, setPeriod] = useState("30d");

  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={18} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Analytics</span>
              </div>
              <h1 className="text-3xl font-bold">Relatórios</h1>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[140px] rounded-xl">
                  <Calendar size={14} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                  <SelectItem value="90d">90 dias</SelectItem>
                  <SelectItem value="12m">12 meses</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-1 rounded-xl">
                <Download size={14} /> Exportar
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {metrics.map((m, i) => (
              <Card key={i} className="premium-card hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-secondary"><m.icon size={18} className="text-foreground" /></div>
                    <Badge variant="outline" className={cn("text-xs rounded-full", m.change >= 0 ? "text-green-500 border-green-500/30" : "text-red-500 border-red-500/30")}>
                      {m.change >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                      {m.change > 0 ? "+" : ""}{m.change}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold mt-1">{m.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue Chart */}
          <Card className="premium-card animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Receita</CardTitle>
                  <CardDescription>Evolução da receita no período</CardDescription>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30 gap-1">
                  <TrendingUp size={12} /> +12.5%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ value: { label: "Receita", color: "hsl(var(--foreground))" } }} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} width={40} />
                    <ChartTooltip content={<ChartTooltipContent formatter={v => `R$ ${Number(v).toLocaleString('pt-BR')}`} />} />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={2} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Conversion + Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <Card className="lg:col-span-2 premium-card">
              <CardHeader>
                <CardTitle>Visitantes vs Vendas</CardTitle>
                <CardDescription>Comparação semanal</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ visitors: { label: "Visitantes", color: "hsl(var(--muted-foreground))" }, sales: { label: "Vendas", color: "hsl(var(--foreground))" } }} className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <BarChart data={conversionData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={40} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="visitors" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sales" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>De onde vêm seus visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ value: { label: "Tráfego" } }} className="h-[200px] w-full">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                        {sourceData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent formatter={v => `${v}%`} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="space-y-2 mt-4">
                  {sourceData.map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.fill }} />
                        <span className="text-muted-foreground">{s.name}</span>
                      </div>
                      <span className="font-medium">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="premium-card animate-fade-in">
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>Ranking por receita no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sales} vendas · {p.conversion}% conversão</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm">R$ {p.revenue.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
