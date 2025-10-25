import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Link2, 
  Video, 
  Upload, 
  Trash2, 
  Plus,
  File,
  Download
} from "lucide-react";

interface Entregavel {
  id: string;
  tipo: "arquivo" | "link" | "video";
  nome: string;
  url: string;
  tamanho?: string;
}

interface EntregaveisFormProps {
  entregaveis: Entregavel[];
  onChange: (entregaveis: Entregavel[]) => void;
}

export default function EntregaveisForm({ entregaveis, onChange }: EntregaveisFormProps) {
  const [novoEntregavel, setNovoEntregavel] = useState({
    tipo: "link" as "arquivo" | "link" | "video",
    nome: "",
    url: "",
  });

  const adicionarEntregavel = () => {
    if (!novoEntregavel.nome || !novoEntregavel.url) {
      return;
    }

    const entregavel: Entregavel = {
      id: Date.now().toString(),
      tipo: novoEntregavel.tipo,
      nome: novoEntregavel.nome,
      url: novoEntregavel.url,
    };

    onChange([...entregaveis, entregavel]);
    setNovoEntregavel({ tipo: "link", nome: "", url: "" });
  };

  const removerEntregavel = (id: string) => {
    onChange(entregaveis.filter(e => e.id !== id));
  };

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "arquivo":
        return <File className="h-4 w-4" />;
      case "link":
        return <Link2 className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Entregáveis do Produto
        </CardTitle>
        <CardDescription>
          Configure os arquivos, links e conteúdos que serão entregues ao comprador
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={novoEntregavel.tipo} onValueChange={(v) => setNovoEntregavel({ ...novoEntregavel, tipo: v as any })}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">
              <Link2 className="h-4 w-4 mr-2" />
              Link
            </TabsTrigger>
            <TabsTrigger value="arquivo">
              <File className="h-4 w-4 mr-2" />
              Arquivo
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Vídeo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="nome-link">Nome do Link</Label>
              <Input
                id="nome-link"
                placeholder="Ex: Acesso ao curso"
                value={novoEntregavel.nome}
                onChange={(e) => setNovoEntregavel({ ...novoEntregavel, nome: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="url-link">URL</Label>
              <Input
                id="url-link"
                placeholder="https://..."
                value={novoEntregavel.url}
                onChange={(e) => setNovoEntregavel({ ...novoEntregavel, url: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="arquivo" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="nome-arquivo">Nome do Arquivo</Label>
              <Input
                id="nome-arquivo"
                placeholder="Ex: Ebook completo"
                value={novoEntregavel.nome}
                onChange={(e) => setNovoEntregavel({ ...novoEntregavel, nome: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="upload-arquivo">Upload</Label>
              <div className="mt-2">
                <Button variant="outline" className="w-full" type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar arquivo
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="nome-video">Nome do Vídeo</Label>
              <Input
                id="nome-video"
                placeholder="Ex: Aula introdutória"
                value={novoEntregavel.nome}
                onChange={(e) => setNovoEntregavel({ ...novoEntregavel, nome: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="url-video">URL do Vídeo (YouTube, Vimeo, etc)</Label>
              <Input
                id="url-video"
                placeholder="https://..."
                value={novoEntregavel.url}
                onChange={(e) => setNovoEntregavel({ ...novoEntregavel, url: e.target.value })}
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={adicionarEntregavel} className="w-full" type="button">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Entregável
        </Button>

        {entregaveis.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <Label>Entregáveis Cadastrados</Label>
            {entregaveis.map((entregavel) => (
              <div
                key={entregavel.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getIconByType(entregavel.tipo)}
                  <div>
                    <p className="font-medium text-sm">{entregavel.nome}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {entregavel.url}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removerEntregavel(entregavel.id)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
