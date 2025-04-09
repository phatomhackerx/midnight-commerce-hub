
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import MarketplacePage from "@/pages/MarketplacePage";
import ProdutosPage from "@/pages/ProdutosPage";
import MinhasVendasPage from "@/pages/MinhasVendasPage"; 
import CuponsDescontoPage from "@/pages/CuponsDescontoPage";
import FinanceiroPage from "@/pages/FinanceiroPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/minhas-vendas" element={<MinhasVendasPage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/cupons-desconto" element={<CuponsDescontoPage />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
