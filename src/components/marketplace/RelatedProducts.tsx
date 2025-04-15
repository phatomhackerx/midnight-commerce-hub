
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface RelatedProductsProps {
  produtos: any[];
  currentProductId: number;
  onAddToCart: (produto: any) => void;
  onAffiliate: (produtoId: number) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  produtos,
  currentProductId,
  onAddToCart,
  onAffiliate
}) => {
  // Filter out the current product and limit to 4 related products
  const relatedProducts = produtos
    .filter(produto => produto.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Produtos Relacionados</h3>
            <Badge variant="purple" size="sm" className="ml-2">
              {relatedProducts.length} produtos
            </Badge>
          </div>
          <Button variant="link" asChild className="text-primary">
            <Link to="/marketplace" className="flex items-center gap-1">
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((produto) => (
            <ProductCard
              key={produto.id}
              {...produto}
              onAddToCart={onAddToCart}
              onAffiliate={onAffiliate}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedProducts;
