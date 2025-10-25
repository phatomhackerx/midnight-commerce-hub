import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Sparkles, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BumpOffer {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string | null;
  ativo: boolean;
}

interface BumpOffersConfigProps {
  offers: BumpOffer[];
  onChange: (offers: BumpOffer[]) => void;
}

export default function BumpOffersConfig({ offers, onChange }: BumpOffersConfigProps) {
  const [novaOferta, setNovaOferta] = useState({
    titulo: "",
    descricao: "",
    preco: 0,
  });

  const adicionarOferta = () => {
    if (!novaOferta.titulo || novaOferta.preco <= 0) return;

    const oferta: BumpOffer = {
      id: Date.now().toString(),
      titulo: novaOferta.titulo,
      descricao: novaOferta.descricao,
      preco: novaOferta.preco,
      imagem: null,
      ativo: true,
    };

    onChange([...offers, oferta]);
    setNovaOferta({ titulo: "", descricao: "", preco: 0 });
  };

  const removerOferta = (id: string) => {
    onChange(offers.filter(o => o.id !== id));
  };

  const toggleOferta = (id: string) => {
    onChange(offers.map(o => o.id === id ? { ...o, ativo: !o.ativo } : o));
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Bump Offers (Ofertas Especiais)
        </CardTitle>
        <CardDescription>
          Adicione ofertas especiais que aparecem no checkout com um clique
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <div>
            <Label htmlFor="bump-titulo">Título da Oferta</Label>
            <Input
              id="bump-titulo"
              placeholder="Ex: + Bônus exclusivo!"
              value={novaOferta.titulo}
              onChange={(e) => setNovaOferta({ ...novaOferta, titulo: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="bump-descricao">Descrição</Label>
            <Textarea
              id="bump-descricao"
              placeholder="Descreva o que está incluído nesta oferta especial"
              value={novaOferta.descricao}
              onChange={(e) => setNovaOferta({ ...novaOferta, descricao: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="bump-preco">Preço Adicional (R$)</Label>
            <Input
              id="bump-preco"
              type="number"
              placeholder="47.00"
              value={novaOferta.preco || ""}
              onChange={(e) => setNovaOferta({ ...novaOferta, preco: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <Button onClick={adicionarOferta} className="w-full" type="button">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Bump Offer
          </Button>
        </div>

        {offers.length > 0 && (
          <div className="space-y-3">
            <Label>Ofertas Configuradas</Label>
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-start justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{offer.titulo}</h4>
                    {offer.ativo && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Ativo
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{offer.descricao}</p>
                  <p className="text-sm font-medium">+ R$ {offer.preco.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={offer.ativo}
                    onCheckedChange={() => toggleOferta(offer.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removerOferta(offer.id)}
                  >
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
