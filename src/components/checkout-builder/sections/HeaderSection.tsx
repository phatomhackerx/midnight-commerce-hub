import React from 'react';
import { ProductCheckout, CheckoutHeader } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface HeaderSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function HeaderSection({ checkout, onUpdate }: HeaderSectionProps) {
  const updateHeader = (updates: Partial<CheckoutHeader>) => {
    onUpdate({
      header: {
        ...checkout.header,
        ...updates,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateHeader({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Cabeçalho</h3>
        <p className="text-sm text-muted-foreground">
          Configure o topo do seu checkout
        </p>
      </div>
      
      {/* Logo */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Logo</Label>
          <Switch
            checked={checkout.header.showLogo}
            onCheckedChange={(checked) => updateHeader({ showLogo: checked })}
          />
        </div>
        
        {checkout.header.showLogo && (
          <div className="space-y-3">
            {checkout.header.logo ? (
              <div className="relative inline-block">
                <img
                  src={checkout.header.logo}
                  alt="Logo"
                  className="h-16 object-contain rounded-lg border border-border bg-card p-2"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => updateHeader({ logo: null })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-all">
                <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Clique para fazer upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            )}
          </div>
        )}
      </div>
      
      {/* Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="title">Título</Label>
          <Switch
            checked={checkout.header.showTitle}
            onCheckedChange={(checked) => updateHeader({ showTitle: checked })}
          />
        </div>
        
        {checkout.header.showTitle && (
          <Input
            id="title"
            value={checkout.header.title}
            onChange={(e) => updateHeader({ title: e.target.value })}
            placeholder="Complete sua compra"
          />
        )}
      </div>
      
      {/* Subtitle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Switch
            checked={checkout.header.showSubtitle}
            onCheckedChange={(checked) => updateHeader({ showSubtitle: checked })}
          />
        </div>
        
        {checkout.header.showSubtitle && (
          <Input
            id="subtitle"
            value={checkout.header.subtitle}
            onChange={(e) => updateHeader({ subtitle: e.target.value })}
            placeholder="Preencha os dados abaixo"
          />
        )}
      </div>
      
      {/* Badge */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="badge">Badge/Destaque</Label>
          <Switch
            checked={checkout.header.showBadge}
            onCheckedChange={(checked) => updateHeader({ showBadge: checked })}
          />
        </div>
        
        {checkout.header.showBadge && (
          <Input
            id="badge"
            value={checkout.header.badgeText}
            onChange={(e) => updateHeader({ badgeText: e.target.value })}
            placeholder="🔥 Oferta especial"
          />
        )}
      </div>
    </div>
  );
}
