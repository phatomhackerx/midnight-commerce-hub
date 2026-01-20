import React from 'react';
import { ProductCheckout } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpsellSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const positions = [
  { id: 'before_payment', name: 'Antes do Pagamento', description: 'Na mesma página do checkout' },
  { id: 'after_payment', name: 'Após Pagamento', description: 'Página de upsell pós-compra' },
  { id: 'popup', name: 'Pop-up', description: 'Modal antes de finalizar' },
];

export default function UpsellSection({ checkout, onUpdate }: UpsellSectionProps) {
  const updateUpsell = (updates: Partial<ProductCheckout['upsell']>) => {
    onUpdate({ upsell: { ...checkout.upsell, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Upsell</h3>
        <p className="text-sm text-muted-foreground">
          Ofereça um produto de maior valor ou upgrade
        </p>
      </div>

      {/* Enable Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Label className="font-medium">Ativar Upsell</Label>
            <p className="text-xs text-muted-foreground">Oferecer produto adicional</p>
          </div>
        </div>
        <Switch
          checked={checkout.upsell.enabled}
          onCheckedChange={(checked) => updateUpsell({ enabled: checked })}
        />
      </div>

      {checkout.upsell.enabled && (
        <>
          {/* Stats Info */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-emerald-500">Aumente suas vendas</p>
                <p className="text-muted-foreground mt-1">
                  Upsells bem feitos podem aumentar seu faturamento em até 30%!
                </p>
              </div>
            </div>
          </div>

          {/* Position */}
          <div className="space-y-3">
            <Label className="font-medium">Quando exibir</Label>
            <RadioGroup
              value={checkout.upsell.position}
              onValueChange={(value) => updateUpsell({ position: value as ProductCheckout['upsell']['position'] })}
              className="space-y-2"
            >
              {positions.map((pos) => (
                <Label
                  key={pos.id}
                  htmlFor={`upsell-pos-${pos.id}`}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                    checkout.upsell.position === pos.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={pos.id} id={`upsell-pos-${pos.id}`} />
                  <div>
                    <div className="font-medium text-sm">{pos.name}</div>
                    <div className="text-xs text-muted-foreground">{pos.description}</div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Content */}
          <div className="space-y-4 p-4 rounded-xl bg-card border border-border">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Conteúdo do Upsell
            </h4>

            <div className="space-y-2">
              <Label className="text-xs">Título</Label>
              <Input
                value={checkout.upsell.title}
                onChange={(e) => updateUpsell({ title: e.target.value })}
                placeholder="Aproveite esta oferta exclusiva!"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Descrição</Label>
              <Textarea
                value={checkout.upsell.description}
                onChange={(e) => updateUpsell({ description: e.target.value })}
                placeholder="Descreva os benefícios do upgrade..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Preço (R$)</Label>
                <Input
                  type="number"
                  value={checkout.upsell.price}
                  onChange={(e) => updateUpsell({ price: Number(e.target.value) })}
                  placeholder="97,00"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Preço Original (R$)</Label>
                <Input
                  type="number"
                  value={checkout.upsell.originalPrice}
                  onChange={(e) => updateUpsell({ originalPrice: Number(e.target.value) })}
                  placeholder="197,00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Imagem do Produto</Label>
              <Input
                value={checkout.upsell.image || ''}
                onChange={(e) => updateUpsell({ image: e.target.value || null })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            {checkout.upsell.image && (
              <div className="p-3 rounded-lg bg-muted/50">
                <img
                  src={checkout.upsell.image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Preview Card */}
          <div className="p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-2">Preview:</p>
            <div className="p-4 rounded-lg bg-card border shadow-sm">
              <h4 className="font-bold text-lg">{checkout.upsell.title || 'Título do Upsell'}</h4>
              <p className="text-sm text-muted-foreground mt-1">{checkout.upsell.description || 'Descrição...'}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg font-bold text-primary">R$ {checkout.upsell.price.toFixed(2)}</span>
                {checkout.upsell.originalPrice > checkout.upsell.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {checkout.upsell.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
