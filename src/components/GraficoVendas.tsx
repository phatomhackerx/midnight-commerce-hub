
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
      <div className="glass-card p-3 border border-border shadow-md text-sm">
        <p className="font-medium text-foreground">{`R$ ${payload[0].value?.toLocaleString('pt-BR')}`}</p>
      </div>
    );
  }
  return null;
};

export default function GraficoVendas() {
  const [periodo, setPeriodo] = useState<PeriodoProps["value"]>("30d");
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vendas</CardTitle>
            <CardDescription>Relatório de vendas por período</CardDescription>
          </div>
          <div className="flex space-x-1">
            {periodos.map((p) => (
              <Button 
                key={p.value} 
                variant={periodo === p.value ? "default" : "ghost"} 
                size="sm"
                onClick={() => setPeriodo(p.value)}
                className={cn(
                  "text-xs h-8",
                  periodo === p.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"
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
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
                strokeWidth={2}
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
