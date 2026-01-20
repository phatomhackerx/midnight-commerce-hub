import React from 'react';
import { ProductCheckout } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Code, Facebook, BarChart3, Music2, AlertCircle } from 'lucide-react';

interface PixelsSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

const pixelInputs = [
  {
    id: 'facebookPixel',
    label: 'Facebook Pixel',
    icon: Facebook,
    placeholder: '123456789012345',
    description: 'ID do seu Pixel do Facebook/Meta',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'googleAnalytics',
    label: 'Google Analytics',
    icon: BarChart3,
    placeholder: 'G-XXXXXXXXXX ou UA-XXXXXXXXX-X',
    description: 'ID de acompanhamento do GA4 ou Universal Analytics',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 'googleAds',
    label: 'Google Ads',
    icon: BarChart3,
    placeholder: 'AW-XXXXXXXXXX',
    description: 'ID de conversão do Google Ads',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'tiktokPixel',
    label: 'TikTok Pixel',
    icon: Music2,
    placeholder: 'CXXXXXXXXXXXXXXXXXX',
    description: 'ID do Pixel do TikTok',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
];

export default function PixelsSection({ checkout, onUpdate }: PixelsSectionProps) {
  const updatePixels = (updates: Partial<ProductCheckout['pixels']>) => {
    onUpdate({ pixels: { ...checkout.pixels, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Pixels & Rastreamento</h3>
        <p className="text-sm text-muted-foreground">
          Configure seus pixels para rastrear conversões
        </p>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-500">Importante</p>
            <p className="text-muted-foreground mt-1">
              Os pixels são disparados automaticamente em eventos de visualização, início de checkout e compra concluída.
            </p>
          </div>
        </div>
      </div>

      {/* Pixel Inputs */}
      <div className="space-y-4">
        {pixelInputs.map((pixel) => {
          const Icon = pixel.icon;
          const value = checkout.pixels[pixel.id as keyof ProductCheckout['pixels']];
          
          return (
            <div key={pixel.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${pixel.bgColor}`}>
                  <Icon className={`h-5 w-5 ${pixel.color}`} />
                </div>
                <div>
                  <Label className="font-medium">{pixel.label}</Label>
                  <p className="text-xs text-muted-foreground">{pixel.description}</p>
                </div>
              </div>
              <Input
                value={typeof value === 'string' ? value : ''}
                onChange={(e) => updatePixels({ [pixel.id]: e.target.value })}
                placeholder={pixel.placeholder}
                className="font-mono text-sm"
              />
            </div>
          );
        })}
      </div>

      {/* Custom Scripts */}
      <div className="space-y-3 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Code className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <Label className="font-medium">Scripts Personalizados</Label>
            <p className="text-xs text-muted-foreground">
              Adicione código JavaScript customizado (head)
            </p>
          </div>
        </div>
        <Textarea
          value={checkout.pixels.customScripts}
          onChange={(e) => updatePixels({ customScripts: e.target.value })}
          placeholder={`<script>
  // Seu código personalizado aqui
</script>`}
          rows={6}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          ⚠️ Scripts inválidos podem quebrar o checkout. Use com cuidado.
        </p>
      </div>

      {/* Events Table */}
      <div className="p-4 rounded-xl border border-border bg-muted/30">
        <h4 className="font-medium text-sm mb-3">Eventos Disparados</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">PageView</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">Ao carregar</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">InitiateCheckout</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">Preencher dados</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">AddPaymentInfo</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">Dados de pagamento</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Purchase</span>
            <span className="font-mono text-xs bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded">Compra concluída</span>
          </div>
        </div>
      </div>
    </div>
  );
}
