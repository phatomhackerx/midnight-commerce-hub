
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Copy, Edit, Plus, Save, Trash, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function QuizPage() {
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
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Quiz e Pesquisas</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <CheckCircle size={16} />
                  <span>Resultados</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Novo Quiz</span>
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">Crie quizzes e pesquisas para engajar seus clientes e obter insights valiosos.</p>
          </div>
          
          <Tabs defaultValue="ativos" className={cn(loaded && "animate-fade-in transition-all duration-500")}>
            <TabsList>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="inativos">Inativos</TabsTrigger>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ativos" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Input placeholder="Buscar quiz..." className="pl-9 w-[300px]" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <Button size="sm" className="gap-1">
                  <Plus size={16} />
                  <span>Criar Quiz</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quizAtivos.map((quiz, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{quiz.titulo}</CardTitle>
                        <Badge className="bg-success">{quiz.tipo}</Badge>
                      </div>
                      <CardDescription>{quiz.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Perguntas:</span>
                          <span>{quiz.perguntas}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Respostas:</span>
                          <span>{quiz.respostas}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Criado em:</span>
                          <span>{quiz.criacao}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Edit size={16} />
                        <span>Editar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Copy size={16} />
                        <span>Copiar Link</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inativos" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Input placeholder="Buscar quiz..." className="pl-9 w-[300px]" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quizInativos.map((quiz, index) => (
                  <Card key={index} className="transition-all hover:shadow-md border-muted">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{quiz.titulo}</CardTitle>
                        <Badge variant="outline">{quiz.tipo}</Badge>
                      </div>
                      <CardDescription>{quiz.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Perguntas:</span>
                          <span>{quiz.perguntas}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Respostas:</span>
                          <span>{quiz.respostas}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Encerrado em:</span>
                          <span>{quiz.encerramento}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <CheckCircle size={16} />
                        <span>Reativar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-1 text-destructive hover:text-destructive">
                        <Trash size={16} />
                        <span>Excluir</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resultados" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Resultados</CardTitle>
                  <CardDescription>Visualize os resultados e insights dos seus quizzes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Quiz de Satisfação do Cliente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total de Respostas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">248</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Satisfação Média</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4.7/5</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Taxa de Conclusão</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">92%</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Última Resposta</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-medium">27 min atrás</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Quiz de Preferências de Produto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total de Respostas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">187</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Produto Favorito</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-medium">Curso Premium</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Taxa de Conclusão</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">87%</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Última Resposta</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-medium">2h atrás</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="gap-1">
                      <CheckCircle size={16} />
                      <span>Ver Relatório Completo</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className={cn("border-primary/20", loaded && "animate-fade-in transition-all duration-500")}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Criar Novo Quiz</CardTitle>
                  <CardDescription>Configure um novo quiz rapidamente</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Título do Quiz</label>
                  <Input placeholder="Ex: Pesquisa de Satisfação" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Tipo</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="pesquisa">Pesquisa</option>
                    <option value="quiz">Quiz</option>
                    <option value="avaliacao">Avaliação</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Descrição</label>
                <textarea 
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Descreva seu quiz..."
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium mb-1.5 block">Perguntas</label>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex gap-2 items-start">
                    <div className="bg-primary text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs mt-1">1</div>
                    <div className="flex-1">
                      <Input placeholder="Digite sua pergunta..." />
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border flex items-center justify-center">
                            <Check size={12} />
                          </div>
                          <Input placeholder="Opção de resposta..." className="flex-1" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border flex items-center justify-center">
                          </div>
                          <Input placeholder="Opção de resposta..." className="flex-1" />
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 mt-1">
                          <Plus size={14} />
                          <span>Adicionar opção</span>
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash size={16} />
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="sm" className="gap-1 w-full">
                    <Plus size={16} />
                    <span>Adicionar Pergunta</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="gap-1">
                <Save size={16} />
                <span>Salvar Quiz</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Dados fictícios para os quizzes ativos
const quizAtivos = [
  {
    titulo: "Pesquisa de Satisfação",
    tipo: "Pesquisa",
    descricao: "Avalie a satisfação dos clientes com nossos produtos",
    perguntas: "8 perguntas",
    respostas: "248 respostas",
    criacao: "10/05/2024"
  },
  {
    titulo: "Preferências de Produto",
    tipo: "Quiz",
    descricao: "Entenda as preferências dos seus clientes",
    perguntas: "5 perguntas",
    respostas: "187 respostas",
    criacao: "15/05/2024"
  },
  {
    titulo: "Avaliação de Atendimento",
    tipo: "Avaliação",
    descricao: "Avalie a qualidade do nosso atendimento",
    perguntas: "6 perguntas",
    respostas: "122 respostas",
    criacao: "20/05/2024"
  }
];

// Dados fictícios para os quizzes inativos
const quizInativos = [
  {
    titulo: "Feedback de Lançamento",
    tipo: "Feedback",
    descricao: "Avalie nosso recente lançamento de produto",
    perguntas: "7 perguntas",
    respostas: "98 respostas",
    encerramento: "01/05/2024"
  },
  {
    titulo: "Pesquisa de Usabilidade",
    tipo: "Pesquisa",
    descricao: "Avalie a usabilidade do nosso site",
    perguntas: "10 perguntas",
    respostas: "156 respostas",
    encerramento: "15/04/2024"
  }
];
