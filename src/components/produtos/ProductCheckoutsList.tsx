import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Plus, Eye, Edit, Copy, Trash2, ExternalLink, MoreVertical, 
  TrendingUp, DollarSign, BarChart3, CheckCircle, Pause, FileEdit,
  Star, Settings
} from 'lucide-react';
import { 
  getCheckoutsByProductId, 
  createCheckout, 
  deleteCheckout, 
  duplicateCheckout,
  setDefaultCheckout,
  updateCheckout 
} from '@/stores/checkoutStore';
import { ProductCheckout } from '@/types/checkout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ProductCheckoutsListProps {
  productId: number;
  productTitle: string;
}

export default function ProductCheckoutsList({ productId, productTitle }: ProductCheckoutsListProps) {
  const navigate = useNavigate();
  const [checkouts, setCheckouts] = useState<ProductCheckout[]>(() => getCheckoutsByProductId(productId));
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCheckoutName, setNewCheckoutName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkoutToDelete, setCheckoutToDelete] = useState<ProductCheckout | null>(null);

  const refreshCheckouts = () => {
    setCheckouts(getCheckoutsByProductId(productId));
  };

  const handleCreateCheckout = () => {
    if (!newCheckoutName.trim()) {
      toast.error('Digite um nome para o checkout');
      return;
    }
    const newCheckout = createCheckout(productId, newCheckoutName);
    toast.success('Checkout criado com sucesso!');
    setNewCheckoutName('');
    setCreateDialogOpen(false);
    refreshCheckouts();
    navigate(`/produtos/checkout-builder/${productId}?checkoutId=${newCheckout.id}`);
  };

  const handleDuplicate = (checkout: ProductCheckout) => {
    const duplicated = duplicateCheckout(checkout.id, `${checkout.name} (Cópia)`);
    if (duplicated) {
      toast.success('Checkout duplicado!');
      refreshCheckouts();
    }
  };

  const handleDelete = () => {
    if (!checkoutToDelete) return;
    deleteCheckout(checkoutToDelete.id);
    toast.success('Checkout excluído!');
    setDeleteDialogOpen(false);
    setCheckoutToDelete(null);
    refreshCheckouts();
  };

  const handleSetDefault = (checkout: ProductCheckout) => {
    setDefaultCheckout(checkout.id);
    toast.success('Checkout definido como padrão!');
    refreshCheckouts();
  };

  const handleToggleStatus = (checkout: ProductCheckout) => {
    const newStatus = checkout.status === 'active' ? 'paused' : 'active';
    updateCheckout(checkout.id, { status: newStatus });
    toast.success(newStatus === 'active' ? 'Checkout ativado!' : 'Checkout pausado!');
    refreshCheckouts();
  };

  const copyCheckoutLink = (slug: string) => {
    const link = `${window.location.origin}/c/${slug}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado!');
  };

  const getStatusBadge = (status: ProductCheckout['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Ativo</Badge>;
      case 'paused':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pausado</Badge>;
      case 'draft':
        return <Badge className="bg-muted text-muted-foreground border-border">Rascunho</Badge>;
    }
  };

  const totalStats = checkouts.reduce(
    (acc, c) => ({
      views: acc.views + c.stats.views,
      conversions: acc.conversions + c.stats.conversions,
      revenue: acc.revenue + c.stats.revenue,
    }),
    { views: 0, conversions: 0, revenue: 0 }
  );

  const conversionRate = totalStats.views > 0 
    ? ((totalStats.conversions / totalStats.views) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Eye className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visualizações</p>
                <p className="text-xl font-bold">{totalStats.views.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversões</p>
                <p className="text-xl font-bold">{totalStats.conversions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <BarChart3 className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa Conv.</p>
                <p className="text-xl font-bold">{conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <DollarSign className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
                <p className="text-xl font-bold">R$ {totalStats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkouts List Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Checkouts do Produto</h3>
          <p className="text-sm text-muted-foreground">
            {checkouts.length} checkout{checkouts.length !== 1 ? 's' : ''} criado{checkouts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Checkout
        </Button>
      </div>

      {/* Checkouts Grid */}
      {checkouts.length === 0 ? (
        <Card className="border-dashed bg-muted/20">
          <CardContent className="p-12 text-center">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h4 className="font-semibold mb-2">Nenhum checkout criado</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Crie seu primeiro checkout personalizado para começar a vender.
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Checkout
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {checkouts.map((checkout) => (
            <Card 
              key={checkout.id} 
              className={cn(
                "relative overflow-hidden transition-all hover:shadow-lg",
                checkout.isDefault && "ring-2 ring-primary/50"
              )}
            >
              {checkout.isDefault && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Star className="h-3 w-3" />
                    Padrão
                  </Badge>
                </div>
              )}
              
              <div 
                className="h-24 relative"
                style={{ 
                  background: checkout.theme.buttonStyle === 'gradient'
                    ? `linear-gradient(135deg, ${checkout.theme.primaryColor}, ${checkout.theme.secondaryColor})`
                    : checkout.theme.primaryColor
                }}
              >
                <div className="absolute bottom-3 right-3">
                  {getStatusBadge(checkout.status)}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold line-clamp-1">{checkout.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      /{checkout.slug}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => navigate(`/produtos/checkout-builder/${productId}?checkoutId=${checkout.id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`/c/${checkout.slug}`, '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyCheckoutLink(checkout.slug)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDuplicate(checkout)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      {!checkout.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(checkout)}>
                          <Star className="h-4 w-4 mr-2" />
                          Definir Padrão
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleToggleStatus(checkout)}>
                        {checkout.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Ativar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          setCheckoutToDelete(checkout);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="font-semibold">{checkout.stats.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="font-semibold">{checkout.stats.conversions}</div>
                    <div className="text-xs text-muted-foreground">Vendas</div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="font-semibold">
                      {checkout.stats.views > 0 
                        ? ((checkout.stats.conversions / checkout.stats.views) * 100).toFixed(1) 
                        : '0.0'}%
                    </div>
                    <div className="text-xs text-muted-foreground">Conv.</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => copyCheckoutLink(checkout.slug)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/produtos/checkout-builder/${productId}?checkoutId=${checkout.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Checkout</DialogTitle>
            <DialogDescription>
              Dê um nome para o novo checkout de "{productTitle}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="checkout-name">Nome do Checkout</Label>
            <Input
              id="checkout-name"
              value={newCheckoutName}
              onChange={(e) => setNewCheckoutName(e.target.value)}
              placeholder="Ex: Checkout Black Friday"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCheckout}>
              Criar Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Checkout</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o checkout "{checkoutToDelete?.name}"? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
