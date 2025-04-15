
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Validator for creating a new coupon
const formSchema = z.object({
  codigo: z.string().min(3, {
    message: "Código deve ter pelo menos 3 caracteres",
  }).max(20, {
    message: "Código deve ter no máximo 20 caracteres",
  }),
  tipo: z.enum(["percentual", "fixo"], {
    required_error: "Selecione o tipo de desconto",
  }),
  valor: z.coerce.number().min(1, {
    message: "O valor deve ser maior que 0",
  }),
  validade: z.string().min(1, {
    message: "A data de validade é obrigatória",
  }),
  produtos: z.string().min(1, {
    message: "Especifique os produtos aplicáveis",
  }),
  limitePorUsuario: z.coerce.number().min(1, {
    message: "O limite por usuário deve ser maior que 0",
  }),
});

interface CouponFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function CouponForm({ onSubmit }: CouponFormProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      tipo: "percentual",
      valor: 10,
      validade: new Date().toISOString().split('T')[0],
      produtos: "Todos",
      limitePorUsuario: 1,
    },
  });
  
  // Função para gerar um código de cupom aleatório
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue('codigo', code);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código do Cupom</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input {...field} placeholder="BLACKFRIDAY" />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={generateRandomCode}
                    title="Gerar código aleatório"
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription>
                  Código que o cliente usará para obter o desconto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Desconto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="percentual">Percentual (%)</SelectItem>
                    <SelectItem value="fixo">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Escolha entre desconto percentual ou valor fixo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Desconto</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    min={1} 
                    placeholder={form.watch("tipo") === "percentual" ? "10" : "50"}
                  />
                </FormControl>
                <FormDescription>
                  {form.watch("tipo") === "percentual" 
                    ? "Valor em porcentagem (ex: 10 para 10%)" 
                    : "Valor em reais (ex: 50 para R$50)"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="validade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Validade</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Data limite para uso do cupom
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="produtos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produtos Aplicáveis</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Todos, Curso Específico, etc." />
                </FormControl>
                <FormDescription>
                  Produtos ou categorias onde o cupom pode ser usado
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="limitePorUsuario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite por Usuário</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={1} />
                </FormControl>
                <FormDescription>
                  Quantas vezes o mesmo usuário pode usar este cupom
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">Criar Cupom</Button>
        </div>
      </form>
    </Form>
  );
}
