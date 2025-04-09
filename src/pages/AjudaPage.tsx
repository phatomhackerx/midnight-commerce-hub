
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Play, 
  Search, 
  ThumbsUp 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function AjudaPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <div className={cn("space-y-6 text-center", loaded && "animate-fade-in")}>
            <h1 className="text-3xl font-bold">Central de Ajuda</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encontre respostas para suas dúvidas, tutoriais e dicas para aproveitar ao máximo sua plataforma.
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                className="pl-10 py-6 text-base" 
                placeholder="Buscar artigos, tutoriais ou dúvidas..." 
              />
            </div>
          </div>
          
          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", loaded && "animate-fade-in")}>
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} className="text-primary" />
                  <span>Artigos e Tutoriais</span>
                </CardTitle>
                <CardDescription>Guias passo a passo</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Acesse nossa base de conhecimento com artigos detalhados e tutoriais.
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1">
                  <BookOpen size={16} />
                  <span>Ver Documentação</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Play size={20} className="text-primary" />
                  <span>Vídeos Tutoriais</span>
                </CardTitle>
                <CardDescription>Aprenda visualmente</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Assista a vídeos explicativos sobre como utilizar as funcionalidades.
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1">
                  <Play size={16} />
                  <span>Ver Vídeos</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={20} className="text-primary" />
                  <span>Suporte ao Vivo</span>
                </CardTitle>
                <CardDescription>Fale com especialistas</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Entre em contato com nossa equipe de suporte para tirar suas dúvidas.
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1">
                  <MessageSquare size={16} />
                  <span>Iniciar Chat</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Tabs defaultValue="inicio" className={cn("mt-12", loaded && "animate-fade-in")}>
            <TabsList className="w-full flex justify-center mb-6">
              <TabsTrigger value="inicio">Início Rápido</TabsTrigger>
              <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
              <TabsTrigger value="populares">Artigos Populares</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inicio" className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Início Rápido</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inicioRapido.map((item, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        {item.passos.map((passo, i) => (
                          <li key={i}>{passo}</li>
                        ))}
                      </ol>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Ver Guia Completo</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {faq.map((item, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-start">
                        <HelpCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item.pergunta}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.resposta}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Isso foi útil?
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <ThumbsUp size={14} />
                          <span>Sim</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ThumbsUpInverted size={14} />
                          <span>Não</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="populares" className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Artigos Populares</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artigosPopulares.map((artigo, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{artigo.titulo}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1">
                          <FileText size={14} />
                          <span>Artigo</span>
                          <span className="mx-1">•</span>
                          <span>Leitura de {artigo.tempoLeitura} min</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{artigo.descricao}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Ler Artigo</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className={cn("bg-primary/5 border-primary/20", loaded && "animate-fade-in")}>
            <CardHeader>
              <CardTitle className="text-center">Ainda precisa de ajuda?</CardTitle>
              <CardDescription className="text-center">
                Nossa equipe de suporte está disponível para ajudá-lo com qualquer dúvida.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button className="gap-1">
                <MessageSquare size={16} />
                <span>Iniciar Chat</span>
              </Button>
              <Button variant="outline" className="gap-1">
                <Mail size={16} />
                <span>Enviar Email</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Componente Mail para o ícone de email
const Mail = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

// Componente ThumbsUpInverted para o ícone de "não foi útil"
const ThumbsUpInverted = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
    <path d="M7 10v12"></path>
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
  </svg>
);

// Dados fictícios para o início rápido
const inicioRapido = [
  {
    titulo: "Cadastrando seu primeiro produto",
    passos: [
      "Acesse o menu 'Produtos' na barra lateral.",
      "Clique no botão 'Novo Produto'.",
      "Preencha as informações básicas como nome, descrição e preço.",
      "Adicione imagens do produto.",
      "Configure as opções de entrega e estoque.",
      "Clique em 'Salvar'."
    ]
  },
  {
    titulo: "Configurando métodos de pagamento",
    passos: [
      "Acesse o menu 'Financeiro' na barra lateral.",
      "Clique na aba 'Métodos de Pagamento'.",
      "Selecione os gateways que deseja utilizar.",
      "Configure suas credenciais para cada método.",
      "Defina as taxas e condições.",
      "Salve as configurações."
    ]
  },
  {
    titulo: "Gerenciando vendas",
    passos: [
      "Acesse o menu 'Minhas Vendas' na barra lateral.",
      "Visualize todas as vendas realizadas.",
      "Utilize os filtros para encontrar vendas específicas.",
      "Clique em uma venda para ver seus detalhes.",
      "Atualize o status da venda conforme necessário.",
      "Gere notas fiscais e documentos para envio."
    ]
  },
  {
    titulo: "Configurando sua loja",
    passos: [
      "Acesse o menu 'Configurações' na barra lateral.",
      "Configure o design da sua loja na aba 'Aparência'.",
      "Defina domínio e URLs na aba 'Domínio'.",
      "Configure impostos e regiões na aba 'Impostos'.",
      "Ajuste as opções de envio na aba 'Envio'.",
      "Salve todas as configurações."
    ]
  }
];

// Dados fictícios para as perguntas frequentes
const faq = [
  {
    pergunta: "Como faço para recuperar minha senha?",
    resposta: "Para recuperar sua senha, clique em 'Esqueceu a senha?' na tela de login. Você receberá um e-mail com instruções para criar uma nova senha. Se não receber o email, verifique sua pasta de spam ou entre em contato com o suporte."
  },
  {
    pergunta: "Como posso adicionar um novo método de pagamento?",
    resposta: "Acesse o menu 'Financeiro' na barra lateral, clique na aba 'Métodos de Pagamento' e então em 'Adicionar Método'. Selecione o método desejado, configure as credenciais e salve as alterações."
  },
  {
    pergunta: "Como configurar cupons de desconto?",
    resposta: "Acesse o menu 'Cupons de Desconto' na barra lateral. Clique em 'Novo Cupom', defina o código, valor ou percentual de desconto, validade e limitações de uso. Salve as configurações e o cupom estará pronto para uso."
  },
  {
    pergunta: "Como faço para configurar o envio de produtos?",
    resposta: "Acesse 'Configurações' > 'Envio'. Você pode configurar métodos de envio como frete fixo, frete grátis ou integração com transportadoras. Defina as regiões atendidas, prazos e custos para cada método."
  },
  {
    pergunta: "Como emitir notas fiscais para as vendas?",
    resposta: "Acesse 'Minhas Vendas', selecione a venda desejada e clique em 'Emitir Nota Fiscal'. Se você já configurou a integração com um serviço de emissão de notas, basta confirmar as informações. Caso contrário, você precisará configurar o serviço primeiro em 'Configurações' > 'Fiscal'."
  }
];

// Dados fictícios para os artigos populares
const artigosPopulares = [
  {
    titulo: "Como aumentar suas vendas com marketing digital",
    descricao: "Aprenda estratégias eficazes de marketing digital para impulsionar suas vendas online e maximizar seus resultados.",
    tempoLeitura: 8
  },
  {
    titulo: "Guia completo de SEO para e-commerce",
    descricao: "Um guia abrangente sobre como otimizar sua loja online para mecanismos de busca e aumentar o tráfego orgânico.",
    tempoLeitura: 12
  },
  {
    titulo: "Como reduzir o abandono de carrinho",
    descricao: "Estratégias comprovadas para diminuir a taxa de abandono de carrinho e recuperar vendas perdidas.",
    tempoLeitura: 6
  },
  {
    titulo: "Configurando campanhas de e-mail marketing",
    descricao: "Aprenda a criar e automatizar campanhas de e-mail eficazes para nutrir leads e converter mais vendas.",
    tempoLeitura: 10
  },
  {
    titulo: "Como configurar pixels de rastreamento",
    descricao: "Um guia passo a passo para configurar pixels do Facebook, Google e outras plataformas de anúncios.",
    tempoLeitura: 5
  },
  {
    titulo: "Melhores práticas para descrições de produtos",
    descricao: "Aprenda a criar descrições de produtos que vendem, com técnicas de copywriting eficazes.",
    tempoLeitura: 7
  }
];
