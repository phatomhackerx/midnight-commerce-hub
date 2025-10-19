
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
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-secondary text-foreground font-medium"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-secondary/50",
          collapsed && "justify-center"
        )}
      >
        <Icon size={18} className="shrink-0" />
        {!collapsed && (
          <span className="text-sm">
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}
