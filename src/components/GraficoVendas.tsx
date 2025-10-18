
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Dados de exemplo
const data = [
  { name: "Jan", vendas: 18000 },
  { name: "Fev", vendas: 25000 },
  { name: "Mar", vendas: 32000 },
  { name: "Abr", vendas: 35000 },
  { name: "Mai", vendas: 28000 },
  { name: "Jun", vendas: 42000 },
  { name: "Jul", vendas: 47000 },
  { name: "Ago", vendas: 51000 },
  { name: "Set", vendas: 55000 },
  { name: "Out", vendas: 60000 },
  { name: "Nov", vendas: 63000 },
  { name: "Dez", vendas: 68000 },
];

interface PeriodoProps {
  label: string;
  value: "7d" | "30d" | "90d" | "ano";
}

const periodos: PeriodoProps[] = [
  { label: "7 dias", value: "7d" },
  { label: "30 dias", value: "30d" },
  { label: "90 dias", value: "90d" },
  { label: "Ano", value: "ano" },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-primary/30 shadow-[var(--shadow-neon)] rounded-lg">
        <p className="font-semibold text-foreground">{`R$ ${payload[0].value?.toLocaleString('pt-BR')}`}</p>
      </div>
    );
  }
  return null;
};

export default function GraficoVendas() {
  const [periodo, setPeriodo] = useState<PeriodoProps["value"]>("30d");
  
  return (
    <Card className="glass-card border-border/50 hover-lift">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gradient-cosmic">Vendas</CardTitle>
            <CardDescription>Relatório de vendas por período</CardDescription>
          </div>
          <div className="flex space-x-1 glass-card p-1 rounded-lg">
            {periodos.map((p) => (
              <Button 
                key={p.value} 
                variant={periodo === p.value ? "default" : "ghost"} 
                size="sm"
                onClick={() => setPeriodo(p.value)}
                className={cn(
                  "text-xs h-8 rounded-md transition-all",
                  periodo === p.value ? "bg-gradient-to-r from-primary to-secondary text-background shadow-[var(--shadow-neon)]" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${value / 1000}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="vendas" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVendas)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
