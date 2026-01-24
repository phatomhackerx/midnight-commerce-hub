import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Shield, Clock, CheckCircle, CreditCard, QrCode, Star, Lock, Gift, 
  Zap, ChevronDown, Copy, AlertCircle, Headphones, Receipt, Loader2 
} from 'lucide-react';
import { getCheckoutBySlug } from '@/stores/checkoutStore';
import { produtosMock } from '@/data/marketplaceData';
import { ProductCheckout } from '@/types/checkout';
import { checkoutFormSchema, CheckoutFormData, formatPhone, formatCPF, formatCardNumber, formatExpiry } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function PublicCheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const [checkout, setCheckout] = useState<ProductCheckout | null>(null);
  const [produto, setProduto] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
  const [selectedBumps, setSelectedBumps] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [installments, setInstallments] = useState('1');

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
    },
  });

  useEffect(() => {
    if (!slug) return;
    const foundCheckout = getCheckoutBySlug(slug);
    if (foundCheckout) {
      setCheckout(foundCheckout);
      const foundProduct = produtosMock.find(p => p.id === foundCheckout.productId);
      setProduto(foundProduct);
      
      if (foundCheckout.timer.enabled) {
        setTimeLeft({
          hours: foundCheckout.timer.hours,
          minutes: foundCheckout.timer.minutes,
          seconds: 0,
        });
      }
    }
  }, [slug]);

  // Timer countdown
  useEffect(() => {
    if (!checkout?.timer.enabled) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(interval);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [checkout?.timer.enabled]);

  const toggleBump = useCallback((bumpId: string) => {
    setSelectedBumps(prev => 
      prev.includes(bumpId) ? prev.filter(id => id !== bumpId) : [...prev, bumpId]
    );
  }, []);

  const calculateTotal = useCallback(() => {
    if (!produto || !checkout) return 0;
    let total = produto.preco;
    selectedBumps.forEach(bumpId => {
      const bump = checkout.orderBumps.find(b => b.id === bumpId);
      if (bump) total += bump.price;
    });
    return total;
  }, [produto, checkout, selectedBumps]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    // Simular processamento
    await new Promise(r => setTimeout(r, 2000));
    
    toast.success('Pedido realizado com sucesso!', {
      description: 'Você receberá um e-mail com os detalhes da compra.',
    });
    
    setIsProcessing(false);
  };

  if (!checkout || !produto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p className="mt-2 text-gray-600">Carregando checkout...</p>
        </div>
      </div>
    );
  }

  const theme = checkout.theme;
  const total = calculateTotal();
  const installmentValue = total / parseInt(installments);

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: theme.backgroundColor, 
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Header Badge */}
      {checkout.header.showBadge && (
        <div 
          className="text-center py-2.5 text-sm font-semibold"
          style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
        >
          {checkout.header.badgeText}
        </div>
      )}

      {/* Logo */}
      {checkout.header.showLogo && checkout.header.logo && (
        <div className="py-4 flex justify-center border-b" style={{ borderColor: `${theme.textColor}10` }}>
          <img src={checkout.header.logo} alt="Logo" className="h-10 object-contain" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Timer */}
        {checkout.timer.enabled && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-center">
            <div className="text-amber-700 font-medium mb-3">{checkout.timer.text}</div>
            <div className="flex gap-3 justify-center">
              {[
                { value: timeLeft.hours, label: 'horas' },
                { value: timeLeft.minutes, label: 'min' },
                { value: timeLeft.seconds, label: 'seg' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white rounded-xl px-4 py-2 shadow-sm border border-amber-100">
                  <div className="text-2xl font-bold text-amber-600">{String(value).padStart(2, '0')}</div>
                  <div className="text-xs text-amber-600/70">{label}</div>
                </div>
              ))}
            </div>
            {checkout.timer.showProgress && (
              <div className="mt-3 h-2 bg-amber-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-1000"
                  style={{ 
                    width: `${((checkout.timer.hours * 3600 + checkout.timer.minutes * 60) - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds)) / (checkout.timer.hours * 3600 + checkout.timer.minutes * 60) * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className={cn(
          "grid gap-8",
          checkout.layout === 'two-column' ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'
        )}>
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            {checkout.header.showTitle && (
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">{checkout.header.title}</h1>
                {checkout.header.showSubtitle && (
                  <p className="mt-2 opacity-70">{checkout.header.subtitle}</p>
                )}
              </div>
            )}

            {/* Product Card */}
            <div 
              className="p-5 rounded-2xl border-2"
              style={{ 
                backgroundColor: `${theme.primaryColor}08`,
                borderColor: `${theme.primaryColor}30`,
              }}
            >
              <div className="flex gap-4">
                {checkout.product.showImage && (
                  <img 
                    src={produto.imagem} 
                    alt={produto.titulo}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{produto.titulo}</h3>
                  {checkout.product.showRating && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm opacity-60 ml-1">({produto.vendas} vendas)</span>
                    </div>
                  )}
                  <div className="mt-3 flex items-baseline gap-2">
                    {checkout.product.showOriginalPrice && checkout.product.originalPrice > 0 && (
                      <span className="text-sm line-through opacity-50">
                        R$ {checkout.product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      R$ {produto.preco.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            {checkout.benefits.filter(b => b.enabled).length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">O que você vai receber:</h3>
                {checkout.benefits.filter(b => b.enabled).map((benefit) => (
                  <div 
                    key={benefit.id} 
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: `${theme.primaryColor}08` }}
                  >
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${theme.primaryColor}20` }}
                    >
                      <Zap className="h-5 w-5" style={{ color: theme.primaryColor }} />
                    </div>
                    <div>
                      <div className="font-semibold">{benefit.title}</div>
                      <div className="text-sm opacity-70">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials */}
            {checkout.testimonials.filter(t => t.enabled).length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">O que dizem sobre:</h3>
                {checkout.testimonials.filter(t => t.enabled).map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: `${theme.textColor}15` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-3 w-3",
                                i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm opacity-80">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Guarantee */}
            {checkout.guarantee.enabled && (
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Shield className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800 text-lg">
                      {checkout.guarantee.title}
                    </h4>
                    <p className="text-emerald-700 mt-1">{checkout.guarantee.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-emerald-200 rounded-full text-sm font-semibold text-emerald-800">
                      <CheckCircle className="h-4 w-4" />
                      {checkout.guarantee.days} dias de garantia
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Customer Info */}
                <div className="p-6 rounded-2xl border" style={{ borderColor: `${theme.textColor}15` }}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full text-sm flex items-center justify-center text-white" style={{ backgroundColor: theme.primaryColor }}>1</span>
                    Seus dados
                  </h3>
                  
                  <div className="space-y-4">
                    {checkout.fields.name && (
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Seu nome completo"
                                className="h-12 rounded-xl"
                                style={{ borderColor: `${theme.textColor}20` }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {checkout.fields.email && (
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email"
                                placeholder="seu@email.com"
                                className="h-12 rounded-xl"
                                style={{ borderColor: `${theme.textColor}20` }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {checkout.fields.phone && (
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone/WhatsApp</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="(00) 00000-0000"
                                className="h-12 rounded-xl"
                                style={{ borderColor: `${theme.textColor}20` }}
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                maxLength={16}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {checkout.fields.cpf && (
                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="000.000.000-00"
                                className="h-12 rounded-xl"
                                style={{ borderColor: `${theme.textColor}20` }}
                                onChange={(e) => field.onChange(formatCPF(e.target.value))}
                                maxLength={14}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* Order Bumps */}
                {checkout.orderBumps.filter(b => b.enabled).length > 0 && (
                  <div className="space-y-3">
                    {checkout.orderBumps.filter(b => b.enabled).map((bump) => (
                      <div 
                        key={bump.id}
                        onClick={() => toggleBump(bump.id)}
                        className={cn(
                          "p-4 rounded-2xl border-2 cursor-pointer transition-all",
                          selectedBumps.includes(bump.id)
                            ? "border-amber-400 bg-amber-50"
                            : "border-dashed hover:border-amber-300"
                        )}
                        style={{ borderColor: selectedBumps.includes(bump.id) ? undefined : `${theme.textColor}20` }}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={selectedBumps.includes(bump.id)}
                            className="mt-1 h-5 w-5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Gift className="h-4 w-4 text-amber-600" />
                              <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                                Oferta especial
                              </span>
                            </div>
                            <h4 className="font-bold">{bump.title}</h4>
                            <p className="text-sm opacity-70 mt-1">{bump.description}</p>
                            <div className="mt-2 font-bold" style={{ color: theme.primaryColor }}>
                              + R$ {bump.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payment Methods */}
                <div className="p-6 rounded-2xl border" style={{ borderColor: `${theme.textColor}15` }}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full text-sm flex items-center justify-center text-white" style={{ backgroundColor: theme.primaryColor }}>2</span>
                    Forma de pagamento
                  </h3>

                  <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)} className="space-y-3">
                    {checkout.paymentMethods.creditCard && (
                      <label 
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          paymentMethod === 'credit' ? "border-current" : "border-transparent"
                        )}
                        style={{ 
                          borderColor: paymentMethod === 'credit' ? theme.primaryColor : `${theme.textColor}15`,
                          backgroundColor: paymentMethod === 'credit' ? `${theme.primaryColor}08` : 'transparent',
                        }}
                      >
                        <RadioGroupItem value="credit" />
                        <CreditCard className="h-5 w-5" style={{ color: theme.primaryColor }} />
                        <div className="flex-1">
                          <div className="font-medium">Cartão de Crédito</div>
                          <div className="text-sm opacity-60">
                            Até {checkout.installments.maxInstallments}x 
                            {checkout.installments.interestFreeInstallments > 0 && 
                              ` (${checkout.installments.interestFreeInstallments}x sem juros)`
                            }
                          </div>
                        </div>
                      </label>
                    )}

                    {checkout.paymentMethods.pix && (
                      <label 
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          paymentMethod === 'pix' ? "border-current" : "border-transparent"
                        )}
                        style={{ 
                          borderColor: paymentMethod === 'pix' ? '#00A868' : `${theme.textColor}15`,
                          backgroundColor: paymentMethod === 'pix' ? '#00A86808' : 'transparent',
                        }}
                      >
                        <RadioGroupItem value="pix" />
                        <QrCode className="h-5 w-5 text-emerald-600" />
                        <div className="flex-1">
                          <div className="font-medium">PIX</div>
                          <div className="text-sm opacity-60">Aprovação instantânea</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          5% OFF
                        </span>
                      </label>
                    )}

                    {checkout.paymentMethods.boleto && (
                      <label 
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          paymentMethod === 'boleto' ? "border-current" : "border-transparent"
                        )}
                        style={{ 
                          borderColor: paymentMethod === 'boleto' ? theme.primaryColor : `${theme.textColor}15`,
                          backgroundColor: paymentMethod === 'boleto' ? `${theme.primaryColor}08` : 'transparent',
                        }}
                      >
                        <RadioGroupItem value="boleto" />
                        <Receipt className="h-5 w-5" style={{ color: theme.primaryColor }} />
                        <div className="flex-1">
                          <div className="font-medium">Boleto Bancário</div>
                          <div className="text-sm opacity-60">Vencimento em 3 dias</div>
                        </div>
                      </label>
                    )}
                  </RadioGroup>

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit' && (
                    <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: `${theme.textColor}10` }}>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Número do cartão</label>
                        <Input 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Nome no cartão</label>
                        <Input 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          placeholder="NOME COMO ESTÁ NO CARTÃO"
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Validade</label>
                          <Input 
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="h-12 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">CVV</label>
                          <Input 
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            placeholder="000"
                            maxLength={4}
                            type="password"
                            className="h-12 rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Parcelas</label>
                        <Select value={installments} onValueChange={setInstallments}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(checkout.installments.maxInstallments)].map((_, i) => {
                              const numInstallments = i + 1;
                              const isInterestFree = numInstallments <= checkout.installments.interestFreeInstallments;
                              return (
                                <SelectItem key={numInstallments} value={String(numInstallments)}>
                                  {numInstallments}x de R$ {(total / numInstallments).toFixed(2)}
                                  {isInterestFree ? ' sem juros' : ''}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* PIX Info */}
                  {paymentMethod === 'pix' && (
                    <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: `${theme.textColor}10` }}>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        <Zap className="h-4 w-4" />
                        O QR Code será gerado após confirmar o pedido
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="p-6 rounded-2xl" style={{ backgroundColor: `${theme.primaryColor}08` }}>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-70">Produto</span>
                      <span>R$ {produto.preco.toFixed(2)}</span>
                    </div>
                    {selectedBumps.map(bumpId => {
                      const bump = checkout.orderBumps.find(b => b.id === bumpId);
                      if (!bump) return null;
                      return (
                        <div key={bumpId} className="flex justify-between">
                          <span className="opacity-70">{bump.title}</span>
                          <span>R$ {bump.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                    {paymentMethod === 'pix' && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Desconto PIX (5%)</span>
                        <span>- R$ {(total * 0.05).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t flex justify-between text-lg font-bold" style={{ borderColor: `${theme.textColor}15` }}>
                      <span>Total</span>
                      <span style={{ color: theme.primaryColor }}>
                        R$ {(paymentMethod === 'pix' ? total * 0.95 : total).toFixed(2)}
                      </span>
                    </div>
                    {paymentMethod === 'credit' && parseInt(installments) > 1 && (
                      <div className="text-center text-sm opacity-70">
                        ou {installments}x de R$ {(total / parseInt(installments)).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 text-lg font-bold rounded-xl text-white transition-all hover:scale-[1.02] disabled:opacity-70"
                  style={{
                    background: theme.buttonStyle === 'gradient'
                      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                      : theme.primaryColor,
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Finalizar Compra Segura
                    </>
                  )}
                </Button>

                {/* Security Badges */}
                {checkout.security.showSecurityBadges && (
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-60">
                    {checkout.security.showSSL && (
                      <div className="flex items-center gap-1">
                        <Lock className="h-4 w-4" />
                        <span>SSL Seguro</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      <span>{checkout.security.customSecurityText}</span>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t text-center text-sm opacity-60" style={{ borderColor: `${theme.textColor}10` }}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            {checkout.footer.showTerms && (
              <a href={checkout.footer.termsLink} className="hover:underline">Termos de Uso</a>
            )}
            {checkout.footer.showPrivacy && (
              <a href={checkout.footer.privacyLink} className="hover:underline">Política de Privacidade</a>
            )}
          </div>
          {checkout.footer.showSupport && (
            <p className="flex items-center justify-center gap-2">
              <Headphones className="h-4 w-4" />
              Dúvidas? {checkout.footer.supportEmail}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
