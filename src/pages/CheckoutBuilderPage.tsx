import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ExternalLink, Eye, EyeOff, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { produtosMock } from "@/data/marketplaceData";
import { toast } from "sonner";
import DesignSettings from "@/components/checkout/DesignSettings";
import ContentSettings from "@/components/checkout/ContentSettings";
import PaymentSettings from "@/components/checkout/PaymentSettings";
import UpsellSettings from "@/components/checkout/UpsellSettings";
import AdvancedSettings from "@/components/checkout/AdvancedSettings";
import CheckoutPreviewEnhanced from "@/components/checkout/CheckoutPreviewEnhanced";
import BumpOffersConfig from "@/components/produtos/BumpOffersConfig";

export interface CheckoutConfig {
  titulo: string;
  descricao: string;
  layout: "padrao" | "minimalista" | "destaque";
  cor: string;
  tipoProduto: "digital" | "fisico" | "grupo" | "curso" | "ebook";
  logo: string | null;
  mostrarAvaliacao: boolean;
  mostrarContador: boolean;
  tempoContador: number;
  mostrarGarantia: boolean;
  diasGarantia: number;
  meiosPagamento: {
    cartao: boolean;
    pix: boolean;
    boleto: boolean;
  };
  parcelamento: {
    ativo: boolean;
    parcelas: number;
    semJuros: number;
  };
  camposAdicionais: {
    telefone: boolean;
    endereco: boolean;
    dataNascimento: boolean;
    cpf: boolean;
    personalizado: Array<{
      nome: string;
      obrigatorio: boolean;
    }>;
  };
  upsell: {
    ativo: boolean;
    titulo: string;
    descricao: string;
    preco: number;
    imagem: string | null;
  };
  pixelFacebook: string;
  pixelGoogle: string;
  pixelTikTok: string;
  scriptsPersonalizados: string;
  dominio: string;
  codigoAnalytics: string;
  bumpOffers: Array<{
    id: string;
    titulo: string;
    descricao: string;
    preco: number;
    imagem: string | null;
    ativo: boolean;
  }>;
}

const defaultConfig: CheckoutConfig = {
  titulo: "",
  descricao: "",
  layout: "padrao",
  cor: "#7E69AB",
  tipoProduto: "digital",
  logo: null,
  mostrarAvaliacao: true,
  mostrarContador: true,
  tempoContador: 15,
  mostrarGarantia: true,
  diasGarantia: 7,
  meiosPagamento: {
    cartao: true,
    pix: true,
    boleto: true,
  },
  parcelamento: {
    ativo: true,
    parcelas: 12,
    semJuros: 3,
  },
  camposAdicionais: {
    telefone: true,
    endereco: false,
    dataNascimento: false,
    cpf: true,
    personalizado: [],
  },
  upsell: {
    ativo: false,
    titulo: "Adicione este bônus exclusivo!",
    descricao: "Complemente sua compra com este material adicional.",
    preco: 47.00,
    imagem: null,
  },
  pixelFacebook: "",
  pixelGoogle: "",
  pixelTikTok: "",
  scriptsPersonalizados: "",
  dominio: "",
  codigoAnalytics: "",
  bumpOffers: [],
};

