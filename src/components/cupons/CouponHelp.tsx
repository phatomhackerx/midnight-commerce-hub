
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CouponHelpProps {
  loaded: boolean;
}

export default function CouponHelp({ loaded }: CouponHelpProps) {
  return (
    <Card className={cn("bg-card border-border shadow-sm", loaded && "animate-fade-in")}>
      <CardHeader>
        <CardTitle>Como funcionam os Cupons</CardTitle>
        <CardDescription>Dicas para criar cupons eficientes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Tipos de descontos</h3>
          <p className="text-sm text-muted-foreground">Você pode criar cupons com descontos percentuais (ex: 20% off) ou de valor fixo (ex: R$ 50 off).</p>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Estratégias eficientes</h3>
          <p className="text-sm text-muted-foreground">Use cupons com tempo limitado para criar urgência, ou cupons para recuperação de carrinhos abandonados.</p>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Limitações e regras</h3>
          <p className="text-sm text-muted-foreground">Defina limites por usuário, valor mínimo de compra ou produtos específicos para otimizar suas campanhas.</p>
        </div>
      </CardContent>
    </Card>
  );
}
