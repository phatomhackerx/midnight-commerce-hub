import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductCheckout, defaultProductCheckout } from '@/types/checkout';
import { produtosMock } from '@/data/marketplaceData';
import { getCheckoutsByProductId, getCheckoutById, createCheckout, updateCheckout, duplicateCheckout, deleteCheckout } from '@/stores/checkoutStore';
import CheckoutBuilderHeader from '@/components/checkout-builder/CheckoutBuilderHeader';
import CheckoutBuilderSidebar from '@/components/checkout-builder/CheckoutBuilderSidebar';
import LayoutSection from '@/components/checkout-builder/sections/LayoutSection';
import ThemeSection from '@/components/checkout-builder/sections/ThemeSection';
import HeaderSection from '@/components/checkout-builder/sections/HeaderSection';
import PaymentSection from '@/components/checkout-builder/sections/PaymentSection';
import TimerSection from '@/components/checkout-builder/sections/TimerSection';
import GuaranteeSection from '@/components/checkout-builder/sections/GuaranteeSection';
import ProductSection from '@/components/checkout-builder/sections/ProductSection';
import BenefitsSection from '@/components/checkout-builder/sections/BenefitsSection';
import TestimonialsSection from '@/components/checkout-builder/sections/TestimonialsSection';
import OrderBumpsSection from '@/components/checkout-builder/sections/OrderBumpsSection';
import UpsellSection from '@/components/checkout-builder/sections/UpsellSection';
import PixelsSection from '@/components/checkout-builder/sections/PixelsSection';
import FooterSection from '@/components/checkout-builder/sections/FooterSection';
import AdvancedSection from '@/components/checkout-builder/sections/AdvancedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Clock, CheckCircle, CreditCard, QrCode, Star, Lock, Gift, Zap } from 'lucide-react';

