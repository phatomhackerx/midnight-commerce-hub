
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";

interface PaymentSettingsProps {
  config: CheckoutConfig;
  onUpdatePaymentMethods: (methods: {
    cartao: boolean;
    pix: boolean;
    boleto: boolean;
  }) => void;
  onUpdateInstallments: (installments: {
    ativo: boolean;
    parcelas: number;
    semJuros: number;
  }) => void;
  onUpdateFields: (fields: {
    telefone: boolean;
    endereco: boolean;
    dataNascimento: boolean;
    cpf: boolean;
    personalizado: Array<{
      nome: string;
      obrigatorio: boolean;
    }>;
  }) => void;
}

const PaymentSettings: React.FC<PaymentSettingsProps> = ({
  config,
  onUpdatePaymentMethods,
  onUpdateInstallments,
  onUpdateFields
}) => {
  const [newField, setNewField] = useState("");
  const [newFieldRequired, setNewFieldRequired] = useState(true);

  const handlePaymentMethodToggle = (method: keyof typeof config.meiosPagamento) => {
    onUpdatePaymentMethods({
      ...config.meiosPagamento,
      [method]: !config.meiosPagamento[method]
    });
  };

  const handleInstallmentToggle = (value: boolean) => {
    onUpdateInstallments({
      ...config.parcelamento,
      ativo: value
    });
  };

  const handleInstallmentChange = (key: keyof Omit<typeof config.parcelamento, 'ativo'>, value: number) => {
    onUpdateInstallments({
      ...config.parcelamento,
      [key]: value
    });
  };

  const handleFieldToggle = (field: keyof Omit<typeof config.camposAdicionais, 'personalizado'>) => {
    onUpdateFields({
      ...config.camposAdicionais,
      [field]: !config.camposAdicionais[field]
    });
  };

  const handleAddCustomField = () => {
    if (newField.trim()) {
      onUpdateFields({
        ...config.camposAdicionais,
        personalizado: [
          ...config.camposAdicionais.personalizado,
          {
            nome: newField.trim(),
            obrigatorio: newFieldRequired
          }
        ]
      });
      setNewField("");
    }
  };

  const handleRemoveCustomField = (index: number) => {
    const updatedFields = [...config.camposAdicionais.personalizado];
    updatedFields.splice(index, 1);
    onUpdateFields({
      ...config.camposAdicionais,
      personalizado: updatedFields
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Meios de Pagamento</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="payment-card" className="cursor-pointer">Cartão de crédito</Label>
            <Switch
              id="payment-card"
              checked={config.meiosPagamento.cartao}
              onCheckedChange={() => handlePaymentMethodToggle("cartao")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="payment-pix" className="cursor-pointer">PIX</Label>
            <Switch
              id="payment-pix"
              checked={config.meiosPagamento.pix}
              onCheckedChange={() => handlePaymentMethodToggle("pix")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="payment-boleto" className="cursor-pointer">Boleto bancário</Label>
            <Switch
              id="payment-boleto"
              checked={config.meiosPagamento.boleto}
              onCheckedChange={() => handlePaymentMethodToggle("boleto")}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Parcelamento</h3>
            <p className="text-sm text-muted-foreground">Habilita opções de parcelamento</p>
          </div>
          <Switch
            checked={config.parcelamento.ativo}
            onCheckedChange={handleInstallmentToggle}
          />
        </div>
        
        {config.parcelamento.ativo && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-100 mt-4">
            <div className="space-y-2">
              <Label>Número máximo de parcelas</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.parcelamento.parcelas]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(values) => handleInstallmentChange("parcelas", values[0])}
                />
                <span className="font-medium w-8 text-right">{config.parcelamento.parcelas}x</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Parcelas sem juros</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.parcelamento.semJuros]}
                  min={0}
                  max={config.parcelamento.parcelas}
                  step={1}
                  onValueChange={(values) => handleInstallmentChange("semJuros", values[0])}
                />
                <span className="font-medium w-8 text-right">{config.parcelamento.semJuros}x</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Campos adicionais</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="field-phone" className="cursor-pointer">Telefone</Label>
            <Switch
              id="field-phone"
              checked={config.camposAdicionais.telefone}
              onCheckedChange={() => handleFieldToggle("telefone")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="field-address" className="cursor-pointer">Endereço completo</Label>
            <Switch
              id="field-address"
              checked={config.camposAdicionais.endereco}
              onCheckedChange={() => handleFieldToggle("endereco")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="field-birthdate" className="cursor-pointer">Data de nascimento</Label>
            <Switch
              id="field-birthdate"
              checked={config.camposAdicionais.dataNascimento}
              onCheckedChange={() => handleFieldToggle("dataNascimento")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="field-cpf" className="cursor-pointer">CPF</Label>
            <Switch
              id="field-cpf"
              checked={config.camposAdicionais.cpf}
              onCheckedChange={() => handleFieldToggle("cpf")}
            />
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Campos personalizados</h4>
          
          {config.camposAdicionais.personalizado.length > 0 && (
            <div className="space-y-2 mb-3">
              {config.camposAdicionais.personalizado.map((campo, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded-md bg-muted/50">
                  <div className="flex items-center">
                    <span>{campo.nome}</span>
                    {campo.obrigatorio && <span className="text-red-500 ml-1">*</span>}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveCustomField(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              placeholder="Nome do campo"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              className="flex-1"
            />
            <div className="flex items-center gap-2">
              <Switch
                id="new-field-required"
                checked={newFieldRequired}
                onCheckedChange={setNewFieldRequired}
              />
              <Label htmlFor="new-field-required" className="text-xs">Obrigatório</Label>
            </div>
          </div>
          
          <Button
            className="w-full mt-2"
            variant="outline"
            onClick={handleAddCustomField}
            disabled={!newField.trim()}
          >
            Adicionar campo personalizado
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
