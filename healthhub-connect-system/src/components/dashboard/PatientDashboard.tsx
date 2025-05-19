
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, PlusSquare, FileText, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample health metrics data
const healthData = [
  { month: "Jan", weight: 162, bloodPressure: 120 },
  { month: "Feb", weight: 160, bloodPressure: 118 },
  { month: "Mar", weight: 161, bloodPressure: 118 },
  { month: "Apr", weight: 158, bloodPressure: 116 },
  { month: "May", weight: 157, bloodPressure: 115 },
  { month: "Jun", weight: 157, bloodPressure: 114 },
];

// Sample upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Anderson",
    time: "10:00 AM",
    date: "May 25, 2025",
    type: "Annual Checkup",
  },
  {
    id: 2,
    doctorName: "Dr. Williams",
    time: "2:30 PM",
    date: "June 10, 2025",
    type: "Follow-up",
  },
];

// Sample medications
const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    refillDate: "June 15, 2025",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    refillDate: "May 30, 2025",
  },
  {
    id: 3,
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    refillDate: "July 5, 2025",
  },
];

// Sample recent records
const recentRecords = [
  {
    id: 1,
    type: "Lab Results",
    date: "April 15, 2025",
    doctor: "Dr. Johnson",
  },
  {
    id: 2,
    type: "Imaging Results",
    date: "March 22, 2025",
    doctor: "Dr. Williams",
  },
  {
    id: 3,
    type: "Visit Summary",
    date: "February 10, 2025",
    doctor: "Dr. Anderson",
  },
];

export function PatientDashboard() {
  const patientName = "John Doe"; // Would come from user context in a real app

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {patientName}</h1>
            <p className="text-muted-foreground">Here's a summary of your health information</p>
          </div>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/appointments/new">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Next on May 25, 2025
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Medications
              </CardTitle>
              <PlusSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                1 refill needed soon
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medical Records
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 new since last visit
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Health Score
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-green-500">
                ↑ 5 points from last visit
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Health Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
            <CardDescription>
              Your health trends over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={healthData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  stroke="#0ea5e9"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bloodPressure"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
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
                      <p className="font-medium">{appointment.doctorName}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{appointment.time}</span>
                        <span className="mx-1">•</span>
                        <span>{appointment.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.type}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="flex-shrink-0"
                      >
                        <Link to={`/appointments/${appointment.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/appointments/new">Schedule New Appointment</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication) => (
                  <div
                    key={medication.id}
                    className="rounded-md border p-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm font-medium">{medication.dosage}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {medication.frequency}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Refill by: {medication.refillDate}
                        </span>
                        <Button variant="outline" size="sm">Request Refill</Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/prescriptions">View All Medications</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="font-medium">{record.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.date} • {record.doctor}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/medical-records/${record.id}`}>View</Link>
                  </Button>
                </div>
              ))}
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link to="/medical-records">View All Records</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
