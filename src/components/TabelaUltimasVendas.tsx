
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Venda {
  id: string;
  produto: string;
  cliente: string;
  data: string;
  valor: number;
  status: "concluido" | "pendente" | "cancelado" | "estornado";
}

const vendas: Venda[] = [
  {
    id: "0001",
    produto: "Curso de Marketing Digital",
    cliente: "João Silva",
    data: "Hoje, 14:35",
    valor: 397,
    status: "concluido"
  },
  {
    id: "0002",
    produto: "E-book Finanças Pessoais",
    cliente: "Maria Souza",
    data: "Hoje, 12:21",
    valor: 47,
    status: "concluido"
  },
  {
    id: "0003",
    produto: "Mentoria Premium",
    cliente: "Carlos Almeida",
    data: "Ontem, 18:55",
    valor: 997,
    status: "pendente"
  },
  {
    id: "0004",
    produto: "Template para Instagram",
    cliente: "Ana Ferreira",
    data: "Ontem, 09:12",
    valor: 67,
    status: "cancelado"
  },
  {
    id: "0005",
    produto: "Curso de Copywriting",
    cliente: "Rafael Oliveira",
    data: "25 Set, 15:40",
    valor: 297,
    status: "estornado"
  }
];

const statusStyles = {
  concluido: "bg-success/10 text-success border-success/20",
  pendente: "bg-warning/10 text-warning border-warning/20",
  cancelado: "bg-danger/10 text-danger border-danger/20",
  estornado: "bg-muted/10 text-muted-foreground border-muted/20"
};

const statusLabels = {
  concluido: "Concluído",
  pendente: "Pendente",
  cancelado: "Cancelado",
  estornado: "Estornado"
};

export default function TabelaUltimasVendas() {
  return (
    <Card className="glass-card border-border/50 hover-lift">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-gradient-cosmic">Últimas Vendas</CardTitle>
          <CardDescription>Transações mais recentes da plataforma</CardDescription>
        </div>
        <Button size="sm" variant="outline" className="gap-1 glass-card border-primary/30 hover:shadow-[var(--shadow-neon)]">
          <span>Ver todas</span>
          <ArrowUpRight size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border/50 bg-muted/20">
              <tr>
                <th scope="col" className="px-4 py-4">ID</th>
                <th scope="col" className="px-4 py-4">Produto</th>
                <th scope="col" className="px-4 py-4">Cliente</th>
                <th scope="col" className="px-4 py-4">Data</th>
                <th scope="col" className="px-4 py-4">Valor</th>
                <th scope="col" className="px-4 py-4">Status</th>
                <th scope="col" className="px-4 py-4" aria-label="Ações"></th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda, index) => (
                <tr key={venda.id} className={cn(
                  "border-b border-border/30 hover:bg-primary/5 transition-colors",
                  index % 2 === 0 && "bg-muted/5"
                )}>
                  <td className="px-4 py-4 font-medium text-primary">#{venda.id}</td>
                  <td className="px-4 py-4 font-medium">{venda.produto}</td>
                  <td className="px-4 py-4">{venda.cliente}</td>
                  <td className="px-4 py-4 text-muted-foreground">{venda.data}</td>
                  <td className="px-4 py-4 font-semibold text-gradient-cosmic">R$ {venda.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-4">
                    <Badge className={cn("font-medium border", statusStyles[venda.status])}>
                      {statusLabels[venda.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                      <ExternalLink size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
