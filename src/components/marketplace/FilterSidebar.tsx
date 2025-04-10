
import React from "react";
import { Check, DollarSign, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  categorias: string[];
  faixasPreco: string[];
  filtroCategorias: string[];
  filtroPreco: string[];
  filtroAvaliacao: number[];
  setFiltroCategorias: (value: string[]) => void;
  setFiltroPreco: (value: string[]) => void;
  setFiltroAvaliacao: (value: number[]) => void;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categorias,
  faixasPreco,
  filtroCategorias,
  filtroPreco,
  filtroAvaliacao,
  setFiltroCategorias,
  setFiltroPreco,
  setFiltroAvaliacao,
  onClose
}) => {
  const handleCategoriaChange = (categoria: string, checked: boolean | "indeterminate") => {
    if (checked) {
      setFiltroCategorias([...filtroCategorias, categoria]);
    } else {
      setFiltroCategorias(filtroCategorias.filter(cat => cat !== categoria));
    }
  };

  const handlePrecoChange = (preco: string, checked: boolean | "indeterminate") => {
    if (checked) {
      setFiltroPreco([...filtroPreco, preco]);
    } else {
      setFiltroPreco(filtroPreco.filter(p => p !== preco));
    }
  };

  const handleAvaliacaoChange = (rating: number, checked: boolean | "indeterminate") => {
    if (checked) {
      setFiltroAvaliacao([...filtroAvaliacao, rating]);
    } else {
      setFiltroAvaliacao(filtroAvaliacao.filter(r => r !== rating));
    }
  };

  const limparFiltros = () => {
    setFiltroCategorias([]);
    setFiltroPreco([]);
    setFiltroAvaliacao([]);
  };

  return (
    <div className="bg-card border rounded-lg p-4 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6">
        {/* Filtro por categoria */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Tag size={14} /> Categorias
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categorias.map((categoria) => (
              <div key={categoria} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${categoria}`}
                  checked={filtroCategorias.includes(categoria)}
                  onCheckedChange={(checked) => handleCategoriaChange(categoria, checked)}
                />
                <label 
                  htmlFor={`cat-${categoria}`} 
                  className="text-sm cursor-pointer"
                >
                  {categoria}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filtro por preço */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <DollarSign size={14} /> Faixa de Preço
          </h3>
          <div className="space-y-2">
            {faixasPreco.map((faixa) => (
              <div key={faixa} className="flex items-center space-x-2">
                <Checkbox
                  id={`preco-${faixa}`}
                  checked={filtroPreco.includes(faixa)}
                  onCheckedChange={(checked) => handlePrecoChange(faixa, checked)}
                />
                <label 
                  htmlFor={`preco-${faixa}`} 
                  className="text-sm cursor-pointer"
                >
                  {faixa}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filtro por avaliação */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Star size={14} /> Avaliação
          </h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filtroAvaliacao.includes(rating)}
                  onCheckedChange={(checked) => handleAvaliacaoChange(rating, checked)}
                />
                <label 
                  htmlFor={`rating-${rating}`} 
                  className="text-sm flex items-center cursor-pointer"
                >
                  <span className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                      />
                    ))}
                  </span>
                  <span className="ml-1">{rating === 5 ? "e acima" : `e acima`}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-2 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={limparFiltros}
        >
          Limpar Filtros
        </Button>
        {onClose && (
          <Button 
            size="sm" 
            onClick={onClose}
          >
            Aplicar Filtros
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
