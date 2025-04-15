
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Plus, Tag, Percent, ArrowDownToLine as Download, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Import refactored components
import StatsCards from "@/components/cupons/StatsCards";
import CouponList from "@/components/cupons/CouponList";
import CouponHelp from "@/components/cupons/CouponHelp";
import CouponDrawer from "@/components/cupons/CouponDrawer";
import CouponDetails from "@/components/cupons/CouponDetails";
import { StatItem } from "@/components/cupons/StatsCards";

// Mock data for coupons
const mockCoupons = [
  { 
    id: 1, 
    codigo: "BLACK30", 
    tipo: "percentual" as const, 
    valor: 30, 
    ativo: true, 
    usos: 157, 
    validade: "2025-11-30", 
    produtos: "Todos", 
    limitePorUsuario: 1 
  },
  { 
    id: 2, 
    codigo: "WELCOME20", 
    tipo: "percentual" as const, 
    valor: 20, 
    ativo: true, 
    usos: 89, 
    validade: "2025-06-30", 
    produtos: "Curso Básico", 
    limitePorUsuario: 1 
  },
  { 
    id: 3, 
    codigo: "FRETE0", 
    tipo: "fixo" as const, 
    valor: 15, 
    ativo: true, 
    usos: 43, 
    validade: "2025-05-15", 
    produtos: "Produtos Físicos", 
    limitePorUsuario: 1 
  },
  { 
    id: 4, 
    codigo: "ANIVERSARIO40", 
    tipo: "percentual" as const, 
    valor: 40, 
    ativo: false, 
    usos: 203, 
    validade: "2024-02-28", 
    produtos: "Todos", 
    limitePorUsuario: 1 
  },
  { 
    id: 5, 
    codigo: "INFLUENCER50", 
    tipo: "percentual" as const, 
    valor: 50, 
    ativo: true, 
    usos: 76, 
    validade: "2025-12-31", 
    produtos: "Curso Avançado", 
    limitePorUsuario: 5 
  },
];

// Estatísticas dos cupons
const estatisticas: StatItem[] = [
  { label: "Cupons Ativos", valor: 4, icone: Tag, cor: "default" },
  { label: "Uso Médio", valor: "112 resgates", icone: Percent, cor: "default" },
  { label: "Impacto na Receita", valor: "-R$ 8.953,00", icone: ArrowDownToLine, cor: "outline" },
  { label: "Conversão Via Cupom", valor: "24%", icone: Calendar, cor: "secondary" },
];

export default function CuponsDescontoPage() {
  const [loaded, setLoaded] = useState(false);
  const [cupons, setCupons] = useState(mockCoupons);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  // Simula carregamento para animação
  useEffect(() => {
    if (!loaded) setLoaded(true);
  }, [loaded]);
  
  // Função para copiar código do cupom para o clipboard
  const copiarCupom = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast({
      title: "Cupom copiado!",
      description: `O código ${codigo} foi copiado para a área de transferência.`,
    });
  };
  
  // Função para adicionar um novo cupom
  const onSubmitCoupon = (values: any) => {
    const novoCupom = {
      id: cupons.length + 1,
      codigo: values.codigo.toUpperCase(),
      tipo: values.tipo as "percentual" | "fixo",
      valor: values.valor,
      ativo: true,
      usos: 0,
      validade: values.validade,
      produtos: values.produtos,
      limitePorUsuario: values.limitePorUsuario
    };
    
    setCupons([...cupons, novoCupom]);
    toast({
      title: "Cupom criado com sucesso!",
      description: `O cupom ${novoCupom.codigo} foi criado e está ativo.`,
    });
    setDrawerOpen(false);
  };
  
  // Função para alternar o status ativo/inativo de um cupom
  const toggleCouponStatus = (id: number) => {
    setCupons(cupons.map(cupom => 
      cupom.id === id ? { ...cupom, ativo: !cupom.ativo } : cupom
    ));
    
    const cupom = cupons.find(c => c.id === id);
    if (cupom) {
      toast({
        title: cupom.ativo ? "Cupom desativado" : "Cupom ativado",
        description: `O cupom ${cupom.codigo} foi ${cupom.ativo ? 'desativado' : 'ativado'} com sucesso.`,
      });
    }
  };
  
  // Função para excluir um cupom
  const deleteCoupon = (id: number) => {
    const cupom = cupons.find(c => c.id === id);
    setCupons(cupons.filter(cupom => cupom.id !== id));
    
    if (cupom) {
      toast({
        title: "Cupom excluído",
        description: `O cupom ${cupom.codigo} foi excluído permanentemente.`,
        variant: "destructive",
      });
    }
  };
  
  // Função para visualizar detalhes de um cupom
  const viewCouponDetails = (cupom: typeof mockCoupons[0]) => {
    setSelectedCoupon(cupom);
    setDetailsOpen(true);
  };
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Cupons de Desconto</h1>
                <p className="text-muted-foreground">Gerencie cupons para aumentar suas vendas e conversões</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowDownToLine className="h-4 w-4" />
                  Exportar
                </Button>
                <Button size="sm" className="gap-1" onClick={() => setDrawerOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Novo Cupom
                </Button>
              </div>
            </div>
          </div>
          
          {/* Cards de estatísticas */}
          <StatsCards estatisticas={estatisticas} loaded={loaded} />
          
          {/* Lista de cupons */}
          <Card className={cn("bg-card border-border shadow-sm", loaded && "animate-fade-in")}>
            <CardHeader className="pb-2">
              <CardTitle>Meus Cupons</CardTitle>
              <CardDescription>Visualize e gerencie todos os seus cupons de desconto</CardDescription>
            </CardHeader>
            
            <CardContent>
              <CouponList 
                cupons={cupons} 
                onViewDetails={viewCouponDetails}
                onToggleStatus={toggleCouponStatus}
                onDelete={deleteCoupon}
              />
            </CardContent>
          </Card>
          
          {/* Dicas e melhores práticas */}
          <CouponHelp loaded={loaded} />
        </div>
      </main>
      
      {/* Drawer para criar um novo cupom */}
      <CouponDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
        onSubmit={onSubmitCoupon} 
      />
      
      {/* Sheet para visualizar detalhes do cupom */}
      <CouponDetails 
        coupon={selectedCoupon} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen}
        onCopy={copiarCupom}
      />
    </div>
  );
}
