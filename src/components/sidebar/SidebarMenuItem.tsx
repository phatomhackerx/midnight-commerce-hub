
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
          "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted hover:translate-x-1",
          collapsed && "justify-center"
        )}
      >
        <Icon size={20} className={cn("shrink-0", isActive && "animate-pulse")} />
        {!collapsed && (
          <span className={cn(
            isActive && "animate-fade-in"
          )}>
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}
