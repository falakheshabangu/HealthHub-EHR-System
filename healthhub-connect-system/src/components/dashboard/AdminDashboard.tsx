
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, UserRound, FileText, PlusCircle, Activity, PlusSquare, CalendarCheck, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Sample data for charts - same as in the original Dashboard
const patientData = [
  { name: "Jan", patients: 65 },
  { name: "Feb", patients: 78 },
  { name: "Mar", patients: 90 },
  { name: "Apr", patients: 81 },
  { name: "May", patients: 86 },
  { name: "Jun", patients: 94 },
  { name: "Jul", patients: 105 },
  { name: "Aug", patients: 110 },
  { name: "Sep", patients: 124 },
  { name: "Oct", patients: 116 },
  { name: "Nov", patients: 128 },
  { name: "Dec", patients: 140 },
];

const patientDemographics = [
  { name: "Under 18", value: 30 },
  { name: "18-35", value: 40 },
  { name: "36-50", value: 25 },
  { name: "51-65", value: 20 },
  { name: "Over 65", value: 15 },
];

const appointmentData = [
  { name: "Mon", appointments: 4 },
  { name: "Tue", appointments: 6 },
  { name: "Wed", appointments: 8 },
  { name: "Thu", appointments: 12 },
  { name: "Fri", appointments: 9 },
  { name: "Sat", appointments: 5 },
  { name: "Sun", appointments: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Sample upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    time: "10:00 AM",
    date: "Today",
    reason: "Annual Checkup",
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    time: "11:30 AM",
    date: "Today",
    reason: "Follow-up",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    time: "2:15 PM",
    date: "Today",
    reason: "Consultation",
  },
];

// Sample recent patients
const recentPatients = [
  {
    id: 1,
    name: "Robert Wilson",
    status: "Completed",
    date: "Today, 9:15 AM",
  },
  {
    id: 2,
    name: "Jennifer Lee",
    status: "Scheduled",
    date: "Tomorrow, 10:30 AM",
  },
  {
    id: 3,
    name: "David Martinez",
    status: "Cancelled",
    date: "Yesterday, 3:00 PM",
  },
];

export function AdminDashboard() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/users/new">
                <Users className="mr-2 h-4 w-4" />
                Add User
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/patients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Patient
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">
                +42 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Staff Members
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                3 new this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                -2 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Prescriptions
              </CardTitle>
              <PlusSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">
                +12 from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Patient Registration Trend</CardTitle>
              <CardDescription>
                Number of patients registered monthly
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={patientData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#0ea5e9"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>
                Age distribution of patients
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientDemographics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {patientDemographics.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Staff Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">12 patients today</p>
                  </div>
                  <Button variant="outline" size="sm">View Schedule</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Michael Chen</p>
                    <p className="text-sm text-muted-foreground">8 patients today</p>
                  </div>
                  <Button variant="outline" size="sm">View Schedule</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nurse Emily Davis</p>
                    <p className="text-sm text-muted-foreground">Assisting in OR</p>
                  </div>
                  <Button variant="outline" size="sm">View Schedule</Button>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/staff">View All Staff</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <p>Electronic Records System</p>
                  </div>
                  <p className="text-sm font-medium">100% Uptime</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <p>Appointment Scheduling</p>
                  </div>
                  <p className="text-sm font-medium">100% Uptime</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                    <p>Laboratory Results System</p>
                  </div>
                  <p className="text-sm font-medium">98.5% Uptime</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <p>Billing System</p>
                  </div>
                  <p className="text-sm font-medium">99.9% Uptime</p>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/system-status">System Status Dashboard</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
