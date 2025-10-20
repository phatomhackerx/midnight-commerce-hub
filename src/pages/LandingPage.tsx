import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, Users, BarChart3, CreditCard } from "lucide-react";
import StarsBackground from "@/components/StarsBackground";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarsBackground />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Midnight</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="gap-2">
                Começar Agora
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-sm border border-border/30 mb-8">
            <Sparkles size={16} className="text-foreground" />
            <span className="text-sm">Plataforma de Vendas Digitais</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Venda seus produtos
            <br />
            <span className="text-muted-foreground">de forma simples</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            A plataforma completa para criar, gerenciar e vender seus produtos digitais com checkout otimizado e análises em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 h-12 px-8">
                Começar Gratuitamente
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8">
              Ver Demonstração
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1">10k+</div>
              <div className="text-sm text-muted-foreground">Vendedores</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">R$ 50M+</div>
              <div className="text-sm text-muted-foreground">Processado</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-20 px-6 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tudo que você precisa</h2>
            <p className="text-muted-foreground text-lg">Recursos poderosos para impulsionar suas vendas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="premium-card p-8 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/60 backdrop-blur-sm flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Checkout Otimizado</h3>
              <p className="text-muted-foreground">Checkout personalizável com alta taxa de conversão e múltiplos meios de pagamento.</p>
            </div>

            <div className="premium-card p-8 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/60 backdrop-blur-sm flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Avançado</h3>
              <p className="text-muted-foreground">Acompanhe suas vendas em tempo real com relatórios detalhados e insights.</p>
            </div>

            <div className="premium-card p-8 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/60 backdrop-blur-sm flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sistema de Afiliados</h3>
              <p className="text-muted-foreground">Gerencie afiliados e comissões automaticamente para escalar suas vendas.</p>
            </div>

            <div className="premium-card p-8 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/60 backdrop-blur-sm flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
              <p className="text-muted-foreground">Proteção anti-fraude e certificação PCI compliance para seus pagamentos.</p>
            </div>

            <div className="premium-card p-8 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/60 backdrop-blur-sm flex items-center justify-center mb-4">
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Múltiplos Pagamentos</h3>
              <p className="text-muted-foreground">Aceite cartões, PIX, boleto e mais com integração automática.</p>
            </div>

            <div className="premium-card p-8 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/60 backdrop-blur-sm flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upsells & Bumps</h3>
              <p className="text-muted-foreground">Aumente seu ticket médio com ofertas estratégicas no checkout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="premium-card p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Junte-se a milhares de vendedores que já confiam na nossa plataforma.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 h-12 px-8">
                Criar Conta Gratuita
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/30 py-12 px-6 z-10 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg mb-4">Midnight</div>
              <p className="text-sm text-muted-foreground">Plataforma completa para vendas digitais.</p>
            </div>
            <div>
              <div className="font-semibold mb-4">Produto</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrações</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Empresa</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Suporte</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2024 Midnight. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
