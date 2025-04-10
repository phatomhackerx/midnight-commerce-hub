
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  File, 
  MessageSquare, 
  Users, 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Download, 
  Clock, 
  Video, 
  Bookmark, 
  Award, 
  Percent 
} from "lucide-react";
import { produtosMock } from "@/data/marketplaceData";
import ProductCard from "@/components/marketplace/ProductCard";

export default function ProdutoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [quantidade, setQuantidade] = useState(1);
  const [favoritado, setFavoritado] = useState(false);
  
  // Encontrar o produto pelo ID
  const produto = produtosMock.find(p => p.id === Number(id));
  
  // Produtos relacionados
  const produtosRelacionados = produtosMock
    .filter(p => p.categoria === produto?.categoria && p.id !== produto?.id)
    .slice(0, 4);
  
  if (!produto) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 px-4 py-6 md:px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
              <p className="text-muted-foreground mb-6">
                O produto que você está procurando não existe ou foi removido.
              </p>
              <Button asChild>
                <Link to="/marketplace">
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar para o Marketplace
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = () => {
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${produto.titulo} foi adicionado ao seu carrinho.`,
    });
  };
  
  // Função para tornar-se afiliado
  const tornarAfiliado = () => {
    toast({
      title: "Solicitação de afiliado enviada",
      description: "Você receberá um e-mail com as instruções para se tornar afiliado deste produto.",
    });
  };
  
  // Função para favoritar o produto
  const toggleFavorito = () => {
    setFavoritado(!favoritado);
    toast({
      title: favoritado ? "Produto removido dos favoritos" : "Produto adicionado aos favoritos",
      description: favoritado ? "Este produto foi removido da sua lista de favoritos." : "Este produto foi adicionado à sua lista de favoritos.",
    });
  };
  
  // Função para compartilhar o produto
  const compartilhar = () => {
    // Mock de compartilhamento
    toast({
      title: "Link copiado para a área de transferência",
      description: "Agora você pode compartilhar este produto com seus amigos.",
    });
  };
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight size={14} />
            <Link to="/marketplace" className="hover:text-foreground">Marketplace</Link>
            <ChevronRight size={14} />
            <Link to={`/marketplace?categoria=${produto.categoria}`} className="hover:text-foreground">{produto.categoria}</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">{produto.titulo}</span>
          </div>
          
          {/* Informações do produto */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Lado esquerdo: Imagem principal e informações */}
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={produto.imagem} 
                  alt={produto.titulo}
                  className="w-full aspect-[16/9] object-cover rounded-xl"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                      favoritado 
                        ? "bg-red-500 text-white" 
                        : "bg-white/90 text-foreground hover:bg-white"
                    }`}
                    onClick={toggleFavorito}
                  >
                    <Heart size={18} className={favoritado ? "fill-white" : ""} />
                  </button>
                  <button 
                    className="h-10 w-10 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors"
                    onClick={compartilhar}
                  >
                    <Share2 size={18} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {produto.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
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
              </div>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{produto.titulo}</h1>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(produto.avaliacao) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{produto.avaliacao.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">({produto.vendas} avaliações)</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground text-sm">{produto.vendas} vendas</span>
                </div>
                <div className="mt-1 text-sm">
                  Vendido por <Link to="#" className="font-medium hover:underline">{produto.vendedor}</Link>
                </div>
              </div>
              
              <Tabs defaultValue="descricao" className="w-full">
                <TabsList>
                  <TabsTrigger value="descricao">Descrição</TabsTrigger>
                  <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                  <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                  <TabsTrigger value="perguntas">Perguntas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="descricao" className="pt-4 space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod 
                    scelerisque nisl, vel ultrices urna interdum in. Fusce accumsan felis 
                    non magna tincidunt, id iaculis nulla dictum. Vestibulum ante ipsum 
                    primis in faucibus orci luctus et ultrices posuere cubilia curae.
                  </p>
                  <p>
                    Proin sed magna vel urna ultricies consequat. Suspendisse potenti. 
                    Integer vel feugiat sem, ac fringilla mauris. Praesent elementum sit 
                    amet nisi et sagittis. Morbi consectetur, augue id hendrerit tincidunt, 
                    magna lorem tincidunt nisl, et dapibus magna mauris nec tellus.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <h3 className="font-semibold">Para quem é este produto?</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5" />
                            <span>Empreendedores que querem aumentar suas vendas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5" />
                            <span>Profissionais de marketing em busca de novas técnicas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5" />
                            <span>Iniciantes que querem começar um negócio online</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <h3 className="font-semibold">Benefícios</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5" />
                            <span>Aumento de conversão e vendas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5" />
                            <span>Estratégias testadas e comprovadas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5" />
                            <span>Suporte exclusivo da comunidade</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="conteudo" className="pt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <Video className="text-primary" size={20} />
                        <span className="font-medium">Módulo 1: Introdução</span>
                      </div>
                      <span className="text-sm text-muted-foreground">3 aulas • 45 min</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <Video className="text-primary" size={20} />
                        <span className="font-medium">Módulo 2: Fundamentos</span>
                      </div>
                      <span className="text-sm text-muted-foreground">5 aulas • 1h 20min</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <Video className="text-primary" size={20} />
                        <span className="font-medium">Módulo 3: Estratégias Avançadas</span>
                      </div>
                      <span className="text-sm text-muted-foreground">7 aulas • 2h 10min</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <File className="text-primary" size={20} />
                        <span className="font-medium">Materiais Complementares</span>
                      </div>
                      <span className="text-sm text-muted-foreground">12 arquivos</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <Award className="text-primary" size={20} />
                        <span className="font-medium">Certificado de Conclusão</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Disponível</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="avaliacoes" className="pt-4">
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="text-center md:pr-6 md:border-r">
                        <div className="text-5xl font-bold">{produto.avaliacao.toFixed(1)}</div>
                        <div className="flex justify-center my-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={i < Math.floor(produto.avaliacao) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{produto.vendas} avaliações</div>
                      </div>
                      
                      <div className="w-full max-w-md space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percent = Math.round(rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1);
                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="flex items-center w-20">
                                {rating} <Star size={14} className="ml-1 fill-yellow-400 text-yellow-400" />
                              </div>
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div
                                  className="bg-yellow-400 h-2.5 rounded-full"
                                  style={{ width: `${percent}%` }}
                                ></div>
                              </div>
                              <div className="w-10 text-xs text-right">{percent}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Comentários dos Compradores</h3>
                      
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">Usuário Anônimo</div>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                      <Star
                                        key={idx}
                                        size={14}
                                        className={idx < (5 - i % 2) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    há {i * 3} {i === 1 ? 'dia' : 'dias'}
                                  </span>
                                </div>
                              </div>
                              <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                                Compra verificada
                              </div>
                            </div>
                            <p className="mt-3 text-sm">
                              {i === 1 ? 
                                "Produto excelente! Superou minhas expectativas e já estou vendo resultados após a primeira semana de uso. Recomendo para todos que querem melhorar seus resultados." :
                                i === 2 ?
                                "Conteúdo muito bem explicado e prático. O suporte é excelente e respondem todas as dúvidas rapidamente. Valeu cada centavo investido!" :
                                "Ótimo material, bem estruturado e com exemplos práticos. Já comecei a implementar as estratégias e estou ansioso pelos resultados. Recomendo!"
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="perguntas" className="pt-4">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Perguntas e Respostas</h3>
                      <Button variant="outline" size="sm">
                        <MessageSquare size={14} className="mr-2" />
                        Fazer pergunta
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b pb-4">
                          <div className="flex gap-3">
                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                              P
                            </div>
                            <div>
                              <p className="font-medium">
                                {i === 1 ? 
                                  "Este produto oferece suporte após a compra?" :
                                  i === 2 ?
                                  "Posso acessar o conteúdo em dispositivos móveis?" :
                                  "Existe algum tipo de garantia para este produto?"
                                }
                              </p>
                              <div className="text-xs text-muted-foreground mt-1">
                                Perguntado há {i * 2} {i * 2 === 1 ? 'dia' : 'dias'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-3 ml-4">
                            <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 font-medium">
                              R
                            </div>
                            <div>
                              <p className="text-sm">
                                {i === 1 ? 
                                  "Sim, oferecemos suporte por 12 meses após a compra através de nossa comunidade exclusiva e e-mail." :
                                  i === 2 ?
                                  "Sim, todo o conteúdo é responsivo e pode ser acessado em qualquer dispositivo através de nosso aplicativo ou diretamente pelo navegador." :
                                  "Oferecemos garantia de 30 dias. Se você não ficar satisfeito com o produto, devolveremos 100% do seu investimento."
                                }
                              </p>
                              <div className="text-xs text-muted-foreground mt-1">
                                Respondido por {produto.vendedor} há {i} {i === 1 ? 'dia' : 'dias'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Lado direito: Informações de compra e afiliação */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Preço:</span>
                      <span className="text-2xl font-bold">R$ {produto.preco.toFixed(2)}</span>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Percent size={18} className="text-green-600" />
                        <span className="text-sm font-medium">Comissão para afiliados:</span>
                      </div>
                      <span className="font-bold text-green-600">{produto.comissao}%</span>
                    </div>
                    
                    <div className="pt-2 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-muted-foreground" />
                        <span>Acesso imediato após a compra</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Download size={16} className="text-muted-foreground" />
                        <span>Download ou acesso online</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-muted-foreground" />
                        <span>Comunidade de suporte</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full h-11 text-base" 
                      onClick={adicionarAoCarrinho}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-11 text-base"
                      onClick={tornarAfiliado}
                    >
                      <Bookmark size={18} className="mr-2" />
                      Tornar-se Afiliado
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Informações Gerais</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categoria:</span>
                    <span>{produto.categoria}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data de publicação:</span>
                    <span>15/01/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última atualização:</span>
                    <span>10/03/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Número de vendas:</span>
                    <span>{produto.vendas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Afiliados ativos:</span>
                    <span>{Math.floor(produto.vendas / 10)}</span>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Sobre o Vendedor</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                      {produto.vendedor.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{produto.vendedor}</div>
                      <div className="text-xs text-muted-foreground">Membro desde 2020</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Especialista em {produto.categoria.toLowerCase()} com mais de 10 anos de experiência e milhares de alunos satisfeitos.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Ver perfil completo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Produtos relacionados */}
          <div className="pt-8 border-t">
            <h2 className="text-xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produtosRelacionados.map((produto) => (
                <ProductCard
                  key={produto.id}
                  {...produto}
                  onAddToCart={adicionarAoCarrinho}
                  onAffiliate={tornarAfiliado}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
