import React from 'react';
import { ProductCheckout } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface LayoutSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const layouts = [
  {
    id: 'one-column',
    name: 'Uma Coluna',
    description: 'Layout centralizado e focado',
    preview: (
      <div className="space-y-1">
        <div className="h-3 bg-muted-foreground/30 rounded w-full" />
        <div className="h-6 bg-muted-foreground/20 rounded" />
        <div className="h-4 bg-primary/40 rounded" />
      </div>
    ),
  },
  {
    id: 'two-column',
    name: 'Duas Colunas',
    description: 'Produto à esquerda, pagamento à direita',
    preview: (
      <div className="flex gap-1">
        <div className="flex-1 space-y-1">
          <div className="h-4 bg-muted-foreground/30 rounded" />
          <div className="h-3 bg-muted-foreground/20 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-muted-foreground/20 rounded" />
          <div className="h-4 bg-primary/40 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design contemporâneo com cards',
    preview: (
      <div className="space-y-1">
        <div className="flex gap-1">
          <div className="h-6 bg-muted-foreground/20 rounded flex-1" />
          <div className="h-6 bg-primary/30 rounded w-8" />
        </div>
        <div className="h-4 bg-primary/40 rounded" />
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Clean e sem distrações',
    preview: (
      <div className="space-y-2 p-1">
        <div className="h-2 bg-muted-foreground/20 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-primary/40 rounded w-1/2 mx-auto" />
      </div>
    ),
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Impactante e conversivo',
    preview: (
      <div className="bg-muted-foreground/10 rounded p-1 space-y-1">
        <div className="h-3 bg-primary/50 rounded" />
        <div className="h-2 bg-muted-foreground/30 rounded" />
        <div className="h-4 bg-primary rounded" />
      </div>
    ),
  },
];

export default function LayoutSection({ checkout, onUpdate }: LayoutSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Layout do Checkout</h3>
        <p className="text-sm text-muted-foreground">
          Escolha a estrutura visual do seu checkout
        </p>
      </div>
      
      <RadioGroup
        value={checkout.layout}
        onValueChange={(value) => onUpdate({ layout: value as ProductCheckout['layout'] })}
        className="grid grid-cols-1 gap-3"
      >
        {layouts.map((layout) => (
          <Label
            key={layout.id}
            htmlFor={layout.id}
            className={cn(
              'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
              checkout.layout === layout.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-accent/30'
            )}
          >
            <RadioGroupItem value={layout.id} id={layout.id} className="mt-1" />
            <div className="flex-1 min-w-0">
              <div className="font-medium">{layout.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {layout.description}
              </div>
            </div>
            <div className="w-20 h-12 bg-card border border-border rounded-lg p-1.5 shrink-0">
              {layout.preview}
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
