
import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProductCard from "./ProductCard";

interface Produto {
  id: number;
  titulo: string;
  vendedor: string;
  preco: number;
  comissao: number;
  categoria: string;
  avaliacao: number;
  vendas: number;
  imagem: string;
  destaque: boolean;
  tags: string[];
}

interface ProductListProps {
  produtos: Produto[];
  visualizacao: "grid" | "lista";
  onAddToCart: (produto: any) => void;
  onAffiliate: (produtoId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  produtos,
  visualizacao,
  onAddToCart,
  onAffiliate
}) => {
  if (visualizacao === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in delay-300">
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            {...produto}
            onAddToCart={onAddToCart}
            onAffiliate={onAffiliate}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4 animate-fade-in delay-300">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Vendas</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Comissão</TableHead>
            <TableHead className="w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img 
                    src={produto.imagem} 
                    alt={produto.titulo}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium line-clamp-1">{produto.titulo}</div>
                    <div className="text-xs text-muted-foreground">{produto.vendedor}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{produto.categoria}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span>{produto.avaliacao.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell>{produto.vendas}</TableCell>
              <TableCell className="font-medium">R$ {produto.preco.toFixed(2)}</TableCell>
              <TableCell>
                <span className="text-green-600 font-medium">{produto.comissao}%</span>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost" asChild>
                  <Link to={`/marketplace/produto/${produto.id}`}>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
