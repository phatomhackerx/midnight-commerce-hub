import React from 'react';
import { 
  Palette, 
  Type, 
  Layout, 
  CreditCard, 
  Gift, 
  Settings, 
  BarChart3,
  Image,
  Clock,
  Shield,
  MessageSquare,
  Zap,
  Code,
  FileText
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SidebarSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: SidebarSection[] = [
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'theme', label: 'Tema & Cores', icon: Palette },
  { id: 'header', label: 'Cabeçalho', icon: Type },
  { id: 'product', label: 'Produto', icon: Image },
  { id: 'timer', label: 'Timer', icon: Clock },
  { id: 'benefits', label: 'Benefícios', icon: Zap },
  { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
  { id: 'guarantee', label: 'Garantia', icon: Shield },
  { id: 'payment', label: 'Pagamento', icon: CreditCard },
  { id: 'orderbumps', label: 'Order Bumps', icon: Gift },
  { id: 'upsell', label: 'Upsell', icon: BarChart3 },
  { id: 'pixels', label: 'Pixels', icon: Code },
  { id: 'footer', label: 'Rodapé', icon: FileText },
  { id: 'advanced', label: 'Avançado', icon: Settings },
];

interface CheckoutBuilderSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function CheckoutBuilderSidebar({
  activeSection,
  onSectionChange,
}: CheckoutBuilderSidebarProps) {
  return (
    <div className="w-16 lg:w-56 bg-card/50 border-r border-border shrink-0">
      <ScrollArea className="h-[calc(100vh-57px)]">
        <div className="py-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 text-sm transition-all',
                  'hover:bg-accent/50',
                  isActive && 'bg-accent text-accent-foreground border-r-2 border-primary'
                )}
              >
                <Icon className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className="hidden lg:block truncate">{section.label}</span>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
