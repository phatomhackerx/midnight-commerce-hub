
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
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Últimas Vendas</CardTitle>
          <CardDescription>Transações mais recentes da plataforma</CardDescription>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <span>Ver todas</span>
          <ArrowUpRight size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th scope="col" className="px-4 py-3">ID</th>
                <th scope="col" className="px-4 py-3">Produto</th>
                <th scope="col" className="px-4 py-3">Cliente</th>
                <th scope="col" className="px-4 py-3">Data</th>
                <th scope="col" className="px-4 py-3">Valor</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3" aria-label="Ações"></th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-muted-foreground">#{venda.id}</td>
                  <td className="px-4 py-3 font-medium">{venda.produto}</td>
                  <td className="px-4 py-3">{venda.cliente}</td>
                  <td className="px-4 py-3 text-muted-foreground">{venda.data}</td>
                  <td className="px-4 py-3 font-medium">R$ {venda.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3">
                    <Badge className={cn("font-normal", statusStyles[venda.status])}>
                      {statusLabels[venda.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
