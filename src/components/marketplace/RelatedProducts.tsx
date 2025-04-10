
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "./ProductCard";

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
        <h3 className="text-xl font-bold">Produtos Relacionados</h3>
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
