import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Plus, 
  ExternalLink, 
  Copy, 
  Edit, 
  Trash2,
  BarChart3,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Checkout {
  id: string;
  nome: string;
  status: "ativo" | "pausado" | "rascunho";
  conversao: number;
  vendas: number;
  url: string;
}

interface CheckoutsListProps {
  produtoId: string;
  checkouts: Checkout[];
}

export default function CheckoutsList({ produtoId, checkouts }: CheckoutsListProps) {
  const navigate = useNavigate();

  const copiarLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pausado":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "rascunho":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "";
    }
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Checkouts do Produto
            </CardTitle>
            <CardDescription>
              Gerencie os checkouts e funis de venda deste produto
            </CardDescription>
          </div>
          <Button 
            size="sm"
            onClick={() => navigate(`/produtos/checkout-builder/${produtoId}`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Checkout
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {checkouts.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Nenhum checkout criado para este produto
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/produtos/checkout-builder/${produtoId}`)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Checkout
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {checkouts.map((checkout) => (
              <div
                key={checkout.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{checkout.nome}</h4>
                    <Badge variant="outline" className={getStatusColor(checkout.status)}>
                      {checkout.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {checkout.conversao}% conversão
                    </span>
                    <span>{checkout.vendas} vendas</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(checkout.url, "_blank")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copiarLink(checkout.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/produtos/checkout-builder/${produtoId}?checkoutId=${checkout.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
