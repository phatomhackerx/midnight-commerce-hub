import React from 'react';
import { ProductCheckout, CheckoutGuarantee } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Shield, Medal, CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuaranteeSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const iconOptions = [
  { id: 'shield', icon: Shield, label: 'Escudo' },
  { id: 'medal', icon: Medal, label: 'Medalha' },
  { id: 'check', icon: CheckCircle, label: 'Check' },
  { id: 'star', icon: Star, label: 'Estrela' },
];

export default function GuaranteeSection({ checkout, onUpdate }: GuaranteeSectionProps) {
  const updateGuarantee = (updates: Partial<CheckoutGuarantee>) => {
    onUpdate({
      guarantee: {
        ...checkout.guarantee,
        ...updates,
      },
    });
  };

  const SelectedIcon = iconOptions.find(o => o.id === checkout.guarantee.iconType)?.icon || Shield;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Garantia</h3>
        <p className="text-sm text-muted-foreground">
          Mostre a garantia para aumentar a confiança
        </p>
      </div>
      
      {/* Enable Guarantee */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50">
        <div>
          <div className="font-medium">Mostrar Garantia</div>
          <div className="text-sm text-muted-foreground">
            Exibir selo de garantia no checkout
          </div>
        </div>
        <Switch
          checked={checkout.guarantee.enabled}
          onCheckedChange={(checked) => updateGuarantee({ enabled: checked })}
        />
      </div>
      
      {checkout.guarantee.enabled && (
        <>
          {/* Days */}
          <div className="space-y-2">
            <Label htmlFor="guarantee-days">Dias de Garantia</Label>
            <Input
              id="guarantee-days"
              type="number"
              min={1}
              max={365}
              value={checkout.guarantee.days}
              onChange={(e) => updateGuarantee({ days: parseInt(e.target.value) || 7 })}
            />
          </div>
          
          {/* Icon Type */}
          <div className="space-y-3">
            <Label>Ícone</Label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => updateGuarantee({ iconType: option.id as CheckoutGuarantee['iconType'] })}
                    className={cn(
                      'flex flex-col items-center p-3 rounded-xl border-2 transition-all',
                      checkout.guarantee.iconType === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Icon className="h-6 w-6 mb-1" />
                    <span className="text-xs">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="guarantee-title">Título</Label>
            <Input
              id="guarantee-title"
              value={checkout.guarantee.title}
              onChange={(e) => updateGuarantee({ title: e.target.value })}
              placeholder="Garantia incondicional"
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="guarantee-description">Descrição</Label>
            <Textarea
              id="guarantee-description"
              value={checkout.guarantee.description}
              onChange={(e) => updateGuarantee({ description: e.target.value })}
              placeholder="Se não gostar, devolvemos 100% do seu dinheiro"
              rows={3}
            />
          </div>
          
          {/* Preview */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <SelectedIcon className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div>
                <div className="font-semibold text-emerald-700">
                  {checkout.guarantee.title || 'Garantia incondicional'} de {checkout.guarantee.days} dias
                </div>
                <div className="text-sm text-emerald-600 mt-1">
                  {checkout.guarantee.description || 'Se não gostar, devolvemos 100% do seu dinheiro'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
