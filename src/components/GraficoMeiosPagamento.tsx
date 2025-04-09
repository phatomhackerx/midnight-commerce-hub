
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

const data = [
  { name: "Pix", value: 65, color: "#9c5fff" },  // Primary
  { name: "Cartão", value: 25, color: "#3498db" }, // Blue
  { name: "Boleto", value: 7, color: "#F0B86E" },  // Yellow
  { name: "PicPay", value: 3, color: "#2ecc71" },  // Green
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border shadow-md text-sm">
        <p className="font-medium text-foreground">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function GraficoMeiosPagamento() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle>Meios de Pagamento</CardTitle>
        <CardDescription>Distribuição por método de pagamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute flex flex-col items-center justify-center text-center">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-2xl font-bold">R$ 253.489</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm flex justify-between w-full">
                <span>{item.name}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
