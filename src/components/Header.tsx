import { Bell, Search, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="border-b border-border backdrop-blur-xl bg-background/80 px-6 py-4 sticky top-0 z-50 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[var(--shadow-neon)]">
              <Sparkles size={20} className="text-background" />
            </div>
            <span className="font-bold text-xl text-gradient-cosmic hidden md:block">Midnight</span>
          </div>
          
          <div className="hidden lg:block w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search with AI..."
                className="pl-10 glass-card border-border/50 focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"></span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-muted/50 transition-colors">
            <Settings size={20} />
          </Button>
          <div className="ml-2 h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center font-semibold text-primary cursor-pointer hover:scale-105 transition-transform">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
