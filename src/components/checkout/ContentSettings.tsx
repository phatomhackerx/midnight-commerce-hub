
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";

interface ContentSettingsProps {
  config: CheckoutConfig;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onToggleReviews: (show: boolean) => void;
  onToggleCountdown: (show: boolean) => void;
  onUpdateCountdownTime: (minutes: number) => void;
  onToggleGuarantee: (show: boolean) => void;
  onUpdateGuaranteeDays: (days: number) => void;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({
  config,
  onUpdateTitle,
  onUpdateDescription,
  onToggleReviews,
  onToggleCountdown,
  onUpdateCountdownTime,
  onToggleGuarantee,
  onUpdateGuaranteeDays
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="checkout-title">Título do Checkout</Label>
        <Input
          id="checkout-title"
          value={config.titulo}
          onChange={(e) => onUpdateTitle(e.target.value)}
          placeholder="Ex: Garanta agora seu acesso ao curso..."
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="checkout-description">Descrição</Label>
        <Textarea
          id="checkout-description"
          value={config.descricao}
          onChange={(e) => onUpdateDescription(e.target.value)}
          placeholder="Descreva brevemente o produto ou os benefícios da compra..."
          rows={4}
        />
      </div>
      
      <div className="space-y-6 pt-2">
        <h3 className="text-lg font-medium">Elementos de conversão</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="show-reviews" className="block font-medium">Mostrar avaliações</Label>
            <p className="text-sm text-muted-foreground">
              Exibe as estrelas de avaliação no checkout
            </p>
          </div>
          <Switch
            id="show-reviews"
            checked={config.mostrarAvaliacao}
            onCheckedChange={onToggleReviews}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-countdown" className="block font-medium">Contador regressivo</Label>
              <p className="text-sm text-muted-foreground">
                Adiciona um contador de tempo limitado
              </p>
            </div>
            <Switch
              id="show-countdown"
              checked={config.mostrarContador}
              onCheckedChange={onToggleCountdown}
            />
          </div>
          
          {config.mostrarContador && (
            <div className="space-y-2 pl-4 border-l-2 border-gray-100">
              <Label htmlFor="countdown-time">Tempo (minutos)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="countdown-time"
                  value={[config.tempoContador]}
                  min={5}
                  max={60}
                  step={5}
                  onValueChange={(values) => onUpdateCountdownTime(values[0])}
                />
                <span className="font-medium w-8 text-right">{config.tempoContador}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-guarantee" className="block font-medium">Garantia de reembolso</Label>
              <p className="text-sm text-muted-foreground">
                Exibe a garantia de reembolso no checkout
              </p>
            </div>
            <Switch
              id="show-guarantee"
              checked={config.mostrarGarantia}
              onCheckedChange={onToggleGuarantee}
            />
          </div>
          
          {config.mostrarGarantia && (
            <div className="space-y-2 pl-4 border-l-2 border-gray-100">
              <Label htmlFor="guarantee-days">Dias de garantia</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="guarantee-days"
                  value={[config.diasGarantia]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(values) => onUpdateGuaranteeDays(values[0])}
                />
                <span className="font-medium w-8 text-right">{config.diasGarantia}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSettings;
