import React from 'react';
import { ProductCheckout, CheckoutTheme } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ThemeSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const presetColors = [
  { name: 'Roxo', primary: '#7c3aed', secondary: '#a855f7' },
  { name: 'Azul', primary: '#3b82f6', secondary: '#60a5fa' },
  { name: 'Verde', primary: '#10b981', secondary: '#34d399' },
  { name: 'Vermelho', primary: '#ef4444', secondary: '#f87171' },
  { name: 'Laranja', primary: '#f97316', secondary: '#fb923c' },
  { name: 'Rosa', primary: '#ec4899', secondary: '#f472b6' },
  { name: 'Preto', primary: '#18181b', secondary: '#3f3f46' },
];

const fonts = [
  { id: 'Inter', name: 'Inter', style: 'font-sans' },
  { id: 'Poppins', name: 'Poppins', style: 'font-sans' },
  { id: 'Roboto', name: 'Roboto', style: 'font-sans' },
  { id: 'Open Sans', name: 'Open Sans', style: 'font-sans' },
  { id: 'Montserrat', name: 'Montserrat', style: 'font-sans' },
];

const borderRadii = [
  { id: 'none', name: 'Nenhum', preview: 'rounded-none' },
  { id: 'sm', name: 'Pequeno', preview: 'rounded-sm' },
  { id: 'md', name: 'Médio', preview: 'rounded-md' },
  { id: 'lg', name: 'Grande', preview: 'rounded-lg' },
  { id: 'xl', name: 'Extra Grande', preview: 'rounded-xl' },
  { id: 'full', name: 'Completo', preview: 'rounded-full' },
];

export default function ThemeSection({ checkout, onUpdate }: ThemeSectionProps) {
  const updateTheme = (updates: Partial<CheckoutTheme>) => {
    onUpdate({
      theme: {
        ...checkout.theme,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-1">Tema e Cores</h3>
        <p className="text-sm text-muted-foreground">
          Personalize as cores e estilo do checkout
        </p>
      </div>
      
      {/* Preset Colors */}
      <div className="space-y-3">
        <Label>Cores Predefinidas</Label>
        <div className="flex flex-wrap gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateTheme({ 
                primaryColor: preset.primary, 
                secondaryColor: preset.secondary 
              })}
              className={cn(
                'w-10 h-10 rounded-xl border-2 transition-all hover:scale-110',
                checkout.theme.primaryColor === preset.primary
                  ? 'border-foreground ring-2 ring-foreground/20'
                  : 'border-transparent'
              )}
              style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }}
              title={preset.name}
            />
          ))}
        </div>
      </div>
      
      {/* Custom Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Cor Primária</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="primaryColor"
              value={checkout.theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={checkout.theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Cor Secundária</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="secondaryColor"
              value={checkout.theme.secondaryColor}
              onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={checkout.theme.secondaryColor}
              onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Fundo</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="backgroundColor"
              value={checkout.theme.backgroundColor}
              onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={checkout.theme.backgroundColor}
              onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="textColor">Texto</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="textColor"
              value={checkout.theme.textColor}
              onChange={(e) => updateTheme({ textColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={checkout.theme.textColor}
              onChange={(e) => updateTheme({ textColor: e.target.value })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Font Family */}
      <div className="space-y-3">
        <Label>Fonte</Label>
        <Select
          value={checkout.theme.fontFamily}
          onValueChange={(value) => updateTheme({ fontFamily: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.id} value={font.id}>
                <span style={{ fontFamily: font.id }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Border Radius */}
      <div className="space-y-3">
        <Label>Arredondamento</Label>
        <div className="grid grid-cols-3 gap-2">
          {borderRadii.map((radius) => (
            <button
              key={radius.id}
              onClick={() => updateTheme({ borderRadius: radius.id as CheckoutTheme['borderRadius'] })}
              className={cn(
                'p-3 border-2 transition-all text-center',
                radius.preview,
                checkout.theme.borderRadius === radius.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div 
                className={cn('w-full h-6 bg-muted-foreground/30 mb-1', radius.preview)} 
              />
              <span className="text-xs">{radius.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Button Style */}
      <div className="space-y-3">
        <Label>Estilo dos Botões</Label>
        <RadioGroup
          value={checkout.theme.buttonStyle}
          onValueChange={(value) => updateTheme({ buttonStyle: value as CheckoutTheme['buttonStyle'] })}
          className="flex gap-3"
        >
          <Label
            htmlFor="btn-solid"
            className={cn(
              'flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center',
              checkout.theme.buttonStyle === 'solid'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            )}
          >
            <RadioGroupItem value="solid" id="btn-solid" className="sr-only" />
            <div 
              className="h-8 rounded-lg mb-1"
              style={{ backgroundColor: checkout.theme.primaryColor }}
            />
            <span className="text-xs">Sólido</span>
          </Label>
          
          <Label
            htmlFor="btn-gradient"
            className={cn(
              'flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center',
              checkout.theme.buttonStyle === 'gradient'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            )}
          >
            <RadioGroupItem value="gradient" id="btn-gradient" className="sr-only" />
            <div 
              className="h-8 rounded-lg mb-1"
              style={{ 
                background: `linear-gradient(135deg, ${checkout.theme.primaryColor}, ${checkout.theme.secondaryColor})` 
              }}
            />
            <span className="text-xs">Gradiente</span>
          </Label>
          
          <Label
            htmlFor="btn-outline"
            className={cn(
              'flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center',
              checkout.theme.buttonStyle === 'outline'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            )}
          >
            <RadioGroupItem value="outline" id="btn-outline" className="sr-only" />
            <div 
              className="h-8 rounded-lg mb-1 border-2"
              style={{ borderColor: checkout.theme.primaryColor }}
            />
            <span className="text-xs">Outline</span>
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
}
