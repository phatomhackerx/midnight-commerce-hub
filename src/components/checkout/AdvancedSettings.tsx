
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";

interface AdvancedSettingsProps {
  config: CheckoutConfig;
  onUpdateFacebookPixel: (pixel: string) => void;
  onUpdateGooglePixel: (pixel: string) => void;
  onUpdateTikTokPixel: (pixel: string) => void;
  onUpdateCustomScripts: (scripts: string) => void;
  onUpdateDomain: (domain: string) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  config,
  onUpdateFacebookPixel,
  onUpdateGooglePixel,
  onUpdateTikTokPixel,
  onUpdateCustomScripts,
  onUpdateDomain
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Pixels de Rastreamento</h3>
        
        <div className="space-y-2">
          <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
          <Input
            id="facebook-pixel"
            value={config.pixelFacebook}
            onChange={(e) => onUpdateFacebookPixel(e.target.value)}
            placeholder="Ex: 1234567890"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="google-pixel">Google Analytics ID</Label>
          <Input
            id="google-pixel"
            value={config.pixelGoogle}
            onChange={(e) => onUpdateGooglePixel(e.target.value)}
            placeholder="Ex: G-XXXXXXXXXX ou UA-XXXXXXXX-X"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tiktok-pixel">TikTok Pixel ID</Label>
          <Input
            id="tiktok-pixel"
            value={config.pixelTikTok}
            onChange={(e) => onUpdateTikTokPixel(e.target.value)}
            placeholder="Ex: XXXXXXXXXX"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Scripts personalizados</h3>
        <div className="space-y-2">
          <Label htmlFor="custom-scripts">Código HTML ou JavaScript adicional</Label>
          <Textarea
            id="custom-scripts"
            value={config.scriptsPersonalizados}
            onChange={(e) => onUpdateCustomScripts(e.target.value)}
            placeholder="<!-- Seu código personalizado aqui -->"
            rows={5}
            className="font-mono text-sm"
          />
          <p className="text-sm text-muted-foreground">
            Adicione scripts ou códigos HTML que serão inseridos no checkout
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Domínio personalizado</h3>
        <div className="space-y-2">
          <Label htmlFor="custom-domain">Domínio de checkout</Label>
          <Input
            id="custom-domain"
            value={config.dominio}
            onChange={(e) => onUpdateDomain(e.target.value)}
            placeholder="Ex: checkout.seudominio.com.br"
          />
          <p className="text-sm text-muted-foreground">
            Configure um domínio personalizado para seu checkout (requer configuração DNS)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
