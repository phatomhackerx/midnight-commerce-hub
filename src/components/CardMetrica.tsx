
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ReactNode } from "react";

const cardVariants = cva("premium-card rounded-xl p-6 h-full transition-all", {
  variants: {
    variant: {
      default: "",
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
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="p-2 rounded-lg bg-secondary/60 backdrop-blur-sm">{icon}</div>
      </div>
      
      <div className="space-y-3">
        <div className="text-3xl font-bold">{value}</div>
        
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
