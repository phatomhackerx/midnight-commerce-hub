
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";

interface UpsellSettingsProps {
  config: CheckoutConfig;
  onUpdateUpsell: (upsell: {
    ativo: boolean;
    titulo: string;
    descricao: string;
    preco: number;
    imagem: string | null;
  }) => void;
}

const UpsellSettings: React.FC<UpsellSettingsProps> = ({
  config,
  onUpdateUpsell
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(config.upsell.imagem);

  const handleToggleUpsell = (active: boolean) => {
    onUpdateUpsell({
      ...config.upsell,
      ativo: active
    });
  };

  const handleFieldChange = (
    field: keyof Omit<typeof config.upsell, 'ativo' | 'imagem'>,
    value: string | number
  ) => {
    onUpdateUpsell({
      ...config.upsell,
      [field]: field === 'preco' ? Number(value) : value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onUpdateUpsell({
          ...config.upsell,
          imagem: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onUpdateUpsell({
      ...config.upsell,
      imagem: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Oferta adicional (Upsell)</h3>
          <p className="text-sm text-muted-foreground">
            Adicione uma oferta complementar ao produto principal
          </p>
        </div>
        <Switch
          checked={config.upsell.ativo}
          onCheckedChange={handleToggleUpsell}
        />
      </div>
      
      {config.upsell.ativo && (
        <div className="space-y-4 pl-4 border-l-2 border-gray-100">
          <div className="space-y-2">
            <Label htmlFor="upsell-title">Título da oferta</Label>
            <Input
              id="upsell-title"
              value={config.upsell.titulo}
              onChange={(e) => handleFieldChange("titulo", e.target.value)}
              placeholder="Ex: Adicione este bônus exclusivo!"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="upsell-description">Descrição</Label>
            <Textarea
              id="upsell-description"
              value={config.upsell.descricao}
              onChange={(e) => handleFieldChange("descricao", e.target.value)}
              placeholder="Descreva brevemente o produto adicional..."
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="upsell-price">Preço (R$)</Label>
            <Input
              id="upsell-price"
              type="number"
              min="0"
              step="0.01"
              value={config.upsell.preco}
              onChange={(e) => handleFieldChange("preco", parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Imagem do produto (opcional)</Label>
            {imagePreview ? (
              <div className="space-y-3">
                <div className="border rounded p-2 flex items-center justify-center bg-white">
                  <img src={imagePreview} alt="Upsell Preview" className="max-h-20 object-contain" />
                </div>
                <Button variant="outline" onClick={handleRemoveImage} size="sm">
                  Remover imagem
                </Button>
              </div>
            ) : (
              <div>
                <Label htmlFor="upsell-image-upload" className="block">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">
                      Clique para fazer upload da imagem
                    </p>
                  </div>
                  <Input
                    type="file"
                    id="upsell-image-upload"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellSettings;
