
import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Bookmark, Share2, Star, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductProps {
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
  onAddToCart: (produto: any) => void;
  onAffiliate: (produtoId: number) => void;
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, 
  titulo, 
  vendedor, 
  preco, 
  comissao, 
  categoria, 
  avaliacao, 
  vendas, 
  imagem, 
  destaque, 
  tags,
  onAddToCart,
  onAffiliate
}) => {
  return (
    <div className="group bg-card border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={imagem} 
          alt={titulo}
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    tag === "bestseller" ? "bg-yellow-500 text-black" :
                    tag === "hot" ? "bg-red-500 text-white" :
                    tag === "ebook" ? "bg-blue-500 text-white" :
                    tag === "mentoria" ? "bg-purple-500 text-white" :
                    tag === "curso" ? "bg-green-500 text-white" :
                    tag === "consultoria" ? "bg-orange-500 text-white" :
                    tag === "premium" ? "bg-indigo-500 text-white" :
                    "bg-gray-500 text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              <button className="h-7 w-7 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors">
                <Heart size={14} />
              </button>
              <button className="h-7 w-7 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-4">
        <div>
          <Link to={`/marketplace/produto/${id}`} className="block">
            <h3 className="font-semibold hover:text-primary hover:underline line-clamp-2">{titulo}</h3>
          </Link>
          <div className="text-sm text-muted-foreground mt-1">por {vendedor}</div>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <span className="flex items-center gap-0.5">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{avaliacao.toFixed(1)}</span>
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{vendas} vendas</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">R$ {preco.toFixed(2)}</div>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <Percent size={14} className="mr-1" />
                {comissao}% de comissão
              </div>
            </div>
            
            <button 
              className="rounded-full h-8 w-8 bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onAddToCart({ id, titulo, preco, imagem, vendedor, categoria, comissao, avaliacao, vendas, destaque, tags })}
            >
              <ShoppingCart size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Button 
              size="sm" 
              onClick={() => onAddToCart({ id, titulo, preco, imagem, vendedor, categoria, comissao, avaliacao, vendas, destaque, tags })}
            >
              Comprar
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onAffiliate(id)}
            >
              <Bookmark size={14} className="mr-1" />
              Afiliar-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
