import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalyticsData {
  visualizacoes: number;
  conversao: number;
  vendas: number;
  faturamento: number;
  ticketMedio: number;
  afiliadosAtivos: number;
}

interface ProductAnalyticsProps {
  data: AnalyticsData;
}

export default function ProductAnalytics({ data }: ProductAnalyticsProps) {
  const metricas = [
    {
      titulo: "Visualizações",
      valor: data.visualizacoes.toLocaleString(),
      icone: Eye,
      cor: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      titulo: "Taxa de Conversão",
      valor: `${data.conversao.toFixed(1)}%`,
      icone: TrendingUp,
      cor: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      titulo: "Vendas",
      valor: data.vendas.toString(),
      icone: ShoppingCart,
      cor: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      titulo: "Faturamento",
      valor: `R$ ${data.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icone: DollarSign,
      cor: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      titulo: "Ticket Médio",
      valor: `R$ ${data.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icone: BarChart3,
      cor: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      titulo: "Afiliados Ativos",
      valor: data.afiliadosAtivos.toString(),
      icone: Users,
      cor: "text-indigo-500",
      bg: "bg-indigo-500/10"
    }
  ];

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Análise de Performance
        </CardTitle>
        <CardDescription>
          Métricas e estatísticas do produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metricas.map((metrica, index) => {
            const Icon = metrica.icone;
            return (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${metrica.bg}`}>
                    <Icon className={`h-4 w-4 ${metrica.cor}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{metrica.valor}</p>
                <p className="text-xs text-muted-foreground">{metrica.titulo}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
