
import { Link, useLocation } from "react-router-dom";
import {
  Landmark,
  UserRound,
  Calendar,
  FileText,
  PlusSquare,
  BarChart,
  Settings,
  LogOut,
  Users,
  Pill,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

type Role = "admin" | "doctor" | "pharmacist" | "patient";

interface SidebarProps {
  role?: Role;
}

export function Sidebar({ role = "admin" }: SidebarProps) {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  const commonNavItems = [
    {
      to: "/dashboard",
      icon: <BarChart className="h-5 w-5" />,
      label: "Dashboard",
    },
  ];

  const roleNavItems = {
    admin: [
      {
        to: "/patients",
        icon: <UserRound className="h-5 w-5" />,
        label: "Patients",
      },
      {
        to: "/appointments",
        icon: <Calendar className="h-5 w-5" />,
        label: "Appointments",
      },
      {
        to: "/medical-records",
        icon: <FileText className="h-5 w-5" />,
        label: "Medical Records",
      },
      {
        to: "/prescriptions",
        icon: <PlusSquare className="h-5 w-5" />,
        label: "Prescriptions",
      },
      {
        to: "/users",
        icon: <Users className="h-5 w-5" />,
        label: "User Management",
      },
    ],
    doctor: [
      {
        to: "/patients",
        icon: <UserRound className="h-5 w-5" />,
        label: "Patients",
      },
      {
        to: "/appointments",
        icon: <Calendar className="h-5 w-5" />,
        label: "Appointments",
      },
      {
        to: "/medical-records",
        icon: <FileText className="h-5 w-5" />,
        label: "Medical Records",
      },
      {
        to: "/prescriptions",
        icon: <PlusSquare className="h-5 w-5" />,
        label: "Prescriptions",
      },
    ],
    pharmacist: [
      {
        to: "/prescriptions",
        icon: <Pill className="h-5 w-5" />,
        label: "Prescriptions",
      },
      {
        to: "/inventory",
        icon: <Pill className="h-5 w-5" />,
        label: "Inventory",
      },
      {
        to: "/patients",
        icon: <UserRound className="h-5 w-5" />,
        label: "Patients",
      },
      {
        to: "/consultations",
        icon: <Calendar className="h-5 w-5" />,
        label: "Consultations",
      },
    ],
    patient: [
      {
        to: "/appointments",
        icon: <Calendar className="h-5 w-5" />,
        label: "My Appointments",
      },
      {
        to: "/medical-records",
        icon: <FileText className="h-5 w-5" />,
        label: "My Records",
      },
      {
        to: "/prescriptions",
        icon: <PlusSquare className="h-5 w-5" />,
        label: "My Prescriptions",
      },
    ],
  };

  const bottomNavItems = [
    {
      to: "/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
    },
    {
      to: "/login",
      icon: <LogOut className="h-5 w-5" />,
      label: "Logout",
    },
  ];

  const navItems = [...commonNavItems, ...roleNavItems[role]];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="py-4">
        <div className="flex items-center gap-2 px-4">
          <Stethoscope className="h-6 w-6 text-sidebar-primary" />
          {!isCollapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">
              HealthHub
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.to)}
                tooltip={item.label}
              >
                <Link to={item.to}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.to)}
                tooltip={item.label}
              >
                <Link to={item.to}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
