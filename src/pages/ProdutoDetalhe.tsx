
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Share2,
  Bookmark,
  Star,
  ChevronLeft,
  MessageSquare,
  Award,
  ShieldCheck,
  CheckCircle,
  Users,
  ArrowRight,
  Percent,
  User,
  Clock,
  Calendar,
  Check
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock de dados para o produto específico
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
    imagem: "https://placehold.co/800x450/3b82f6/FFFFFF/png?text=Marketing+Digital",
    destaque: true,
    tags: ["bestseller", "hot"],
    descricao: "Aprenda todas as estratégias de marketing digital que realmente funcionam. Este curso completo aborda desde o básico até técnicas avançadas para você dominar o marketing online.",
    inclui: [
      "12 módulos de conteúdo",
      "25 horas de vídeo",
      "Materiais complementares",
      "Certificado de conclusão",
      "Acesso vitalício",
      "Atualizações gratuitas"
    ],
    requisitos: [
      "Nenhum conhecimento prévio necessário",
      "Computador com acesso à internet",
      "Disposição para aprender"
    ],
    paraquem: [
      "Iniciantes em marketing digital",
      "Empreendedores que querem promover seus negócios",
      "Profissionais de marketing que desejam atualizar conhecimentos",
      "Afiliados que buscam estratégias eficientes"
    ],
    modulos: [
      {
        titulo: "Introdução ao Marketing Digital",
        aulas: ["Conceitos básicos", "O ecossistema digital", "Criando sua presença online"]
      },
      {
        titulo: "SEO - Otimização para Motores de Busca",
        aulas: ["Fundamentos de SEO", "Pesquisa de palavras-chave", "Otimização on-page", "Link building"]
      },
      {
        titulo: "Marketing de Conteúdo",
        aulas: ["Estratégia de conteúdo", "Criação de blog", "Produção de conteúdo valioso"]
      }
    ],
    avaliacoes: [
      {
        nome: "Carlos Silva",
        data: "10/03/2023",
        nota: 5,
        comentario: "Excelente curso! Muito completo e didático. Consegui aplicar várias estratégias e já estou vendo resultados."
      },
      {
        nome: "Maria Oliveira",
        data: "22/02/2023",
        nota: 4,
        comentario: "Muito bom, mas senti falta de mais exemplos práticos em alguns módulos. De qualquer forma, valeu cada centavo."
      }
    ]
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
    imagem: "https://placehold.co/800x450/f59e0b/FFFFFF/png?text=Lançamentos",
    destaque: true,
    tags: ["consultoria", "premium"],
    descricao: "Consultoria especializada para criadores de conteúdo e infoprodutores que desejam realizar lançamentos digitais de sucesso com estratégias comprovadas que geram resultados.",
    inclui: [
      "4 sessões de consultoria individual",
      "Planejamento completo de lançamento",
      "Templates de e-mail marketing",
      "Estratégia de funil de vendas",
      "Análise de métricas e otimização",
      "Suporte por 90 dias"
    ],
    requisitos: [
      "Produto digital já desenvolvido",
      "Conhecimento básico de marketing digital",
      "Disponibilidade para implementar as estratégias"
    ],
    paraquem: [
      "Infoprodutores que desejam lançar seu produto",
      "Empreendedores digitais com produtos prontos",
      "Profissionais que desejam escalar suas vendas",
      "Criadores de conteúdo que querem monetizar sua audiência"
    ],
    modulos: [
      {
        titulo: "Planejamento Estratégico",
        aulas: ["Definição de posicionamento", "Análise de público-alvo", "Cronograma de lançamento"]
      },
      {
        titulo: "Estratégia de Conteúdo",
        aulas: ["Criação de conteúdo de aquecimento", "Roteiros para vídeos", "Sequência de e-mails"]
      },
      {
        titulo: "Execução do Lançamento",
        aulas: ["Abertura de carrinho", "Estratégias de urgência e escassez", "Webinars de conversão"]
      }
    ],
    avaliacoes: [
      {
        nome: "Roberto Almeida",
        data: "15/04/2023",
        nota: 5,
        comentario: "Simplesmente incrível! Com a consultoria consegui fazer um lançamento de R$ 367.000 em 7 dias. As estratégias são muito eficientes."
      },
      {
        nome: "Carolina Mendes",
        data: "03/03/2023",
        nota: 5,
        comentario: "Valeu cada centavo investido. A equipe é super profissional e me ajudou em todos os detalhes do lançamento."
      }
    ]
  }
];

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [quantidade, setQuantidade] = useState(1);
  const [abaSelecionada, setAbaSelecionada] = useState("descricao");
  
  // Encontrar o produto pelo ID
  const produto = produtosMock.find(p => p.id === Number(id)) || produtosMock[0];
  
  // Estados para interações
  const [favoritado, setFavoritado] = useState(false);
  const [carrinhoAdicionado, setCarrinhoAdicionado] = useState(false);
  
  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = () => {
    setCarrinhoAdicionado(true);
    // Lógica para adicionar ao carrinho
    console.log(`Produto ${produto.id} adicionado ao carrinho`);
    
    // Reset após 3 segundos
    setTimeout(() => {
      setCarrinhoAdicionado(false);
    }, 3000);
  };
  
  // Função para se tornar afiliado
  const tornarAfiliado = () => {
    // Lógica para se tornar afiliado
    console.log(`Tornando-se afiliado do produto ${produto.id}`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {/* Navegação de migalhas de pão */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/marketplace" className="flex items-center hover:text-primary">
              <ChevronLeft size={14} className="mr-1" />
              Voltar para Marketplace
            </Link>
            <span>/</span>
            <span>{produto.categoria}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{produto.titulo}</span>
          </div>
          
          {/* Seção principal do produto */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Coluna da esquerda - Imagem e detalhes */}
            <div className="space-y-8">
              {/* Imagem do produto */}
              <div className="bg-card rounded-xl overflow-hidden border">
                <img 
                  src={produto.imagem} 
                  alt={produto.titulo}
                  className="w-full aspect-video object-cover"
                />
              </div>
              
              {/* Detalhes do produto em abas */}
              <Tabs defaultValue="descricao" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="descricao" onClick={() => setAbaSelecionada("descricao")}>Descrição</TabsTrigger>
                  <TabsTrigger value="conteudo" onClick={() => setAbaSelecionada("conteudo")}>Conteúdo</TabsTrigger>
                  <TabsTrigger value="avaliacoes" onClick={() => setAbaSelecionada("avaliacoes")}>Avaliações</TabsTrigger>
                  <TabsTrigger value="perguntas" onClick={() => setAbaSelecionada("perguntas")}>Perguntas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="descricao" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                    <p className="text-muted-foreground">
                      {produto.descricao}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">O que você vai aprender</h3>
                      <ul className="space-y-2">
                        {produto.inclui.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Requisitos</h3>
                      <ul className="space-y-2">
                        {produto.requisitos.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Para quem é este produto</h3>
                    <ul className="space-y-2">
                      {produto.paraquem.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Users size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="conteudo" className="space-y-6 mt-6">
                  <h3 className="text-lg font-semibold">Conteúdo do produto</h3>
                  <div className="space-y-6">
                    {produto.modulos.map((modulo, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-4 font-medium">
                          {modulo.titulo}
                        </div>
                        <ul className="divide-y">
                          {modulo.aulas.map((aula, idx) => (
                            <li key={idx} className="p-4 flex items-center gap-3">
                              <Clock size={16} className="text-muted-foreground" />
                              <span>{aula}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="avaliacoes" className="space-y-6 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Avaliações dos alunos</h3>
                    <Button variant="outline">Deixar avaliação</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                    <div className="space-y-4 p-6 bg-muted rounded-xl">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{produto.avaliacao.toFixed(1)}</div>
                        <div className="flex justify-center my-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={i < Math.floor(produto.avaliacao) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{produto.avaliacoes.length} avaliações</div>
                      </div>
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const total = produto.avaliacoes.length;
                          const count = produto.avaliacoes.filter(a => a.nota === rating).length;
                          const percent = total > 0 ? (count / total) * 100 : 0;
                          
                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="flex items-center w-16">
                                <span>{rating}</span>
                                <Star size={14} className="fill-yellow-400 text-yellow-400 ml-1" />
                              </div>
                              <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400 rounded-full" 
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <div className="w-10 text-right text-sm text-muted-foreground">
                                {percent.toFixed(0)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {produto.avaliacoes.map((avaliacao, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                {avaliacao.nome.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{avaliacao.nome}</div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar size={14} className="mr-1" />
                                  <span>{avaliacao.data}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < avaliacao.nota ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            {avaliacao.comentario}
                          </p>
                        </div>
                      ))}
                      
                      {produto.avaliacoes.length > 2 && (
                        <Button variant="outline" className="w-full">
                          Ver mais avaliações
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="perguntas" className="space-y-6 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Perguntas frequentes</h3>
                    <Button>Fazer uma pergunta</Button>
                  </div>
                  
                  <div className="space-y-4 p-8 text-center">
                    <MessageSquare size={40} className="mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium">Nenhuma pergunta ainda</h3>
                    <p className="text-muted-foreground">
                      Seja o primeiro a fazer uma pergunta sobre este produto.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Coluna da direita - Preço e ações */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {produto.tags.map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className={`
                            ${tag === "bestseller" ? "bg-yellow-500/10 text-yellow-600" : ""}
                            ${tag === "hot" ? "bg-red-500/10 text-red-600" : ""}
                            ${tag === "consultoria" ? "bg-orange-500/10 text-orange-600" : ""}
                            ${tag === "premium" ? "bg-indigo-500/10 text-indigo-600" : ""}
                          `}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h1 className="text-2xl font-bold">{produto.titulo}</h1>
                    <div className="flex items-center text-sm">
                      <span className="flex items-center">
                        <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{produto.avaliacao.toFixed(1)}</span>
                      </span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{produto.vendas} vendas</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <Link to="#" className="text-primary hover:underline">
                        {produto.avaliacoes.length} avaliações
                      </Link>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Criado por <Link to="#" className="text-primary hover:underline">{produto.vendedor}</Link>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-3xl font-bold">R$ {produto.preco.toFixed(2)}</div>
                    <div className="flex items-center text-sm text-green-600 font-medium mt-1">
                      <Percent size={16} className="mr-1" />
                      {produto.comissao}% de comissão para afiliados
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <Button className="w-full h-11" onClick={adicionarAoCarrinho}>
                      {carrinhoAdicionado ? (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          Adicionado ao carrinho
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} className="mr-2" />
                          Comprar agora
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" className="w-full h-11" onClick={tornarAfiliado}>
                      <Bookmark size={18} className="mr-2" />
                      Promover como afiliado
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        className="flex-1"
                        onClick={() => setFavoritado(!favoritado)}
                      >
                        <Heart 
                          size={18} 
                          className={favoritado ? "fill-red-500 text-red-500 mr-2" : "mr-2"} 
                        />
                        Favoritar
                      </Button>
                      <Button variant="ghost" className="flex-1">
                        <Share2 size={18} className="mr-2" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Este produto inclui:</h3>
                    <ul className="space-y-2">
                      {produto.inclui.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check size={16} className="text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {produto.inclui.length > 4 && (
                        <li className="text-sm text-primary hover:underline cursor-pointer">
                          + {produto.inclui.length - 4} mais itens
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <ShieldCheck size={18} className="text-green-500" />
                      <span>Garantia de 7 dias ou seu dinheiro de volta</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Award size={18} className="text-blue-500" />
                      <span>Certificado de conclusão (para cursos)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <User size={18} className="text-indigo-500" />
                      <span>Suporte personalizado do criador</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Produtos relacionados */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Produtos relacionados</h2>
              <Button variant="link" asChild>
                <Link to="/marketplace">
                  Ver todos
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produtosMock.filter(p => p.id !== produto.id).slice(0, 4).map((produto) => (
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
                  </div>
                  
                  <div className="flex-1 p-4 space-y-2">
                    <Link to={`/marketplace/produto/${produto.id}`} className="block">
                      <h3 className="font-semibold hover:text-primary hover:underline line-clamp-2">{produto.titulo}</h3>
                    </Link>
                    <div className="text-sm text-muted-foreground">por {produto.vendedor}</div>
                    
                    <div className="flex items-center gap-1 text-sm">
                      <span className="flex items-center gap-0.5">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{produto.avaliacao.toFixed(1)}</span>
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{produto.vendas} vendas</span>
                    </div>
                    
                    <div className="pt-2">
                      <div className="text-lg font-bold">R$ {produto.preco.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
