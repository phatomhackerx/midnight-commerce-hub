import React from 'react';
import { ProductCheckout } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ProductSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const imagePositions = [
  { id: 'left', name: 'Esquerda', icon: '◀️ 📦' },
  { id: 'top', name: 'Topo', icon: '🔝 📦' },
  { id: 'right', name: 'Direita', icon: '📦 ▶️' },
];

export default function ProductSection({ checkout, onUpdate }: ProductSectionProps) {
  const updateProduct = (updates: Partial<ProductCheckout['product']>) => {
    onUpdate({ product: { ...checkout.product, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Exibição do Produto</h3>
        <p className="text-sm text-muted-foreground">
          Configure como seu produto aparece no checkout
        </p>
      </div>

      {/* Image Settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Mostrar Imagem</Label>
            <p className="text-xs text-muted-foreground">Exibir imagem do produto</p>
          </div>
          <Switch
            checked={checkout.product.showImage}
            onCheckedChange={(checked) => updateProduct({ showImage: checked })}
          />
        </div>

        {checkout.product.showImage && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Posição da Imagem</Label>
            <RadioGroup
              value={checkout.product.imagePosition}
              onValueChange={(value) => updateProduct({ imagePosition: value as 'left' | 'top' | 'right' })}
              className="flex gap-2"
            >
              {imagePositions.map((pos) => (
                <Label
                  key={pos.id}
                  htmlFor={`pos-${pos.id}`}
                  className={cn(
                    'flex-1 flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all',
                    checkout.product.imagePosition === pos.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={pos.id} id={`pos-${pos.id}`} className="sr-only" />
                  <span className="text-lg">{pos.icon}</span>
                  <span className="text-xs mt-1">{pos.name}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Price Settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border">
        <h4 className="font-medium text-sm">Configurações de Preço</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Mostrar Preço</Label>
            <p className="text-xs text-muted-foreground">Exibir o preço atual</p>
          </div>
          <Switch
            checked={checkout.product.showPrice}
            onCheckedChange={(checked) => updateProduct({ showPrice: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Preço Original</Label>
            <p className="text-xs text-muted-foreground">Mostrar preço riscado</p>
          </div>
          <Switch
            checked={checkout.product.showOriginalPrice}
            onCheckedChange={(checked) => updateProduct({ showOriginalPrice: checked })}
          />
        </div>

        {checkout.product.showOriginalPrice && (
          <div className="space-y-2">
            <Label className="text-sm">Valor Original (R$)</Label>
            <Input
              type="number"
              value={checkout.product.originalPrice}
              onChange={(e) => updateProduct({ originalPrice: Number(e.target.value) })}
              placeholder="197,00"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Mostrar Desconto</Label>
            <p className="text-xs text-muted-foreground">Badge com % de desconto</p>
          </div>
          <Switch
            checked={checkout.product.showDiscount}
            onCheckedChange={(checked) => updateProduct({ showDiscount: checked })}
          />
        </div>

        {checkout.product.showDiscount && (
          <div className="space-y-2">
            <Label className="text-sm">Percentual de Desconto (%)</Label>
            <Input
              type="number"
              value={checkout.product.discountPercentage}
              onChange={(e) => updateProduct({ discountPercentage: Number(e.target.value) })}
              placeholder="50"
              min={0}
              max={100}
            />
          </div>
        )}
      </div>

      {/* Social Proof */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border">
        <h4 className="font-medium text-sm">Prova Social</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Avaliação</Label>
            <p className="text-xs text-muted-foreground">Mostrar estrelas de avaliação</p>
          </div>
          <Switch
            checked={checkout.product.showRating}
            onCheckedChange={(checked) => updateProduct({ showRating: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Contador de Vendas</Label>
            <p className="text-xs text-muted-foreground">Ex: "1.234 vendidos"</p>
          </div>
          <Switch
            checked={checkout.product.showSalesCount}
            onCheckedChange={(checked) => updateProduct({ showSalesCount: checked })}
          />
        </div>
      </div>
    </div>
  );
}
