
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowDownToLine, 
  Tag, 
  Percent, 
  Calendar, 
  Clock, 
  Trash, 
  Copy, 
  Eye, 
  Edit,
  CheckCircle,
  AlertTriangle, 
  Clipboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data for coupons
const mockCoupons = [
  { 
    id: 1, 
    codigo: "BLACK30", 
    tipo: "percentual", 
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
    tipo: "percentual", 
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
    tipo: "fixo", 
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
    tipo: "percentual", 
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
    tipo: "percentual", 
    valor: 50, 
    ativo: true, 
    usos: 76, 
    validade: "2025-12-31", 
    produtos: "Curso Avançado", 
    limitePorUsuario: 5 
  },
];

// Estatísticas dos cupons
const estatisticas = [
  { label: "Cupons Ativos", valor: 4, icone: Tag, cor: "default" },
  { label: "Uso Médio", valor: "112 resgates", icone: Percent, cor: "default" },
  { label: "Impacto na Receita", valor: "-R$ 8.953,00", icone: ArrowDownToLine, cor: "outline" },
  { label: "Conversão Via Cupom", valor: "24%", icone: Calendar, cor: "secondary" },
];

// Validator for creating a new coupon
const formSchema = z.object({
  codigo: z.string().min(3, {
    message: "Código deve ter pelo menos 3 caracteres",
  }).max(20, {
    message: "Código deve ter no máximo 20 caracteres",
  }),
  tipo: z.enum(["percentual", "fixo"], {
    required_error: "Selecione o tipo de desconto",
  }),
  valor: z.coerce.number().min(1, {
    message: "O valor deve ser maior que 0",
  }),
  validade: z.string().min(1, {
    message: "A data de validade é obrigatória",
  }),
  produtos: z.string().min(1, {
    message: "Especifique os produtos aplicáveis",
  }),
  limitePorUsuario: z.coerce.number().min(1, {
    message: "O limite por usuário deve ser maior que 0",
  }),
});

