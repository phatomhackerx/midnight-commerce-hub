
import { cn } from "@/lib/utils";

interface SidebarUserProps {
  collapsed: boolean;
}

export function SidebarUser({ collapsed }: SidebarUserProps) {
  return (
    <div className="mt-auto p-4 border-t border-border/50">
      <div className={cn(
        "flex items-center gap-3", 
        collapsed && "justify-center"
      )}>
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary font-semibold shadow-[0_0_10px_hsl(var(--primary)/0.2)]">
          U
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Usuário</span>
            <span className="text-xs text-muted-foreground">Plano Profissional</span>
          </div>
        )}
      </div>
    </div>
  );
}
