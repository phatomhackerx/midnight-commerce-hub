import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { menuItems } from "@/data/menuItems";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarUser } from "./sidebar/SidebarUser";

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar-background border-r border-sidebar-border transition-all duration-200 z-40 flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center h-14 px-4 border-b border-sidebar-border",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-foreground">
              Midnight
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-secondary rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-none">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <SidebarUser collapsed={collapsed} />
    </aside>
  );
}
