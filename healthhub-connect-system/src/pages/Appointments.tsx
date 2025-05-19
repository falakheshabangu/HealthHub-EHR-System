
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  CalendarPlus,
  Clock,
  Filter,
  MoreHorizontal,
  RefreshCcw,
  Search,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample appointment data
const appointmentsData = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "John Smith",
    doctor: "Dr. Williams",
    date: "2025-04-14",
    time: "09:00 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Scheduled",
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Sarah Johnson",
    doctor: "Dr. Martinez",
    date: "2025-04-14",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Robert Wilson",
    doctor: "Dr. Williams",
    date: "2025-04-14",
    time: "11:45 AM",
    duration: "30 min",
    type: "Consultation",
    status: "Checked In",
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "Emily Davis",
    doctor: "Dr. Johnson",
    date: "2025-04-14",
    time: "01:15 PM",
    duration: "60 min",
    type: "Procedure",
    status: "Scheduled",
  },
  {
    id: "A005",
    patientId: "P005",
    patientName: "Michael Brown",
    doctor: "Dr. Martinez",
    date: "2025-04-14",
    time: "02:30 PM",
    duration: "30 min",
    type: "Checkup",
    status: "Checked In",
  },
  {
    id: "A006",
    patientId: "P006",
    patientName: "Jennifer Lee",
    doctor: "Dr. Johnson",
    date: "2025-04-14",
    time: "03:15 PM",
    duration: "45 min",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "A007",
    patientId: "P008",
    patientName: "Lisa Anderson",
    doctor: "Dr. Williams",
    date: "2025-04-15",
    time: "09:30 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Scheduled",
  },
  {
    id: "A008",
    patientId: "P009",
    patientName: "James Taylor",
    doctor: "Dr. Martinez",
    date: "2025-04-15",
    time: "10:45 AM",
    duration: "60 min",
    type: "Procedure",
    status: "Scheduled",
  },
  {
    id: "A009",
    patientId: "P002",
    patientName: "Sarah Johnson",
    doctor: "Dr. Johnson",
    date: "2025-04-15",
    time: "01:00 PM",
    duration: "30 min",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "A010",
    patientId: "P001",
    patientName: "John Smith",
    doctor: "Dr. Williams",
    date: "2025-04-15",
    time: "02:15 PM",
    duration: "45 min",
    type: "Consultation",
    status: "Scheduled",
  },
  {
    id: "A011",
    patientId: "P004",
    patientName: "Emily Davis",
    doctor: "Dr. Martinez",
    date: "2025-04-13",
    time: "09:15 AM",
    duration: "30 min",
    type: "Checkup",
    status: "Completed",
  },
  {
    id: "A012",
    patientId: "P005",
    patientName: "Michael Brown",
    doctor: "Dr. Johnson",
    date: "2025-04-13",
    time: "10:30 AM",
    duration: "45 min",
    type: "Follow-up",
    status: "Completed",
  },
  {
    id: "A013",
    patientId: "P007",
    patientName: "David Martinez",
    doctor: "Dr. Williams",
    date: "2025-04-13",
    time: "01:00 PM",
    duration: "30 min",
    type: "Consultation",
    status: "No Show",
  },
  {
    id: "A014",
    patientId: "P010",
    patientName: "Patricia White",
    doctor: "Dr. Martinez",
    date: "2025-04-13",
    time: "02:30 PM",
    duration: "60 min",
    type: "Procedure",
    status: "Cancelled",
  },
];

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8;

  // Filter appointments based on search term, date and status
  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      selectedDate === "all" ||
      appointment.date === selectedDate ||
      (selectedDate === "today" && appointment.date === "2025-04-14") ||
      (selectedDate === "tomorrow" && appointment.date === "2025-04-15") ||
      (selectedDate === "yesterday" && appointment.date === "2025-04-13");

    const matchesStatus =
      selectedStatus === "all" || appointment.status === selectedStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Get current appointments
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Checked In":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "No Show":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <Button asChild>
            <Link to="/appointments/new">
              <CalendarPlus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Schedule</CardTitle>
            <CardDescription>
              View and manage all scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search appointments..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select
                        value={selectedDate}
                        onValueChange={setSelectedDate}
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Filter by date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Dates</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={selectedStatus}
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Checked In">Checked In</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="No Show">No Show</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedDate("all");
                          setSelectedStatus("all");
                        }}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {appointment.id}
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/patients/${appointment.patientId}`}
                                className="hover:underline text-health-700 dark:text-health-400 flex items-center"
                              >
                                <UserRound className="h-3 w-3 mr-1" />
                                {appointment.patientName}
                              </Link>
                            </TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                {appointment.time}
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({appointment.duration})
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{appointment.type}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link to={`/appointments/${appointment.id}`}>
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link to={`/appointments/${appointment.id}/edit`}>
                                      Edit Appointment
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link to={`/patients/${appointment.patientId}`}>
                                      View Patient
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {appointment.status === "Scheduled" && (
                                    <DropdownMenuItem>
                                      Check In Patient
                                    </DropdownMenuItem>
                                  )}
                                  {appointment.status === "Scheduled" && (
                                    <DropdownMenuItem asChild>
                                      <Link to={`/appointments/${appointment.id}/reschedule`}>
                                        Reschedule
                                      </Link>
                                    </DropdownMenuItem>
                                  )}
                                  {appointment.status === "Scheduled" && (
                                    <DropdownMenuItem className="text-red-500">
                                      Cancel Appointment
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => {
                              if (currentPage > 1) paginate(currentPage - 1);
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {Array.from(
                          { length: Math.ceil(filteredAppointments.length / appointmentsPerPage) },
                          (_, i) => (
                            <PaginationItem key={i + 1}>
                              <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => paginate(i + 1)}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => {
                              if (
                                currentPage <
                                Math.ceil(filteredAppointments.length / appointmentsPerPage)
                              )
                                paginate(currentPage + 1);
                            }}
                            className={
                              currentPage >=
                              Math.ceil(filteredAppointments.length / appointmentsPerPage)
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="calendar">
                <div className="flex justify-center items-center p-8 border rounded-md">
                  <div className="text-center">
                    <CalendarCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Calendar View</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mt-2">
                      The calendar view will be available in the next update. Please use the list view for now.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