export default function ProductCheckoutBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const checkoutId = searchParams.get('checkoutId');
  
  const [produto, setProduto] = useState<any>(null);
  const [checkout, setCheckout] = useState<ProductCheckout | null>(null);
  const [activeSection, setActiveSection] = useState('layout');
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const foundProduct = produtosMock.find(p => p.id === Number(id));
    if (!foundProduct) {
      toast.error('Produto não encontrado');
      navigate('/produtos');
      return;
    }
    setProduto(foundProduct);

    if (checkoutId) {
      const existingCheckout = getCheckoutById(checkoutId);
      if (existingCheckout) {
        setCheckout(existingCheckout);
      } else {
        const newCheckout = createCheckout(foundProduct.id, 'Novo Checkout');
        setCheckout(newCheckout);
      }
    } else {
      const productCheckouts = getCheckoutsByProductId(foundProduct.id);
      if (productCheckouts.length > 0) {
        setCheckout(productCheckouts[0]);
      } else {
        const newCheckout = createCheckout(foundProduct.id, 'Checkout Principal');
        setCheckout(newCheckout);
      }
    }
  }, [id, checkoutId, navigate]);

  const handleUpdate = (updates: Partial<ProductCheckout>) => {
    if (!checkout) return;
    setCheckout({ ...checkout, ...updates });
  };

  const handleSave = async () => {
    if (!checkout) return;
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateCheckout(checkout.id, checkout);
    toast.success('Checkout salvo com sucesso!');
    setIsSaving(false);
  };

  const handleDuplicate = () => {
    if (!checkout) return;
    const duplicated = duplicateCheckout(checkout.id, `${checkout.name} (Cópia)`);
    if (duplicated) {
      toast.success('Checkout duplicado!');
      navigate(`/produtos/checkout-builder/${id}?checkoutId=${duplicated.id}`);
    }
  };

  const handleDelete = () => {
    if (!checkout) return;
    deleteCheckout(checkout.id);
    toast.success('Checkout excluído!');
    navigate('/produtos');
  };

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-full';
    }
  };

  if (!produto || !checkout) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'layout': return <LayoutSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'theme': return <ThemeSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'header': return <HeaderSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'product': return <ProductSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'timer': return <TimerSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'benefits': return <BenefitsSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'testimonials': return <TestimonialsSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'guarantee': return <GuaranteeSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'payment': return <PaymentSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'orderbumps': return <OrderBumpsSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'upsell': return <UpsellSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'pixels': return <PixelsSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'footer': return <FooterSection checkout={checkout} onUpdate={handleUpdate} />;
      case 'advanced': return <AdvancedSection checkout={checkout} onUpdate={handleUpdate} />;
      default: return <LayoutSection checkout={checkout} onUpdate={handleUpdate} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <CheckoutBuilderHeader
        productName={produto.titulo}
        checkoutName={checkout.name}
        checkoutStatus={checkout.status}
        isSaving={isSaving}
        previewMode={previewMode}
        previewDevice={previewDevice}
        onSave={handleSave}
        onTogglePreview={() => setPreviewMode(!previewMode)}
        onChangeDevice={setPreviewDevice}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        checkoutSlug={checkout.slug}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {!previewMode && (
          <>
            <CheckoutBuilderSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            <div className="w-80 xl:w-96 border-r border-border bg-card/30 shrink-0">
              <ScrollArea className="h-[calc(100vh-57px)]">
                <div className="p-4 lg:p-6">{renderSection()}</div>
              </ScrollArea>
            </div>
          </>
        )}
        
        <div className="flex-1 bg-muted/30 overflow-auto p-4 lg:p-8">
          <div className={`mx-auto transition-all ${getDeviceWidth()}`}>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ backgroundColor: checkout.theme.backgroundColor, color: checkout.theme.textColor }}>
              {/* Header */}
              {checkout.header.showLogo && checkout.header.logo && (
                <div className="p-4 border-b flex justify-center">
                  <img src={checkout.header.logo} alt="Logo" className="h-10 object-contain" />
                </div>
              )}
              
              {checkout.header.showBadge && (
                <div className="text-center py-2 text-sm font-medium" style={{ backgroundColor: checkout.theme.primaryColor, color: '#fff' }}>
                  {checkout.header.badgeText}
                </div>
              )}
              
              <div className={`p-6 ${checkout.layout === 'two-column' ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''}`}>
                <div className="space-y-6">
                  {checkout.header.showTitle && <h1 className="text-2xl font-bold">{checkout.header.title}</h1>}
                  {checkout.header.showSubtitle && <p className="text-muted-foreground">{checkout.header.subtitle}</p>}
                  
                  <div className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: `${checkout.theme.primaryColor}10` }}>
                    <img src={produto.imagem} alt={produto.titulo} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-semibold">{produto.titulo}</h3>
                      {checkout.product.showRating && (
                        <div className="flex items-center gap-1 text-yellow-500 mt-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                          <span className="text-xs text-muted-foreground ml-1">({produto.vendas})</span>
                        </div>
                      )}
                      <div className="text-xl font-bold mt-2" style={{ color: checkout.theme.primaryColor }}>
                        R$ {produto.preco.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {checkout.timer.enabled && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <div className="text-sm text-amber-700 font-medium mb-2">{checkout.timer.text}</div>
                      <div className="flex gap-2 justify-center">
                        {['horas', 'min', 'seg'].map((label, i) => (
                          <div key={label} className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
                            <div className="text-lg font-bold text-amber-600">{i === 0 ? String(checkout.timer.hours).padStart(2,'0') : i === 1 ? String(checkout.timer.minutes).padStart(2,'0') : '00'}</div>
                            <div className="text-xs text-amber-600/70">{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {checkout.benefits.filter(b => b.enabled).length > 0 && (
                    <div className="space-y-2">
                      {checkout.benefits.filter(b => b.enabled).map((benefit) => (
                        <div key={benefit.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          <Zap className="h-5 w-5" style={{ color: checkout.theme.primaryColor }} />
                          <div>
                            <div className="font-medium text-sm">{benefit.title}</div>
                            <div className="text-xs text-muted-foreground">{benefit.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {checkout.guarantee.enabled && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex gap-3">
                      <Shield className="h-8 w-8 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-emerald-700">{checkout.guarantee.title} de {checkout.guarantee.days} dias</div>
                        <div className="text-sm text-emerald-600">{checkout.guarantee.description}</div>
                      </div>
                    </div>
                  )}

                  {/* Order Bumps */}
                  {checkout.orderBumps.filter(b => b.enabled).map((bump) => (
                    <div key={bump.id} className={`p-4 rounded-xl border-2 ${bump.highlight ? 'border-amber-400 bg-amber-50' : 'border-border'}`}>
                      <div className="flex items-start gap-3">
                        <Gift className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                        <div className="flex-1">
                          <div className="font-bold text-sm">{bump.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{bump.description}</div>
                          <div className="font-bold mt-2" style={{ color: checkout.theme.primaryColor }}>+ R$ {bump.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 mt-6 lg:mt-0">
                  <div className="space-y-3">
                    {checkout.fields.name && <div className="p-3 rounded-lg border bg-gray-50">Nome completo</div>}
                    {checkout.fields.email && <div className="p-3 rounded-lg border bg-gray-50">E-mail</div>}
                    {checkout.fields.phone && <div className="p-3 rounded-lg border bg-gray-50">Telefone</div>}
                    {checkout.fields.cpf && <div className="p-3 rounded-lg border bg-gray-50">CPF</div>}
                  </div>
                  
                  <div className="space-y-2">
                    {checkout.paymentMethods.creditCard && (
                      <div className="p-3 rounded-lg border-2 flex items-center gap-2" style={{ borderColor: checkout.theme.primaryColor }}>
                        <CreditCard className="h-5 w-5" style={{ color: checkout.theme.primaryColor }} />
                        <span className="font-medium">Cartão de Crédito</span>
                      </div>
                    )}
                    {checkout.paymentMethods.pix && (
                      <div className="p-3 rounded-lg border flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-emerald-600" />
                        <span className="font-medium">PIX</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="w-full py-4 rounded-xl font-bold text-lg text-white transition-transform hover:scale-[1.02]"
                    style={{
                      background: checkout.theme.buttonStyle === 'gradient'
                        ? `linear-gradient(135deg, ${checkout.theme.primaryColor}, ${checkout.theme.secondaryColor})`
                        : checkout.theme.primaryColor
                    }}
                  >
                    Finalizar Compra
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>{checkout.security.customSecurityText}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t text-center text-xs text-muted-foreground space-y-2">
                <div className="flex items-center justify-center gap-4">
                  {checkout.footer.showTerms && <span className="hover:underline cursor-pointer">Termos de Uso</span>}
                  {checkout.footer.showPrivacy && <span className="hover:underline cursor-pointer">Privacidade</span>}
                </div>
                {checkout.footer.showSupport && <p>Dúvidas? {checkout.footer.supportEmail}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
