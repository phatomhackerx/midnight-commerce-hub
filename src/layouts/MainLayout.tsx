
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <Outlet />
    </div>
  );
}
