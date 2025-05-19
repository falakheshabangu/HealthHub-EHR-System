
import { useRole } from "@/contexts/RoleContext";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { DoctorDashboard } from "@/components/dashboard/DoctorDashboard";
import { PharmacistDashboard } from "@/components/dashboard/PharmacistDashboard";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { role } = useRole();

  // Render the appropriate dashboard based on the user's role
  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "pharmacist":
      return <PharmacistDashboard />;
    case "patient":
      return <PatientDashboard />;
    default:
      // If role is not valid, redirect to login
      return <Navigate to="/login" replace />;
  }
};

export default Dashboard;
