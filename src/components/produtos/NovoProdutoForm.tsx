
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X, ImageIcon, Upload, Plus, Package, Calendar, Tag } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Produto, TipoProduto } from "@/pages/ProdutosPage";

// Definição do esquema de validação para o produto
const produtoSchema = z.object({
  titulo: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  preco: z.coerce.number().min(0, "Preço deve ser positivo"),
  tipo: z.enum(["digital", "fisico", "assinatura"] as const),
  categoria: z.string().min(1, "Selecione uma categoria"),
  comissao: z.coerce.number().min(0, "Comissão deve ser positiva").max(100, "Comissão não pode passar de 100%"),
  disponivel: z.boolean().default(true),
  destaque: z.boolean().default(false),
  publicado: z.boolean().default(false),
  mercado: z.boolean().default(false),
  imagem: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

type ProdutoFormValues = z.infer<typeof produtoSchema>;

interface NovoProdutoFormProps {
  produtoAtual: Produto | null;
  onSalvar: (produto: Produto) => void;
  onCancelar: () => void;
}

const categorias = [
  "Cursos",
  "Ebooks",
  "Mentorias",
  "Ferramentas",
  "Templates",
  "Software",
  "Assinaturas",
  "Consultoria",
  "Coaching",
  "Outros"
];

const tagOpcoes = [
  { value: "bestseller", label: "Bestseller", cor: "bg-yellow-500 text-black" },
  { value: "hot", label: "Hot", cor: "bg-red-500 text-white" },
  { value: "ebook", label: "Ebook", cor: "bg-blue-500 text-white" },
  { value: "curso", label: "Curso", cor: "bg-green-500 text-white" },
  { value: "mentoria", label: "Mentoria", cor: "bg-purple-500 text-white" },
  { value: "consultoria", label: "Consultoria", cor: "bg-orange-500 text-white" },
  { value: "premium", label: "Premium", cor: "bg-indigo-500 text-white" },
  { value: "novo", label: "Novo", cor: "bg-emerald-500 text-white" },
];

const NovoProdutoForm: React.FC<NovoProdutoFormProps> = ({ 
  produtoAtual, 
  onSalvar, 
  onCancelar 
}) => {
  const [imagemPreview, setImagemPreview] = useState<string>(
    produtoAtual?.imagem || "https://placehold.co/600x400?text=Adicionar+Imagem"
  );
  const [tagsSelecionadas, setTagsSelecionadas] = useState<string[]>(
    produtoAtual?.tags || []
  );
  
  // Inicializar formulário com valores padrão ou do produto existente
  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues: produtoAtual ? {
      ...produtoAtual
    } : {
      titulo: "",
      descricao: "",
      preco: 0,
      tipo: "digital" as TipoProduto,
      categoria: "",
      comissao: 30,
      disponivel: true,
      destaque: false,
      publicado: false,
      mercado: false,
      imagem: "",
      tags: [],
    },
  });

  // Manipula o upload de imagem
  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aqui seria feito o upload real para um serviço de armazenamento
      const imageUrl = URL.createObjectURL(file);
      setImagemPreview(imageUrl);
      form.setValue("imagem", imageUrl);
    }
  };

  // Manipula a adição/remoção de tags
  const toggleTag = (tag: string) => {
    if (tagsSelecionadas.includes(tag)) {
      const novasTags = tagsSelecionadas.filter(t => t !== tag);
      setTagsSelecionadas(novasTags);
      form.setValue("tags", novasTags);
    } else {
      const novasTags = [...tagsSelecionadas, tag];
      setTagsSelecionadas(novasTags);
      form.setValue("tags", novasTags);
    }
  };

  // Submit do formulário
  const onSubmit = (data: ProdutoFormValues) => {
    // Garantir que todas as propriedades estão preenchidas
    const produtoFinal: Produto = {
      ...data,
      id: produtoAtual?.id || "",
      vendas: produtoAtual?.vendas || 0,
      avaliacao: produtoAtual?.avaliacao || 0,
      dataCriacao: produtoAtual?.dataCriacao || new Date().toISOString().split('T')[0],
      imagem: imagemPreview,
      tags: tagsSelecionadas,
    };
    
    onSalvar(produtoFinal);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="geral" className="flex items-center gap-2">
              <Package size={16} />
              <span>Informações Gerais</span>
            </TabsTrigger>
            <TabsTrigger value="detalhes" className="flex items-center gap-2">
              <Tag size={16} />
              <span>Detalhes</span>
            </TabsTrigger>
            <TabsTrigger value="monetizacao" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Monetização</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="space-y-6">
            {/* Upload de imagem */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <Label>Imagem do Produto</Label>
                <div className="mt-2 flex flex-col items-center space-y-2">
                  <div 
                    className="relative w-full aspect-square rounded-md overflow-hidden border border-input bg-background cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => document.getElementById("produto-imagem")?.click()}
                  >
                    <img 
                      src={imagemPreview} 
                      alt="Imagem do produto" 
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                      <div className="flex flex-col items-center">
                        <ImageIcon size={24} />
                        <span className="text-sm mt-2">Clique para alterar</span>
                      </div>
                    </div>
                  </div>
                  
                  <input 
                    type="file" 
                    id="produto-imagem" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImagemChange}
                  />
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => document.getElementById("produto-imagem")?.click()}
                  >
                    <Upload size={14} className="mr-2" />
                    Carregar Imagem
                  </Button>
                </div>
              </div>
              
              <div className="col-span-2 space-y-4">
                {/* Tipo do produto */}
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo do Produto</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo do produto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="digital">Digital</SelectItem>
                          <SelectItem value="fisico">Físico</SelectItem>
                          <SelectItem value="assinatura">Assinatura/Recorrente</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Título */}
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do produto" {...field} />
                      </FormControl>
                      <FormDescription>
                        Um título atrativo e claro para seu produto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Categoria */}
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categorias.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Descrição */}
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva seu produto em detalhes" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Descreva claramente o que seu produto oferece.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tagOpcoes.map((tag) => (
                  <Badge
                    key={tag.value}
                    variant={tagsSelecionadas.includes(tag.value) ? "default" : "outline"}
                    className={`cursor-pointer ${tagsSelecionadas.includes(tag.value) ? tag.cor : ""}`}
                    onClick={() => toggleTag(tag.value)}
                  >
                    {tag.label}
                  </Badge>
                ))}
                <Badge variant="outline" className="cursor-pointer border-dashed">
                  <Plus size={14} className="mr-1" />
                  Customizada
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selecione tags para destacar características do seu produto.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="detalhes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Disponibilidade */}
              <FormField
                control={form.control}
                name="disponivel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Disponível para venda</FormLabel>
                      <FormDescription>
                        Desative se o produto estiver temporariamente fora de estoque.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Destaque */}
              <FormField
                control={form.control}
                name="destaque"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Produto em destaque</FormLabel>
                      <FormDescription>
                        Produtos em destaque aparecem no topo da lista.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Publicado */}
              <FormField
                control={form.control}
                name="publicado"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publicar produto</FormLabel>
                      <FormDescription>
                        Produto será visível na sua loja quando publicado.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Marketplace */}
              <FormField
                control={form.control}
                name="mercado"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Disponível no Marketplace</FormLabel>
                      <FormDescription>
                        Permite que afiliados vendam seu produto.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="monetizacao" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preço */}
              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        min="0"
                        placeholder="0.00" 
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Valor de venda do produto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Comissão */}
              <FormField
                control={form.control}
                name="comissao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comissão para afiliados (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="1"
                        min="0"
                        max="100"
                        placeholder="30" 
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Percentual que afiliados ganham em cada venda.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border p-4 bg-muted/30">
              <h3 className="font-medium mb-2">Simulação de ganhos</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Preço do produto:</span>
                  <span className="font-medium">R$ {form.watch("preco").toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Comissão de afiliados ({form.watch("comissao")}%):</span>
                  <span className="font-medium text-amber-600">
                    - R$ {((form.watch("preco") * form.watch("comissao")) / 100).toFixed(2)}
                  </span>
                </div>
                
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-medium">Seu ganho por venda:</span>
                  <span className="font-bold text-green-600">
                    R$ {(form.watch("preco") * (1 - form.watch("comissao") / 100)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between pt-4 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancelar}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {produtoAtual ? 'Salvar Alterações' : 'Criar Produto'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default NovoProdutoForm;
