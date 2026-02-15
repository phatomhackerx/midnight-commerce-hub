import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Shield, Clock, CheckCircle, CreditCard, QrCode, Star, Lock, Gift, 
  Zap, ChevronDown, Copy, AlertCircle, Headphones, Receipt, Loader2,
  Users, ArrowRight, ShieldCheck, Timer, BadgeCheck
} from 'lucide-react';
import { checkoutFormSchema, CheckoutFormData, formatPhone, formatCPF, formatCardNumber, formatExpiry } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock product data for standalone checkout
const mockProducts: Record<string, {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  sales: number;
  guarantee: number;
  benefits: string[];
  bump?: { name: string; price: number; description: string };
}> = {
  '1': {
    id: '1',
    name: 'Curso Completo de Marketing Digital',
    description: 'Domine as estratégias que geram resultados reais',
    price: 297,
    originalPrice: 497,
    image: '/placeholder.svg',
    rating: 4.9,
    sales: 2847,
    guarantee: 7,
    benefits: [
      'Acesso vitalício ao conteúdo',
      '12 módulos com +150 aulas',
      'Certificado de conclusão',
      'Comunidade exclusiva',
      'Suporte por 1 ano',
    ],
    bump: {
      name: 'Pack de Templates Premium',
      price: 47,
      description: '+50 templates editáveis para suas campanhas',
    },
  },
  '2': {
    id: '2',
    name: 'Ebook: Finanças Pessoais',
    description: 'Organize suas finanças e comece a investir',
    price: 47,
    originalPrice: 97,
    image: '/placeholder.svg',
    rating: 4.8,
    sales: 5321,
    guarantee: 30,
    benefits: [
      'Download imediato em PDF',
      'Planilhas de controle financeiro',
      'Guia de investimentos para iniciantes',
    ],
  },
};

