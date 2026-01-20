import React from 'react';
import { ProductCheckout, CheckoutOrderBump } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Gift, GripVertical, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderBumpsSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function OrderBumpsSection({ checkout, onUpdate }: OrderBumpsSectionProps) {
  const addOrderBump = () => {
    const newBump: CheckoutOrderBump = {
      id: `bump_${Date.now()}`,
      enabled: true,
      productId: null,
      title: 'Oferta Especial',
      description: 'Adicione este bônus exclusivo por apenas mais R$27!',
      price: 27,
      image: null,
      callToAction: 'SIM! Adicionar ao pedido',
      highlight: true,
    };
    onUpdate({ orderBumps: [...checkout.orderBumps, newBump] });
  };

  const updateBump = (id: string, updates: Partial<CheckoutOrderBump>) => {
    onUpdate({
      orderBumps: checkout.orderBumps.map(b => b.id === id ? { ...b, ...updates } : b),
    });
  };

  const removeBump = (id: string) => {
    onUpdate({ orderBumps: checkout.orderBumps.filter(b => b.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Order Bumps</h3>
        <p className="text-sm text-muted-foreground">
          Aumente seu ticket médio com ofertas irresistíveis
        </p>
      </div>

      {/* Tips */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-500">Dica de conversão</p>
            <p className="text-muted-foreground mt-1">
              Order bumps com preço entre 30-50% do produto principal têm maiores taxas de conversão.
            </p>
          </div>
        </div>
      </div>

      {checkout.orderBumps.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
          <Gift className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhum order bump configurado</p>
          <p className="text-xs mt-1">Adicione ofertas complementares</p>
        </div>
      ) : (
        <div className="space-y-4">
          {checkout.orderBumps.map((bump, index) => (
            <div
              key={bump.id}
              className={cn(
                'p-4 rounded-xl border transition-all',
                bump.enabled ? 'bg-card border-border' : 'bg-muted/30 border-muted opacity-60'
              )}
            >
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab mt-1" />
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      <span className="font-medium">Order Bump {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={bump.enabled}
                        onCheckedChange={(checked) => updateBump(bump.id, { enabled: checked })}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeBump(bump.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Título</Label>
                      <Input
                        value={bump.title}
                        onChange={(e) => updateBump(bump.id, { title: e.target.value })}
                        placeholder="Nome da oferta"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={bump.description}
                        onChange={(e) => updateBump(bump.id, { description: e.target.value })}
                        placeholder="Por que o cliente deve adicionar?"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Preço (R$)</Label>
                        <Input
                          type="number"
                          value={bump.price}
                          onChange={(e) => updateBump(bump.id, { price: Number(e.target.value) })}
                          placeholder="27,00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Imagem URL</Label>
                        <Input
                          value={bump.image || ''}
                          onChange={(e) => updateBump(bump.id, { image: e.target.value || null })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Texto do Botão (CTA)</Label>
                      <Input
                        value={bump.callToAction}
                        onChange={(e) => updateBump(bump.id, { callToAction: e.target.value })}
                        placeholder="SIM! Adicionar ao pedido"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <Label className="font-medium">Destacar</Label>
                        <p className="text-xs text-muted-foreground">Adicionar borda colorida</p>
                      </div>
                      <Switch
                        checked={bump.highlight}
                        onCheckedChange={(checked) => updateBump(bump.id, { highlight: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={addOrderBump}
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Order Bump
      </Button>
    </div>
  );
}
