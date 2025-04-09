
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div className={cn(
      "flex min-h-screen bg-background transition-all duration-300",
      loaded ? "opacity-100" : "opacity-0"
    )}>
      <AppSidebar />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-500",
        loaded && "animate-fade-in"
      )}>
        <Outlet />
      </div>
    </div>
  );
}
