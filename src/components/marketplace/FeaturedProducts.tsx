
import React from "react";
import { TrendingUp, Star, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

interface FeaturedProductsProps {
  produtos: Produto[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ produtos }) => {
  const maisVendidos = [...produtos].sort((a, b) => b.vendas - a.vendas).slice(0, 5);
  const melhorAvaliados = [...produtos].sort((a, b) => b.avaliacao - a.avaliacao).slice(0, 5);
  const maiorComissao = [...produtos].sort((a, b) => b.comissao - a.comissao).slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Produtos mais vendidos */}
      <Card>
        <CardHeader className="bg-yellow-500/10 pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp size={18} className="text-yellow-500" />
            <span>Mais Vendidos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {maisVendidos.map((produto, idx) => (
              <Link 
                key={produto.id} 
                to={`/marketplace/produto/${produto.id}`}
                className="p-3 flex items-center gap-3 hover:bg-muted/50 block"
              >
                <div className="bg-muted font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm line-clamp-1">{produto.titulo}</div>
                  <div className="text-xs text-muted-foreground">{produto.vendas} vendas</div>
                </div>
                <div className="text-sm font-semibold">
                  R$ {produto.preco.toFixed(2)}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Melhor avaliados */}
      <Card>
        <CardHeader className="bg-blue-500/10 pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Star size={18} className="text-blue-500" />
            <span>Melhor Avaliados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {melhorAvaliados.map((produto, idx) => (
              <Link 
                key={produto.id} 
                to={`/marketplace/produto/${produto.id}`}
                className="p-3 flex items-center gap-3 hover:bg-muted/50 block"
              >
                <div className="bg-muted font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm line-clamp-1">{produto.titulo}</div>
                  <div className="text-xs flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.floor(produto.avaliacao) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-muted-foreground">{produto.avaliacao.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  R$ {produto.preco.toFixed(2)}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Maior comissão */}
      <Card>
        <CardHeader className="bg-green-500/10 pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Percent size={18} className="text-green-500" />
            <span>Maior Comissão</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {maiorComissao.map((produto, idx) => (
              <Link 
                key={produto.id} 
                to={`/marketplace/produto/${produto.id}`}
                className="p-3 flex items-center gap-3 hover:bg-muted/50 block"
              >
                <div className="bg-muted font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm line-clamp-1">{produto.titulo}</div>
                  <div className="text-xs text-muted-foreground">R$ {produto.preco.toFixed(2)}</div>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {produto.comissao}%
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedProducts;
