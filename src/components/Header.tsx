import { Search, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="flex h-14 items-center px-6 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-6">
          <span className="text-xl font-bold text-foreground">
            Midnight
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-10 grok-input"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" className="relative hover:bg-secondary rounded-lg">
            <Bell size={18} />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-foreground text-background border-0 text-xs">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-lg">
            <Settings size={18} />
          </Button>

          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground font-medium text-sm hover:bg-accent transition-colors cursor-pointer">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
