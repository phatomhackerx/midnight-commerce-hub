
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Copy, Edit, Plus, Save, Trash } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function QuizPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Quiz Builder</h1>
              <p className="text-muted-foreground mt-1">Crie questionários interativos</p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus size={16} />
              Novo Quiz
            </Button>
          </div>

          <Tabs defaultValue="ativos">
            <TabsList>
              <TabsTrigger value="ativos">Quizzes Ativos</TabsTrigger>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ativos" className="space-y-4 pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="minimal-card hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg">Quiz de Satisfação</CardTitle>
                      <CardDescription>248 respostas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Perguntas:</span>
                          <span>8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Taxa conclusão:</span>
                          <span>92%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Edit size={14} />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Copy size={14} />
                        Link
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resultados" className="pt-6">
              <div className="minimal-card p-8 text-center">
                <CheckCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-semibold mb-2">Resultados dos Quizzes</h3>
                <p className="text-muted-foreground">Visualize análises detalhadas das respostas</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