export default function CuponsDescontoPage() {
  const [loaded, setLoaded] = useState(false);
  const [cupons, setCupons] = useState(mockCoupons);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      tipo: "percentual",
      valor: 10,
      validade: new Date().toISOString().split('T')[0],
      produtos: "Todos",
      limitePorUsuario: 1,
    },
  });
  
  // Simula carregamento para animação
  useEffect(() => {
    if (!loaded) setLoaded(true);
  }, [loaded]);
  
  // Filtra cupons com base na aba ativa e no termo de pesquisa
  const filteredCoupons = cupons.filter(cupom => {
    // Filtro por status
    if (activeTab === "ativos" && !cupom.ativo) return false;
    if (activeTab === "inativos" && cupom.ativo) return false;
    if (activeTab === "expirados" && new Date(cupom.validade) > new Date()) return false;
    
    // Filtro por pesquisa
    if (searchTerm && !cupom.codigo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !cupom.produtos.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Função para copiar código do cupom para o clipboard
  const copiarCupom = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast({
      title: "Cupom copiado!",
      description: `O código ${codigo} foi copiado para a área de transferência.`,
    });
  };
  
  // Função para adicionar um novo cupom
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const novoCupom = {
      id: cupons.length + 1,
      codigo: values.codigo.toUpperCase(),
      tipo: values.tipo,
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
    form.reset();
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
  };
  
  // Função para gerar um código de cupom aleatório
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue('codigo', code);
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
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
            {estatisticas.map((item, index) => (
              <Card key={index} className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardDescription>{item.label}</CardDescription>
                    <item.icone size={20} className="text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{item.valor}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant={item.cor as "default" | "secondary" | "outline" | "destructive"} className="text-xs">
                    {item.cor === "outline" ? "-12% na receita" : "+18% vs. mês anterior"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Lista de cupons */}
          <Card className={cn("bg-card border-border shadow-sm", loaded && "animate-fade-in")}>
            <CardHeader className="pb-2">
              <CardTitle>Meus Cupons</CardTitle>
              <CardDescription>Visualize e gerencie todos os seus cupons de desconto</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="inativos">Inativos</TabsTrigger>
                  <TabsTrigger value="expirados">Expirados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Pesquisar cupons..."
                        className="pl-9 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {filteredCoupons.length === 0 ? (
                    <div className="text-center py-10">
                      <Tag className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Nenhum cupom encontrado</h3>
                      <p className="text-muted-foreground mt-1">Não encontramos cupons com esses critérios.</p>
                      {searchTerm && (
                        <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                          Limpar pesquisa
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Usos</TableHead>
                            <TableHead>Validade</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCoupons.map((cupom) => (
                            <TableRow key={cupom.id} className={!cupom.ativo ? "opacity-70" : ""}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Tag size={16} className="text-muted-foreground" />
                                  {cupom.codigo}
                                </div>
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? "Percentual" : "Valor Fixo"}
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? `${cupom.valor}%` : `R$ ${cupom.valor},00`}
                              </TableCell>
                              <TableCell>
                                <Badge variant={cupom.ativo ? "success" : "destructive"} className="text-xs">
                                  {cupom.ativo ? "Ativo" : "Inativo"}
                                </Badge>
                              </TableCell>
                              <TableCell>{cupom.usos} resgates</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-muted-foreground" />
                                  {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs font-normal">
                                  {cupom.produtos}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" title="Copiar código" onClick={() => copiarCupom(cupom.codigo)}>
                                    <Copy size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Ver detalhes" onClick={() => viewCouponDetails(cupom)}>
                                    <Eye size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    title={cupom.ativo ? "Desativar cupom" : "Ativar cupom"}
                                    onClick={() => toggleCouponStatus(cupom.id)}
                                  >
                                    {cupom.ativo ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Excluir cupom" onClick={() => deleteCoupon(cupom.id)}>
                                    <Trash size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="ativos">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Pesquisar cupons ativos..."
                        className="pl-9 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {filteredCoupons.length === 0 ? (
                    <div className="text-center py-10">
                      <Tag className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Nenhum cupom ativo encontrado</h3>
                      <p className="text-muted-foreground mt-1">Você ainda não possui cupons ativos com esses critérios.</p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Usos</TableHead>
                            <TableHead>Validade</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCoupons.map((cupom) => (
                            <TableRow key={cupom.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Tag size={16} className="text-muted-foreground" />
                                  {cupom.codigo}
                                </div>
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? "Percentual" : "Valor Fixo"}
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? `${cupom.valor}%` : `R$ ${cupom.valor},00`}
                              </TableCell>
                              <TableCell>{cupom.usos} resgates</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-muted-foreground" />
                                  {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs font-normal">
                                  {cupom.produtos}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" title="Copiar código" onClick={() => copiarCupom(cupom.codigo)}>
                                    <Copy size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Ver detalhes" onClick={() => viewCouponDetails(cupom)}>
                                    <Eye size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Desativar cupom" onClick={() => toggleCouponStatus(cupom.id)}>
                                    <AlertTriangle size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="inativos">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Pesquisar cupons inativos..."
                        className="pl-9 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {filteredCoupons.length === 0 ? (
                    <div className="text-center py-10">
                      <AlertTriangle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Nenhum cupom inativo encontrado</h3>
                      <p className="text-muted-foreground mt-1">Você não possui cupons inativos com esses critérios.</p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Usos</TableHead>
                            <TableHead>Validade</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCoupons.map((cupom) => (
                            <TableRow key={cupom.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Tag size={16} className="text-muted-foreground" />
                                  {cupom.codigo}
                                </div>
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? "Percentual" : "Valor Fixo"}
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? `${cupom.valor}%` : `R$ ${cupom.valor},00`}
                              </TableCell>
                              <TableCell>{cupom.usos} resgates</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-muted-foreground" />
                                  {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs font-normal">
                                  {cupom.produtos}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" title="Copiar código" onClick={() => copiarCupom(cupom.codigo)}>
                                    <Copy size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Ver detalhes" onClick={() => viewCouponDetails(cupom)}>
                                    <Eye size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Ativar cupom" onClick={() => toggleCouponStatus(cupom.id)}>
                                    <CheckCircle size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="expirados">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Pesquisar cupons expirados..."
                        className="pl-9 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {filteredCoupons.length === 0 ? (
                    <div className="text-center py-10">
                      <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Nenhum cupom expirado encontrado</h3>
                      <p className="text-muted-foreground mt-1">Você não possui cupons expirados com esses critérios.</p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Usos</TableHead>
                            <TableHead>Expirou em</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCoupons.map((cupom) => (
                            <TableRow key={cupom.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Tag size={16} className="text-muted-foreground" />
                                  {cupom.codigo}
                                </div>
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? "Percentual" : "Valor Fixo"}
                              </TableCell>
                              <TableCell>
                                {cupom.tipo === "percentual" ? `${cupom.valor}%` : `R$ ${cupom.valor},00`}
                              </TableCell>
                              <TableCell>{cupom.usos} resgates</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-muted-foreground" />
                                  {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs font-normal">
                                  {cupom.produtos}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" title="Ver detalhes" onClick={() => viewCouponDetails(cupom)}>
                                    <Eye size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Renovar cupom">
                                    <Edit size={16} />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Excluir cupom" onClick={() => deleteCoupon(cupom.id)}>
                                    <Trash size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Dicas e melhores práticas */}
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
        </div>
      </main>
      
      {/* Drawer para criar um novo cupom */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Criar Novo Cupom</DrawerTitle>
              <DrawerDescription>
                Preencha os campos abaixo para criar um novo cupom de desconto.
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="codigo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código do Cupom</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input {...field} placeholder="BLACKFRIDAY" />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon"
                              onClick={generateRandomCode}
                              title="Gerar código aleatório"
                            >
                              <Clipboard className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormDescription>
                            Código que o cliente usará para obter o desconto
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Desconto</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentual">Percentual (%)</SelectItem>
                              <SelectItem value="fixo">Valor Fixo (R$)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Escolha entre desconto percentual ou valor fixo
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="valor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor do Desconto</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              min={1} 
                              placeholder={field.value === "percentual" ? "10" : "50"}
                            />
                          </FormControl>
                          <FormDescription>
                            {form.watch("tipo") === "percentual" 
                              ? "Valor em porcentagem (ex: 10 para 10%)" 
                              : "Valor em reais (ex: 50 para R$50,00)"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="validade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Validade</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Data limite para uso do cupom
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="produtos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Produtos Aplicáveis</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Todos" />
                          </FormControl>
                          <FormDescription>
                            Produtos ou categorias onde o cupom é válido
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="limitePorUsuario"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Limite por Usuário</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              min={1} 
                              placeholder="1"
                            />
                          </FormControl>
                          <FormDescription>
                            Quantas vezes cada usuário pode usar este cupom
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Alert className="mt-6 bg-muted">
                    <AlertDescription>
                      O cupom será criado como <strong>ativo</strong> e poderá ser usado imediatamente pelos seus clientes.
                    </AlertDescription>
                  </Alert>
                  
                  <DrawerFooter className="px-0">
                    <Button type="submit" className="w-full">Criar Cupom</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Drawer para visualizar detalhes do cupom */}
      <Drawer open={!!selectedCoupon} onOpenChange={() => setSelectedCoupon(null)}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Detalhes do Cupom</DrawerTitle>
              <DrawerDescription>
                Informações completas sobre o cupom selecionado.
              </DrawerDescription>
            </DrawerHeader>
            
            {selectedCoupon && (
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCoupon.codigo}</h3>
                    <p className="text-muted-foreground">
                      {selectedCoupon.tipo === "percentual" 
                        ? `${selectedCoupon.valor}% de desconto` 
                        : `R$ ${selectedCoupon.valor},00 de desconto`}
                    </p>
                  </div>
                  <Badge variant={selectedCoupon.ativo ? "success" : "destructive"}>
                    {selectedCoupon.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo de Desconto</p>
                    <p className="font-medium">{selectedCoupon.tipo === "percentual" ? "Percentual" : "Valor Fixo"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Usos</p>
                    <p className="font-medium">{selectedCoupon.usos} resgates</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Validade</p>
                    <p className="font-medium">{new Date(selectedCoupon.validade).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Limite por Usuário</p>
                    <p className="font-medium">{selectedCoupon.limitePorUsuario} {selectedCoupon.limitePorUsuario === 1 ? "uso" : "usos"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Produtos Aplicáveis</p>
                    <p className="font-medium">{selectedCoupon.produtos}</p>
                  </div>
                </div>
                
                {/* Estatísticas de uso */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Estatísticas de Uso</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de conversão</p>
                      <p className="font-medium">23%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor economizado</p>
                      <p className="font-medium">R$ 1.342,50</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vendas geradas</p>
                      <p className="font-medium">32</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor médio de pedido</p>
                      <p className="font-medium">R$ 147,80</p>
                    </div>
                  </div>
                </div>
                
                <DrawerFooter className="px-0 pt-2">
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        toggleCouponStatus(selectedCoupon.id);
                        setSelectedCoupon(null);
                      }}
                    >
                      {selectedCoupon.ativo ? "Desativar Cupom" : "Ativar Cupom"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => copiarCupom(selectedCoupon.codigo)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Código
                    </Button>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost">Fechar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
