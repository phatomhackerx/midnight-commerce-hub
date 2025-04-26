
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";

interface DesignSettingsProps {
  config: CheckoutConfig;
  onUpdateConfig: (data: { layout: "padrao" | "minimalista" | "destaque" }) => void;
  onUpdateColor: (color: string) => void;
  onUpdateLogo: (logo: string | null) => void;
}

const DesignSettings: React.FC<DesignSettingsProps> = ({
  config,
  onUpdateConfig,
  onUpdateColor,
  onUpdateLogo
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(config.logo);

  const handleLayoutChange = (value: "padrao" | "minimalista" | "destaque") => {
    onUpdateConfig({ layout: value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateColor(e.target.value);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        onUpdateLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    onUpdateLogo(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Layout do Checkout</h3>
        <RadioGroup 
          value={config.layout} 
          onValueChange={(val) => handleLayoutChange(val as "padrao" | "minimalista" | "destaque")}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="padrao" id="layout-padrao" />
            <Label htmlFor="layout-padrao" className="flex-1 cursor-pointer">
              <div className="font-medium">Padrão</div>
              <div className="text-sm text-muted-foreground">Layout padrão com elementos básicos</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimalista" id="layout-minimalista" />
            <Label htmlFor="layout-minimalista" className="flex-1 cursor-pointer">
              <div className="font-medium">Minimalista</div>
              <div className="text-sm text-muted-foreground">Layout simplificado para conversão rápida</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="destaque" id="layout-destaque" />
            <Label htmlFor="layout-destaque" className="flex-1 cursor-pointer">
              <div className="font-medium">Destaque</div>
              <div className="text-sm text-muted-foreground">Layout mais rico com elementos de conversão em destaque</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Cor principal</h3>
        <div className="flex items-center gap-3">
          <Input
            type="color"
            value={config.cor}
            onChange={handleColorChange}
            className="w-16 h-10 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={config.cor}
            onChange={handleColorChange}
            className="flex-1"
            maxLength={7}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Esta cor será aplicada a elementos principais como botões e destaques
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Logo</h3>
        {logoPreview ? (
          <div className="space-y-3">
            <div className="border rounded p-4 flex items-center justify-center bg-white">
              <img src={logoPreview} alt="Logo Preview" className="max-h-12 object-contain" />
            </div>
            <Button variant="outline" onClick={handleRemoveLogo}>
              Remover logo
            </Button>
          </div>
        ) : (
          <div>
            <Label htmlFor="logo-upload" className="block">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <p className="text-sm text-muted-foreground">
                  Clique para fazer upload da logo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG ou SVG (máx. 2MB)
                </p>
              </div>
              <Input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
              />
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignSettings;
