import { useState } from "react";
import Header from "@/components/Header";
import CardMetrica from "@/components/CardMetrica";
import GraficoVendas from "@/components/GraficoVendas";
import GraficoMeiosPagamento from "@/components/GraficoMeiosPagamento";
import TabelaUltimasVendas from "@/components/TabelaUltimasVendas";
import { DollarSign, ShoppingCart, BarChart, ArrowUpRight, PercentCircle, AlertTriangle, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen cosmic-bg neural-pattern">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-12">
          {/* Hero Section */}
          <div className={cn("relative overflow-hidden rounded-3xl p-12 mt-8", loaded && "animate-slide-up")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent blur-3xl" />
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-primary animate-glow-pulse" size={24} />
                <span className="text-sm font-medium text-primary">Powered by Future Technology</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-cosmic">
                Midnight Commerce Hub
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Next-generation commerce platform powered by AI. Track sales, manage products, and scale your business with cutting-edge technology.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2 shadow-[var(--shadow-neon)]">
                  <Zap size={20} />
                  Start Building
                  <ArrowUpRight size={16} />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 glass-card">
                  View Analytics
                  <TrendingUp size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gradient-cosmic">Dashboard Overview</h2>
                <p className="text-muted-foreground mt-1">Real-time insights powered by AI</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="glass-card">Exportar Relatório</Button>
                <Button size="sm" className="gap-1 shadow-[var(--shadow-neon)]">
                  <span>Nova Venda</span>
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", loaded && "animate-fade-in")}>
            <CardMetrica
              title="Vendas (Hoje)"
              value="R$ 7.859,00"
              icon={<DollarSign size={20} />}
              change={12.5}
              changeLabel="vs. ontem"
              variant="success"
            />
            <CardMetrica
              title="Pedidos (Hoje)"
              value="34"
              icon={<ShoppingCart size={20} />}
              change={8.2}
              changeLabel="vs. ontem"
            />
            <CardMetrica
              title="Taxa de Conversão"
              value="3.6%"
              icon={<PercentCircle size={20} />}
              change={-0.8}
              changeLabel="vs. média"
              variant="warning"
            />
            <CardMetrica
              title="Abandono de Carrinho"
              value="24.8%"
              icon={<AlertTriangle size={20} />}
              change={-2.1}
              changeLabel="vs. média"
              variant="danger"
            />
          </div>
          
          <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", loaded && "animate-fade-in")}>
            <div className="lg:col-span-2">
              <GraficoVendas />
            </div>
            <div>
              <GraficoMeiosPagamento />
            </div>
          </div>
          
          <div className={cn(loaded && "animate-fade-in")}>
            <TabelaUltimasVendas />
          </div>
        </div>
      </main>
    </div>
  );
}
