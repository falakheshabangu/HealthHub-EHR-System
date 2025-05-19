
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useRole } from "@/contexts/RoleContext";
import {
  SidebarProvider,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function Layout() {
  const { role } = useRole();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar role={role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
            <div className="flex justify-between items-center">
              <SidebarTrigger className="md:hidden" />
            </div>
          </div>
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
