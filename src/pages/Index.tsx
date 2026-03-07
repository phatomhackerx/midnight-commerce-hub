import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CardMetrica from "@/components/CardMetrica";
import GraficoVendas from "@/components/GraficoVendas";
import GraficoMeiosPagamento from "@/components/GraficoMeiosPagamento";
import TabelaUltimasVendas from "@/components/TabelaUltimasVendas";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, ShoppingCart, PercentCircle, AlertTriangle, ArrowUpRight, TrendingUp, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const quickActions = [
  { icon: ShoppingCart, label: "Nova Venda", color: "bg-green-500/10 text-green-500" },
  { icon: Zap, label: "Criar Produto", color: "bg-blue-500/10 text-blue-500" },
  { icon: TrendingUp, label: "Ver Relatórios", color: "bg-purple-500/10 text-purple-500" },
  { icon: Clock, label: "Assinaturas", color: "bg-orange-500/10 text-orange-500" },
];

const recentActivity = [
  { text: "Nova venda de Curso Premium", time: "2 min atrás", type: "sale" },
  { text: "Afiliado Rodrigo gerou comissão", time: "15 min atrás", type: "commission" },
  { text: "Novo aluno no Curso de Marketing", time: "1h atrás", type: "member" },
  { text: "Saque de R$ 2.500 processado", time: "3h atrás", type: "withdrawal" },
];

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Visão geral das suas métricas</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Exportar</Button>
              <Button size="sm" className="gap-1">
                <span>Nova Venda</span>
                <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>

          {/* Metrics */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="premium-card">
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              <CardMetrica title="Vendas (Hoje)" value="R$ 7.859,00" icon={<DollarSign size={20} />} change={12.5} changeLabel="vs. ontem" variant="success" />
              <CardMetrica title="Pedidos (Hoje)" value="34" icon={<ShoppingCart size={20} />} change={8.2} changeLabel="vs. ontem" />
              <CardMetrica title="Taxa de Conversão" value="3.6%" icon={<PercentCircle size={20} />} change={-0.8} changeLabel="vs. média" variant="warning" />
              <CardMetrica title="Abandono de Carrinho" value="24.8%" icon={<AlertTriangle size={20} />} change={-2.1} changeLabel="vs. média" variant="danger" />
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
            {quickActions.map((a, i) => (
              <button key={i} className="premium-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-all text-left">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", a.color)}>
                  <a.icon size={18} />
                </div>
                <span className="text-sm font-medium">{a.label}</span>
              </button>
            ))}
          </div>

          {/* Charts */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 premium-card"><CardContent className="p-6"><Skeleton className="h-[300px] w-full" /></CardContent></Card>
              <Card className="premium-card"><CardContent className="p-6"><Skeleton className="h-[300px] w-full" /></CardContent></Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 premium-card p-6"><GraficoVendas /></div>
              <div className="premium-card p-6"><GraficoMeiosPagamento /></div>
            </div>
          )}

          {/* Recent Activity + Sales Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="premium-card p-6">
              <h3 className="font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-foreground mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{a.text}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 premium-card p-6">
              <TabelaUltimasVendas />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
