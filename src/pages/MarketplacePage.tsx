
import Header from "@/components/Header";

export default function MarketplacePage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Encontre produtos digitais para revender ou se inspirar.</p>
          </div>
          
          <div className="flex items-center justify-center h-64 border border-dashed border-muted rounded-xl">
            <span className="text-muted-foreground">Conteúdo do Marketplace em desenvolvimento</span>
          </div>
        </div>
      </main>
    </div>
  );
}
