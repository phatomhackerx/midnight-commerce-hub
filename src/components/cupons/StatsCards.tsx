
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatItem {
  label: string;
  valor: string | number;
  icone: LucideIcon;
  cor: "default" | "secondary" | "outline" | "destructive" | "success" | "purple" | "warning";
}

interface StatsCardsProps {
  estatisticas: StatItem[];
  loaded: boolean;
}

export default function StatsCards({ estatisticas, loaded }: StatsCardsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
      {estatisticas.map((item, index) => (
        <Card key={index} className="premium-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardDescription>{item.label}</CardDescription>
              <item.icone size={20} className="text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">{item.valor}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={item.cor} className="text-xs">
              {item.cor === "outline" ? "-12% na receita" : "+18% vs. mês anterior"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
