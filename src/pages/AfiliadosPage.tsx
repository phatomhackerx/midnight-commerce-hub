
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Download, Filter, Link, Plus, RefreshCw, Share2, Users, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AfiliadosPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen grok-bg">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Afiliados</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw size={16} />
                  <span>Atualizar</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Convidar Afiliado</span>
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Gerencie afiliados e comissões</p>
          </div>
          
          <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4", loaded && "animate-fade-in")}>
            <Card className="minimal-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  <span>Total de Afiliados</span>
                </CardTitle>
                <CardDescription>Afiliados cadastrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">48</div>
              </CardContent>
            </Card>
            
            <Card className="minimal-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet size={20} />
                  <span>Comissões (Mês)</span>
                </CardTitle>
                <CardDescription>Total a pagar no mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 4.785,30</div>
              </CardContent>
            </Card>
            
            <Card className="minimal-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Share2 size={20} />
                  <span>Conversões (Mês)</span>
                </CardTitle>
                <CardDescription>Vendas convertidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">97</div>
              </CardContent>
            </Card>
            
            <Card className="minimal-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Link size={20} />
                  <span>Cliques (Mês)</span>
                </CardTitle>
                <CardDescription>Total de cliques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.456</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="afiliados" className={cn(loaded && "animate-fade-in transition-all duration-500")}>
            <TabsList>
              <TabsTrigger value="afiliados">Afiliados</TabsTrigger>
              <TabsTrigger value="comissoes">Comissões</TabsTrigger>
              <TabsTrigger value="materiais">Materiais</TabsTrigger>
            </TabsList>
            
            <TabsContent value="afiliados" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input placeholder="Buscar afiliado..." className="pl-9 w-[300px]" />
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">Status</Button>
                </div>
                
                <Button variant="outline" size="sm" className="gap-1">
                  <Download size={16} />
                  <span>Exportar</span>
                </Button>
              </div>
              
              <Card className="minimal-card">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Afiliado</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Conversões</TableHead>
                        <TableHead>Taxa</TableHead>
                        <TableHead>Comissões</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {afiliados.map((afiliado, index) => (
                        <TableRow key={index} className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-medium">{afiliado.nome}</TableCell>
                          <TableCell>{afiliado.email}</TableCell>
                          <TableCell>
                            <Badge variant={
                              afiliado.status === "Ativo" ? "default" : 
                              afiliado.status === "Pendente" ? "outline" : 
                              "destructive"
                            }>
                              {afiliado.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{afiliado.conversoes}</TableCell>
                          <TableCell>{afiliado.taxa}</TableCell>
                          <TableCell>
                            <span className="font-medium">{afiliado.comissoes}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Wallet size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comissoes" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input placeholder="Buscar comissão..." className="pl-9 w-[300px]" />
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">Status</Button>
                  <Button variant="outline" size="sm">Período</Button>
                </div>
                
                <Button size="sm" className="gap-1">
                  <Wallet size={16} />
                  <span>Processar Pagamentos</span>
                </Button>
              </div>
              
              <Card className="minimal-card">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Afiliado</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Comissão</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comissoes.map((comissao, index) => (
                        <TableRow key={index} className="transition-colors hover:bg-muted/30">
                          <TableCell className="font-mono text-xs">{comissao.id}</TableCell>
                          <TableCell className="font-medium">{comissao.afiliado}</TableCell>
                          <TableCell>{comissao.produto}</TableCell>
                          <TableCell>{comissao.data}</TableCell>
                          <TableCell>{comissao.valor}</TableCell>
                          <TableCell className="font-medium">{comissao.comissao}</TableCell>
                          <TableCell>
                            <Badge variant={
                              comissao.status === "Pago" ? "default" : 
                              comissao.status === "Pendente" ? "outline" : 
                              "destructive"
                            }>
                              {comissao.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="materiais" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {materiais.map((material, index) => (
                  <Card key={index} className="minimal-card hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{material.titulo}</CardTitle>
                        <Badge>{material.tipo}</Badge>
                      </div>
                      <CardDescription>{material.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-video bg-muted/50 rounded-md flex items-center justify-center">
                        {material.tipo === "Banner" ? (
                          <div className="text-sm text-muted-foreground">Preview do Banner</div>
                        ) : material.tipo === "Vídeo" ? (
                          <div className="text-sm text-muted-foreground">Preview do Vídeo</div>
                        ) : (
                          <div className="text-sm text-muted-foreground">Preview do Material</div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Download size={16} />
                          <span>Baixar</span>
                        </Button>
                        <Button size="sm" className="w-full gap-1">
                          <Link size={16} />
                          <span>Copiar Link</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

// Dados fictícios para a lista de afiliados
const afiliados = [
  { nome: "Rodrigo Alves", email: "rodrigo@email.com", status: "Ativo", conversoes: 23, taxa: "15%", comissoes: "R$ 1.245,30" },
  { nome: "Camila Ferreira", email: "camila@email.com", status: "Ativo", conversoes: 17, taxa: "15%", comissoes: "R$ 950,75" },
  { nome: "Marcos Silva", email: "marcos@email.com", status: "Inativo", conversoes: 0, taxa: "15%", comissoes: "R$ 0,00" },
  { nome: "Júlia Santos", email: "julia@email.com", status: "Ativo", conversoes: 31, taxa: "20%", comissoes: "R$ 1.870,50" },
  { nome: "Gabriel Costa", email: "gabriel@email.com", status: "Pendente", conversoes: 0, taxa: "10%", comissoes: "R$ 0,00" },
  { nome: "Carolina Lima", email: "carolina@email.com", status: "Ativo", conversoes: 12, taxa: "15%", comissoes: "R$ 718,75" }
];

// Dados fictícios para a lista de comissões
const comissoes = [
  { id: "COM24050001", afiliado: "Júlia Santos", produto: "Curso Premium", data: "28/05/2024", valor: "R$ 297,00", comissao: "R$ 59,40", status: "Pago" },
  { id: "COM24050002", afiliado: "Rodrigo Alves", produto: "Assinatura Anual", data: "27/05/2024", valor: "R$ 997,00", comissao: "R$ 149,55", status: "Pago" },
  { id: "COM24050003", afiliado: "Camila Ferreira", produto: "Ebook Digital", data: "26/05/2024", valor: "R$ 97,00", comissao: "R$ 14,55", status: "Pendente" },
  { id: "COM24050004", afiliado: "Júlia Santos", produto: "Mentoria VIP", data: "25/05/2024", valor: "R$ 1.997,00", comissao: "R$ 399,40", status: "Pendente" },
  { id: "COM24050005", afiliado: "Carolina Lima", produto: "Curso Básico", data: "24/05/2024", valor: "R$ 197,00", comissao: "R$ 29,55", status: "Pago" },
  { id: "COM24050006", afiliado: "Rodrigo Alves", produto: "Assinatura Mensal", data: "23/05/2024", valor: "R$ 97,00", comissao: "R$ 14,55", status: "Cancelado" }
];

// Dados fictícios para os materiais promocionais
const materiais = [
  {
    titulo: "Banner Principal",
    tipo: "Banner",
    descricao: "Banner principal para promoção do produto principal"
  },
  {
    titulo: "Vídeo de Vendas",
    tipo: "Vídeo",
    descricao: "Vídeo promocional para página de vendas"
  },
  {
    titulo: "Email Marketing",
    tipo: "Email",
    descricao: "Template de email para lançamentos"
  },
  {
    titulo: "Post Instagram",
    tipo: "Social",
    descricao: "Template para posts no Instagram"
  },
  {
    titulo: "Stories Promocionais",
    tipo: "Social",
    descricao: "Templates para stories no Instagram e Facebook"
  },
  {
    titulo: "Banner Lateral",
    tipo: "Banner",
    descricao: "Banner lateral para blogs e sites parceiros"
  }
];
