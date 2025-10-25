import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Layout, 
  Palette,
  Settings,
  Upload
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AreaMembrosConfig {
  ativa: boolean;
  titulo: string;
  logo: string | null;
  corPrimaria: string;
  layout: "moderno" | "classico" | "minimalista";
  liberacaoConteudo: "imediata" | "gotejamento";
  mensagemBoasVindas: string;
}

interface AreaMembrosConfigProps {
  config: AreaMembrosConfig;
  onChange: (config: AreaMembrosConfig) => void;
}

export default function AreaMembrosConfigComponent({ config, onChange }: AreaMembrosConfigProps) {
  const updateConfig = (updates: Partial<AreaMembrosConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Área de Membros
            </CardTitle>
            <CardDescription>
              Configure a área exclusiva para seus alunos/compradores
            </CardDescription>
          </div>
          <Switch
            checked={config.ativa}
            onCheckedChange={(ativa) => updateConfig({ ativa })}
          />
        </div>
      </CardHeader>

      {config.ativa && (
        <CardContent>
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="geral">
                <Settings className="h-4 w-4 mr-2" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="design">
                <Palette className="h-4 w-4 mr-2" />
                Design
              </TabsTrigger>
              <TabsTrigger value="conteudo">
                <Layout className="h-4 w-4 mr-2" />
                Conteúdo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="titulo-area">Título da Área</Label>
                <Input
                  id="titulo-area"
                  value={config.titulo}
                  onChange={(e) => updateConfig({ titulo: e.target.value })}
                  placeholder="Ex: Portal do Aluno"
                />
              </div>

              <div>
                <Label htmlFor="mensagem-boas-vindas">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="mensagem-boas-vindas"
                  value={config.mensagemBoasVindas}
                  onChange={(e) => updateConfig({ mensagemBoasVindas: e.target.value })}
                  placeholder="Mensagem que aparecerá quando o aluno fizer login"
                  rows={4}
                />
              </div>

              <div>
                <Label>Liberação de Conteúdo</Label>
                <Select 
                  value={config.liberacaoConteudo}
                  onValueChange={(value: any) => updateConfig({ liberacaoConteudo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imediata">Liberação Imediata</SelectItem>
                    <SelectItem value="gotejamento">Gotejamento (Drip Content)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {config.liberacaoConteudo === "imediata" 
                    ? "Todo conteúdo disponível imediatamente" 
                    : "Conteúdo liberado gradualmente"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="logo-area">Logo da Área de Membros</Label>
                <div className="mt-2 flex items-center gap-3">
                  {config.logo && (
                    <img 
                      src={config.logo} 
                      alt="Logo" 
                      className="h-16 w-16 object-contain rounded border"
                    />
                  )}
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="h-4 w-4 mr-2" />
                    {config.logo ? "Alterar Logo" : "Upload Logo"}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="cor-primaria">Cor Primária</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="cor-primaria"
                    type="color"
                    value={config.corPrimaria}
                    onChange={(e) => updateConfig({ corPrimaria: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.corPrimaria}
                    onChange={(e) => updateConfig({ corPrimaria: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Layout</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {["moderno", "classico", "minimalista"].map((layout) => (
                    <button
                      key={layout}
                      type="button"
                      onClick={() => updateConfig({ layout: layout as any })}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        config.layout === layout
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Layout className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-xs font-medium capitalize">{layout}</p>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conteudo" className="space-y-4 mt-4">
              <div className="text-center py-8 border border-dashed rounded-lg">
                <GraduationCap className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Configure módulos, aulas e materiais na aba de Entregáveis
                </p>
                <Button variant="outline" size="sm" type="button">
                  Gerenciar Conteúdo
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}