export default function CheckoutBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<CheckoutConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState("design");
  const [produto, setProduto] = useState<any | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Determine the product type based on tags and category
  const determineProductType = (product: any): "digital" | "fisico" | "grupo" | "curso" | "ebook" => {
    if (!product) return "digital";
    
    // Check tags first
    if (product.tags.includes("ebook")) return "ebook";
    if (product.tags.includes("curso")) return "curso";
    if (product.tags.includes("mentoria")) return "grupo";
    
    // Check category as fallback
    switch (product.categoria.toLowerCase()) {
      case "e-books":
        return "ebook";
      case "cursos":
        return "curso";
      case "mentorias":
      case "grupos":
        return "grupo";
      case "produtos físicos":
        return "fisico";
      default:
        return "digital";
    }
  };
  
  useEffect(() => {
    // Find the product by ID
    const foundProducto = produtosMock.find(p => p.id === Number(id));
    
    if (foundProducto) {
      setProduto(foundProducto);
      
      // Set initial product type based on the found product
      const productType = determineProductType(foundProducto);
      
      // Set initial config values based on the product
      setConfig(prevConfig => ({
        ...prevConfig,
        titulo: `Adquira agora: ${foundProducto.titulo}`,
        descricao: `Garanta seu acesso a ${foundProducto.titulo} agora mesmo!`,
        tipoProduto: productType
      }));
    } else {
      toast.error("Produto não encontrado");
      navigate("/produtos");
    }
  }, [id, navigate]);

  const handleSave = async () => {
    if (!produto) return;
    
    setIsSaving(true);
    
    // Simulate API request with a delay
    setTimeout(() => {
      // In a real app, this would be an API call to save the configuration
      toast.success("Configurações de checkout salvas com sucesso!");
      setIsSaving(false);
    }, 800);
  };
  
  const handleUpdateConfig = (data: Partial<CheckoutConfig>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...data
    }));
  };

  const handleUpdateUpsell = (upsellData: CheckoutConfig["upsell"]) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      upsell: upsellData
    }));
  };

  const handleUpdatePaymentMethods = (methods: CheckoutConfig["meiosPagamento"]) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      meiosPagamento: methods
    }));
  };

  const handleUpdateInstallments = (installments: CheckoutConfig["parcelamento"]) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      parcelamento: installments
    }));
  };

  const handleUpdateFields = (fields: CheckoutConfig["camposAdicionais"]) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      camposAdicionais: fields
    }));
  };

  const handleUpdateTrackingCodes = (data: {
    pixelFacebook?: string;
    pixelGoogle?: string;
    pixelTikTok?: string;
    scriptsPersonalizados?: string;
    dominio?: string;
    codigoAnalytics?: string;
  }) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...data
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/produtos">
                <ArrowLeft size={16} className="mr-2" />
                Voltar para Produtos
              </Link>
            </Button>
            <h1 className="text-xl font-bold hidden sm:block">Construtor de Checkout</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? (
                <>
                  <EyeOff size={16} className="mr-2" />
                  Ocultar preview
                </>
              ) : (
                <>
                  <Eye size={16} className="mr-2" />
                  Visualizar
                </>
              )}
            </Button>
            
            <Button 
              size="sm"
              variant="outline"
              asChild
            >
              <a href="/checkout-preview" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Abrir em nova aba
              </a>
            </Button>
            
            <Button 
              size="sm"
              disabled={isSaving}
              onClick={handleSave}
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container py-6 flex-1">
        {previewMode ? (
          <div className="max-w-5xl mx-auto py-4">
            <div className="bg-white rounded-lg shadow-lg p-4 border relative mb-4">
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPreviewMode(false)}
                >
                  <EyeOff size={16} className="mr-2" />
                  Voltar à edição
                </Button>
              </div>
              <div className="pt-6">
                <CheckoutPreviewEnhanced config={config} produto={produto} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settings panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="px-1 pt-2">
                    <TabsList className="grid grid-cols-3 lg:grid-cols-2 bg-muted/50 h-auto">
                      <TabsTrigger value="design" className="text-xs sm:text-sm">Design</TabsTrigger>
                      <TabsTrigger value="conteudo" className="text-xs sm:text-sm">Conteúdo</TabsTrigger>
                      <TabsTrigger value="pagamento" className="text-xs sm:text-sm">Pagamento</TabsTrigger>
                      <TabsTrigger value="upsell" className="text-xs sm:text-sm">Upsell</TabsTrigger>
                      <TabsTrigger value="bump" className="text-xs sm:text-sm">Bump</TabsTrigger>
                      <TabsTrigger value="avançado" className="text-xs sm:text-sm">Avançado</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="p-6">
                    <TabsContent value="design" className="mt-0">
                      <DesignSettings 
                        config={config}
                        onUpdateConfig={handleUpdateConfig}
                        onUpdateColor={(cor) => handleUpdateConfig({ cor })}
                        onUpdateLogo={(logo) => handleUpdateConfig({ logo })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="conteudo" className="mt-0">
                      <ContentSettings 
                        config={config}
                        onUpdateTitle={(titulo) => handleUpdateConfig({ titulo })}
                        onUpdateDescription={(descricao) => handleUpdateConfig({ descricao })}
                        onToggleReviews={(mostrarAvaliacao) => handleUpdateConfig({ mostrarAvaliacao })}
                        onToggleCountdown={(mostrarContador) => handleUpdateConfig({ mostrarContador })}
                        onUpdateCountdownTime={(tempoContador) => handleUpdateConfig({ tempoContador })}
                        onToggleGuarantee={(mostrarGarantia) => handleUpdateConfig({ mostrarGarantia })}
                        onUpdateGuaranteeDays={(diasGarantia) => handleUpdateConfig({ diasGarantia })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="pagamento" className="mt-0">
                      <PaymentSettings 
                        config={config}
                        onUpdatePaymentMethods={handleUpdatePaymentMethods}
                        onUpdateInstallments={handleUpdateInstallments}
                        onUpdateFields={handleUpdateFields}
                      />
                    </TabsContent>
                    
                    <TabsContent value="upsell" className="mt-0">
                      <UpsellSettings 
                        config={config}
                        onUpdateUpsell={handleUpdateUpsell}
                      />
                    </TabsContent>
                    
                    <TabsContent value="bump" className="mt-0">
                      <BumpOffersConfig 
                        offers={config.bumpOffers}
                        onChange={(bumpOffers) => handleUpdateConfig({ bumpOffers })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="avançado" className="mt-0">
                      <AdvancedSettings
                        config={config}
                        onUpdateFacebookPixel={(pixelFacebook) => handleUpdateConfig({ pixelFacebook })}
                        onUpdateGooglePixel={(pixelGoogle) => handleUpdateConfig({ pixelGoogle })}
                        onUpdateTikTokPixel={(pixelTikTok) => handleUpdateConfig({ pixelTikTok })}
                        onUpdateCustomScripts={(scriptsPersonalizados) => handleUpdateConfig({ scriptsPersonalizados })}
                        onUpdateDomain={(dominio) => handleUpdateConfig({ dominio })}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
              
              {/* Save button for mobile */}
              <div className="mt-4 text-center lg:hidden">
                <Button className="w-full" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Salvar configurações
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Preview panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Visualização do checkout</h2>
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    <Check size={12} />
                    <span>Preview em tempo real</span>
                  </div>
                </div>
                <div className="overflow-auto border rounded-lg bg-gray-50" style={{ maxHeight: "800px" }}>
                  <CheckoutPreviewEnhanced config={config} produto={produto} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-auto py-4 border-t bg-white">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm text-muted-foreground">
            Personalize seu checkout para <span className="font-medium">{produto?.titulo || 'seu produto'}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="link" size="sm" className="text-muted-foreground" asChild>
              <Link to="/ajuda">Precisa de ajuda?</Link>
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              <Save size={14} className="mr-2" />
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
