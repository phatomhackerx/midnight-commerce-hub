import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Zap, Clock, Star, CheckCircle, X, ArrowRight, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CheckoutUpsellPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsProcessing(false);
    toast.success('Upsell adicionado ao seu pedido!');
    navigate('/area-membros');
  };

  const handleDecline = () => {
    navigate('/area-membros');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold">
            <Zap className="h-4 w-4" />
            OFERTA EXCLUSIVA — SÓ AGORA
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Espere! Não vá embora...
          </h1>
          <p className="text-gray-600 text-lg">
            Aproveite esta oferta especial disponível apenas para novos compradores
          </p>
        </div>

        {/* Upsell Card */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-3 font-bold">
            🔥 OFERTA RELÂMPAGO — 70% OFF
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Mentoria VIP Premium</h2>
              <p className="text-gray-600 mt-2">
                3 meses de acompanhamento individual com um mentor especialista
              </p>
            </div>

            <div className="space-y-3">
              {[
                '12 sessões individuais de 1h (semanais)',
                'Acesso ao grupo exclusivo de mentoria',
                'Revisão completa do seu negócio',
                'Plano de ação personalizado',
                'Suporte direto via WhatsApp',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="text-center py-4 border-y border-gray-100">
              <div className="text-sm text-gray-500 line-through">De R$ 1.997,00</div>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="text-sm text-gray-600">Por apenas</span>
                <span className="text-4xl font-bold text-amber-600">R$ 597</span>
                <span className="text-sm text-gray-600">,00</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">ou 12x de R$ 57,12</div>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-sm text-red-600 font-medium">
              <Clock className="h-4 w-4 animate-pulse" />
              Esta oferta expira quando você fechar esta página
            </div>

            {/* CTA */}
            <Button
              onClick={handleAccept}
              disabled={isProcessing}
              className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/25"
            >
              {isProcessing ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Adicionando...</>
              ) : (
                <>SIM! Quero a Mentoria VIP<ArrowRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="h-4 w-4" />
              Garantia de 7 dias. Cancele quando quiser.
            </div>
          </div>
        </div>

        {/* Decline */}
        <button
          onClick={handleDecline}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
        >
          Não, obrigado. Quero perder esta oferta exclusiva.
        </button>
      </div>
    </div>
  );
}
