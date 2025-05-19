
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const { role } = useRole();
  
  // Generate role-based routes
  const getRoutePath = (path: string) => `/${role}${path}`;
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="hidden md:flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block text-xl">
            HealthHub
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to={getRoutePath("/dashboard")}
            className="transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          
          {(role === "admin" || role === "doctor" || role === "pharmacist") && (
            <Link
              to={getRoutePath("/patients")}
              className="transition-colors hover:text-primary"
            >
              Patients
            </Link>
          )}
          
          {(role === "admin" || role === "doctor" || role === "patient") && (
            <Link
              to={getRoutePath("/appointments")}
              className="transition-colors hover:text-primary"
            >
              Appointments
            </Link>
          )}
          
          {(role === "admin" || role === "doctor" || role === "patient") && (
            <Link
              to={getRoutePath("/medical-records")}
              className="transition-colors hover:text-primary"
            >
              Medical Records
            </Link>
          )}
          
          <Link
            to={getRoutePath("/prescriptions")}
            className="transition-colors hover:text-primary"
          >
            Prescriptions
          </Link>
        </nav>
      </div>
      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-0 text-base">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={24}
            className="w-[180px]"
          >
            <DropdownMenuItem asChild>
              <Link to={getRoutePath("/dashboard")}>Dashboard</Link>
            </DropdownMenuItem>
            
            {(role === "admin" || role === "doctor" || role === "pharmacist") && (
              <DropdownMenuItem asChild>
                <Link to={getRoutePath("/patients")}>Patients</Link>
              </DropdownMenuItem>
            )}
            
            {(role === "admin" || role === "doctor" || role === "patient") && (
              <DropdownMenuItem asChild>
                <Link to={getRoutePath("/appointments")}>Appointments</Link>
              </DropdownMenuItem>
            )}
            
            {(role === "admin" || role === "doctor" || role === "patient") && (
              <DropdownMenuItem asChild>
                <Link to={getRoutePath("/medical-records")}>Medical Records</Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem asChild>
              <Link to={getRoutePath("/prescriptions")}>Prescriptions</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/" className="ml-2 flex items-center space-x-2">
          <span className="font-bold text-xl">HealthHub</span>
        </Link>
      </div>
    </div>
  );
}
