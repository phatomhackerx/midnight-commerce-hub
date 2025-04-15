
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Tag,
  Percent,
  Clock,
  Copy,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  Trash
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export interface Coupon {
  id: number;
  codigo: string;
  tipo: "percentual" | "fixo";
  valor: number;
  ativo: boolean;
  usos: number;
  validade: string;
  produtos: string;
  limitePorUsuario: number;
}

interface CouponListProps {
  cupons: Coupon[];
  onViewDetails: (cupom: Coupon) => void;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CouponList({ cupons, onViewDetails, onToggleStatus, onDelete }: CouponListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const { toast } = useToast();
  
  // Filtros combinados (tab + search)
  const filteredCoupons = cupons.filter(cupom => {
    // Filtro por status
    if (activeTab === "ativos" && !cupom.ativo) return false;
    if (activeTab === "inativos" && cupom.ativo) return false;
    
    // Filtro por expiração
    if (activeTab === "expirados") {
      const couponExpirationDate = new Date(cupom.validade);
      const currentDate = new Date();
      if (couponExpirationDate > currentDate) return false;
    }
    
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
  
  const renderEmptyState = (message: string, icon: React.ReactNode, actionButton?: React.ReactNode) => (
    <div className="text-center py-10">
      {icon}
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground mt-1">Não encontramos cupons com esses critérios.</p>
      {actionButton}
    </div>
  );
  
  return (
    <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="ativos">Ativos</TabsTrigger>
        <TabsTrigger value="inativos">Inativos</TabsTrigger>
        <TabsTrigger value="expirados">Expirados</TabsTrigger>
      </TabsList>
      
      {['todos', 'ativos', 'inativos', 'expirados'].map((tabValue) => (
        <TabsContent key={tabValue} value={tabValue} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Pesquisar cupons ${tabValue !== 'todos' ? tabValue : ''}...`}
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {tabValue === 'todos' && (
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {filteredCoupons.length === 0 ? (
            renderEmptyState(
              `Nenhum cupom ${tabValue !== 'todos' ? tabValue : ''} encontrado`,
              tabValue === 'expirados' 
                ? <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                : tabValue === 'inativos'
                  ? <AlertTriangle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  : <Tag className="h-10 w-10 mx-auto text-muted-foreground mb-4" />,
              searchTerm ? (
                <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                  Limpar pesquisa
                </Button>
              ) : undefined
            )
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    {tabValue === 'todos' && <TableHead>Status</TableHead>}
                    <TableHead>Usos</TableHead>
                    <TableHead>{tabValue === 'expirados' ? 'Expirou em' : 'Validade'}</TableHead>
                    <TableHead>Produtos</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.map((cupom) => (
                    <TableRow key={cupom.id} className={!cupom.ativo && tabValue === 'todos' ? "opacity-70" : ""}>
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
                      {tabValue === 'todos' && (
                        <TableCell>
                          <Badge variant={cupom.ativo ? "success" : "destructive"} className="text-xs">
                            {cupom.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                      )}
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
                          {['todos', 'ativos', 'inativos'].includes(tabValue) && (
                            <Button variant="ghost" size="icon" title="Copiar código" onClick={() => copiarCupom(cupom.codigo)}>
                              <Copy size={16} />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" title="Ver detalhes" onClick={() => onViewDetails(cupom)}>
                            <Eye size={16} />
                          </Button>
                          {tabValue !== 'expirados' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title={cupom.ativo ? "Desativar cupom" : "Ativar cupom"}
                              onClick={() => onToggleStatus(cupom.id)}
                            >
                              {cupom.ativo ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                            </Button>
                          )}
                          {(tabValue === 'todos' || tabValue === 'expirados') && (
                            <Button variant="ghost" size="icon" title="Excluir cupom" onClick={() => onDelete(cupom.id)}>
                              <Trash size={16} />
                            </Button>
                          )}
                          {tabValue === 'expirados' && (
                            <Button variant="ghost" size="icon" title="Renovar cupom">
                              <Edit size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
