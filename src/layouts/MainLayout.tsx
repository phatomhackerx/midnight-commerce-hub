
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import StarsBackground from "@/components/StarsBackground";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded to true after a short delay for smoother animation
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={cn(
      "flex min-h-screen bg-background transition-all duration-300 relative overflow-hidden",
      loaded ? "opacity-100" : "opacity-0"
    )}>
      <StarsBackground />
      <AppSidebar />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-500 w-full ml-60 relative z-10",
        loaded && "animate-fade-in"
      )}>
        <Outlet />
      </div>
    </div>
  );
}
