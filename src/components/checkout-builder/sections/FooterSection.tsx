import React from 'react';
import { ProductCheckout } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { FileText, Shield, Mail, Sparkles } from 'lucide-react';

interface FooterSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function FooterSection({ checkout, onUpdate }: FooterSectionProps) {
  const updateFooter = (updates: Partial<ProductCheckout['footer']>) => {
    onUpdate({ footer: { ...checkout.footer, ...updates } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Rodapé</h3>
        <p className="text-sm text-muted-foreground">
          Configure os links e informações do rodapé
        </p>
      </div>

      {/* Terms of Service */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <Label className="font-medium">Termos de Uso</Label>
              <p className="text-xs text-muted-foreground">Link para seus termos</p>
            </div>
          </div>
          <Switch
            checked={checkout.footer.showTerms}
            onCheckedChange={(checked) => updateFooter({ showTerms: checked })}
          />
        </div>
        
        {checkout.footer.showTerms && (
          <Input
            value={checkout.footer.termsLink}
            onChange={(e) => updateFooter({ termsLink: e.target.value })}
            placeholder="/termos-de-uso"
          />
        )}
      </div>

      {/* Privacy Policy */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <Label className="font-medium">Política de Privacidade</Label>
              <p className="text-xs text-muted-foreground">Link para sua política</p>
            </div>
          </div>
          <Switch
            checked={checkout.footer.showPrivacy}
            onCheckedChange={(checked) => updateFooter({ showPrivacy: checked })}
          />
        </div>
        
        {checkout.footer.showPrivacy && (
          <Input
            value={checkout.footer.privacyLink}
            onChange={(e) => updateFooter({ privacyLink: e.target.value })}
            placeholder="/politica-de-privacidade"
          />
        )}
      </div>

      {/* Support Email */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Mail className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <Label className="font-medium">E-mail de Suporte</Label>
              <p className="text-xs text-muted-foreground">Contato para dúvidas</p>
            </div>
          </div>
          <Switch
            checked={checkout.footer.showSupport}
            onCheckedChange={(checked) => updateFooter({ showSupport: checked })}
          />
        </div>
        
        {checkout.footer.showSupport && (
          <Input
            type="email"
            value={checkout.footer.supportEmail}
            onChange={(e) => updateFooter({ supportEmail: e.target.value })}
            placeholder="suporte@exemplo.com"
          />
        )}
      </div>

      {/* Branding */}
      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <Label className="font-medium">Marca da Plataforma</Label>
              <p className="text-xs text-muted-foreground">"Powered by" no rodapé</p>
            </div>
          </div>
          <Switch
            checked={checkout.footer.showBranding}
            onCheckedChange={(checked) => updateFooter({ showBranding: checked })}
          />
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
        <p className="text-xs text-muted-foreground mb-3">Preview do Rodapé:</p>
        <div className="p-4 rounded-lg bg-card border text-center text-sm space-y-2">
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            {checkout.footer.showTerms && (
              <a href="#" className="hover:underline">Termos de Uso</a>
            )}
            {checkout.footer.showPrivacy && (
              <a href="#" className="hover:underline">Política de Privacidade</a>
            )}
          </div>
          {checkout.footer.showSupport && (
            <p className="text-xs text-muted-foreground">
              Dúvidas? {checkout.footer.supportEmail || 'suporte@exemplo.com'}
            </p>
          )}
          {checkout.footer.showBranding && (
            <p className="text-xs text-muted-foreground/50 pt-2">
              Powered by <span className="font-semibold">MidnightHub</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
