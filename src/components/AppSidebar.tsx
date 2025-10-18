import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems } from "@/data/menuItems";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarUser } from "./sidebar/SidebarUser";

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-sidebar/95 backdrop-blur-xl border-r border-border/50 flex flex-col transition-all duration-300 overflow-hidden shadow-[var(--shadow-card)]", 
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header with Logo and Collapse Toggle */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center w-full")}>
          {!collapsed ? (
            <>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[var(--shadow-neon)]">
                <Sparkles size={18} className="text-background" />
              </div>
              <span className="text-lg font-bold text-gradient-cosmic">
                Midnight
              </span>
            </>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[var(--shadow-neon)]">
              <Sparkles size={18} className="text-background" />
            </div>
          )}
        </div>
        {!collapsed && (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>
      
      {/* Sidebar Menu Items */}
      <div className="py-4 flex-1 overflow-y-auto scrollbar-none">
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
      </div>
      
      {/* User Profile Section */}
      <SidebarUser collapsed={collapsed} />
    </aside>
  );
}
