import React from 'react';
import { ProductCheckout } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Settings, Shield, Lock, CreditCard, Plus, Trash2, AlertCircle } from 'lucide-react';

interface AdvancedSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function AdvancedSection({ checkout, onUpdate }: AdvancedSectionProps) {
  const updateSecurity = (updates: Partial<ProductCheckout['security']>) => {
    onUpdate({ security: { ...checkout.security, ...updates } });
  };

  const updateFields = (updates: Partial<ProductCheckout['fields']>) => {
    onUpdate({ fields: { ...checkout.fields, ...updates } });
  };

  const addCustomField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      label: 'Novo Campo',
      type: 'text' as const,
      required: false,
      options: [],
    };
    updateFields({
      customFields: [...checkout.fields.customFields, newField],
    });
  };

  const updateCustomField = (id: string, updates: Partial<typeof checkout.fields.customFields[0]>) => {
    updateFields({
      customFields: checkout.fields.customFields.map(f => f.id === id ? { ...f, ...updates } : f),
    });
  };

  const removeCustomField = (id: string) => {
    updateFields({
      customFields: checkout.fields.customFields.filter(f => f.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Configurações Avançadas</h3>
        <p className="text-sm text-muted-foreground">
          Opções de segurança e campos personalizados
        </p>
      </div>

      {/* Security Settings */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          Segurança
        </h4>

        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Selos de Segurança</Label>
              <p className="text-xs text-muted-foreground">Exibir badges de segurança</p>
            </div>
            <Switch
              checked={checkout.security.showSecurityBadges}
              onCheckedChange={(checked) => updateSecurity({ showSecurityBadges: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Selo SSL</Label>
              <p className="text-xs text-muted-foreground">Mostrar cadeado de conexão segura</p>
            </div>
            <Switch
              checked={checkout.security.showSSL}
              onCheckedChange={(checked) => updateSecurity({ showSSL: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Bandeiras de Cartão</Label>
              <p className="text-xs text-muted-foreground">Visa, Mastercard, Elo, etc.</p>
            </div>
            <Switch
              checked={checkout.security.showPaymentIcons}
              onCheckedChange={(checked) => updateSecurity({ showPaymentIcons: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Texto de Segurança</Label>
            <Input
              value={checkout.security.customSecurityText}
              onChange={(e) => updateSecurity({ customSecurityText: e.target.value })}
              placeholder="Ambiente 100% seguro"
            />
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          Campos do Formulário
        </h4>

        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'name', label: 'Nome Completo' },
              { key: 'email', label: 'E-mail' },
              { key: 'phone', label: 'Telefone' },
              { key: 'cpf', label: 'CPF' },
              { key: 'address', label: 'Endereço' },
              { key: 'birthDate', label: 'Data de Nascimento' },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <Label className="text-sm">{field.label}</Label>
                <Switch
                  checked={checkout.fields[field.key as keyof typeof checkout.fields] as boolean}
                  onCheckedChange={(checked) => updateFields({ [field.key]: checked })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Fields */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" />
          Campos Personalizados
        </h4>

        {checkout.fields.customFields.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground border-2 border-dashed rounded-xl">
            <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum campo personalizado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {checkout.fields.customFields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Campo {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeCustomField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Nome do Campo</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                      placeholder="Ex: Empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Tipo</Label>
                    <Select
                      value={field.type}
                      onValueChange={(value) => updateCustomField(field.id, { type: value as typeof field.type })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="number">Número</SelectItem>
                        <SelectItem value="select">Seleção</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.required}
                    onCheckedChange={(checked) => updateCustomField(field.id, { required: checked })}
                  />
                  <Label className="text-sm">Campo obrigatório</Label>
                </div>

                {field.type === 'select' && (
                  <div className="space-y-2">
                    <Label className="text-xs">Opções (uma por linha)</Label>
                    <Textarea
                      value={field.options?.join('\n') || ''}
                      onChange={(e) => updateCustomField(field.id, { options: e.target.value.split('\n').filter(Boolean) })}
                      placeholder="Opção 1\nOpção 2\nOpção 3"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={addCustomField}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Campo Personalizado
        </Button>
      </div>

      {/* Warning */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-500">Atenção</p>
            <p className="text-muted-foreground mt-1">
              Campos em excesso podem reduzir a taxa de conversão. Solicite apenas o essencial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
