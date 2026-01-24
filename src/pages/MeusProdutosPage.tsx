import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Search, Filter, Package, ShoppingCart, TrendingUp, Users, Eye,
  Star, Plus, MoreVertical, Edit, Copy, ExternalLink, Trash2,
  LayoutGrid, List, ArrowUpDown, Download, Upload, Settings,
  Zap, Target, BarChart3, Sparkles
} from 'lucide-react';
import { produtosMock, categorias } from '@/data/marketplaceData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ProductCheckoutsList from '@/components/produtos/ProductCheckoutsList';

// Dados mock de produtos do produtor
const meusProdutos = [
  {
    id: 1,
    titulo: "Curso Completo de Marketing Digital",
    descricao: "Aprenda as melhores estratégias de marketing digital do mercado.",
    preco: 197.00,
    tipo: "curso" as const,
    categoria: "Marketing",
    imagem: "https://placehold.co/300x200/3b82f6/FFFFFF/png?text=Marketing+Digital",
    status: "publicado" as const,
    vendas: 1245,
    faturamento: 245365,
    views: 15420,
    conversao: 8.1,
    comissao: 30,
    afiliados: 45,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    titulo: "Ebook: Copywriting para Iniciantes",
    descricao: "Guia completo para escrever textos que vendem.",
    preco: 47.00,
    tipo: "ebook" as const,
    categoria: "Copywriting",
    imagem: "https://placehold.co/300x200/6366f1/FFFFFF/png?text=Copywriting",
    status: "publicado" as const,
    vendas: 873,
    faturamento: 41031,
    views: 8930,
    conversao: 9.8,
    comissao: 50,
    afiliados: 23,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    titulo: "Mentoria em Tráfego Pago",
    descricao: "Mentoria exclusiva para dominar tráfego pago.",
    preco: 997.00,
    tipo: "mentoria" as const,
    categoria: "Tráfego",
    imagem: "https://placehold.co/300x200/8b5cf6/FFFFFF/png?text=Tráfego+Pago",
    status: "rascunho" as const,
    vendas: 0,
    faturamento: 0,
    views: 0,
    conversao: 0,
    comissao: 20,
    afiliados: 0,
    createdAt: "2024-01-20",
  },
];

export default function MeusProdutosPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('todos');
  const [categoryFilter, setCategoryFilter] = React.useState('todas');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = React.useState<typeof meusProdutos[0] | null>(null);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = React.useState(false);

  const filteredProducts = meusProdutos.filter(produto => {
    const matchesSearch = produto.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || produto.status === statusFilter;
    const matchesCategory = categoryFilter === 'todas' || produto.categoria === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalStats = meusProdutos.reduce(
    (acc, p) => ({
      vendas: acc.vendas + p.vendas,
      faturamento: acc.faturamento + p.faturamento,
      views: acc.views + p.views,
      afiliados: acc.afiliados + p.afiliados,
    }),
    { vendas: 0, faturamento: 0, views: 0, afiliados: 0 }
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publicado':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Publicado</Badge>;
      case 'rascunho':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Rascunho</Badge>;
      case 'pausado':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Pausado</Badge>;
      default:
        return null;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'curso': return <Sparkles className="h-4 w-4" />;
      case 'ebook': return <Package className="h-4 w-4" />;
      case 'mentoria': return <Users className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Meus Produtos</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e checkouts personalizados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <ShoppingCart className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vendas</p>
                <p className="text-2xl font-bold">{totalStats.vendas.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Faturamento</p>
                <p className="text-2xl font-bold">R$ {(totalStats.faturamento / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Eye className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visualizações</p>
                <p className="text-2xl font-bold">{(totalStats.views / 1000).toFixed(1)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Users className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Afiliados</p>
                <p className="text-2xl font-bold">{totalStats.afiliados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="pausado">Pausado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              {categorias.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      )}>
        {filteredProducts.map((produto) => (
          <Card 
            key={produto.id}
            className={cn(
              "overflow-hidden transition-all hover:shadow-lg hover:border-primary/30",
              viewMode === 'list' && "flex flex-row"
            )}
          >
            <div className={cn(
              "relative",
              viewMode === 'grid' ? "aspect-video" : "w-48 shrink-0"
            )}>
              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                {getStatusBadge(produto.status)}
              </div>
            </div>
            
            <CardContent className={cn(
              "flex flex-col",
              viewMode === 'grid' ? "p-4" : "p-4 flex-1"
            )}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs gap-1">
                      {getTipoIcon(produto.tipo)}
                      {produto.tipo}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {produto.categoria}
                    </Badge>
                  </div>
                  <h3 className="font-semibold line-clamp-1">{produto.titulo}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {produto.descricao}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate(`/produtos/config/${produto.id}`)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setSelectedProduct(produto);
                      setCheckoutDialogOpen(true);
                    }}>
                      <LayoutGrid className="h-4 w-4 mr-2" />
                      Gerenciar Checkouts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/produtos/checkout-builder/${produto.id}`)}>
                      <Zap className="h-4 w-4 mr-2" />
                      Checkout Builder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Link
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Página de Vendas
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className={cn(
                "grid gap-2 text-center mt-3",
                viewMode === 'grid' ? "grid-cols-4" : "grid-cols-4 max-w-md"
              )}>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-sm font-semibold">{produto.vendas}</div>
                  <div className="text-xs text-muted-foreground">Vendas</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-sm font-semibold">R$ {(produto.faturamento / 1000).toFixed(0)}k</div>
                  <div className="text-xs text-muted-foreground">Receita</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-sm font-semibold">{produto.conversao}%</div>
                  <div className="text-xs text-muted-foreground">Conv.</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-sm font-semibold">{produto.afiliados}</div>
                  <div className="text-xs text-muted-foreground">Afiliados</div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedProduct(produto);
                    setCheckoutDialogOpen(true);
                  }}
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Checkouts
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/produtos/checkout-builder/${produto.id}`)}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Editar Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Checkout Management Dialog */}
      <Dialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerenciar Checkouts</DialogTitle>
            <DialogDescription>
              {selectedProduct?.titulo}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductCheckoutsList
              productId={selectedProduct.id}
              productTitle={selectedProduct.titulo}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