export default function CheckoutPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = mockProducts[productId || '1'] || mockProducts['1'];

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
  const [bumpSelected, setBumpSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [installments, setInstallments] = useState('1');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: { name: '', email: '', phone: '', cpf: '' },
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { minutes: 0, seconds: 0 };
        return { minutes: Math.floor(totalSeconds / 60), seconds: totalSeconds % 60 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTotal = useCallback(() => {
    let total = product.price;
    if (bumpSelected && product.bump) total += product.bump.price;
    if (couponApplied) total *= 0.9; // 10% off
    if (paymentMethod === 'pix') total *= 0.95; // 5% off
    return total;
  }, [product, bumpSelected, couponApplied, paymentMethod]);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'DESCONTO10') {
      setCouponApplied(true);
      toast.success('Cupom aplicado com sucesso! 10% de desconto.');
    } else {
      toast.error('Cupom inválido');
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (step === 1) {
      setStep(2);
      return;
    }
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsProcessing(false);
    navigate(`/checkout/${productId}/success`);
  };

  const total = calculateTotal();
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const progressValue = step === 1 ? 50 : 100;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Timer className="h-4 w-4 animate-pulse" />
          <span>Oferta especial expira em</span>
          <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline">— Garanta {discount}% OFF agora</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className={cn("font-medium", step >= 1 ? "text-violet-600" : "text-gray-400")}>
              1. Seus dados
            </span>
            <span className={cn("font-medium", step >= 2 ? "text-violet-600" : "text-gray-400")}>
              2. Pagamento
            </span>
            <span className="font-medium text-gray-400">3. Confirmação</span>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Form (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Social Proof */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span><strong>{Math.floor(Math.random() * 20 + 10)}</strong> pessoas estão vendo agora</span>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Customer Info */}
                {step === 1 && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                      <h2 className="text-xl font-bold text-gray-900">Dados pessoais</h2>
                    </div>

                    <div className="space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Nome completo *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Seu nome completo" className="h-12 rounded-xl border-gray-300 focus:border-violet-500 focus:ring-violet-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">E-mail *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="seu@email.com" className="h-12 rounded-xl border-gray-300 focus:border-violet-500 focus:ring-violet-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">WhatsApp</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="(00) 00000-0000" className="h-12 rounded-xl border-gray-300" onChange={e => field.onChange(formatPhone(e.target.value))} maxLength={16} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="cpf" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">CPF</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="000.000.000-00" className="h-12 rounded-xl border-gray-300" onChange={e => field.onChange(formatCPF(e.target.value))} maxLength={14} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-13 text-lg font-bold rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white transition-all hover:scale-[1.01] shadow-lg shadow-violet-600/25">
                      Continuar para pagamento
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="space-y-6">
                    {/* Back button */}
                    <button type="button" onClick={() => setStep(1)} className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                      ← Voltar para dados pessoais
                    </button>

                    {/* Order Bump */}
                    {product.bump && (
                      <div
                        onClick={() => setBumpSelected(!bumpSelected)}
                        className={cn(
                          "rounded-2xl border-2 p-5 cursor-pointer transition-all",
                          bumpSelected
                            ? "border-amber-400 bg-amber-50 shadow-md"
                            : "border-dashed border-gray-300 hover:border-amber-300 bg-white"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox checked={bumpSelected} className="mt-1 h-5 w-5 border-amber-400 data-[state=checked]:bg-amber-500" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Gift className="h-4 w-4 text-amber-600" />
                              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Oferta exclusiva — Apenas hoje!</span>
                            </div>
                            <h4 className="font-bold text-gray-900">{product.bump.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{product.bump.description}</p>
                            <div className="mt-2 text-lg font-bold text-amber-600">+ R$ {product.bump.price.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Methods */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                        <h2 className="text-xl font-bold text-gray-900">Forma de pagamento</h2>
                      </div>

                      <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)} className="space-y-3">
                        <label className={cn("flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all", paymentMethod === 'credit' ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300")}>
                          <RadioGroupItem value="credit" />
                          <CreditCard className="h-5 w-5 text-violet-600" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Cartão de Crédito</div>
                            <div className="text-xs text-gray-500">Até 12x (3x sem juros)</div>
                          </div>
                        </label>

                        <label className={cn("flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all", paymentMethod === 'pix' ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300")}>
                          <RadioGroupItem value="pix" />
                          <QrCode className="h-5 w-5 text-emerald-600" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">PIX</div>
                            <div className="text-xs text-gray-500">Aprovação instantânea</div>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">5% OFF</span>
                        </label>

                        <label className={cn("flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all", paymentMethod === 'boleto' ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300")}>
                          <RadioGroupItem value="boleto" />
                          <Receipt className="h-5 w-5 text-gray-600" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Boleto Bancário</div>
                            <div className="text-xs text-gray-500">Vencimento em 3 dias úteis</div>
                          </div>
                        </label>
                      </RadioGroup>

                      {/* Credit Card Form */}
                      {paymentMethod === 'credit' && (
                        <div className="pt-4 border-t border-gray-100 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Número do cartão</label>
                            <Input value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19} className="h-12 rounded-xl border-gray-300" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Nome no cartão</label>
                            <Input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="NOME COMO ESTÁ NO CARTÃO" className="h-12 rounded-xl border-gray-300" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Validade</label>
                              <Input value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/AA" maxLength={5} className="h-12 rounded-xl border-gray-300" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-1.5 block">CVV</label>
                              <Input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))} placeholder="000" maxLength={4} type="password" className="h-12 rounded-xl border-gray-300" />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Parcelas</label>
                            <Select value={installments} onValueChange={setInstallments}>
                              <SelectTrigger className="h-12 rounded-xl border-gray-300"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {[...Array(12)].map((_, i) => (
                                  <SelectItem key={i + 1} value={String(i + 1)}>
                                    {i + 1}x de R$ {(total / (i + 1)).toFixed(2)}{i < 3 ? ' sem juros' : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'pix' && (
                        <div className="pt-4 border-t border-gray-100 text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                            <Zap className="h-4 w-4" />
                            O QR Code será gerado após confirmar
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Coupon */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Cupom de desconto</label>
                      <div className="flex gap-2">
                        <Input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Digite seu cupom" className="h-11 rounded-xl border-gray-300" disabled={couponApplied} />
                        <Button type="button" variant="outline" onClick={applyCoupon} disabled={couponApplied || !coupon} className="rounded-xl">
                          {couponApplied ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : 'Aplicar'}
                        </Button>
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white transition-all hover:scale-[1.01] shadow-lg shadow-violet-600/25 disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processando pagamento...</>
                      ) : (
                        <><Lock className="mr-2 h-5 w-5" />Finalizar Compra — R$ {total.toFixed(2)}</>
                      )}
                    </Button>

                    {/* Security */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> SSL 256-bit</span>
                      <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Compra Segura</span>
                      <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5" /> Dados Protegidos</span>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>

          {/* Right Sidebar - Order Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Resumo do pedido</h3>

              {/* Product */}
              <div className="flex gap-3 pb-4 border-b border-gray-100">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-gray-500 ml-1">({product.sales.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-4 space-y-2.5 text-sm border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">Produto</span>
                  <div className="text-right">
                    <span className="text-xs line-through text-gray-400 mr-2">R$ {product.originalPrice.toFixed(2)}</span>
                    <span className="font-medium text-gray-900">R$ {product.price.toFixed(2)}</span>
                  </div>
                </div>
                {bumpSelected && product.bump && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{product.bump.name}</span>
                    <span className="font-medium text-gray-900">R$ {product.bump.price.toFixed(2)}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Cupom DESCONTO10</span>
                    <span>-10%</span>
                  </div>
                )}
                {paymentMethod === 'pix' && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Desconto PIX</span>
                    <span>-5%</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 flex justify-between items-center">
                <span className="text-gray-900 font-bold text-lg">Total</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-violet-600">R$ {total.toFixed(2)}</div>
                  {paymentMethod === 'credit' && parseInt(installments) > 1 && (
                    <div className="text-xs text-gray-500">ou {installments}x de R$ {(total / parseInt(installments)).toFixed(2)}</div>
                  )}
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-emerald-800 text-sm">Garantia de {product.guarantee} dias</div>
                    <div className="text-xs text-emerald-700">Não gostou? Devolvemos 100% do seu dinheiro</div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-5 space-y-2.5">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12 py-6 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-4 mb-2">
          <a href="#" className="hover:underline">Termos de Uso</a>
          <a href="#" className="hover:underline">Política de Privacidade</a>
        </div>
        <p className="flex items-center justify-center gap-1"><Headphones className="h-3.5 w-3.5" /> Dúvidas? suporte@plataforma.com</p>
      </footer>
    </div>
  );
}
