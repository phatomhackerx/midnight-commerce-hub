
import { useState } from "react";
import Header from "@/components/Header";
import CardMetrica from "@/components/CardMetrica";
import GraficoVendas from "@/components/GraficoVendas";
import GraficoMeiosPagamento from "@/components/GraficoMeiosPagamento";
import TabelaUltimasVendas from "@/components/TabelaUltimasVendas";
import { DollarSign, ShoppingCart, BarChart, ArrowUpRight, PercentCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Index() {
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
              <h1 className="text-2xl font-bold">Dashboard</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Exportar Relatório</Button>
                <Button size="sm" className="gap-1">
                  <span>Nova Venda</span>
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Bem-vindo de volta! Aqui está o resumo das suas vendas.</p>
          </div>
          
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
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
