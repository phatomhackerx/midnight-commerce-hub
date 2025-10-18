
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ReactNode } from "react";

const cardVariants = cva("glass-card rounded-2xl p-6 h-full hover-lift glow-card border", {
  variants: {
    variant: {
      default: "border-border/50",
      success: "border-success/30 bg-success/5",
      warning: "border-warning/30 bg-warning/5",
      danger: "border-danger/30 bg-danger/5",
      info: "border-info/30 bg-info/5",
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface CardMetricaProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children?: ReactNode;
}

export default function CardMetrica({
  title,
  value,
  icon,
  change,
  changeLabel,
  variant = "default",
  children
}: CardMetricaProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <div className={cn(cardVariants({ variant }))}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</span>
        <div className="p-2 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">{icon}</div>
      </div>
      
      <div className="space-y-3">
        <div className="text-3xl font-bold text-gradient-cosmic">{value}</div>
        
        {typeof change !== "undefined" && (
          <div className="flex items-center text-sm gap-2">
            <span
              className={cn(
                "flex items-center font-semibold px-2 py-1 rounded-md",
                isPositive ? "text-success bg-success/10" : isNegative ? "text-danger bg-danger/10" : "text-muted-foreground bg-muted/50"
              )}
            >
              {isPositive && <ArrowUp size={16} />}
              {isNegative && <ArrowDown size={16} />}
              {Math.abs(change)}%
            </span>
            {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
}
