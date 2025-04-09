
import { useState } from "react";
import Header from "@/components/Header";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProdutosPage() {
  const [loaded, setLoaded] = useState(false);
  
  // Simula carregamento para animação
  setTimeout(() => {
    if (!loaded) setLoaded(true);
  }, 100);
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className={cn("space-y-2", loaded && "animate-fade-in")}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Produtos</h1>
                <p className="text-muted-foreground">Gerencie seus produtos digitais e físicos.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Novo Produto
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn("flex flex-col gap-6", loaded && "animate-fade-in")}>
            {/* Resumo dos produtos em cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Total de Produtos</CardDescription>
                  <CardTitle className="text-2xl">27</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    14 digitais, 13 físicos
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Vendas no Período</CardDescription>
                  <CardTitle className="text-2xl">364</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-success flex items-center">
                    <span className="inline-block mr-1">+24%</span> comparado ao mês anterior
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Produto Mais Vendido</CardDescription>
                  <CardTitle className="text-2xl">Curso de Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    97 vendas este mês
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Lista de produtos */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Meus Produtos</CardTitle>
                <CardDescription>Visualize e gerencie seus produtos cadastrados.</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="todos" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="digitais">Digitais</TabsTrigger>
                    <TabsTrigger value="fisicos">Físicos</TabsTrigger>
                    <TabsTrigger value="assinaturas">Assinaturas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="todos">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Pesquisar produtos..."
                          className="pl-9 bg-background"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Placeholder para produtos - em desenvolvimento */}
                      <div className="flex flex-col items-center justify-center h-[200px] border border-dashed border-muted rounded-xl p-6 text-center">
                        <p className="text-muted-foreground mb-4">Lista de produtos em desenvolvimento</p>
                        <Button variant="outline" size="sm">Adicionar Produto</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="digitais">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando produtos digitais...</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fisicos">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando produtos físicos...</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="assinaturas">
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">Visualizando produtos de assinatura...</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
