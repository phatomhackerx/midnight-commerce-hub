
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
  Globe,
  UserCircle,
  MessageSquare,
  Bell,
  Bot,
  ClipboardList,
  Link,
  GraduationCap
} from "lucide-react";

export const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/marketplace", icon: Globe, label: "Marketplace" },
  { path: "/produtos", icon: Package, label: "Produtos" },
  { path: "/area-membros", icon: GraduationCap, label: "Área de Membros" },
  { path: "/minhas-vendas", icon: ShoppingCart, label: "Minhas Vendas" },
  { path: "/links-pagamento", icon: Link, label: "Links de Pagamento" },
  { path: "/assinaturas", icon: CalendarClock, label: "Assinaturas" },
  { path: "/relatorios", icon: FileBarChart2, label: "Relatórios" },
  { path: "/afiliados", icon: Users, label: "Afiliados" },
  { path: "/financeiro", icon: Wallet, label: "Financeiro" },
  { path: "/integracoes", icon: Plug, label: "Integrações" },
  { path: "/cupons-desconto", icon: Tag, label: "Cupons de Desconto" },
  { path: "/quiz", icon: ClipboardList, label: "Quiz" },
  { path: "/perfil", icon: UserCircle, label: "Meu Perfil" },
  { path: "/chat", icon: MessageSquare, label: "Chat Suporte" },
  { path: "/ajuda", icon: HelpCircle, label: "Ajuda" },
  { path: "/notificacoes", icon: Bell, label: "Notificações" },
  { path: "/chat-platform", icon: Bot, label: "Bots" }
];
