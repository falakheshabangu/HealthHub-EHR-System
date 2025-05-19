
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, UserRound, FileText, PlusCircle, Activity } from "lucide-react";

// Sample upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    time: "10:00 AM",
    date: "Today",
    reason: "Annual Checkup",
    doctor: "Dr. Anderson"
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    time: "11:30 AM",
    date: "Today",
    reason: "Follow-up",
    doctor: "Dr. Williams"
  },
  {
    id: 3,
    patientName: "Michael Brown",
    time: "2:15 PM",
    date: "Today",
    reason: "Consultation",
    doctor: "Dr. Anderson"
  },
  {
    id: 4,
    patientName: "Emily Davis",
    time: "9:00 AM",
    date: "Tomorrow",
    reason: "Test Results",
    doctor: "Dr. Rodriguez"
  },
];

// Sample patient tasks
const patientTasks = [
  {
    id: 1,
    patientName: "Robert Wilson",
    task: "Check blood pressure",
    status: "Pending",
    room: "Room 103"
  },
  {
    id: 2,
    patientName: "Jennifer Lee",
    task: "Administer medication",
    status: "Completed",
    room: "Room 105"
  },
  {
    id: 3,
    patientName: "David Martinez",
    task: "Collect blood sample",
    status: "Pending",
    room: "Room 108"
  },
  {
    id: 4,
    patientName: "Lisa Anderson",
    task: "Change IV bag",
    status: "Pending",
    room: "Room 104"
  },
];

export function NurseDashboard() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Nurse Dashboard</h1>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/patients">
                <UserRound className="mr-2 h-4 w-4" />
                View Patients
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/medical-records/new">
                <FileText className="mr-2 h-4 w-4" />
                Update Records
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patients Today
              </CardTitle>
              <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                8 waiting for vitals
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
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Next appointment in 15 min
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Tasks
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 high priority
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                Patients scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 3).map((appointment) => (
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
                        <span>{appointment.doctor}</span>
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
                      <Link to={`/appointments/${appointment.id}`}>Prepare</Link>
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

          <Card>
            <CardHeader>
              <CardTitle>Patient Tasks</CardTitle>
              <CardDescription>
                Tasks requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-4 rounded-md border p-3"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{task.patientName}</p>
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground">{task.room}</span>
                        <span className="mx-1 text-muted-foreground">•</span>
                        <span
                          className={
                            task.status === "Completed"
                              ? "text-green-500"
                              : task.status === "In Progress"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }
                        >
                          {task.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium">
                        {task.task}
                      </p>
                    </div>
                    <Button
                      variant={task.status === "Completed" ? "outline" : "default"}
                      size="sm"
                      className="ml-auto flex-shrink-0"
                    >
                      {task.status === "Completed" ? "Done" : "Complete"}
                    </Button>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/tasks">View All Tasks</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Rooms Overview</CardTitle>
            <CardDescription>Current room assignments and statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { room: "101", status: "Occupied", patient: "John Smith" },
                { room: "102", status: "Available", patient: null },
                { room: "103", status: "Occupied", patient: "Robert Wilson" },
                { room: "104", status: "Occupied", patient: "Lisa Anderson" },
                { room: "105", status: "Occupied", patient: "Jennifer Lee" },
                { room: "106", status: "Available", patient: null },
                { room: "107", status: "Cleaning", patient: null },
                { room: "108", status: "Occupied", patient: "David Martinez" },
              ].map((room) => (
                <div 
                  key={room.room} 
                  className={`p-3 rounded-lg border ${
                    room.status === "Occupied" 
                      ? "bg-blue-50 border-blue-200" 
                      : room.status === "Available" 
                      ? "bg-green-50 border-green-200" 
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="text-lg font-medium">Room {room.room}</div>
                  <div className={`text-sm ${
                    room.status === "Occupied" 
                      ? "text-blue-600" 
                      : room.status === "Available" 
                      ? "text-green-600" 
                      : "text-yellow-600"
                  }`}>
                    {room.status}
                  </div>
                  {room.patient && <div className="text-sm mt-1">{room.patient}</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
