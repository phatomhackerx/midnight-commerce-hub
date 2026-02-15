import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  UserCircle, Lock, Bell, CreditCard, Globe, Webhook, Shield,
  Save, Mail, Building, Key, Palette, Copy, ExternalLink, CheckCircle
} from "lucide-react";

export default function SettingsPage() {
  const [loaded, setLoaded] = useState(false);
  setTimeout(() => { if (!loaded) setLoaded(true); }, 100);

  const handleSave = () => toast.success("Configurações salvas com sucesso!");
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-[1000px] mx-auto space-y-6">
          <div className={cn("animate-fade-in")}>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground mt-1">Gerencie suas preferências e integrações</p>
          </div>

          <Tabs defaultValue="geral" className={cn("animate-fade-in")}>
            <div className="overflow-x-auto">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full sm:w-auto">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="dominio">Domínio</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="seguranca">Segurança</TabsTrigger>
              </TabsList>
            </div>

            {/* Geral */}
            <TabsContent value="geral" className="space-y-6 pt-4">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Building size={18} /> Dados da Empresa</CardTitle>
                  <CardDescription>Informações exibidas nos checkouts e comunicações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-foreground">Nome da empresa</label>
                      <Input defaultValue="Minha Empresa Digital" className="grok-input" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-foreground">CNPJ/CPF</label>
                      <Input defaultValue="12.345.678/0001-90" className="grok-input" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">E-mail de suporte</label>
                    <Input defaultValue="suporte@minhaempresa.com" className="grok-input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Site</label>
                    <Input defaultValue="https://minhaempresa.com" className="grok-input" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button onClick={handleSave} className="gap-1"><Save size={16} /> Salvar</Button>
                </CardFooter>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Palette size={18} /> Personalização</CardTitle>
                  <CardDescription>Logo e cores da marca</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Logo (URL)</label>
                    <Input placeholder="https://..." className="grok-input" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-foreground">Cor primária</label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#7c3aed" className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
                        <Input defaultValue="#7c3aed" className="grok-input" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-foreground">Cor secundária</label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#a855f7" className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
                        <Input defaultValue="#a855f7" className="grok-input" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button onClick={handleSave} className="gap-1"><Save size={16} /> Salvar</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Domínio */}
            <TabsContent value="dominio" className="space-y-6 pt-4">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Globe size={18} /> Domínio Personalizado</CardTitle>
                  <CardDescription>Configure um domínio próprio para seus checkouts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Domínio padrão</span>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-background px-3 py-1.5 rounded-lg flex-1">minhaempresa.plataforma.com</code>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy("minhaempresa.plataforma.com")}>
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Domínio personalizado</label>
                    <div className="flex gap-2">
                      <Input placeholder="checkout.seudominio.com" className="grok-input" />
                      <Button variant="outline">Verificar DNS</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Aponte um CNAME para <code className="bg-secondary px-1.5 py-0.5 rounded">cname.plataforma.com</code>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Webhooks */}
            <TabsContent value="webhooks" className="space-y-6 pt-4">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Webhook size={18} /> Webhooks</CardTitle>
                  <CardDescription>Receba notificações em tempo real sobre eventos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">URL do Webhook</label>
                    <Input placeholder="https://seuservidor.com/webhook" className="grok-input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block text-foreground">Eventos</label>
                    <div className="space-y-3">
                      {[
                        { name: "Venda aprovada", key: "sale.approved", active: true },
                        { name: "Venda cancelada", key: "sale.cancelled", active: true },
                        { name: "Reembolso", key: "sale.refunded", active: false },
                        { name: "Assinatura criada", key: "subscription.created", active: false },
                        { name: "Assinatura cancelada", key: "subscription.cancelled", active: false },
                        { name: "Abandono de carrinho", key: "cart.abandoned", active: true },
                      ].map(event => (
                        <div key={event.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                          <div>
                            <span className="text-sm font-medium text-foreground">{event.name}</span>
                            <span className="text-xs text-muted-foreground ml-2 font-mono">{event.key}</span>
                          </div>
                          <Switch defaultChecked={event.active} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button onClick={handleSave} className="gap-1"><Save size={16} /> Salvar</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notificações */}
            <TabsContent value="notificacoes" className="space-y-6 pt-4">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell size={18} /> Preferências de Notificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Nova venda", desc: "Notificação a cada venda aprovada", email: true, push: true },
                    { label: "Reembolso solicitado", desc: "Quando um cliente pedir reembolso", email: true, push: true },
                    { label: "Novo afiliado", desc: "Quando um afiliado solicitar aprovação", email: true, push: false },
                    { label: "Abandono de carrinho", desc: "Resumo diário de carrinhos abandonados", email: false, push: false },
                    { label: "Relatórios semanais", desc: "Resumo semanal de desempenho", email: true, push: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Mail size={14} className="text-muted-foreground" />
                          <Switch defaultChecked={item.email} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bell size={14} className="text-muted-foreground" />
                          <Switch defaultChecked={item.push} />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="justify-end">
                  <Button onClick={handleSave} className="gap-1"><Save size={16} /> Salvar</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* API */}
            <TabsContent value="api" className="space-y-6 pt-4">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Key size={18} /> Chaves de API</CardTitle>
                  <CardDescription>Use para integrações personalizadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Chave pública</label>
                    <div className="flex gap-2">
                      <Input value="pk_live_a1b2c3d4e5f6g7h8" readOnly className="grok-input font-mono text-sm" />
                      <Button variant="outline" size="sm" onClick={() => handleCopy("pk_live_a1b2c3d4e5f6g7h8")}><Copy size={14} /></Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Chave secreta</label>
                    <div className="flex gap-2">
                      <Input value="sk_live_••••••••••••••••" readOnly className="grok-input font-mono text-sm" />
                      <Button variant="outline" size="sm">Revelar</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">⚠️ Nunca compartilhe sua chave secreta</p>
                  </div>
                  <Separator />
                  <Button variant="outline" className="gap-2">
                    <ExternalLink size={14} />
                    Documentação da API
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Segurança */}
            <TabsContent value="seguranca" className="space-y-6 pt-4">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield size={18} /> Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div>
                      <span className="text-sm font-medium text-foreground">Autenticação em dois fatores (2FA)</span>
                      <p className="text-xs text-muted-foreground">Proteja sua conta com verificação adicional</p>
                    </div>
                    <Button variant="outline" size="sm">Ativar</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div>
                      <span className="text-sm font-medium text-foreground">Proteção anti-fraude</span>
                      <p className="text-xs text-muted-foreground">Bloqueio automático de transações suspeitas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div>
                      <span className="text-sm font-medium text-foreground">Limitar tentativas de login</span>
                      <p className="text-xs text-muted-foreground">Bloquear após 5 tentativas inválidas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div>
                      <span className="text-sm font-medium text-foreground">Logs de atividade</span>
                      <p className="text-xs text-muted-foreground">Monitorar acessos e alterações na conta</p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle size={12} className="mr-1" /> Ativo
                    </Badge>
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
