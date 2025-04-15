import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Calendar, User, Tag, Percent, Clock } from "lucide-react";
import { Coupon } from "./CouponList";

interface CouponDetailsProps {
  coupon: Coupon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCopy: (code: string) => void;
}

export default function CouponDetails({ coupon, open, onOpenChange, onCopy }: CouponDetailsProps) {
  if (!coupon) return null;
  
  const isExpired = new Date(coupon.validade) < new Date();
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes do Cupom</SheetTitle>
          <SheetDescription>
            Informações completas sobre o cupom {coupon.codigo}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{coupon.codigo}</h3>
            <Badge variant={coupon.ativo ? "success" : "destructive"}>
              {coupon.ativo ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={() => onCopy(coupon.codigo)}
          >
            <Tag className="h-4 w-4" />
            Copiar código do cupom
          </Button>
          
          {isExpired && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Este cupom está expirado e não pode mais ser utilizado.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Tipo de desconto</span>
              </div>
              <span className="font-medium">
                {coupon.tipo === "percentual" ? "Percentual" : "Valor Fixo"}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Valor do desconto</span>
              </div>
              <span className="font-medium">
                {coupon.tipo === "percentual" ? `${coupon.valor}%` : `R$ ${coupon.valor},00`}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Validade</span>
              </div>
              <span className="font-medium">
                {new Date(coupon.validade).toLocaleDateString('pt-BR')}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Produtos aplicáveis</span>
              </div>
              <span className="font-medium">{coupon.produtos}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Limite por usuário</span>
              </div>
              <span className="font-medium">{coupon.limitePorUsuario}</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Total de usos</span>
              </div>
              <span className="font-medium">{coupon.usos} resgates</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
