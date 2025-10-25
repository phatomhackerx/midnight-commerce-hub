
import { useState } from "react";
import Header from "@/components/Header";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter, 
  Upload, 
  Pencil, 
  Eye, 
  MoreVertical,
  Globe, 
  Lock,
  Calendar,
  Package,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NovoProdutoForm from "@/components/produtos/NovoProdutoForm";
import ProdutoGrid from "@/components/produtos/ProdutoGrid";

// Tipos de produtos
export type TipoProduto = "digital" | "fisico" | "assinatura";

// Interface para produto
export interface Produto {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  tipo: TipoProduto;
  categoria: string;
  imagem: string;
  disponivel: boolean;
  destaque: boolean;
  publicado: boolean;
  mercado: boolean;
  comissao: number;
  vendas: number;
  avaliacao: number;
  dataCriacao: string;
  tags: string[];
}

// Dados mock para exemplo
const produtosMock: Produto[] = [
  {
    id: "1",
    titulo: "Curso de Marketing Digital",
    descricao: "Aprenda as melhores estratégias de marketing digital",
    preco: 297,
    tipo: "digital",
    categoria: "Cursos",
    imagem: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    disponivel: true,
    destaque: true,
    publicado: true,
    mercado: true,
    comissao: 30,
    vendas: 97,
    avaliacao: 4.8,
    dataCriacao: "2023-10-15",
    tags: ["bestseller", "curso"]
  },
  {
    id: "2",
    titulo: "Ebook: Investimentos Inteligentes",
    descricao: "Guia completo para iniciantes em investimentos",
    preco: 47,
    tipo: "digital",
    categoria: "Ebooks",
    imagem: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop",
    disponivel: true,
    destaque: false,
    publicado: true,
    mercado: false,
    comissao: 40,
    vendas: 56,
    avaliacao: 4.6,
    dataCriacao: "2023-11-20",
    tags: ["ebook"]
  },
  {
    id: "3",
    titulo: "Mentoria em Produtividade",
    descricao: "Sessões de mentoria para aumentar sua produtividade",
    preco: 897,
    tipo: "assinatura",
    categoria: "Mentorias",
    imagem: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    disponivel: true,
    destaque: false,
    publicado: true,
    mercado: true,
    comissao: 15,
    vendas: 23,
    avaliacao: 4.9,
    dataCriacao: "2023-12-05",
    tags: ["mentoria", "premium"]
  },
  {
    id: "4",
    titulo: "Kit de Planilhas Financeiras",
    descricao: "Conjunto de planilhas para controle financeiro pessoal",
    preco: 127,
    tipo: "digital",
    categoria: "Ferramentas",
    imagem: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    disponivel: true,
    destaque: true,
    publicado: false,
    mercado: false,
    comissao: 50,
    vendas: 124,
    avaliacao: 4.7,
    dataCriacao: "2024-01-10",
    tags: ["bestseller", "ferramenta"]
  }
];

