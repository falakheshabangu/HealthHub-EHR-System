
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

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
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
            to="/dashboard"
            className="transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/patients"
            className="transition-colors hover:text-primary"
          >
            Patients
          </Link>
          <Link
            to="/appointments"
            className="transition-colors hover:text-primary"
          >
            Appointments
          </Link>
          <Link
            to="/medical-records"
            className="transition-colors hover:text-primary"
          >
            Medical Records
          </Link>
          <Link
            to="/prescriptions"
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
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/patients">Patients</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/appointments">Appointments</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/medical-records">Medical Records</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/prescriptions">Prescriptions</Link>
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
