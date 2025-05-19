
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, UserRound, FileText, PlusCircle, Activity, PlusSquare, CalendarCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data
const appointmentData = [
  { name: "Mon", appointments: 4 },
  { name: "Tue", appointments: 6 },
  { name: "Wed", appointments: 8 },
  { name: "Thu", appointments: 12 },
  { name: "Fri", appointments: 9 },
  { name: "Sat", appointments: 5 },
  { name: "Sun", appointments: 2 },
];

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
  {
    id: 4,
    patientName: "Emily Davis",
    time: "9:00 AM",
    date: "Tomorrow",
    reason: "Test Results",
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
  {
    id: 4,
    name: "Lisa Anderson",
    status: "Completed",
    date: "Today, 11:45 AM",
  },
];

export function DoctorDashboard() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/appointments/new">
                <CalendarCheck className="mr-2 h-4 w-4" />
                New Appointment
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
                Today's Patients
              </CardTitle>
              <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 more remaining
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments Today
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                Next at 10:30 AM
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
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Due by tomorrow
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prescriptions Written
              </CardTitle>
              <PlusSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Today
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Appointments</CardTitle>
              <CardDescription>
                Your appointments this week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentData}
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
                  <Bar dataKey="appointments" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center space-x-4 rounded-md border p-3"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{appointment.patientName}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{appointment.time}</span>
                        <span className="mx-1">•</span>
                        <span>{appointment.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.reason}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="ml-auto flex-shrink-0"
                    >
                      <Link to={`/appointments/${appointment.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/appointments">View All Appointments</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center space-x-4 rounded-md border p-3"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{patient.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Activity className="mr-1 h-3 w-3" />
                        <span
                          className={
                            patient.status === "Completed"
                              ? "text-green-500"
                              : patient.status === "Cancelled"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }
                        >
                          {patient.status}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{patient.date}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="ml-auto flex-shrink-0"
                    >
                      <Link to={`/patients/${patient.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/patients">View All Patients</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="h-24 flex flex-col space-y-2">
                  <Link to="/patients/new">
                    <UserRound className="h-6 w-6" />
                    <span>New Patient</span>
                  </Link>
                </Button>
                <Button asChild className="h-24 flex flex-col space-y-2">
                  <Link to="/appointments/new">
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Appointment</span>
                  </Link>
                </Button>
                <Button asChild className="h-24 flex flex-col space-y-2">
                  <Link to="/prescriptions/new">
                    <PlusSquare className="h-6 w-6" />
                    <span>New Prescription</span>
                  </Link>
                </Button>
                <Button asChild className="h-24 flex flex-col space-y-2">
                  <Link to="/medical-records/new">
                    <FileText className="h-6 w-6" />
                    <span>New Medical Record</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
