import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, ExternalLink, Link as LinkIcon, Settings, Share2, Eye, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function ConfiguracoesProdutoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);

  const copiarLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />

      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className={cn("flex items-center gap-4", loaded && "animate-fade-in")}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/produtos")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Configurações do Produto</h1>
              <p className="text-muted-foreground">Configure links, comissões e integrações</p>
            </div>
          </div>

          <Tabs defaultValue="links" className={cn(loaded && "animate-fade-in")}>
            <div className="overflow-x-auto">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="links" className="flex-1 sm:flex-none">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Links
                </TabsTrigger>
                <TabsTrigger value="comissoes" className="flex-1 sm:flex-none">
                  <Share2 className="h-4 w-4 mr-2" />
                  Comissões
                </TabsTrigger>
                <TabsTrigger value="checkout" className="flex-1 sm:flex-none">
                  <Settings className="h-4 w-4 mr-2" />
                  Checkout
                </TabsTrigger>
                <TabsTrigger value="integracoes" className="flex-1 sm:flex-none">
                  <Zap className="h-4 w-4 mr-2" />
                  Integrações
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="links" className="space-y-6 mt-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Links de Venda</CardTitle>
                  <CardDescription>
                    Configure links de venda e páginas de checkout para este produto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Checkout Principal</p>
                        <p className="text-sm text-muted-foreground">
                          https://checkout.minhaurl.com/produto-{id}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copiarLink(`https://checkout.minhaurl.com/produto-${id}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://checkout.minhaurl.com/produto-${id}`, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Link de Afiliado Base</p>
                        <p className="text-sm text-muted-foreground">
                          https://go.minhaurl.com/produto-{id}?af=CODIGO
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copiarLink(`https://go.minhaurl.com/produto-${id}?af=CODIGO`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Link Personalizado</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="meu-produto-especial"
                          defaultValue={`produto-${id}`}
                        />
                        <Button>Salvar</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        URL final: https://checkout.minhaurl.com/meu-produto-especial
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Configurações de Páginas</CardTitle>
                  <CardDescription>
                    Personalize as páginas de venda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Página de Vendas (VSL)</p>
                      <p className="text-sm text-muted-foreground">
                        Criar uma página de vendas com vídeo
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Upsell / Downsell</p>
                      <p className="text-sm text-muted-foreground">
                        Ofertas adicionais após a compra
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Página de Obrigado</p>
                      <p className="text-sm text-muted-foreground">
                        Personalizar página após a compra
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comissoes" className="space-y-6 mt-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Configurações de Comissão</CardTitle>
                  <CardDescription>
                    Defina as comissões para afiliados e co-produtores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Comissão para Afiliados (%)</Label>
                      <Input type="number" defaultValue="30" min="0" max="100" />
                      <p className="text-xs text-muted-foreground">
                        Percentual que os afiliados receberão por cada venda
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Comissão para Co-Produtores (%)</Label>
                      <Input type="number" defaultValue="50" min="0" max="100" />
                      <p className="text-xs text-muted-foreground">
                        Percentual para parceiros que ajudam na criação
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Sistema de Níveis</p>
                        <p className="text-sm text-muted-foreground">
                          Comissões diferentes por volume de vendas
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Cookie Duration</p>
                        <p className="text-sm text-muted-foreground">
                          Tempo que o cookie do afiliado permanece ativo
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 dias</SelectItem>
                          <SelectItem value="15">15 dias</SelectItem>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="60">60 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checkout" className="space-y-6 mt-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Configurações do Checkout</CardTitle>
                  <CardDescription>
                    Personalize a experiência de compra
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/produtos/checkout-builder/${id}`)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Abrir Checkout Builder
                  </Button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Parcelamento</p>
                        <p className="text-sm text-muted-foreground">
                          Até 12x sem juros
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">PIX</p>
                        <p className="text-sm text-muted-foreground">
                          Com desconto de 10%
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Boleto</p>
                        <p className="text-sm text-muted-foreground">
                          Vencimento em 3 dias
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Garantia</p>
                        <p className="text-sm text-muted-foreground">
                          7 dias de garantia
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integracoes" className="space-y-6 mt-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Integrações</CardTitle>
                  <CardDescription>
                    Conecte seu produto a outras plataformas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Webhook</p>
                        <p className="text-sm text-muted-foreground">
                          Notificar sistemas externos
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Pixel de Conversão</p>
                        <p className="text-sm text-muted-foreground">
                          Facebook, Google, TikTok
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Automação</p>
                        <p className="text-sm text-muted-foreground">
                          Zapier, Make, n8n
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
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
