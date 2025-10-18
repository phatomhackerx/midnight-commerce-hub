import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Filter, Users, Package, Wallet, Check, ArrowRight, BarChart2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { produtosMock, categorias, faixasPreco } from "@/data/marketplaceData";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import FeaturedProducts from "@/components/marketplace/FeaturedProducts";
import ProductList from "@/components/marketplace/ProductList";

export default function MarketplacePage() {
  const [pesquisa, setPesquisa] = useState("");
  const [filtroCategorias, setFiltroCategorias] = useState<string[]>([]);
  const [filtroPreco, setFiltroPreco] = useState<string[]>([]);
  const [filtroAvaliacao, setFiltroAvaliacao] = useState<number[]>([]);
  const [exibindoFiltros, setExibindoFiltros] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [visualizacao, setVisualizacao] = useState<"grid" | "lista">("grid");
  const [ordenacao, setOrdenacao] = useState("recentes");
  
  const adicionarAoCarrinho = (produto: any) => {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
      const novoCarrinho = carrinho.map(item => 
        item.id === produto.id ? {...item, quantidade: item.quantidade + 1} : item
      );
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, {...produto, quantidade: 1}]);
    }
    
    setCarrinhoAberto(true);
  };
  
  const removerDoCarrinho = (produtoId: number) => {
    const novoCarrinho = carrinho.filter(item => item.id !== produtoId);
    setCarrinho(novoCarrinho);
  };
  
  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };
  
  const tornarAfiliado = (produtoId: number) => {
    console.log(`Tornar-se afiliado do produto ${produtoId}`);
  };
  
  const produtosFiltrados = produtosMock.filter(produto => {
    const matchPesquisa = pesquisa === "" || 
      produto.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.vendedor.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(pesquisa.toLowerCase());
    
    const matchCategoria = filtroCategorias.length === 0 || 
      filtroCategorias.includes(produto.categoria);
    
    let matchPreco = true;
    if (filtroPreco.length > 0) {
      matchPreco = filtroPreco.some(faixa => {
        if (faixa === "Até R$ 50") return produto.preco <= 50;
        if (faixa === "R$ 51 - R$ 100") return produto.preco > 50 && produto.preco <= 100;
        if (faixa === "R$ 101 - R$ 200") return produto.preco > 100 && produto.preco <= 200;
        if (faixa === "R$ 201 - R$ 500") return produto.preco > 200 && produto.preco <= 500;
        if (faixa === "R$ 501 - R$ 1000") return produto.preco > 500 && produto.preco <= 1000;
        if (faixa === "Acima de R$ 1000") return produto.preco > 1000;
        return true;
      });
    }

    const matchAvaliacao = filtroAvaliacao.length === 0 ||
      filtroAvaliacao.some(rating => produto.avaliacao >= rating);
    
    return matchPesquisa && matchCategoria && matchPreco && matchAvaliacao;
  });
  
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordenacao === "recentes") {
      return b.id - a.id;
    } else if (ordenacao === "populares") {
      return b.vendas - a.vendas;
    } else if (ordenacao === "avaliacao") {
      return b.avaliacao - a.avaliacao;
    } else if (ordenacao === "preco-asc") {
      return a.preco - b.preco;
    } else if (ordenacao === "preco-desc") {
      return b.preco - a.preco;
    } else if (ordenacao === "comissao") {
      return b.comissao - a.comissao;
    }
    return 0;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen cosmic-bg neural-pattern">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-card border-primary/30 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent" />
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Package className="text-primary animate-glow-pulse" size={24} />
                <span className="text-sm font-medium text-primary">Marketplace Digital</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-cosmic animate-slide-up">
                Descubra Produtos Incríveis
              </h1>
              <p className="text-lg text-muted-foreground mb-6 animate-slide-up">
                Encontre produtos digitais para comprar ou promova como afiliado e ganhe comissões.
              </p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Pesquisar com AI..."
                className="pl-12 pr-4 py-3 h-12 glass-card border-border/50 focus-visible:ring-primary focus-visible:border-primary text-base"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="h-12 gap-2 glass-card border-primary/30 hover:shadow-[var(--shadow-neon)]"
              onClick={() => setExibindoFiltros(!exibindoFiltros)}
            >
              <Filter size={18} />
              Filtros
              {(filtroCategorias.length + filtroPreco.length + filtroAvaliacao.length) > 0 && (
                <span className="inline-flex items-center justify-center bg-primary/20 text-primary text-xs font-semibold rounded-full h-6 px-2.5 ml-1 ring-1 ring-primary/30">
                  {filtroCategorias.length + filtroPreco.length + filtroAvaliacao.length}
                </span>
              )}
            </Button>
            
            <Sheet open={carrinhoAberto} onOpenChange={setCarrinhoAberto}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 gap-2 relative glass-card border-primary/30 hover:shadow-[var(--shadow-neon)]">
                  <ShoppingCart size={18} />
                  Carrinho
                  {carrinho.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-background text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-[var(--shadow-neon)]">
                      {carrinho.reduce((total, item) => total + item.quantidade, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md cosmic-bg">
                <SheetHeader>
                  <SheetTitle className="text-gradient-cosmic">Seu Carrinho</SheetTitle>
                  <SheetDescription>
                    {carrinho.length === 0 ? 
                      "Seu carrinho está vazio." : 
                      `${carrinho.reduce((total, item) => total + item.quantidade, 0)} produtos no carrinho`}
                  </SheetDescription>
                </SheetHeader>
                
                {carrinho.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      {carrinho.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-border/50 glass-card p-3 rounded-lg">
                          <div className="h-20 w-20 overflow-hidden rounded-lg flex-shrink-0 ring-1 ring-primary/30">
                            <img src={item.imagem} alt={item.titulo} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-semibold text-sm line-clamp-2">{item.titulo}</h4>
                            <p className="text-sm text-muted-foreground">Qtd: {item.quantidade}</p>
                            <div className="flex justify-between items-center">
                              <p className="font-bold text-gradient-cosmic">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removerDoCarrinho(item.id)}
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="glass-card p-4 rounded-xl space-y-3 border border-primary/20">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>R$ {calcularTotalCarrinho().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Descontos</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="border-t border-border/50 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-gradient-cosmic">R$ {calcularTotalCarrinho().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full h-12 shadow-[var(--shadow-neon)]">
                      Finalizar Compra
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
          
          {exibindoFiltros && (
            <FilterSidebar
              categorias={categorias}
              faixasPreco={faixasPreco}
              filtroCategorias={filtroCategorias}
              filtroPreco={filtroPreco}
              filtroAvaliacao={filtroAvaliacao}
              setFiltroCategorias={setFiltroCategorias}
              setFiltroPreco={setFiltroPreco}
              setFiltroAvaliacao={setFiltroAvaliacao}
              onClose={() => setExibindoFiltros(false)}
            />
          )}
          
          <div className="flex flex-wrap items-center gap-2 py-2 animate-fade-in delay-200">
            <Button 
              variant="outline" 
              size="sm" 
              className={!filtroCategorias.length ? "bg-primary/10" : ""}
              onClick={() => setFiltroCategorias([])}
            >
              Todos
            </Button>
            {categorias.slice(0, 5).map((categoria) => (
              <Button 
                key={categoria}
                variant="outline"
                size="sm"
                className={filtroCategorias.includes(categoria) ? "bg-primary/10" : ""}
                onClick={() => {
                  if (filtroCategorias.includes(categoria)) {
                    setFiltroCategorias(filtroCategorias.filter(cat => cat !== categoria));
                  } else {
                    setFiltroCategorias([...filtroCategorias, categoria]);
                  }
                }}
              >
                {categoria}
              </Button>
            ))}
            
            <NavigationMenu className="ml-auto">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 text-sm gap-1 px-3">
                    {ordenacao === "recentes" && "Mais Recentes"}
                    {ordenacao === "populares" && "Mais Populares"}
                    {ordenacao === "avaliacao" && "Melhor Avaliados"}
                    {ordenacao === "preco-asc" && "Menor Preço"}
                    {ordenacao === "preco-desc" && "Maior Preço"}
                    {ordenacao === "comissao" && "Maior Comissão"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setOrdenacao("recentes")}
                      >
                        <div className="text-sm font-medium">Mais Recentes</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setOrdenacao("populares")}
                      >
                        <div className="text-sm font-medium">Mais Populares</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setOrdenacao("avaliacao")}
                      >
                        <div className="text-sm font-medium">Melhor Avaliados</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setOrdenacao("preco-asc")}
                      >
                        <div className="text-sm font-medium">Menor Preço</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setOrdenacao("preco-desc")}
                      >
                        <div className="text-sm font-medium">Maior Preço</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setOrdenacao("comissao")}
                      >
                        <div className="text-sm font-medium">Maior Comissão</div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 animate-fade-in delay-250">
            <span>
              Exibindo <span className="font-medium text-foreground">{produtosOrdenados.length}</span> de <span className="font-medium text-foreground">{produtosMock.length}</span> produtos
            </span>
            <div className="flex items-center gap-3">
              <button 
                className={`p-1.5 rounded-md ${visualizacao === "grid" ? "bg-muted" : "hover:bg-muted"}`}
                onClick={() => setVisualizacao("grid")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" className={visualizacao === "grid" ? "fill-foreground" : "fill-muted-foreground"} />
                  <rect x="14" y="3" width="7" height="7" rx="1" className={visualizacao === "grid" ? "fill-foreground" : "fill-muted-foreground"} />
                  <rect x="3" y="14" width="7" height="7" rx="1" className={visualizacao === "grid" ? "fill-foreground" : "fill-muted-foreground"} />
                  <rect x="14" y="14" width="7" height="7" rx="1" className={visualizacao === "grid" ? "fill-foreground" : "fill-muted-foreground"} />
                </svg>
              </button>
              <button 
                className={`p-1.5 rounded-md ${visualizacao === "lista" ? "bg-muted" : "hover:bg-muted"}`}
                onClick={() => setVisualizacao("lista")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="4" rx="1" className={visualizacao === "lista" ? "fill-foreground" : "fill-muted-foreground"} />
                  <rect x="3" y="10" width="18" height="4" rx="1" className={visualizacao === "lista" ? "fill-foreground" : "fill-muted-foreground"} />
                  <rect x="3" y="16" width="18" height="4" rx="1" className={visualizacao === "lista" ? "fill-foreground" : "fill-muted-foreground"} />
                </svg>
              </button>
            </div>
          </div>
          
          <ProductList 
            produtos={produtosOrdenados}
            visualizacao={visualizacao}
            onAddToCart={adicionarAoCarrinho}
            onAffiliate={tornarAfiliado}
          />
          
          <div className="mt-12 space-y-8 animate-fade-in delay-400">
            <h2 className="text-xl font-bold">Rankings e Destaques</h2>
            <FeaturedProducts produtos={produtosMock} />
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 md:p-8 animate-fade-in delay-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">Torne-se um Afiliado</h2>
                <p className="text-muted-foreground">
                  Comece a promover produtos e ganhe comissões por cada venda realizada através do seu link de afiliado.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Comissões de até 50% em cada venda</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Saques a partir de R$ 50,00</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Links de afiliado e materiais promocionais</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Dashboard completo para acompanhar desempenho</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <Link to="/afiliados">
                      <Users size={18} className="mr-2" />
                      Cadastrar-se como Afiliado
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-card border rounded-xl p-6 space-y-6">
                <h3 className="font-semibold">Dashboard do Afiliado</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Saldo Disponível</div>
                    <div className="text-xl font-bold mt-1">R$ 0,00</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Comissões Pendentes</div>
                    <div className="text-xl font-bold mt-1">R$ 0,00</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Cliques</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Vendas</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Taxa de Conversão</span>
                    <span className="font-medium">0%</span>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between gap-4">
                  <Button variant="outline" className="flex-1">
                    <BarChart2 size={16} className="mr-2" />
                    Relatórios
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Wallet size={16} className="mr-2" />
                    Sacar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 mb-8 border rounded-xl overflow-hidden animate-fade-in delay-600">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">Venda seus Produtos Digitais</h2>
                <p className="text-muted-foreground">
                  Coloque seus produtos no marketplace e alcance milhares de compradores e afiliados.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Receba pagamentos de forma automática</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Rede de afiliados pronta para promover seus produtos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Checkout transparente e seguro</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5" />
                    <span>Relatórios completos de vendas e desempenho</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <Link to="/produtos/novo">
                      <Package size={18} className="mr-2" />
                      Cadastrar Novo Produto
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted">
                <img 
                  src="https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Venda+seus+Produtos"
                  alt="Venda seus produtos digitais"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
