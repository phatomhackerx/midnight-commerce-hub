
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ReactNode } from "react";

const cardVariants = cva("glass-card rounded-xl p-5 h-full", {
  variants: {
    variant: {
      default: "border-border",
      success: "border-success/20",
      warning: "border-warning/20",
      danger: "border-danger/20",
      info: "border-info/20",
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
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="text-primary">{icon}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold">{value}</div>
        
        {typeof change !== "undefined" && (
          <div className="flex items-center text-xs gap-1">
            <span
              className={cn(
                "flex items-center font-medium",
                isPositive ? "text-success" : isNegative ? "text-danger" : "text-muted-foreground"
              )}
            >
              {isPositive && <ArrowUp size={14} />}
              {isNegative && <ArrowDown size={14} />}
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
