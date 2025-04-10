import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Tag, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Users, 
  Package, 
  Wallet,
  BarChart2,
  ChevronDown,
  Heart,
  Share2,
  ArrowRight,
  Percent,
  Bookmark,
  Check
} from "lucide-react";

// Mock de dados para produtos
const produtosMock = [
  {
    id: 1,
    titulo: "Curso Completo de Marketing Digital",
    vendedor: "Marketing Experts",
    preco: 197.00,
    comissao: 30,
    categoria: "Marketing",
    avaliacao: 4.8,
    vendas: 1245,
    imagem: "https://placehold.co/300x200/3b82f6/FFFFFF/png?text=Marketing+Digital",
    destaque: true,
    tags: ["bestseller", "hot"]
  },
  {
    id: 2,
    titulo: "Ebook: Copywriting para Iniciantes",
    vendedor: "Escrita Persuasiva",
    preco: 47.00,
    comissao: 50,
    categoria: "Copywriting",
    avaliacao: 4.5,
    vendas: 873,
    imagem: "https://placehold.co/300x200/6366f1/FFFFFF/png?text=Copywriting",
    destaque: false,
    tags: ["ebook"]
  },
  {
    id: 3,
    titulo: "Mentoria em Tráfego Pago",
    vendedor: "Ads Masters",
    preco: 997.00,
    comissao: 20,
    categoria: "Tráfego",
    avaliacao: 4.9,
    vendas: 312,
    imagem: "https://placehold.co/300x200/8b5cf6/FFFFFF/png?text=Tráfego+Pago",
    destaque: true,
    tags: ["mentoria", "premium"]
  },
  {
    id: 4,
    titulo: "Pacote de Templates para Instagram",
    vendedor: "Design Social",
    preco: 67.00,
    comissao: 40,
    categoria: "Design",
    avaliacao: 4.3,
    vendas: 1590,
    imagem: "https://placehold.co/300x200/ec4899/FFFFFF/png?text=Templates",
    destaque: false,
    tags: ["templates"]
  },
  {
    id: 5,
    titulo: "Curso de Vendas por WhatsApp",
    vendedor: "Vendas Digitais",
    preco: 127.00,
    comissao: 35,
    categoria: "Vendas",
    avaliacao: 4.6,
    vendas: 867,
    imagem: "https://placehold.co/300x200/10b981/FFFFFF/png?text=WhatsApp",
    destaque: false,
    tags: ["curso"]
  },
  {
    id: 6,
    titulo: "Consultoria em Lançamentos Digitais",
    vendedor: "Launch Pro",
    preco: 1997.00,
    comissao: 15,
    categoria: "Lançamentos",
    avaliacao: 5.0,
    vendas: 124,
    imagem: "https://placehold.co/300x200/f59e0b/FFFFFF/png?text=Lançamentos",
    destaque: true,
    tags: ["consultoria", "premium"]
  }
];

// Categorias de produtos
const categorias = [
  "Marketing",
  "Copywriting",
  "Tráfego",
  "Design",
  "Vendas",
  "Lançamentos",
  "Mentorias",
  "E-books",
  "Cursos",
  "Ferramentas"
];

// Faixas de preço
const faixasPreco = [
  "Até R$ 50",
  "R$ 51 - R$ 100",
  "R$ 101 - R$ 200",
  "R$ 201 - R$ 500",
  "R$ 501 - R$ 1000",
  "Acima de R$ 1000"
];

