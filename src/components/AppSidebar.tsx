
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  DollarSign,
  CalendarClock,
  FileBarChart2,
  Users,
  Wallet,
  Plug,
  Tag,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  UserCircle,
  MessageSquare,
  Bell
} from "lucide-react";

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/marketplace", icon: Globe, label: "Marketplace" },
  { path: "/produtos", icon: Package, label: "Produtos" },
  { path: "/minhas-vendas", icon: ShoppingCart, label: "Minhas Vendas" },
  { path: "/assinaturas", icon: CalendarClock, label: "Assinaturas" },
  { path: "/relatorios", icon: FileBarChart2, label: "Relatórios" },
  { path: "/afiliados", icon: Users, label: "Afiliados" },
  { path: "/financeiro", icon: Wallet, label: "Financeiro" },
  { path: "/integracoes", icon: Plug, label: "Integrações" },
  { path: "/cupons-desconto", icon: Tag, label: "Cupons de Desconto" },
  { path: "/quiz", icon: HelpCircle, label: "Quiz" },
  { path: "/perfil", icon: UserCircle, label: "Meu Perfil" },
  { path: "/chat", icon: MessageSquare, label: "Chat Suporte" },
  { path: "/ajuda", icon: HelpCircle, label: "Ajuda" },
  { path: "/notificacoes", icon: Bell, label: "Notificações" }
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-sidebar border-r border-border flex flex-col transition-all duration-300 overflow-hidden", 
        collapsed ? "w-20" : "w-64"
      )}
    >
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
      
      <div className="py-4 flex-1 overflow-y-auto scrollbar-none">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted hover:translate-x-1",
                  collapsed && "justify-center"
                )}
              >
                <item.icon size={20} className={cn("shrink-0", location.pathname === item.path && "animate-pulse")} />
                {!collapsed && (
                  <span className={cn(
                    location.pathname === item.path && "animate-fade-in"
                  )}>
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
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
    </aside>
  );
}
