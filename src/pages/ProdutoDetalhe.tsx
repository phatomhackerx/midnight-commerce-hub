
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, BarChart2, FileText, MessageSquare, Calendar, Download, Star, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { produtosMock } from "@/data/marketplaceData";
import ProductDetailCard from "@/components/marketplace/ProductDetailCard";
import RelatedProducts from "@/components/marketplace/RelatedProducts";

export default function ProdutoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("descricao");
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  
  // Find the product by ID
  const produto = produtosMock.find(p => p.id === Number(id));
  
  if (!produto) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 px-4 py-8 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Button asChild>
              <Link to="/marketplace">
                <ArrowLeft size={16} className="mr-2" />
                Voltar para o Marketplace
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
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
  
  const tornarAfiliado = (produtoId: number) => {
    console.log(`Tornar-se afiliado do produto ${produtoId}`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link to="/marketplace">
                <ArrowLeft size={16} />
                Voltar para o Marketplace
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProductDetailCard 
                produto={{
                  ...produto,
                  descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                }}
                onAddToCart={adicionarAoCarrinho}
                onAffiliate={tornarAfiliado}
              />
              
              <Tabs defaultValue="descricao" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="descricao" className="flex items-center gap-2">
                    <FileText size={16} />
                    <span className="hidden sm:inline">Descrição</span>
                  </TabsTrigger>
                  <TabsTrigger value="conteudo" className="flex items-center gap-2">
                    <BarChart2 size={16} />
                    <span className="hidden sm:inline">Conteúdo</span>
                  </TabsTrigger>
                  <TabsTrigger value="instrutor" className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="hidden sm:inline">Instrutor</span>
                  </TabsTrigger>
                  <TabsTrigger value="avaliacoes" className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span className="hidden sm:inline">Avaliações</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="descricao" className="space-y-4">
                  <h3 className="text-lg font-bold">Sobre o produto</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <h3 className="text-lg font-bold mt-6">O que você vai aprender</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Compreender os fundamentos do marketing digital</li>
                    <li>Desenvolver estratégias eficazes para diferentes plataformas</li>
                    <li>Analisar métricas e otimizar campanhas</li>
                    <li>Criar conteúdo persuasivo que converte</li>
                    <li>Implementar técnicas avançadas de segmentação</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="conteudo" className="space-y-4">
                  <h3 className="text-lg font-bold">Conteúdo do curso</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-3 flex justify-between items-center">
                        <div className="font-medium">Módulo 1: Introdução</div>
                        <div className="text-sm text-muted-foreground">3 aulas • 45 min</div>
                      </div>
                      <div className="divide-y">
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Visão geral do curso</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Conceitos fundamentais</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Ferramentas necessárias</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-3 flex justify-between items-center">
                        <div className="font-medium">Módulo 2: Estratégias Avançadas</div>
                        <div className="text-sm text-muted-foreground">4 aulas • 60 min</div>
                      </div>
                      <div className="divide-y">
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Planejamento estratégico</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Segmentação de público</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Análise de concorrência</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground" />
                            <span>Otimização de campanhas</span>
                          </div>
                          <div className="text-sm text-muted-foreground">15 min</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="instrutor" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {produto.vendedor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{produto.vendedor}</h3>
                      <p className="text-muted-foreground">Especialista em {produto.categoria}</p>
                    </div>
                  </div>
                  
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{produto.vendas}</div>
                      <div className="text-sm text-muted-foreground">Alunos</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground">Cursos</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{produto.avaliacao}</div>
                      <div className="text-sm text-muted-foreground">Avaliação</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm text-muted-foreground">Anos</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="avaliacoes" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Avaliações dos alunos</h3>
                    <Button>Deixar avaliação</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                            JD
                          </div>
                          <div>
                            <div className="font-medium">João D.</div>
                            <div className="flex items-center text-yellow-400">
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span>10/04/2023</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        Excelente curso! Aprendi muito e já estou aplicando os conhecimentos no meu negócio. Recomendo fortemente para quem quer se destacar no marketing digital.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                            MS
                          </div>
                          <div>
                            <div className="font-medium">Maria S.</div>
                            <div className="flex items-center text-yellow-400">
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span>25/03/2023</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        O conteúdo é claro e objetivo, com exemplos práticos que facilitam o aprendizado. O instrutor é muito didático e atencioso nas respostas às dúvidas.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                            RP
                          </div>
                          <div>
                            <div className="font-medium">Ricardo P.</div>
                            <div className="flex items-center text-yellow-400">
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current" />
                              <Star size={14} className="fill-current empty-star" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span>15/02/2023</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        Muito bom, mas poderia ter mais exemplos práticos. De qualquer forma, o conteúdo é de alta qualidade e vale o investimento.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-8">
              <div className="border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-muted p-4">
                  <h3 className="font-bold">Detalhes do produto</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Formato</div>
                    <div className="font-medium text-right">Curso Online</div>
                    
                    <div className="text-muted-foreground">Categoria</div>
                    <div className="font-medium text-right">{produto.categoria}</div>
                    
                    <div className="text-muted-foreground">Duração</div>
                    <div className="font-medium text-right">5 horas</div>
                    
                    <div className="text-muted-foreground">Idioma</div>
                    <div className="font-medium text-right">Português</div>
                    
                    <div className="text-muted-foreground">Atualizado</div>
                    <div className="font-medium text-right">Março 2023</div>
                    
                    <div className="text-muted-foreground">Certificado</div>
                    <div className="font-medium text-right">Sim</div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Button variant="outline" className="w-full gap-2">
                      <Download size={16} />
                      Baixar amostra grátis
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-muted p-4">
                  <h3 className="font-bold">Promover como afiliado</h3>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm">
                    Ganhe {produto.comissao}% de comissão em cada venda realizada através do seu link de afiliado.
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                    <div className="font-medium">Comissão por venda:</div>
                    <div className="text-lg font-bold">
                      R$ {(produto.preco * (produto.comissao / 100)).toFixed(2)}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => tornarAfiliado(produto.id)}
                  >
                    <Bookmark size={16} className="mr-2" />
                    Tornar-se afiliado
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <RelatedProducts 
            produtos={produtosMock}
            currentProductId={produto.id}
            onAddToCart={adicionarAoCarrinho}
            onAffiliate={tornarAfiliado}
          />
        </div>
      </main>
    </div>
  );
}
