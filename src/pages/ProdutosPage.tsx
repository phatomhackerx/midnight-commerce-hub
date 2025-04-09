
import Header from "@/components/Header";

export default function ProdutosPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <p className="text-muted-foreground">Gerencie seus produtos digitais e físicos.</p>
          </div>
          
          <div className="flex items-center justify-center h-64 border border-dashed border-muted rounded-xl">
            <span className="text-muted-foreground">Gestão de produtos em desenvolvimento</span>
          </div>
        </div>
      </main>
    </div>
  );
}
