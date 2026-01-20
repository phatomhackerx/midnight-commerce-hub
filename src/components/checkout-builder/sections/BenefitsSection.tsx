import React from 'react';
import { ProductCheckout, CheckoutBenefit } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical, Zap, Shield, Headphones, Clock, Star, Gift, Trophy, Target, Sparkles, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenefitsSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const availableIcons = [
  { id: 'zap', label: 'Acesso Rápido', icon: Zap },
  { id: 'shield', label: 'Segurança', icon: Shield },
  { id: 'headphones', label: 'Suporte', icon: Headphones },
  { id: 'clock', label: 'Tempo', icon: Clock },
  { id: 'star', label: 'Qualidade', icon: Star },
  { id: 'gift', label: 'Bônus', icon: Gift },
  { id: 'trophy', label: 'Sucesso', icon: Trophy },
  { id: 'target', label: 'Objetivo', icon: Target },
  { id: 'sparkles', label: 'Exclusivo', icon: Sparkles },
  { id: 'heart', label: 'Favorito', icon: Heart },
];

const getIconComponent = (iconId: string) => {
  const found = availableIcons.find(i => i.id === iconId);
  return found?.icon || Zap;
};

export default function BenefitsSection({ checkout, onUpdate }: BenefitsSectionProps) {
  const addBenefit = () => {
    const newBenefit: CheckoutBenefit = {
      id: `benefit_${Date.now()}`,
      icon: 'zap',
      title: 'Novo Benefício',
      description: 'Descreva o benefício aqui',
      enabled: true,
    };
    onUpdate({ benefits: [...checkout.benefits, newBenefit] });
  };

  const updateBenefit = (id: string, updates: Partial<CheckoutBenefit>) => {
    onUpdate({
      benefits: checkout.benefits.map(b => b.id === id ? { ...b, ...updates } : b),
    });
  };

  const removeBenefit = (id: string) => {
    onUpdate({ benefits: checkout.benefits.filter(b => b.id !== id) });
  };

  const toggleBenefit = (id: string) => {
    const benefit = checkout.benefits.find(b => b.id === id);
    if (benefit) {
      updateBenefit(id, { enabled: !benefit.enabled });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Benefícios</h3>
        <p className="text-sm text-muted-foreground">
          Destaque os benefícios do seu produto
        </p>
      </div>

      <div className="space-y-3">
        {checkout.benefits.map((benefit, index) => {
          const IconComponent = getIconComponent(benefit.icon);
          
          return (
            <div
              key={benefit.id}
              className={cn(
                'p-4 rounded-xl border transition-all',
                benefit.enabled ? 'bg-card border-border' : 'bg-muted/30 border-muted opacity-60'
              )}
            >
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab mt-1" />
                
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Benefício {index + 1}</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={benefit.enabled}
                        onCheckedChange={() => toggleBenefit(benefit.id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeBenefit(benefit.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Ícone</Label>
                    <Select
                      value={benefit.icon}
                      onValueChange={(value) => updateBenefit(benefit.id, { icon: value })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableIcons.map((icon) => {
                          const Icon = icon.icon;
                          return (
                            <SelectItem key={icon.id} value={icon.id}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{icon.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Título</Label>
                    <Input
                      value={benefit.title}
                      onChange={(e) => updateBenefit(benefit.id, { title: e.target.value })}
                      placeholder="Título do benefício"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Descrição</Label>
                    <Input
                      value={benefit.description}
                      onChange={(e) => updateBenefit(benefit.id, { description: e.target.value })}
                      placeholder="Breve descrição"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={addBenefit}
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Benefício
      </Button>
    </div>
  );
}