export default function MarketplacePage() {
  const [pesquisa, setPesquisa] = useState("");
  const [filtroCategorias, setFiltroCategorias] = useState<string[]>([]);
  const [filtroPreco, setFiltroPreco] = useState<string[]>([]);
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [exibindoFiltros, setExibindoFiltros] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [visualizacao, setVisualizacao] = useState<"grid" | "lista">("grid");
  
  // Função para adicionar produto ao carrinho
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
  
  // Função para remover produto do carrinho
  const removerDoCarrinho = (produtoId: number) => {
    const novoCarrinho = carrinho.filter(item => item.id !== produtoId);
    setCarrinho(novoCarrinho);
  };
  
  // Função para calcular total do carrinho
  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };
  
  // Função para tornar-se afiliado de um produto
  const tornarAfiliado = (produtoId: number) => {
    // Implementação futura - API para cadastro de afiliado
    console.log(`Tornar-se afiliado do produto ${produtoId}`);
    // Aqui seria integrado com a API para registrar o usuário como afiliado
  };
  
  // Filtragem de produtos
  const produtosFiltrados = produtosMock.filter(produto => {
    // Filtro por pesquisa
    const matchPesquisa = pesquisa === "" || 
      produto.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.vendedor.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(pesquisa.toLowerCase());
    
    // Filtro por categorias
    const matchCategoria = filtroCategorias.length === 0 || 
      filtroCategorias.includes(produto.categoria);
    
    // Filtro por preço (simplificado)
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
    
    return matchPesquisa && matchCategoria && matchPreco;
  });
  
  // Ordenação de produtos
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordenacao === "recentes") {
      return b.id - a.id; // Mock de ordenação por recentes usando ID
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
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Cabeçalho da página */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold animate-fade-in">Marketplace</h1>
            <p className="text-muted-foreground animate-fade-in delay-100">
              Encontre produtos digitais para comprar ou promover como afiliado.
            </p>
          </div>
          
          {/* Barra de pesquisa e filtros */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 animate-fade-in delay-150">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Pesquisar produtos, vendedores ou categorias..."
                className="pl-10 pr-4 py-2 h-11"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="h-11 gap-2"
              onClick={() => setExibindoFiltros(!exibindoFiltros)}
            >
              <Filter size={16} />
              Filtros
              <span className="inline-flex items-center justify-center bg-primary/10 text-primary text-xs font-medium rounded-full h-5 px-2 ml-1">
                {filtroCategorias.length + filtroPreco.length}
              </span>
            </Button>
            
            <Sheet open={carrinhoAberto} onOpenChange={setCarrinhoAberto}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 gap-2 relative">
                  <ShoppingCart size={16} />
                  Carrinho
                  {carrinho.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {carrinho.reduce((total, item) => total + item.quantidade, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Seu Carrinho</SheetTitle>
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
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <div className="h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                            <img src={item.imagem} alt={item.titulo} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm line-clamp-2">{item.titulo}</h4>
                            <p className="text-sm text-muted-foreground">Qtd: {item.quantidade}</p>
                            <div className="flex justify-between items-center">
                              <p className="font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-destructive hover:text-destructive"
                                onClick={() => removerDoCarrinho(item.id)}
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>R$ {calcularTotalCarrinho().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Descontos</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {calcularTotalCarrinho().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full h-11">
                      Finalizar Compra
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Painel de filtros expansível */}
          {exibindoFiltros && (
            <div className="bg-card border rounded-lg p-4 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Filtro por categoria */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Tag size={14} /> Categorias
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categorias.slice(0, 6).map((categoria) => (
                      <div key={categoria} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`cat-${categoria}`}
                          className="form-checkbox h-4 w-4 text-primary rounded"
                          checked={filtroCategorias.includes(categoria)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFiltroCategorias([...filtroCategorias, categoria]);
                            } else {
                              setFiltroCategorias(filtroCategorias.filter(cat => cat !== categoria));
                            }
                          }}
                        />
                        <label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer">
                          {categoria}
                        </label>
                      </div>
                    ))}
                  </div>
                  {categorias.length > 6 && (
                    <Button variant="link" size="sm" className="px-0 h-auto">
                      Ver mais categorias
                    </Button>
                  )}
                </div>
                
                {/* Filtro por preço */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <DollarSign size={14} /> Faixa de Preço
                  </h3>
                  <div className="space-y-2">
                    {faixasPreco.map((faixa) => (
                      <div key={faixa} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`preco-${faixa}`}
                          className="form-checkbox h-4 w-4 text-primary rounded"
                          checked={filtroPreco.includes(faixa)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFiltroPreco([...filtroPreco, faixa]);
                            } else {
                              setFiltroPreco(filtroPreco.filter(p => p !== faixa));
                            }
                          }}
                        />
                        <label htmlFor={`preco-${faixa}`} className="text-sm cursor-pointer">
                          {faixa}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Filtro por avaliação/outros */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Star size={14} /> Avaliação
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          className="form-checkbox h-4 w-4 text-primary rounded"
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center cursor-pointer">
                          <span className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                              />
                            ))}
                          </span>
                          <span className="ml-1">{rating === 5 ? "e acima" : `e acima`}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-2 border-t">
                <Button variant="ghost" size="sm" onClick={() => {
                  setFiltroCategorias([]);
                  setFiltroPreco([]);
                }}>
                  Limpar Filtros
                </Button>
                <Button size="sm" onClick={() => setExibindoFiltros(false)}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          )}
          
          {/* Navegação por tabs/categorias populares */}
          <div className="flex flex-wrap items-center gap-2 py-2 animate-fade-in delay-200">
            <Button variant="outline" size="sm" className={!filtroCategorias.length ? "bg-primary/10" : ""}>
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
          
          {/* Resultados e resumo de filtros */}
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
          
          {/* Listagem de produtos em Grid/Lista */}
          {visualizacao === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in delay-300">
              {produtosOrdenados.map((produto) => (
                <div 
                  key={produto.id} 
                  className="group bg-card border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative">
                    <img 
                      src={produto.imagem} 
                      alt={produto.titulo}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {produto.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                tag === "bestseller" ? "bg-yellow-500 text-black" :
                                tag === "hot" ? "bg-red-500 text-white" :
                                tag === "ebook" ? "bg-blue-500 text-white" :
                                tag === "mentoria" ? "bg-purple-500 text-white" :
                                tag === "curso" ? "bg-green-500 text-white" :
                                tag === "consultoria" ? "bg-orange-500 text-white" :
                                tag === "premium" ? "bg-indigo-500 text-white" :
                                "bg-gray-500 text-white"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          <button className="h-7 w-7 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors">
                            <Heart size={14} />
                          </button>
                          <button className="h-7 w-7 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors">
                            <Share2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 space-y-4">
                    <div>
                      <Link to={`/marketplace/produto/${produto.id}`} className="block">
                        <h3 className="font-semibold hover:text-primary hover:underline line-clamp-2">{produto.titulo}</h3>
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">por {produto.vendedor}</div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm">
                      <span className="flex items-center gap-0.5">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{produto.avaliacao.toFixed(1)}</span>
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{produto.vendas} vendas</span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold">R$ {produto.preco.toFixed(2)}</div>
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <Percent size={14} className="mr-1" />
                            {produto.comissao}% de comissão
                          </div>
                        </div>
                        
                        <button 
                          className="rounded-full h-8 w-8 bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => adicionarAoCarrinho(produto)}
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <Button size="sm" onClick={() => adicionarAoCarrinho(produto)}>
                          Comprar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => tornarAfiliado(produto.id)}>
                          <Bookmark size={14} className="mr-1" />
                          Afiliar-se
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in delay-300">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Vendas</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Comissão</TableHead>
                    <TableHead className="w-[120px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtosOrdenados.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={produto.imagem} 
                            alt={produto.titulo}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium line-clamp-1">{produto.titulo}</div>
                            <div className="text-xs text-muted-foreground">{produto.vendedor}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{produto.categoria}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span>{produto.avaliacao.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{produto.vendas}</TableCell>
                      <TableCell className="font-medium">R$ {produto.preco.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{produto.comissao}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => adicionarAoCarrinho(produto)}>
                            <ShoppingCart size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => tornarAfiliado(produto.id)}>
                            <Bookmark size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <Link to={`/marketplace/produto/${produto.id}`}>
                              <ArrowRight size={14} />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Seção de estatísticas/rankings em cards */}
          <div className="mt-12 space-y-8 animate-fade-in delay-400">
            <h2 className="text-xl font-bold">Rankings e Destaques</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Produtos mais vendidos */}
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="bg-yellow-500/10 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp size={18} className="text-yellow-500" />
                    <span>Mais Vendidos</span>
                  </h3>
                </div>
                <div className="divide-y">
                  {produtosMock
                    .sort((a, b) => b.vendas - a.vendas)
                    .slice(0, 5)
                    .map((produto, idx) => (
                      <div key={produto.id} className="p-3 flex items-center gap-3 hover:bg-muted/50">
                        <div className="bg-muted font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm line-clamp-1">{produto.titulo}</div>
                          <div className="text-xs text-muted-foreground">{produto.vendas} vendas</div>
                        </div>
                        <div className="text-sm font-semibold">
                          R$ {produto.preco.toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Melhor avaliados */}
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="bg-blue-500/10 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Star size={18} className="text-blue-500" />
                    <span>Melhor Avaliados</span>
                  </h3>
                </div>
                <div className="divide-y">
                  {produtosMock
                    .sort((a, b) => b.avaliacao - a.avaliacao)
                    .slice(0, 5)
                    .map((produto, idx) => (
                      <div key={produto.id} className="p-3 flex items-center gap-3 hover:bg-muted/50">
                        <div className="bg-muted font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm line-clamp-1">{produto.titulo}</div>
                          <div className="text-xs flex items-center">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={10}
                                  className={i < Math.floor(produto.avaliacao) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                                />
                              ))}
                            </div>
                            <span className="ml-1 text-muted-foreground">{produto.avaliacao.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          R$ {produto.preco.toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Maior comissão */}
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="bg-green-500/10 p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Percent size={18} className="text-green-500" />
                    <span>Maior Comissão</span>
                  </h3>
                </div>
                <div className="divide-y">
                  {produtosMock
                    .sort((a, b) => b.comissao - a.comissao)
                    .slice(0, 5)
                    .map((produto, idx) => (
                      <div key={produto.id} className="p-3 flex items-center gap-3 hover:bg-muted/50">
                        <div className="bg-muted font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm line-clamp-1">{produto.titulo}</div>
                          <div className="text-xs text-muted-foreground">R$ {produto.preco.toFixed(2)}</div>
                        </div>
                        <div className="text-sm font-semibold text-green-600">
                          {produto.comissao}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Seção de informações para afiliados */}
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
          
          {/* Seção para vendedores */}
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
