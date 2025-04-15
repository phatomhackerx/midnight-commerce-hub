
import { cn } from "@/lib/utils";

interface SidebarUserProps {
  collapsed: boolean;
}

export function SidebarUser({ collapsed }: SidebarUserProps) {
  return (
    <div className="mt-auto p-4 border-t border-border">
      <div className={cn(
        "flex items-center gap-3", 
        collapsed && "justify-center"
      )}>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          U
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-medium">Usuário</span>
            <span className="text-xs text-muted-foreground">Plano Profissional</span>
          </div>
        )}
      </div>
    </div>
  );
}
