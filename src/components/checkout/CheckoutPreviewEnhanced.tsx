
import React from "react";
import { Shield, Clock, CheckCircle, CreditCard, QrCode, Landmark, Lock, Star, Gift, Calendar } from "lucide-react";
import { CheckoutConfig } from "@/pages/CheckoutBuilderPage";

interface CheckoutPreviewEnhancedProps {
  config: CheckoutConfig;
  produto: any | null;
}

const CheckoutPreviewEnhanced: React.FC<CheckoutPreviewEnhancedProps> = ({ config, produto }) => {
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

  // Format config.cor to ensure it has the # prefix
  const primaryColor = config.cor.startsWith('#') ? config.cor : `#${config.cor}`;

  // Function to determine text color based on background color brightness
  const getTextColor = (hexColor: string) => {
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black or white based on brightness
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  // Get text color for buttons based on background color
  const buttonTextColor = getTextColor(primaryColor);

  return (
    <div className={`w-full ${getLayoutStyles(config.layout)}`}>
      <div style={{ 
        borderColor: primaryColor, 
        borderRadius: config.layout === "destaque" ? "0.75rem" : "0"
      }} className={`
        border overflow-hidden shadow-lg 
        ${config.layout === "destaque" ? "border-2" : ""}
      `}>
        {/* Header with logo */}
        {config.logo && (
          <div className="py-5 px-6 bg-white flex justify-center border-b">
            <img 
              src={config.logo} 
              alt="Logo" 
              className="h-10 object-contain"
            />
          </div>
        )}
        
        <div className="grid md:grid-cols-5">
          {/* Left column - Product info */}
          <div className="md:col-span-3 p-6 md:p-8 bg-white space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>
                {config.titulo || `Finalize seu pedido: ${produto.titulo}`}
              </h1>
              
              <p className="text-gray-600">
                {config.descricao || `Adquira agora ${produto.titulo} e comece a transformar sua vida!`}
              </p>
              
              {/* Product preview */}
              <div className="flex items-start gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={produto.imagem} 
                  alt={produto.titulo} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{produto.titulo}</h3>
                  <p className="text-sm text-gray-600">{getProdutoTypeDescription(config.tipoProduto)}</p>
                  {config.mostrarAvaliacao && (
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs ml-1 text-gray-600">(124 avaliações)</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Countdown timer */}
              {config.mostrarContador && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={20} className="text-amber-500" />
                    <div className="font-medium text-amber-800">Esta oferta é por tempo limitado!</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                    <div className="bg-white p-2 rounded-md text-center shadow-sm">
                      <div className="text-lg font-bold text-amber-800">00</div>
                      <div className="text-xs text-amber-600">horas</div>
                    </div>
                    <div className="bg-white p-2 rounded-md text-center shadow-sm">
                      <div className="text-lg font-bold text-amber-800">{config.tempoContador}</div>
                      <div className="text-xs text-amber-600">min</div>
                    </div>
                    <div className="bg-white p-2 rounded-md text-center shadow-sm">
                      <div className="text-lg font-bold text-amber-800">00</div>
                      <div className="text-xs text-amber-600">seg</div>
                    </div>
                    <div className="bg-white p-2 rounded-md text-center shadow-sm">
                      <div className="text-lg font-bold text-amber-800">00</div>
                      <div className="text-xs text-amber-600">ms</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* What you get */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-lg">O que você recebe:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium">{getMainFeature(config.tipoProduto)}</span>
                    <p className="text-sm text-gray-600 mt-1">{getMainFeatureDescription(config.tipoProduto)}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium">Acesso imediato</span>
                    <p className="text-sm text-gray-600 mt-1">Comece a consumir o conteúdo logo após a confirmação do pagamento</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium">Suporte dedicado</span>
                    <p className="text-sm text-gray-600 mt-1">Tire suas dúvidas diretamente com nossa equipe de suporte</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Guarantee */}
            {config.mostrarGarantia && (
              <div className="border-t pt-6">
                <div className="bg-green-50 rounded-lg p-4 flex gap-4">
                  <div className="bg-green-100 rounded-full p-2 h-fit">
                    <Shield size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Garantia de {config.diasGarantia} dias</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Se você não ficar satisfeito com o produto, devolvemos 100% do seu dinheiro. 
                      Sem perguntas, sem burocracia.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Customer Form - Mobile only */}
            <div className="md:hidden border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Informações para entrega</h3>
              <div className="space-y-4">
                <div className="border rounded-md p-3 bg-gray-50">Nome completo</div>
                <div className="border rounded-md p-3 bg-gray-50">Email</div>
                {config.camposAdicionais.telefone && (
                  <div className="border rounded-md p-3 bg-gray-50">Telefone</div>
                )}
                {config.camposAdicionais.cpf && (
                  <div className="border rounded-md p-3 bg-gray-50">CPF</div>
                )}
                {config.camposAdicionais.personalizado.map((campo, idx) => (
                  <div key={idx} className="border rounded-md p-3 bg-gray-50">
                    {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Payment */}
          <div className="md:col-span-2 bg-gray-50 p-6 md:p-8 border-t md:border-t-0 md:border-l">
            {/* Price */}
            <div className="mb-6">
              <div className="text-sm text-gray-600">Valor total:</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                  R$ {totalValue}
                </span>
                {config.parcelamento.ativo && (
                  <span className="text-sm text-gray-600">
                    ou {config.parcelamento.parcelas}x de R$ {installmentValue}
                  </span>
                )}
              </div>
            </div>
            
            {/* Customer Form - Desktop only */}
            <div className="hidden md:block mb-6">
              <h3 className="font-medium text-lg mb-4">Informações para entrega</h3>
              <div className="space-y-4">
                <div className="border rounded-md p-3 bg-white">Nome completo</div>
                <div className="border rounded-md p-3 bg-white">Email</div>
                {config.camposAdicionais.telefone && (
                  <div className="border rounded-md p-3 bg-white">Telefone</div>
                )}
                {config.camposAdicionais.cpf && (
                  <div className="border rounded-md p-3 bg-white">CPF</div>
                )}
                {config.camposAdicionais.personalizado.map((campo, idx) => (
                  <div key={idx} className="border rounded-md p-3 bg-white">
                    {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment methods */}
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-4">Forma de pagamento</h3>
              <div className="space-y-3">
                {config.meiosPagamento.cartao && (
                  <div className={`border rounded-md p-4 cursor-pointer ${
                    primaryColor ? 'border-2' : ''
                  }`} style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}>
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} style={{ color: primaryColor }} />
                      <span className="font-medium">Cartão de crédito</span>
                    </div>
                    {config.parcelamento.ativo && (
                      <div className="mt-2 pl-8">
                        <div className="text-sm text-gray-600">
                          Parcele em até {config.parcelamento.parcelas}x 
                          {config.parcelamento.semJuros > 0 ? 
                            ` (até ${config.parcelamento.semJuros}x sem juros)` : ''}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {config.meiosPagamento.pix && (
                  <div className="border rounded-md p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <QrCode size={20} className="text-gray-700" />
                      <span className="font-medium">PIX</span>
                    </div>
                    <div className="mt-2 pl-8">
                      <div className="text-sm text-gray-600">
                        Pagamento instantâneo com 5% de desconto
                      </div>
                    </div>
                  </div>
                )}
                
                {config.meiosPagamento.boleto && (
                  <div className="border rounded-md p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Landmark size={20} className="text-gray-700" />
                      <span className="font-medium">Boleto Bancário</span>
                    </div>
                    <div className="mt-2 pl-8">
                      <div className="text-sm text-gray-600">
                        Vencimento em 3 dias úteis
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Upsell */}
            {config.upsell.ativo && (
              <div className="mb-6">
                <div className="border-2 rounded-md overflow-hidden" style={{ borderColor: `${primaryColor}40` }}>
                  <div className="p-3 text-white font-medium" style={{ backgroundColor: primaryColor }}>
                    Oferta especial - Adicione ao seu pedido
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex gap-3">
                      {config.upsell.imagem && (
                        <img 
                          src={config.upsell.imagem} 
                          alt="Upsell" 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{config.upsell.titulo || "Oferta exclusiva!"}</h4>
                        <p className="text-sm text-gray-600 mt-1">{config.upsell.descricao || "Aproveite esta oferta especial!"}</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-lg font-bold" style={{ color: primaryColor }}>
                            + R$ {config.upsell.preco.toFixed(2)}
                          </div>
                          <button 
                            className="py-1 px-4 rounded-full text-sm font-medium" 
                            style={{ backgroundColor: primaryColor, color: buttonTextColor }}
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Checkout button */}
            <button 
              className="w-full py-4 px-6 rounded-lg font-bold text-lg mb-4 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: primaryColor, color: buttonTextColor }}
            >
              Finalizar compra
            </button>
            
            {/* Security badges */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
              <Lock size={14} />
              <span>Pagamento 100% seguro</span>
            </div>
            
            <div className="flex justify-center">
              <div className="flex items-center gap-2 py-2 px-3 bg-white rounded-md border">
                <img src="https://placehold.co/20x20/svg?text=S" alt="Segurança" className="h-5" />
                <img src="https://placehold.co/20x20/svg?text=V" alt="Validado" className="h-5" />
                <img src="https://placehold.co/20x20/svg?text=P" alt="Protegido" className="h-5" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Lock size={14} />
            <span>Site seguro</span>
          </div>
          <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

const getLayoutStyles = (layout: "padrao" | "minimalista" | "destaque") => {
  switch (layout) {
    case "minimalista":
      return "max-w-3xl mx-auto";
    case "destaque":
      return "max-w-5xl mx-auto";
    case "padrao":
    default:
      return "max-w-4xl mx-auto";
  }
};

const getProdutoTypeDescription = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook") => {
  switch (tipo) {
    case "digital":
      return "Produto Digital • Acesso imediato após pagamento";
    case "fisico":
      return "Produto Físico • Envio em até 7 dias úteis";
    case "grupo":
      return "Grupo Exclusivo • Acesso imediato após pagamento";
    case "curso":
      return "Curso Online • Acesso vitalício após pagamento";
    case "ebook":
      return "E-book • Download imediato após pagamento";
    default:
      return "Produto Digital • Acesso imediato após pagamento";
  }
};

const getMainFeature = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook") => {
  switch (tipo) {
    case "digital":
      return "Conteúdo Digital Premium";
    case "fisico":
      return "Produto Físico de Qualidade";
    case "grupo":
      return "Acesso ao Grupo Exclusivo";
    case "curso":
      return "Curso Completo com Certificado";
    case "ebook":
      return "E-book Completo em PDF";
    default:
      return "Conteúdo Digital Premium";
  }
};

const getMainFeatureDescription = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook") => {
  switch (tipo) {
    case "digital":
      return "Material digital de alta qualidade desenvolvido por especialistas na área";
    case "fisico":
      return "Produto enviado diretamente para sua casa com embalagem segura";
    case "grupo":
      return "Comunidade exclusiva com suporte direto do produtor e networking com outros alunos";
    case "curso":
      return "Material completo com aulas, exercícios e certificado de conclusão";
    case "ebook":
      return "Material digital completo, otimizado para leitura em qualquer dispositivo";
    default:
      return "Material digital de alta qualidade desenvolvido por especialistas na área";
  }
};

export default CheckoutPreviewEnhanced;
