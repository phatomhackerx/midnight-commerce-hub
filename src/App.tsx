
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Loader2 } from "lucide-react";

// Auth pages
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const Index = lazy(() => import("@/pages/Index"));
const MarketplacePage = lazy(() => import("@/pages/MarketplacePage"));
const ProdutoDetalhe = lazy(() => import("@/pages/ProdutoDetalhe"));
const MeusProdutosPage = lazy(() => import("@/pages/MeusProdutosPage"));
const MinhasVendasPage = lazy(() => import("@/pages/MinhasVendasPage"));
const LinksPagamentoPage = lazy(() => import("@/pages/LinksPagamentoPage"));
const ConfiguracoesProdutoPage = lazy(() => import("@/pages/ConfiguracoesProdutoPage"));
const CuponsDescontoPage = lazy(() => import("@/pages/CuponsDescontoPage"));
const FinanceiroPage = lazy(() => import("@/pages/FinanceiroPage"));
const RelatoriosPage = lazy(() => import("@/pages/RelatoriosPage"));
const AssinaturasPage = lazy(() => import("@/pages/AssinaturasPage"));
const AfiliadosPage = lazy(() => import("@/pages/AfiliadosPage"));
const IntegracoesPage = lazy(() => import("@/pages/IntegracoesPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const PerfilPage = lazy(() => import("@/pages/PerfilPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ChatPlatformPage = lazy(() => import("@/pages/ChatPlatformPage"));
const AjudaPage = lazy(() => import("@/pages/AjudaPage"));
const NotificacoesPage = lazy(() => import("@/pages/NotificacoesPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const CheckoutBuilderPage = lazy(() => import("@/pages/CheckoutBuilderPage"));
const ProductCheckoutBuilderPage = lazy(() => import("@/pages/ProductCheckoutBuilderPage"));
const PublicCheckoutPage = lazy(() => import("@/pages/PublicCheckoutPage"));
const MembersAreaPage = lazy(() => import("@/pages/MembersAreaPage"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetailPage"));
const LessonPlayerPage = lazy(() => import("@/pages/LessonPlayerPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

// Standalone checkout (isolated from dashboard)
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("@/pages/CheckoutSuccessPage"));
const CheckoutUpsellPage = lazy(() => import("@/pages/CheckoutUpsellPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public / Standalone pages */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Auth */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Standalone Checkout (isolated from dashboard) */}
              <Route path="/checkout/:productId" element={<CheckoutPage />} />
              <Route path="/checkout/:productId/success" element={<CheckoutSuccessPage />} />
              <Route path="/checkout/:productId/upsell" element={<CheckoutUpsellPage />} />
              
              {/* Legacy public checkout */}
              <Route path="/c/:slug" element={<PublicCheckoutPage />} />
              
              {/* Lesson Player (fullscreen, no sidebar) */}
              <Route path="/area-membros/:courseId/aula/:lessonId" element={<LessonPlayerPage />} />

              {/* Dashboard routes (with sidebar) */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Index />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/marketplace/produto/:id" element={<ProdutoDetalhe />} />
                <Route path="/produtos" element={<MeusProdutosPage />} />
                <Route path="/produtos/config/:id" element={<ConfiguracoesProdutoPage />} />
                <Route path="/produtos/checkout-builder/:id" element={<ProductCheckoutBuilderPage />} />
                <Route path="/minhas-vendas" element={<MinhasVendasPage />} />
                <Route path="/area-membros" element={<MembersAreaPage />} />
                <Route path="/area-membros/:courseId" element={<CourseDetailPage />} />
                <Route path="/links-pagamento" element={<LinksPagamentoPage />} />
                <Route path="/financeiro" element={<FinanceiroPage />} />
                <Route path="/cupons-desconto" element={<CuponsDescontoPage />} />
                <Route path="/relatorios" element={<RelatoriosPage />} />
                <Route path="/assinaturas" element={<AssinaturasPage />} />
                <Route path="/afiliados" element={<AfiliadosPage />} />
                <Route path="/integracoes" element={<IntegracoesPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/configuracoes" element={<SettingsPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/chat-platform" element={<ChatPlatformPage />} />
                <Route path="/ajuda" element={<AjudaPage />} />
                <Route path="/notificacoes" element={<NotificacoesPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
