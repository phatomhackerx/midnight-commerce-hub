
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  path: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
}

export function SidebarMenuItem({ path, icon: Icon, label, collapsed }: SidebarMenuItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <li>
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
          isActive
            ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary font-semibold shadow-[0_0_15px_hsl(var(--primary)/0.2)] border border-primary/30"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted/50",
          collapsed && "justify-center"
        )}
      >
        <Icon size={20} className={cn("shrink-0 transition-transform", isActive && "scale-110")} />
        {!collapsed && (
          <span className={cn(
            "transition-all",
            isActive && "animate-fade-in"
          )}>
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}
