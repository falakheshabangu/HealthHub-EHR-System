import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/api/patientApi";
import { useRole } from "@/contexts/RoleContext";
import { useUser } from "@/contexts/UserContext"
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "doctor" | "pharmacist" | "patient">("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setRole: setGlobalRole } = useRole();
  const { setName: setUserName, setSurname: setUserSurname } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ username: email, password, role });
      setGlobalRole(role);
      setUserName(response.name);
      setUserSurname(response.surname);

      toast({
        title: "Logged in successfully",
        description: `Welcome to HealthHub EHR System ${role + " "+ response.name + " " + response.surname}`,
      });
      
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "pharmacist":
          navigate("/pharmacist/dashboard");
          break;
        case "patient":
          navigate("/patient/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Invalid credentials");
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAccess = (selectedRole: "admin" | "doctor" | "pharmacist" | "patient") => {
    setGlobalRole(selectedRole);
    setRole(selectedRole);
    
    toast({
      title: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login`,
      description: `Logged in as ${selectedRole}`,
    });

    switch (selectedRole) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "doctor":
        navigate("/doctor/dashboard");
        break;
      case "pharmacist":
        navigate("/pharmacist/dashboard");
        break;
      case "patient":
        navigate("/patient/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-health-50 to-health-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Tabs defaultValue="patient" className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              HealthHub Login
            </CardTitle>
            <CardDescription className="text-center">
              Select your role and enter credentials
            </CardDescription>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger 
                value="patient" 
                onClick={() => setRole("patient")}
                className="data-[state=active]:bg-health-100 data-[state=active]:text-health-800 dark:data-[state=active]:bg-health-900/50"
              >
                Patient
              </TabsTrigger>
              <TabsTrigger 
                value="doctor" 
                onClick={() => setRole("doctor")}
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900/50"
              >
                Doctor
              </TabsTrigger>
              <TabsTrigger 
                value="pharmacist" 
                onClick={() => setRole("pharmacist")}
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50"
              >
                Pharmacist
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                onClick={() => setRole("admin")}
                className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800 dark:data-[state=active]:bg-gray-900/50"
              >
                Admin
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Login Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="patient">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Patient Email</Label>
                    <Input
                      id="email"
                      placeholder="patient@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="doctor">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Doctor Email</Label>
                    <Input
                      id="email"
                      placeholder="doctor@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pharmacist">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Pharmacist Email</Label>
                    <Input
                      id="email"
                      placeholder="pharmacist@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="admin">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <Input
                      id="email"
                      placeholder="admin@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-health-600 hover:bg-health-700" 
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-health-600 hover:text-health-700 dark:text-health-400 dark:hover:text-health-300"
                >
                  Contact administrator
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Tabs>
    </div>
  );
};

export default Login;