export default function ProdutosPage() {
  const [loaded, setLoaded] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock);
  const [tipoFiltro, setTipoFiltro] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [novoProdutoModalAberto, setNovoProdutoModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const { toast } = useToast();
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);

  // Produtos filtrados conforme a busca e tipo
  const produtosFiltrados = produtos.filter(produto => {
    const matchesTipo = tipoFiltro === "todos" || produto.tipo === tipoFiltro;
    const matchesSearch = produto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           produto.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTipo && matchesSearch;
  });

  // Status dos produtos
  const totalProdutos = produtos.length;
  const totalDigitais = produtos.filter(p => p.tipo === "digital").length;
  const totalFisicos = produtos.filter(p => p.tipo === "fisico").length;
  const totalAssinaturas = produtos.filter(p => p.tipo === "assinatura").length;
  const totalPublicados = produtos.filter(p => p.publicado).length;
  const totalNoMercado = produtos.filter(p => p.mercado).length;

  // Handler para criar ou editar produto
  const handleSalvarProduto = (produto: Produto) => {
    if (produtoEditando) {
      // Editar produto existente
      setProdutos(prevProdutos => 
        prevProdutos.map(p => p.id === produto.id ? produto : p)
      );
      setProdutoEditando(null);
      toast({
        title: "Produto atualizado",
        description: `${produto.titulo} foi atualizado com sucesso.`,
      });
    } else {
      // Criar novo produto
      const novoProduto = {
        ...produto,
        id: Date.now().toString(),
        vendas: 0,
        avaliacao: 0,
        dataCriacao: new Date().toISOString().split('T')[0]
      };
      setProdutos(prevProdutos => [...prevProdutos, novoProduto]);
      toast({
        title: "Produto criado",
        description: `${produto.titulo} foi criado com sucesso.`,
      });
    }
    setNovoProdutoModalAberto(false);
  };

  // Função para editar produto
  const handleEditarProduto = (produto: Produto) => {
    setProdutoEditando(produto);
    setNovoProdutoModalAberto(true);
  };

  // Função para alternar status de publicação
  const togglePublicado = (id: string) => {
    setProdutos(prevProdutos => 
      prevProdutos.map(p => p.id === id ? {...p, publicado: !p.publicado} : p)
    );
    const produto = produtos.find(p => p.id === id);
    toast({
      title: produto?.publicado ? "Produto despublicado" : "Produto publicado",
      description: `${produto?.titulo} foi ${produto?.publicado ? "despublicado" : "publicado"} com sucesso.`,
    });
  };

  // Função para alternar status no mercado
  const toggleMercado = (id: string) => {
    setProdutos(prevProdutos => 
      prevProdutos.map(p => p.id === id ? {...p, mercado: !p.mercado} : p)
    );
    const produto = produtos.find(p => p.id === id);
    toast({
      title: produto?.mercado ? "Removido do Marketplace" : "Adicionado ao Marketplace",
      description: `${produto?.titulo} foi ${produto?.mercado ? "removido do" : "adicionado ao"} Marketplace.`,
    });
  };
  
  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Produtos</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Gerencie todos os seus produtos digitais e físicos</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  <Upload className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Importar</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1 flex-1 sm:flex-none"
                  onClick={() => {
                    setProdutoEditando(null);
                    setNovoProdutoModalAberto(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Novo Produto
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn("flex flex-col gap-6", loaded && "animate-fade-in")}>
            {/* Resumo dos produtos em cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="premium-card">
                <CardHeader className="pb-2">
                  <CardDescription>Total de Produtos</CardDescription>
                  <CardTitle className="text-2xl">{totalProdutos}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {totalDigitais} digitais, {totalFisicos} físicos, {totalAssinaturas} assinaturas
                  </p>
                </CardContent>
              </Card>
              
              <Card className="premium-card">
                <CardHeader className="pb-2">
                  <CardDescription>Status Atual</CardDescription>
                  <CardTitle className="text-xl sm:text-2xl">{totalPublicados} publicados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {totalNoMercado} no Marketplace
                    </p>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe size={14} />
                      {totalNoMercado}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="premium-card">
                <CardHeader className="pb-2">
                  <CardDescription>Produto Mais Vendido</CardDescription>
                  <CardTitle className="text-xl sm:text-2xl truncate">
                    {produtos.sort((a, b) => b.vendas - a.vendas)[0]?.titulo || "Nenhum"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {produtos.sort((a, b) => b.vendas - a.vendas)[0]?.vendas || 0} vendas
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Lista de produtos */}
            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle>Meus Produtos</CardTitle>
                <CardDescription>Gerencie seus produtos</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="todos" className="w-full" onValueChange={setTipoFiltro}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="digital">Digitais</TabsTrigger>
                    <TabsTrigger value="fisico">Físicos</TabsTrigger>
                    <TabsTrigger value="assinatura">Assinaturas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={tipoFiltro}>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Pesquisar produtos..."
                          className="pl-9 bg-background"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {produtosFiltrados.length > 0 ? (
                      <ProdutoGrid 
                        produtos={produtosFiltrados}
                        onEditar={handleEditarProduto}
                        onTogglePublicado={togglePublicado}
                        onToggleMercado={toggleMercado}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[200px] border border-dashed border-muted rounded-xl p-6 text-center">
                        <p className="text-muted-foreground mb-4">
                          {searchTerm ? 'Nenhum produto encontrado com esses critérios' : 'Você ainda não tem produtos cadastrados'}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setProdutoEditando(null);
                            setNovoProdutoModalAberto(true);
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Produto
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modal de Criação/Edição de Produto */}
      <Dialog 
        open={novoProdutoModalAberto} 
        onOpenChange={setNovoProdutoModalAberto}
      >
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{produtoEditando ? 'Editar Produto' : 'Criar Novo Produto'}</DialogTitle>
            <DialogDescription>
              {produtoEditando 
                ? 'Faça as alterações necessárias no produto existente.' 
                : 'Preencha os detalhes para criar um novo produto.'}
            </DialogDescription>
          </DialogHeader>

          <NovoProdutoForm 
            produtoAtual={produtoEditando}
            onSalvar={handleSalvarProduto}
            onCancelar={() => setNovoProdutoModalAberto(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
