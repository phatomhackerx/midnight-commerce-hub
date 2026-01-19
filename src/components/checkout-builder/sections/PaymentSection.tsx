import React from 'react';
import { ProductCheckout, CheckoutPaymentMethods, CheckoutInstallments, CheckoutFields } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { CreditCard, QrCode, Landmark, CreditCardIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function PaymentSection({ checkout, onUpdate }: PaymentSectionProps) {
  const updatePaymentMethods = (updates: Partial<CheckoutPaymentMethods>) => {
    onUpdate({
      paymentMethods: {
        ...checkout.paymentMethods,
        ...updates,
      },
    });
  };

  const updateInstallments = (updates: Partial<CheckoutInstallments>) => {
    onUpdate({
      installments: {
        ...checkout.installments,
        ...updates,
      },
    });
  };

  const updateFields = (updates: Partial<CheckoutFields>) => {
    onUpdate({
      fields: {
        ...checkout.fields,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-1">Pagamento</h3>
        <p className="text-sm text-muted-foreground">
          Configure os meios de pagamento e parcelamento
        </p>
      </div>
      
      {/* Payment Methods */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Meios de Pagamento</Label>
        
        <div className="grid gap-3">
          <div className={cn(
            'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
            checkout.paymentMethods.creditCard ? 'border-primary bg-primary/5' : 'border-border'
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Cartão de Crédito</div>
                <div className="text-xs text-muted-foreground">Visa, Mastercard, Elo, etc</div>
              </div>
            </div>
            <Switch
              checked={checkout.paymentMethods.creditCard}
              onCheckedChange={(checked) => updatePaymentMethods({ creditCard: checked })}
            />
          </div>
          
          <div className={cn(
            'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
            checkout.paymentMethods.pix ? 'border-primary bg-primary/5' : 'border-border'
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <QrCode className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="font-medium">PIX</div>
                <div className="text-xs text-muted-foreground">Pagamento instantâneo</div>
              </div>
            </div>
            <Switch
              checked={checkout.paymentMethods.pix}
              onCheckedChange={(checked) => updatePaymentMethods({ pix: checked })}
            />
          </div>
          
          <div className={cn(
            'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
            checkout.paymentMethods.boleto ? 'border-primary bg-primary/5' : 'border-border'
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Landmark className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="font-medium">Boleto Bancário</div>
                <div className="text-xs text-muted-foreground">Vencimento em 3 dias</div>
              </div>
            </div>
            <Switch
              checked={checkout.paymentMethods.boleto}
              onCheckedChange={(checked) => updatePaymentMethods({ boleto: checked })}
            />
          </div>
          
          <div className={cn(
            'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
            checkout.paymentMethods.twoCards ? 'border-primary bg-primary/5' : 'border-border'
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <CreditCardIcon className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="font-medium">Dois Cartões</div>
                <div className="text-xs text-muted-foreground">Dividir entre cartões</div>
              </div>
            </div>
            <Switch
              checked={checkout.paymentMethods.twoCards}
              onCheckedChange={(checked) => updatePaymentMethods({ twoCards: checked })}
            />
          </div>
        </div>
      </div>
      
      {/* Installments */}
      {checkout.paymentMethods.creditCard && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Parcelamento</Label>
            <Switch
              checked={checkout.installments.enabled}
              onCheckedChange={(checked) => updateInstallments({ enabled: checked })}
            />
          </div>
          
          {checkout.installments.enabled && (
            <div className="space-y-6 pl-4 border-l-2 border-primary/20">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Máximo de parcelas</Label>
                  <span className="text-sm font-medium">{checkout.installments.maxInstallments}x</span>
                </div>
                <Slider
                  value={[checkout.installments.maxInstallments]}
                  onValueChange={([value]) => updateInstallments({ maxInstallments: value })}
                  min={1}
                  max={24}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Parcelas sem juros</Label>
                  <span className="text-sm font-medium">{checkout.installments.interestFreeInstallments}x</span>
                </div>
                <Slider
                  value={[checkout.installments.interestFreeInstallments]}
                  onValueChange={([value]) => updateInstallments({ interestFreeInstallments: value })}
                  min={0}
                  max={checkout.installments.maxInstallments}
                  step={1}
                />
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Form Fields */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="text-base font-medium">Campos do Formulário</Label>
        
        <div className="grid gap-3">
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="field-name">Nome completo</Label>
            <Switch
              id="field-name"
              checked={checkout.fields.name}
              onCheckedChange={(checked) => updateFields({ name: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="field-email">E-mail</Label>
            <Switch
              id="field-email"
              checked={checkout.fields.email}
              onCheckedChange={(checked) => updateFields({ email: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="field-phone">Telefone/WhatsApp</Label>
            <Switch
              id="field-phone"
              checked={checkout.fields.phone}
              onCheckedChange={(checked) => updateFields({ phone: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="field-cpf">CPF</Label>
            <Switch
              id="field-cpf"
              checked={checkout.fields.cpf}
              onCheckedChange={(checked) => updateFields({ cpf: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="field-address">Endereço</Label>
            <Switch
              id="field-address"
              checked={checkout.fields.address}
              onCheckedChange={(checked) => updateFields({ address: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="field-birthdate">Data de nascimento</Label>
            <Switch
              id="field-birthdate"
              checked={checkout.fields.birthDate}
              onCheckedChange={(checked) => updateFields({ birthDate: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
