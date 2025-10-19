
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CreditCard, 
  Key, 
  Lock, 
  Mail, 
  MessageSquare, 
  Save, 
  Settings, 
  Shield, 
  UserCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function PerfilPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Perfil</h1>
              
              <div className="flex items-center gap-2">
                <Button size="sm" className="gap-1">
                  <Save size={16} />
                  <span>Salvar Alterações</span>
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Gerencie suas informações</p>
          </div>
          
          <div className={cn("flex flex-col md:flex-row gap-8", loaded && "animate-fade-in")}>
            <div className="w-full md:w-64 space-y-4">
              <Card className="transition-all hover:shadow-md minimal-card">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-foreground mb-4">
                    <UserCircle size={64} />
                  </div>
                  <h3 className="font-bold text-lg">João Silva</h3>
                  <p className="text-sm text-muted-foreground">Plano Profissional</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full gap-1">
                    <UserCircle size={16} />
                    <span>Alterar Foto</span>
                  </Button>
                </CardContent>
              </Card>
              
              <div className="hidden md:block">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Navegação Rápida</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 px-2">
                    <nav className="space-y-1">
                      {menuItems.map((item, index) => (
                        <a 
                          key={index} 
                          href={`#${item.id}`} 
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                        >
                          <item.icon size={16} className="text-primary" />
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={18} className="text-primary" />
                      <span className="text-sm font-medium">Precisa de ajuda?</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Nossa equipe de suporte está disponível para ajudar você.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Contatar Suporte
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="flex-1">
              <Tabs defaultValue="perfil" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="perfil">Perfil</TabsTrigger>
                  <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                  <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
                  <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                </TabsList>
                
                <TabsContent value="perfil" className="space-y-6">
                  <Card id="informacoes-pessoais">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCircle size={18} />
                        <span>Informações Pessoais</span>
                      </CardTitle>
                      <CardDescription>Atualize suas informações pessoais</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Nome</label>
                          <Input defaultValue="João" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Sobrenome</label>
                          <Input defaultValue="Silva" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Nome de Exibição</label>
                        <Input defaultValue="João Silva" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Biografia</label>
                        <textarea 
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                          defaultValue="Empreendedor digital especializado em produtos digitais e marketing de afiliados."
                        ></textarea>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        <span>Salvar</span>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card id="contato">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail size={18} />
                        <span>Informações de Contato</span>
                      </CardTitle>
                      <CardDescription>Atualize suas informações de contato</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <Input defaultValue="joao.silva@exemplo.com" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Telefone</label>
                        <Input defaultValue="(11) 98765-4321" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Site</label>
                        <Input defaultValue="https://joaosilva.com.br" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        <span>Salvar</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="seguranca" className="space-y-6">
                  <Card id="senha">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock size={18} />
                        <span>Senha e Autenticação</span>
                      </CardTitle>
                      <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Senha Atual</label>
                        <Input type="password" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Nova Senha</label>
                        <Input type="password" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Confirmar Nova Senha</label>
                        <Input type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        <span>Atualizar Senha</span>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card id="autenticacao-dois-fatores">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield size={18} />
                        <span>Autenticação em Dois Fatores</span>
                      </CardTitle>
                      <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-4 h-4 rounded-full border flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Autenticação em Dois Fatores</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Proteja sua conta com um código de verificação adicional enviado para o seu celular.
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto flex-shrink-0">
                          Ativar
                        </Button>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-4 h-4 rounded-full border"></div>
                        </div>
                        <div>
                          <p className="font-medium">Chaves de Recuperação</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Gere chaves de recuperação para acessar sua conta caso perca acesso ao seu dispositivo.
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto flex-shrink-0">
                          Gerar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card id="sessoes">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Key size={18} />
                        <span>Sessões Ativas</span>
                      </CardTitle>
                      <CardDescription>Gerencie os dispositivos conectados à sua conta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="border p-3 rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium">Chrome - Windows</p>
                            <p className="text-xs text-muted-foreground">São Paulo, Brasil - Atual</p>
                          </div>
                          <Button variant="outline" size="sm" disabled>
                            Dispositivo Atual
                          </Button>
                        </div>
                        
                        <div className="border p-3 rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium">Safari - iPhone</p>
                            <p className="text-xs text-muted-foreground">São Paulo, Brasil - 2 horas atrás</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Encerrar
                          </Button>
                        </div>
                        
                        <div className="border p-3 rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium">Firefox - MacOS</p>
                            <p className="text-xs text-muted-foreground">São Paulo, Brasil - 3 dias atrás</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Encerrar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button variant="outline" className="gap-1">
                        <span>Encerrar Todas as Sessões</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pagamento" className="space-y-6">
                  <Card id="metodos-pagamento">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard size={18} />
                        <span>Métodos de Pagamento</span>
                      </CardTitle>
                      <CardDescription>Gerencie seus cartões e outras formas de pagamento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="border p-3 rounded-md flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 w-10 h-10 rounded-md flex items-center justify-center">
                              <CreditCard size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Cartão de Crédito</p>
                              <p className="text-xs text-muted-foreground">•••• •••• •••• 4242 - Expira 12/25</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                      
                      <Button className="gap-1">
                        <Plus />
                        <span>Adicionar Novo Método</span>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card id="assinatura">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings size={18} />
                        <span>Gerenciar Assinatura</span>
                      </CardTitle>
                      <CardDescription>Detalhes da sua assinatura atual</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-primary/5 p-4 rounded-md">
                        <h3 className="font-bold text-lg">Plano Profissional</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Renovação em 15/06/2024 - R$ 97,00/mês
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Alterar Plano
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            Cancelar Assinatura
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Histórico de Pagamentos</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 border-b">
                            <div>
                              <p className="font-medium">Plano Profissional - Mensal</p>
                              <p className="text-xs text-muted-foreground">15/05/2024</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">R$ 97,00</p>
                              <p className="text-xs text-success">Pago</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 border-b">
                            <div>
                              <p className="font-medium">Plano Profissional - Mensal</p>
                              <p className="text-xs text-muted-foreground">15/04/2024</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">R$ 97,00</p>
                              <p className="text-xs text-success">Pago</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 border-b">
                            <div>
                              <p className="font-medium">Plano Profissional - Mensal</p>
                              <p className="text-xs text-muted-foreground">15/03/2024</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">R$ 97,00</p>
                              <p className="text-xs text-success">Pago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <span>Ver Todas as Faturas</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notificacoes" className="space-y-6">
                  <Card id="preferencias-notificacoes">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell size={18} />
                        <span>Preferências de Notificações</span>
                      </CardTitle>
                      <CardDescription>Controle quais notificações você deseja receber</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Email</h3>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Atualizações do Sistema</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Receba emails sobre novas funcionalidades e atualizações.
                            </p>
                          </div>
                          <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Vendas</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Receba emails quando uma nova venda for realizada.
                            </p>
                          </div>
                          <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Marketing</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Receba emails com dicas e promoções.
                            </p>
                          </div>
                          <div className="w-9 h-5 rounded-full bg-muted relative flex items-center px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white absolute left-0.5"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Notificações do Sistema</h3>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Novas Vendas</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Receba notificações no sistema quando uma nova venda for realizada.
                            </p>
                          </div>
                          <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Mensagens</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Receba notificações quando alguém enviar uma mensagem para você.
                            </p>
                          </div>
                          <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Atualizações</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Receba notificações sobre novas funcionalidades e atualizações.
                            </p>
                          </div>
                          <div className="w-9 h-5 rounded-full bg-primary relative flex items-center px-0.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-white absolute right-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        <span>Salvar Preferências</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Dados fictícios para o menu rápido
const menuItems = [
  { id: "informacoes-pessoais", label: "Informações Pessoais", icon: UserCircle },
  { id: "contato", label: "Contato", icon: Mail },
  { id: "senha", label: "Senha", icon: Lock },
  { id: "autenticacao-dois-fatores", label: "Autenticação em Dois Fatores", icon: Shield },
  { id: "sessoes", label: "Sessões Ativas", icon: Key },
  { id: "metodos-pagamento", label: "Métodos de Pagamento", icon: CreditCard },
  { id: "assinatura", label: "Assinatura", icon: Settings },
  { id: "preferencias-notificacoes", label: "Notificações", icon: Bell }
];

// Componente Plus para o ícone de adição
const Plus = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
