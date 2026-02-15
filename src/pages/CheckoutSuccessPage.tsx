import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// confetti effect is self-contained
import { useEffect } from 'react';

// Simple confetti effect
function triggerConfetti() {
  // Create confetti elements
  const colors = ['#7c3aed', '#a855f7', '#22c55e', '#f59e0b', '#3b82f6'];
  for (let i = 0; i < 50; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed; top: -10px; left: ${Math.random() * 100}vw;
      width: ${Math.random() * 8 + 4}px; height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      z-index: 9999; pointer-events: none;
      animation: confetti-fall ${Math.random() * 2 + 2}s ease-out forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

export default function CheckoutSuccessPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    triggerConfetti();
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Success Icon */}
        <div className="relative inline-flex">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400" />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Compra Confirmada! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Seu pedido foi processado com sucesso
          </p>
        </div>

        {/* Order Info Card */}
        <Card className="text-left border-gray-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Pedido</span>
              <span className="font-mono font-semibold text-gray-900">#PED-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle className="h-3.5 w-3.5" />
                Aprovado
              </span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Mail className="h-5 w-5 text-violet-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Verifique seu e-mail</p>
                <p className="text-xs text-gray-500">Enviamos os detalhes e acesso ao produto</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate(`/checkout/${productId}/upsell`)}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-violet-600/25"
          >
            Ver oferta exclusiva
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/area-membros')}
            className="w-full h-12 rounded-xl font-medium"
          >
            <Download className="mr-2 h-5 w-5" />
            Acessar conteúdo
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-4">
          <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Compra Protegida</span>
          <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> E-mail Enviado</span>
        </div>
      </div>
    </div>
  );
}
