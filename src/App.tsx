
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import MarketplacePage from "@/pages/MarketplacePage";
import ProdutoDetalhe from "@/pages/ProdutoDetalhe";
import ProdutosPage from "@/pages/ProdutosPage";
import MinhasVendasPage from "@/pages/MinhasVendasPage"; 
import CuponsDescontoPage from "@/pages/CuponsDescontoPage";
import FinanceiroPage from "@/pages/FinanceiroPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import AssinaturasPage from "@/pages/AssinaturasPage";
import AfiliadosPage from "@/pages/AfiliadosPage";
import IntegracoesPage from "@/pages/IntegracoesPage";
import QuizPage from "@/pages/QuizPage";
import PerfilPage from "@/pages/PerfilPage";
import ChatPage from "@/pages/ChatPage";
import ChatPlatformPage from "@/pages/ChatPlatformPage";
import AjudaPage from "@/pages/AjudaPage";
import NotificacoesPage from "@/pages/NotificacoesPage";
import NotFound from "@/pages/NotFound";
import CheckoutBuilderPage from "@/pages/CheckoutBuilderPage";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/produto/:id" element={<ProdutoDetalhe />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/produtos/checkout-builder/:id" element={<CheckoutBuilderPage />} />
              <Route path="/minhas-vendas" element={<MinhasVendasPage />} />
              <Route path="/financeiro" element={<FinanceiroPage />} />
              <Route path="/cupons-desconto" element={<CuponsDescontoPage />} />
              <Route path="/relatorios" element={<RelatoriosPage />} />
              <Route path="/assinaturas" element={<AssinaturasPage />} />
              <Route path="/afiliados" element={<AfiliadosPage />} />
              <Route path="/integracoes" element={<IntegracoesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat-platform" element={<ChatPlatformPage />} />
              <Route path="/ajuda" element={<AjudaPage />} />
              <Route path="/notificacoes" element={<NotificacoesPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
