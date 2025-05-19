
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
  const { role, setRole } = useRole();
  
  // For demo purposes - allows switching between roles
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as "admin" | "doctor" | "pharmacist" | "patient");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar role={role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
            <div className="flex justify-between items-center">
              <SidebarTrigger className="md:hidden" />
              <div className="ml-auto">
                {/* Role switcher for demo purposes */}
                <select 
                  value={role} 
                  onChange={handleRoleChange}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm"
                >
                  <option value="admin">Admin View</option>
                  <option value="doctor">Doctor View</option>
                  <option value="pharmacist">Pharmacist View</option>
                  <option value="patient">Patient View</option>
                </select>
              </div>
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
