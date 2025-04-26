
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";
import { Star, Clock, Shield, Check, MessageSquare, BookOpen, Package, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutPreviewProps {
  config: CheckoutConfig;
  produto: any | null;
}

const CheckoutPreview: React.FC<CheckoutPreviewProps> = ({ config, produto }) => {
  // Early return with a loading state if produto is null
  if (!produto) {
    return (
      <div className="w-full p-6 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-32 bg-gray-200 rounded w-full mx-auto mt-6"></div>
        </div>
        <div className="mt-4 text-muted-foreground">Carregando informações do produto...</div>
      </div>
    );
  }

  // Calculate installment value
  const installmentValue = config.parcelamento.ativo ? 
    (produto.preco / config.parcelamento.parcelas).toFixed(2) : "0.00";

  // Calculate total value including upsell if active
  const totalValue = config.upsell.ativo ? 
    (produto.preco + config.upsell.preco).toFixed(2) : produto.preco.toFixed(2);

  return (
    <div className={`w-full ${getLayoutStyles(config.layout)}`}>
      <div className="p-6">
        {config.logo && (
          <div className="mb-6 flex justify-center">
            <img 
              src={config.logo} 
              alt="Logo" 
              className="h-10 object-contain"
            />
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: config.cor }}>
              {config.titulo || produto.titulo}
            </h2>
            <p className="text-gray-600 mt-2">
              {config.descricao || `Adquira agora o produto ${produto.titulo} e comece a transformar sua vida!`}
            </p>
          </div>
          
          {/* Tipo de produto */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            {getProdutoTypeIcon(config.tipoProduto)}
            <span className="text-sm font-medium text-gray-700">
              {getProdutoTypeName(config.tipoProduto)}
            </span>
          </div>
          
          {config.mostrarAvaliacao && (
            <div className="flex items-center space-x-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1 text-gray-600">(124 avaliações)</span>
            </div>
          )}
          
          {config.mostrarContador && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
              <Clock size={20} className="text-amber-500" />
              <div>
                <div className="text-sm font-medium text-amber-800">Esta oferta expira em breve</div>
                <div className="font-bold text-amber-900">{config.tempoContador}:00 minutos</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t my-6"></div>
        
        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-500">Preço</div>
            <div className="text-3xl font-bold" style={{ color: config.cor }}>
              R$ {produto.preco.toFixed(2)}
            </div>
            {config.parcelamento.ativo && (
              <div className="text-sm text-gray-600 mt-1">
                ou até {config.parcelamento.parcelas}x de R$ {installmentValue}
                {config.parcelamento.semJuros > 0 && (
                  <> (até {config.parcelamento.semJuros}x sem juros)</>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="font-medium">Informações do comprador</div>
            <div className="grid grid-cols-1 gap-3">
              <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Nome</div>
              <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">E-mail</div>
              {config.camposAdicionais.telefone && (
                <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Telefone</div>
              )}
              {config.camposAdicionais.cpf && (
                <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">CPF</div>
              )}
              {config.camposAdicionais.dataNascimento && (
                <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Data de nascimento</div>
              )}
              {config.camposAdicionais.endereco && (
                <>
                  <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Endereço</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Cidade</div>
                    <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Estado</div>
                  </div>
                  <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">CEP</div>
                </>
              )}
              {config.camposAdicionais.personalizado.map((campo, index) => (
                <div key={index} className="border rounded p-3 bg-gray-50 text-sm text-gray-500">
                  {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="font-medium">Formas de pagamento</div>
            <div className="flex gap-2">
              {config.meiosPagamento.cartao && (
                <div 
                  className="flex-1 border rounded-lg p-3 text-center font-medium cursor-pointer hover:bg-gray-50"
                  style={{ 
                    borderColor: config.cor,
                    color: config.cor,
                    backgroundColor: `${config.cor}10`
                  }}
                >
                  Cartão
                </div>
              )}
              {config.meiosPagamento.pix && (
                <div className="flex-1 border rounded-lg p-3 text-center font-medium cursor-pointer hover:bg-gray-50">
                  PIX
                </div>
              )}
              {config.meiosPagamento.boleto && (
                <div className="flex-1 border rounded-lg p-3 text-center font-medium cursor-pointer hover:bg-gray-50">
                  Boleto
                </div>
              )}
            </div>
          </div>
          
          {/* Entrega baseada no tipo do produto */}
          {renderEntregaInfo(config.tipoProduto, config.cor)}
          
          <button 
            className="w-full py-3 px-4 rounded-lg font-medium text-white"
            style={{ backgroundColor: config.cor }}
          >
            Finalizar compra
          </button>
          
          {config.mostrarGarantia && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield size={16} className="text-gray-500" />
              <span>Garantia de {config.diasGarantia} dias ou seu dinheiro de volta</span>
            </div>
          )}
          
          {config.upsell.ativo && (
            <Card className="mt-6 border-2" style={{ borderColor: config.cor + '50' }}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {config.upsell.imagem && (
                    <img src={config.upsell.imagem} alt="Upsell" className="w-16 h-16 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{config.upsell.titulo || "Oferta especial!"}</h4>
                    <p className="text-sm text-gray-600 mt-1">{config.upsell.descricao || "Adicione este produto com um preço especial!"}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="font-bold" style={{ color: config.cor }}>
                        + R$ {config.upsell.preco.toFixed(2)}
                      </div>
                      <Button 
                        className="text-sm py-1 px-3 rounded" 
                        style={{ backgroundColor: config.cor + '20', color: config.cor }}
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Resumo do pedido - novo componente */}
          <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
            <h4 className="font-medium">Resumo do pedido</h4>
            <div className="flex justify-between text-sm">
              <span>Produto</span>
              <span>R$ {produto.preco.toFixed(2)}</span>
            </div>
            {config.upsell.ativo && (
              <div className="flex justify-between text-sm">
                <span>Adicional: {config.upsell.titulo || "Oferta especial"}</span>
                <span>R$ {config.upsell.preco.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span style={{ color: config.cor }}>R$ {totalValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getLayoutStyles = (layout: "padrao" | "minimalista" | "destaque") => {
  switch (layout) {
    case "minimalista":
      return "max-w-md mx-auto bg-white";
    case "destaque":
      return "max-w-2xl mx-auto bg-white rounded-xl shadow-lg";
    case "padrao":
    default:
      return "max-w-xl mx-auto bg-white";
  }
};

const getProdutoTypeIcon = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook") => {
  switch (tipo) {
    case "digital":
      return <FileText size={16} className="text-blue-500" />;
    case "fisico":
      return <Package size={16} className="text-orange-500" />;
    case "grupo":
      return <MessageSquare size={16} className="text-green-500" />;
    case "curso":
      return <BookOpen size={16} className="text-purple-500" />;
    case "ebook":
      return <FileText size={16} className="text-pink-500" />;
    default:
      return <FileText size={16} className="text-blue-500" />;
  }
};

const getProdutoTypeName = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook") => {
  switch (tipo) {
    case "digital":
      return "Produto Digital";
    case "fisico":
      return "Produto Físico";
    case "grupo":
      return "Grupo Exclusivo";
    case "curso":
      return "Curso Online";
    case "ebook":
      return "E-book";
    default:
      return "Produto Digital";
  }
};

const renderEntregaInfo = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook", cor: string) => {
  switch (tipo) {
    case "digital":
      return (
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-center">
          <span className="font-medium">Entrega:</span> Acesso imediato após a confirmação do pagamento
        </div>
      );
    case "fisico":
      return (
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-center">
          <span className="font-medium">Entrega:</span> Envio em até 7 dias úteis após a confirmação do pagamento
        </div>
      );
    case "grupo":
      return (
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-center flex items-center justify-center gap-2">
          <MessageSquare size={16} style={{ color: cor }} />
          <span>Acesso ao grupo exclusivo após confirmação do pagamento</span>
        </div>
      );
    case "curso":
      return (
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-center flex items-center justify-center gap-2">
          <BookOpen size={16} style={{ color: cor }} />
          <span>Acesso imediato à plataforma do curso após confirmação</span>
        </div>
      );
    case "ebook":
      return (
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-center flex items-center justify-center gap-2">
          <FileText size={16} style={{ color: cor }} />
          <span>Download disponível imediatamente após a confirmação</span>
        </div>
      );
    default:
      return null;
  }
};

export default CheckoutPreview;
