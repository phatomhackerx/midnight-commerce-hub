
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems } from "@/data/menuItems";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarUser } from "./sidebar/SidebarUser";

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-sidebar border-r border-border flex flex-col transition-all duration-300 overflow-hidden", 
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header with Logo and Collapse Toggle */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              MidnightSales
            </span>
          )}
          {collapsed && (
            <span className="text-xl font-bold text-primary">MS</span>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Sidebar Menu Items */}
      <div className="py-4 flex-1 overflow-y-auto scrollbar-none">
        <ul className="space-y-1 px-2">
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
