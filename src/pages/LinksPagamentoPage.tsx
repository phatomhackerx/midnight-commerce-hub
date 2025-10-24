import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, ExternalLink, Plus, QrCode, Share2, Trash2, Edit, Eye, Link as LinkIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface LinkPagamento {
  id: string;
  titulo: string;
  descricao: string;
  valor: number;
  tipo: "unico" | "recorrente";
  ativo: boolean;
  url: string;
  visualizacoes: number;
  conversoes: number;
  dataCriacao: string;
}

const linksMock: LinkPagamento[] = [
  {
    id: "1",
    titulo: "Curso Completo de Marketing",
    descricao: "Acesso vitalício ao curso completo",
    valor: 297,
    tipo: "unico",
    ativo: true,
    url: "https://pay.minhaurl.com/curso-marketing",
    visualizacoes: 1245,
    conversoes: 87,
    dataCriacao: "2024-01-15"
  },
  {
    id: "2",
    titulo: "Assinatura Mensal Premium",
    descricao: "Acesso a todos os cursos",
    valor: 97,
    tipo: "recorrente",
    ativo: true,
    url: "https://pay.minhaurl.com/assinatura-premium",
    visualizacoes: 856,
    conversoes: 34,
    dataCriacao: "2024-02-20"
  }
];

export default function LinksPagamentoPage() {
  const [loaded, setLoaded] = useState(false);
  const [links, setLinks] = useState<LinkPagamento[]>(linksMock);
  const [novoLinkAberto, setNovoLinkAberto] = useState(false);
  const { toast } = useToast();

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

  const toggleAtivo = (id: string) => {
    setLinks(prevLinks =>
      prevLinks.map(link =>
        link.id === id ? { ...link, ativo: !link.ativo } : link
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />

      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Links de Pagamento</h1>
                <p className="text-muted-foreground">Crie links de pagamento rápidos para seus produtos</p>
              </div>

              <Dialog open={novoLinkAberto} onOpenChange={setNovoLinkAberto}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Criar Link
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Criar Link de Pagamento</DialogTitle>
                    <DialogDescription>
                      Crie um link de pagamento personalizado para seu produto
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título</Label>
                      <Input id="titulo" placeholder="Nome do produto ou serviço" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea id="descricao" placeholder="Descreva o que o cliente vai receber" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input id="valor" type="number" placeholder="0,00" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select defaultValue="unico">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unico">Pagamento Único</SelectItem>
                            <SelectItem value="recorrente">Recorrente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url">URL Personalizada</Label>
                      <div className="flex gap-2">
                        <span className="flex items-center text-sm text-muted-foreground px-3 border rounded-md bg-muted">
                          pay.minhaurl.com/
                        </span>
                        <Input id="url" placeholder="meu-produto" className="flex-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Link ativo</p>
                        <p className="text-sm text-muted-foreground">
                          Ative para permitir pagamentos
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNovoLinkAberto(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => {
                      setNovoLinkAberto(false);
                      toast({
                        title: "Link criado!",
                        description: "Seu link de pagamento foi criado com sucesso.",
                      });
                    }}>
                      Criar Link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <LinkIcon size={20} className="text-primary" />
                  <span>Links Ativos</span>
                </CardTitle>
                <CardDescription>Total de links criados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold">
                  {links.filter(l => l.ativo).length}
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Eye size={20} />
                  <span>Visualizações</span>
                </CardTitle>
                <CardDescription>Total do mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold">
                  {links.reduce((sum, link) => sum + link.visualizacoes, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <TrendingUp size={20} />
                  <span>Conversões</span>
                </CardTitle>
                <CardDescription>Total de vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold">
                  {links.reduce((sum, link) => sum + link.conversoes, 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <TrendingUp size={20} className="text-green-500" />
                  <span>Taxa de Conversão</span>
                </CardTitle>
                <CardDescription>Média geral</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold">
                  {((links.reduce((sum, link) => sum + link.conversoes, 0) / 
                     links.reduce((sum, link) => sum + link.visualizacoes, 0)) * 100).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={cn("premium-card", loaded && "animate-fade-in")}>
            <CardHeader>
              <CardTitle>Meus Links</CardTitle>
              <CardDescription>Gerencie seus links de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Título</TableHead>
                      <TableHead className="min-w-[120px]">Valor</TableHead>
                      <TableHead className="min-w-[100px]">Tipo</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[100px] text-center">Views</TableHead>
                      <TableHead className="min-w-[100px] text-center">Conversões</TableHead>
                      <TableHead className="min-w-[100px] text-center">Taxa</TableHead>
                      <TableHead className="text-right min-w-[200px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {links.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{link.titulo}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {link.descricao}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">R$ {link.valor.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {link.tipo === "unico" ? "Único" : "Recorrente"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={link.ativo ? "default" : "secondary"}>
                            {link.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{link.visualizacoes}</TableCell>
                        <TableCell className="text-center">{link.conversoes}</TableCell>
                        <TableCell className="text-center">
                          {((link.conversoes / link.visualizacoes) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => copiarLink(link.url)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => window.open(link.url, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
