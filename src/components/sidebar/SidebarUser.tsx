
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
        <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-foreground font-medium text-sm">
          U
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Usuário</span>
            <span className="text-xs text-muted-foreground">Profissional</span>
          </div>
        )}
      </div>
    </div>
  );
}
