import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Palette, Image, FileText, LayoutGrid, CreditCard, Check, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { produtosMock } from "@/data/marketplaceData";
import { useToast } from "@/hooks/use-toast";
import CheckoutPreview from "@/components/checkout/CheckoutPreview";
import DesignSettings from "@/components/checkout/DesignSettings";
import ContentSettings from "@/components/checkout/ContentSettings";
import PaymentSettings from "@/components/checkout/PaymentSettings";
import UpsellSettings from "@/components/checkout/UpsellSettings";
import AdvancedSettings from "@/components/checkout/AdvancedSettings";

export interface CheckoutConfig {
  id: string;
  produtoId: number;
  layout: "padrao" | "minimalista" | "destaque";
  cor: string;
  logo: string | null;
  titulo: string;
  descricao: string;
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
  tipoProduto: "digital" | "fisico" | "grupo" | "curso" | "ebook";
}

export default function CheckoutBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("design");
  const [produto, setProduto] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfig>({
    id: `checkout-${Date.now()}`,
    produtoId: Number(id),
    layout: "padrao",
    cor: "#9b87f5",
    logo: null,
    titulo: "",
    descricao: "",
    mostrarAvaliacao: true,
    mostrarContador: false,
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
      titulo: "",
      descricao: "",
      preco: 0,
      imagem: null,
    },
    pixelFacebook: "",
    pixelGoogle: "",
    pixelTikTok: "",
    scriptsPersonalizados: "",
    dominio: "",
    tipoProduto: "digital",
  });

  useEffect(() => {
    if (id) {
      const produtoEncontrado = produtosMock.find(p => p.id === Number(id));
      if (produtoEncontrado) {
        setProduto(produtoEncontrado);
        
        // Determine the product type based on tags or category if tipo is not available
        let productType: "digital" | "fisico" | "grupo" | "curso" | "ebook" = "digital";
        
        if (produtoEncontrado.tags.includes("ebook")) {
          productType = "ebook";
        } else if (produtoEncontrado.tags.includes("curso")) {
          productType = "curso";
        } else if (produtoEncontrado.tags.includes("mentoria") || produtoEncontrado.tags.includes("consultoria")) {
          productType = "grupo";
        } else if (produtoEncontrado.categoria === "Ferramentas" || produtoEncontrado.categoria === "Digital" || 
                  produtoEncontrado.categoria === "Infoprodutos") {
          productType = "digital";
        }
        
        setCheckoutConfig(prev => ({
          ...prev,
          titulo: produtoEncontrado.titulo,
          descricao: `Adquira agora o produto ${produtoEncontrado.titulo} e comece a transformar sua vida!`,
          tipoProduto: productType,
        }));
      }
    }
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simular um salvamento
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Checkout personalizado salvo",
        description: "As configurações do seu checkout foram salvas com sucesso.",
      });
      
      // Redirecionar para a página de produtos após salvar
      navigate("/produtos");
    }, 1500);
    
    console.log("Checkout Configuration:", checkoutConfig);
  };

  const handleUpdateConfig = (section: string, data: any) => {
    setCheckoutConfig(prev => {
      const sectionData = prev[section as keyof CheckoutConfig];
      
      // Check if the section exists and is an object before spreading
      if (sectionData && typeof sectionData === 'object') {
        return {
          ...prev,
          [section]: { ...sectionData, ...data }
        };
      }
      
      // If it's not an object, just replace the value
      return {
        ...prev,
        [section]: data
      };
    });
  };

  const handleUpdateSimpleConfig = (key: keyof CheckoutConfig, value: any) => {
    setCheckoutConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateTipoProduto = (tipo: "digital" | "fisico" | "grupo" | "curso" | "ebook") => {
    setCheckoutConfig(prev => ({
      ...prev,
      tipoProduto: tipo,
    }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <div className="border-b px-6 py-3">
        <Link to="/produtos" className="text-xl font-bold flex items-center">
          <ArrowLeft size={18} className="mr-2" /> Checkout Builder
        </Link>
      </div>
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Personalizar Checkout: {produto?.titulo}</h1>
              <p className="text-muted-foreground">Personalize a experiência de checkout para este produto</p>
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="self-start"
            >
              {isSaving ? (
                <>Salvando...</>
              ) : (
                <>
                  <Check size={16} className="mr-2" />
                  Salvar Checkout
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 xl:col-span-4 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Tipo de produto</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <Button 
                        variant={checkoutConfig.tipoProduto === "digital" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateTipoProduto("digital")}
                        className="w-full"
                      >
                        Digital
                      </Button>
                      <Button 
                        variant={checkoutConfig.tipoProduto === "fisico" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateTipoProduto("fisico")}
                        className="w-full"
                      >
                        Físico
                      </Button>
                      <Button 
                        variant={checkoutConfig.tipoProduto === "grupo" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateTipoProduto("grupo")}
                        className="w-full"
                      >
                        Grupo
                      </Button>
                      <Button 
                        variant={checkoutConfig.tipoProduto === "curso" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateTipoProduto("curso")}
                        className="w-full"
                      >
                        Curso
                      </Button>
                      <Button 
                        variant={checkoutConfig.tipoProduto === "ebook" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateTipoProduto("ebook")}
                        className="w-full"
                      >
                        E-book
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="design" className="flex items-center gap-2">
                        <Palette size={16} />
                        <span className="hidden sm:inline">Design</span>
                      </TabsTrigger>
                      <TabsTrigger value="conteudo" className="flex items-center gap-2">
                        <FileText size={16} />
                        <span className="hidden sm:inline">Conteúdo</span>
                      </TabsTrigger>
                      <TabsTrigger value="pagamento" className="flex items-center gap-2">
                        <CreditCard size={16} />
                        <span className="hidden sm:inline">Pagamento</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="upsell" className="flex items-center gap-2">
                        <Package size={16} />
                        <span className="hidden sm:inline">Upsell</span>
                      </TabsTrigger>
                      <TabsTrigger value="avancado" className="flex items-center gap-2">
                        <Settings size={16} />
                        <span className="hidden sm:inline">Avançado</span>
                      </TabsTrigger>
                      <div className="hidden sm:block"></div>
                    </TabsList>
                    
                    <TabsContent value="design" className="space-y-4 mt-2">
                      <DesignSettings 
                        config={checkoutConfig} 
                        onUpdateConfig={(data) => handleUpdateSimpleConfig("layout", data.layout)}
                        onUpdateColor={(color) => handleUpdateSimpleConfig("cor", color)} 
                        onUpdateLogo={(logo) => handleUpdateSimpleConfig("logo", logo)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="conteudo" className="space-y-4 mt-2">
                      <ContentSettings 
                        config={checkoutConfig}
                        onUpdateTitle={(title) => handleUpdateSimpleConfig("titulo", title)}
                        onUpdateDescription={(desc) => handleUpdateSimpleConfig("descricao", desc)}
                        onToggleReviews={(show) => handleUpdateSimpleConfig("mostrarAvaliacao", show)}
                        onToggleCountdown={(show) => handleUpdateSimpleConfig("mostrarContador", show)}
                        onUpdateCountdownTime={(time) => handleUpdateSimpleConfig("tempoContador", time)}
                        onToggleGuarantee={(show) => handleUpdateSimpleConfig("mostrarGarantia", show)}
                        onUpdateGuaranteeDays={(days) => handleUpdateSimpleConfig("diasGarantia", days)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="pagamento" className="space-y-4 mt-2">
                      <PaymentSettings 
                        config={checkoutConfig}
                        onUpdatePaymentMethods={(methods) => handleUpdateConfig("meiosPagamento", methods)}
                        onUpdateInstallments={(installments) => handleUpdateConfig("parcelamento", installments)}
                        onUpdateFields={(fields) => handleUpdateConfig("camposAdicionais", fields)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="upsell" className="space-y-4 mt-2">
                      <UpsellSettings 
                        config={checkoutConfig}
                        onUpdateUpsell={(upsell) => handleUpdateConfig("upsell", upsell)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="avancado" className="space-y-4 mt-2">
                      <AdvancedSettings 
                        config={checkoutConfig}
                        onUpdateFacebookPixel={(pixel) => handleUpdateSimpleConfig("pixelFacebook", pixel)}
                        onUpdateGooglePixel={(pixel) => handleUpdateSimpleConfig("pixelGoogle", pixel)}
                        onUpdateTikTokPixel={(pixel) => handleUpdateSimpleConfig("pixelTikTok", pixel)}
                        onUpdateCustomScripts={(scripts) => handleUpdateSimpleConfig("scriptsPersonalizados", scripts)}
                        onUpdateDomain={(domain) => handleUpdateSimpleConfig("dominio", domain)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-7 xl:col-span-8">
              <div className="sticky top-20">
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Pré-visualização de Checkout</h2>
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <CheckoutPreview 
                        config={checkoutConfig}
                        produto={produto}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
