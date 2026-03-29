import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RoleSidebar } from "@/components/dashboard/RoleSidebar";
import TopNav from "@/components/dashboard/TopNav";
import { QuickActionCards } from "@/components/QuickActionCards";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <RoleSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav />
          <main className="flex-1 overflow-auto bg-background relative">
            <QuickActionCards />
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
