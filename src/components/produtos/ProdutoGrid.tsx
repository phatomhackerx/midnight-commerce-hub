
import React from "react";
import { Produto } from "@/pages/ProdutosPage";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, MoreVertical, Globe, Lock, Package2, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ProdutoGridProps {
  produtos: Produto[];
  onEditar: (produto: Produto) => void;
  onTogglePublicado: (id: string) => void;
  onToggleMercado: (id: string) => void;
}

const ProdutoGrid: React.FC<ProdutoGridProps> = ({
  produtos,
  onEditar,
  onTogglePublicado,
  onToggleMercado
}) => {
  // Renderiza o ícone do tipo de produto
  const renderTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'digital':
        return <Package2 size={16} className="mr-1 text-blue-500" />;
      case 'fisico':
        return <Package2 size={16} className="mr-1 text-orange-500" />;
      case 'assinatura':
        return <Calendar size={16} className="mr-1 text-purple-500" />;
      default:
        return <Package2 size={16} className="mr-1" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <Card 
          key={produto.id} 
          className={cn(
            "group overflow-hidden transition-all duration-200 hover:shadow-md",
            !produto.publicado && "opacity-70"
          )}
        >
          <div className="relative">
            <img 
              src={produto.imagem} 
              alt={produto.titulo}
              className="w-full h-44 object-cover"
            />
            
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge 
                variant={produto.publicado ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-1",
                  produto.publicado ? "bg-green-500 hover:bg-green-600" : "bg-background text-muted-foreground"
                )}
              >
                {produto.publicado ? (
                  <>
                    <Eye size={12} />
                    <span className="text-xs">Publicado</span>
                  </>
                ) : (
                  <>
                    <Lock size={12} />
                    <span className="text-xs">Não publicado</span>
                  </>
                )}
              </Badge>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs">
                  {renderTipoIcon(produto.tipo)}
                  <span className="capitalize">{produto.tipo}</span>
                </div>
                
                {produto.mercado && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe size={10} />
                    <span className="text-[10px]">Marketplace</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-2 mb-1">{produto.titulo}</h3>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold">R$ {produto.preco.toFixed(2)}</span>
              <div className="text-sm text-muted-foreground">
                {produto.vendas} {produto.vendas === 1 ? 'venda' : 'vendas'}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {produto.tags.map((tag, idx) => (
                <Badge 
                  key={idx}
                  variant="secondary" 
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {produto.descricao}
            </p>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mr-1 gap-1"
              onClick={() => onEditar(produto)}
            >
              <Eye size={14} />
              <span>Detalhes</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Ações do Produto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEditar(produto)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Editar produto</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(`/produtos/config/${produto.id}`, '_self')}>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Configurar Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTogglePublicado(produto.id)}>
                  {produto.publicado ? (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Despublicar</span>
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Publicar</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleMercado(produto.id)}>
                  {produto.mercado ? (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Remover do Marketplace</span>
                    </>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Adicionar ao Marketplace</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProdutoGrid;
