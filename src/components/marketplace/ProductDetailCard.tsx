
import React, { useState } from "react";
import { Star, Heart, Share2, Bookmark, CheckCircle, Percent, Edit, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProductDetailCardProps {
  produto: {
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
    descricao?: string;
  };
  onAddToCart: (produto: any) => void;
  onAffiliate: (produtoId: number) => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  produto,
  onAffiliate
}) => {
  const navigate = useNavigate();
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({
    experiencia: "",
    plataformas: "",
    estrategia: "",
    objetivo: ""
  });

  const handlePersonalizar = () => {
    navigate(`/produtos/checkout-builder/${produto.id}`);
  };
  
  const handleGoToSalesPage = () => {
    // Simulated sales page URL
    window.open(`/vendas/produto/${produto.id}`, "_blank");
    toast.success("Página de vendas aberta em nova aba");
  };
  
  const handleSubmitQuestionnaire = () => {
    const hasEmptyAnswers = Object.values(questionnaireAnswers).some(answer => answer.trim() === "");
    
    if (hasEmptyAnswers) {
      toast.error("Por favor, preencha todas as perguntas");
      return;
    }
    
    // Send questionnaire answers and request affiliation
    onAffiliate(produto.id);
    toast.success("Solicitação de afiliação enviada com sucesso!");
    setRequestDialogOpen(false);
  };

  const handleAnswerChange = (field: keyof typeof questionnaireAnswers, value: string) => {
    setQuestionnaireAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="relative">
          <img 
            src={produto.imagem} 
            alt={produto.titulo}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
              <Heart size={18} className="text-muted-foreground" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
              <Share2 size={18} className="text-muted-foreground" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {produto.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className={`
                    ${tag === "bestseller" ? "bg-yellow-500/10 text-yellow-700" : ""}
                    ${tag === "hot" ? "bg-red-500/10 text-red-700" : ""}
                    ${tag === "premium" ? "bg-indigo-500/10 text-indigo-700" : ""}
                    ${tag === "ebook" ? "bg-blue-500/10 text-blue-700" : ""}
                    ${tag === "curso" ? "bg-green-500/10 text-green-700" : ""}
                    ${tag === "mentoria" ? "bg-purple-500/10 text-purple-700" : ""}
                  `}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold">{produto.titulo}</h2>
            <div className="text-muted-foreground">por <span className="font-medium text-foreground">{produto.vendedor}</span></div>
            
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{produto.avaliacao.toFixed(1)}</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="text-muted-foreground">{produto.vendas} vendas</div>
              <div className="text-muted-foreground">•</div>
              <div className="text-muted-foreground">{produto.categoria}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">Preço</div>
              <div className="text-3xl font-bold">R$ {produto.preco.toFixed(2)}</div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center text-green-600 font-medium">
                <Percent size={16} className="mr-1" />
                {produto.comissao}% de comissão
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Ganhe até R$ {(produto.preco * (produto.comissao / 100)).toFixed(2)} por venda
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleGoToSalesPage}
            >
              <ExternalLink size={18} className="mr-2" />
              Página de Vendas
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1"
              onClick={() => setRequestDialogOpen(true)}
            >
              <Bookmark size={18} className="mr-2" />
              Afiliar-se
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1"
              onClick={handlePersonalizar}
            >
              <Edit size={18} className="mr-2" />
              Personalizar Checkout
            </Button>
          </div>
          
          <div className="space-y-2 pt-2">
            <div className="font-medium">Este produto inclui:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span>Acesso vitalício</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span>Certificado de conclusão</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span>Suporte por e-mail</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span>Atualizações gratuitas</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Affiliate Questionnaire Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Solicitar Afiliação</DialogTitle>
            <DialogDescription>
              Para avaliarmos seu pedido de afiliação, responda às perguntas abaixo sobre como você planeja divulgar {produto.titulo}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="font-medium text-sm">Qual sua experiência com marketing digital?</label>
              <Textarea 
                placeholder="Descreva sua experiência..." 
                value={questionnaireAnswers.experiencia}
                onChange={(e) => handleAnswerChange("experiencia", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium text-sm">Em quais plataformas/canais você pretende divulgar este produto?</label>
              <Textarea 
                placeholder="Ex: Instagram, YouTube, Email, Blog..." 
                value={questionnaireAnswers.plataformas}
                onChange={(e) => handleAnswerChange("plataformas", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium text-sm">Qual sua estratégia de divulgação?</label>
              <Textarea 
                placeholder="Como você planeja promover o produto..." 
                value={questionnaireAnswers.estrategia}
                onChange={(e) => handleAnswerChange("estrategia", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium text-sm">Qual seu objetivo com a afiliação deste produto?</label>
              <Textarea 
                placeholder="Por que deseja ser afiliado deste produto..." 
                value={questionnaireAnswers.objetivo}
                onChange={(e) => handleAnswerChange("objetivo", e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <MessageSquare size={16} />
              <span>Suas respostas serão analisadas pelo produtor para aprovação</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmitQuestionnaire}>Enviar Solicitação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetailCard;
