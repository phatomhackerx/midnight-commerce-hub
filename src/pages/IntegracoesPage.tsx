
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Link, Plus, RefreshCw, Settings, ShieldCheck, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function IntegracoesPage() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Integrações</h1>
                <p className="text-muted-foreground">Gerencie as integrações da sua loja com outros sistemas e plataformas.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings size={16} />
                  <span>Configurações</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Nova Integração</span>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="ativas" className={cn(loaded && "animate-fade-in transition-all duration-500")}>
            <TabsList>
              <TabsTrigger value="ativas">Ativas</TabsTrigger>
              <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ativas" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Input placeholder="Buscar integrações..." className="pl-9 w-[300px]" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw size={16} />
                    <span>Atualizar</span>
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="gap-1" 
                    onClick={() => navigate('/chat-platform')}
                  >
                    <span>Nova Plataforma de Chat</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {integracoesAtivas.map((integracao, index) => (
                  <Card key={index} className="transition-all hover:shadow-md border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{integracao.nome}</CardTitle>
                        <Badge className="bg-success/80 hover:bg-success/90">Conectado</Badge>
                      </div>
                      <CardDescription>{integracao.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={16} className="text-success" />
                        <span>Última sincronização: {integracao.ultimaSinc}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Settings size={16} />
                        <span>Configurar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <RefreshCw size={16} />
                        <span>Sincronizar</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="disponiveis" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {integracoesDisponiveis.map((integracao, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{integracao.nome}</CardTitle>
                        {integracao.premium ? (
                          <Badge className="bg-warning text-black">Premium</Badge>
                        ) : (
                          <Badge className="bg-secondary">Gratuito</Badge>
                        )}
                      </div>
                      <CardDescription>{integracao.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{integracao.detalhes}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-1">
                        <Link size={16} />
                        <span>Conectar</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="transition-all hover:shadow-md bg-gradient-to-br from-primary/20 to-purple-500/10 border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Plataforma de Chat</CardTitle>
                      <Badge className="bg-purple-500 hover:bg-purple-600">Novo</Badge>
                    </div>
                    <CardDescription>Chat avançado com IA e automações</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Plataforma completa de atendimento automatizado, bots inteligentes e marketing conversacional.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="default" 
                      className="w-full gap-1"
                      onClick={() => navigate('/chat-platform')}
                    >
                      <Link size={16} />
                      <span>Explorar Plataforma</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>Gerencie suas chaves de API para integração com outros sistemas</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Plus size={16} />
                      <span>Nova API Key</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {apiKeys.map((key, index) => (
                    <div key={index} className="border p-4 rounded-md flex justify-between items-center">
                      <div>
                        <div className="font-medium">{key.nome}</div>
                        <div className="text-sm text-muted-foreground">Criada em: {key.criada}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-muted px-4 py-1.5 rounded-md font-mono text-xs">
                          •••••••••••••••••••••
                        </div>
                        <Button variant="outline" size="sm">Mostrar</Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Revogar</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Documentação da API</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Acesse nossa documentação completa para integrar sua aplicação com nossa API.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Documentação</Button>
                      <Button variant="outline" size="sm">Exemplos</Button>
                      <Button variant="outline" size="sm">Postman Collection</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="webhooks" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Webhooks</CardTitle>
                      <CardDescription>Configure webhooks para receber notificações em tempo real</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Plus size={16} />
                      <span>Novo Webhook</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {webhooks.map((webhook, index) => (
                    <div key={index} className="border p-4 rounded-md flex justify-between items-center">
                      <div>
                        <div className="font-medium">{webhook.evento}</div>
                        <div className="text-sm text-muted-foreground">URL: {webhook.url}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {webhook.status === "Ativo" ? (
                            <>
                              <CheckCircle size={16} className="text-success" />
                              <span className="text-sm text-success">Ativo</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={16} className="text-destructive" />
                              <span className="text-sm text-destructive">Inativo</span>
                            </>
                          )}
                        </div>
                        <Button variant="outline" size="sm">Testar</Button>
                        <Button variant="outline" size="sm">Configurar</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Segurança de Webhooks</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Configure a segurança para verificar a autenticidade das requisições.
                    </p>
                    <div className="flex gap-2 items-center">
                      <ShieldCheck size={16} className="text-success" />
                      <span className="text-sm">Assinatura de segurança habilitada</span>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

const integracoesAtivas = [
  {
    nome: "Mercado Pago",
    descricao: "Integração com gateway de pagamentos",
    ultimaSinc: "Hoje às 10:45"
  },
  {
    nome: "Correios",
    descricao: "Cálculo de frete e rastreamento",
    ultimaSinc: "Hoje às 09:30"
  },
  {
    nome: "Google Analytics",
    descricao: "Integração com métricas e analytics",
    ultimaSinc: "Ontem às 18:15"
  },
  {
    nome: "Mailchimp",
    descricao: "Automação de email marketing",
    ultimaSinc: "Hoje às 08:00"
  },
  {
    nome: "Facebook Pixel",
    descricao: "Rastreamento de conversões",
    ultimaSinc: "Hoje às 11:20"
  },
  {
    nome: "Hotjar",
    descricao: "Análise de comportamento do usuário",
    ultimaSinc: "Ontem às 16:45"
  }
];

const integracoesDisponiveis = [
  {
    nome: "Tiktok Ads",
    descricao: "Integração com anúncios do TikTok",
    detalhes: "Acompanhe o desempenho das suas campanhas no TikTok",
    premium: false
  },
  {
    nome: "Amazon AWS",
    descricao: "Armazenamento em nuvem",
    detalhes: "Armazene arquivos e faça backup dos seus dados",
    premium: true
  },
  {
    nome: "Zendesk",
    descricao: "Atendimento ao cliente",
    detalhes: "Centralize o suporte ao cliente em uma única plataforma",
    premium: true
  },
  {
    nome: "HubSpot",
    descricao: "CRM e automação de marketing",
    detalhes: "Gerencie contatos e automatize campanhas de marketing",
    premium: true
  },
  {
    nome: "Pipedrive",
    descricao: "Gestão de vendas e pipeline",
    detalhes: "Organize seu funil de vendas e acompanhe oportunidades",
    premium: false
  }
];

const apiKeys = [
  {
    nome: "API Principal",
    criada: "15/04/2024"
  },
  {
    nome: "Integração ERP",
    criada: "22/05/2024"
  },
  {
    nome: "Aplicativo Mobile",
    criada: "01/06/2024"
  }
];

const webhooks = [
  {
    evento: "Nova Venda",
    url: "https://exemplo.com/webhook/nova-venda",
    status: "Ativo"
  },
  {
    evento: "Novo Cliente",
    url: "https://exemplo.com/webhook/novo-cliente",
    status: "Ativo"
  },
  {
    evento: "Pagamento Confirmado",
    url: "https://exemplo.com/webhook/pagamento-confirmado",
    status: "Ativo"
  },
  {
    evento: "Carrinho Abandonado",
    url: "https://exemplo.com/webhook/carrinho-abandonado",
    status: "Inativo"
  }
];
