
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Pill,
  FilePlus,
  Search,
  MoreHorizontal,
  UserRound,
  CalendarDays,
  RefreshCcw,
  Clipboard,
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

// Sample Prescription Data
const prescriptionsData = [
  {
    id: "RX001",
    patientId: "P001",
    patientName: "John Smith",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    prescribedBy: "Dr. Williams",
    date: "2025-04-10",
    status: "Active",
    refills: 0,
  },
  {
    id: "RX002",
    patientId: "P002",
    patientName: "Sarah Johnson",
    medication: "Metformin",
    dosage: "1000mg",
    frequency: "twice daily",
    prescribedBy: "Dr. Martinez",
    date: "2025-04-12",
    status: "Active",
    refills: 3,
  },
  {
    id: "RX003",
    patientId: "P003",
    patientName: "Robert Wilson",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "once daily",
    prescribedBy: "Dr. Williams",
    date: "2025-04-05",
    status: "Active",
    refills: 5,
  },
  {
    id: "RX004",
    patientId: "P004",
    patientName: "Emily Davis",
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "as needed for pain",
    prescribedBy: "Dr. Johnson",
    date: "2025-04-08",
    status: "Active",
    refills: 1,
  },
  {
    id: "RX005",
    patientId: "P005",
    patientName: "Michael Brown",
    medication: "Cyclobenzaprine",
    dosage: "10mg",
    frequency: "3 times daily",
    prescribedBy: "Dr. Martinez",
    date: "2025-04-01",
    status: "Active",
    refills: 2,
  },
  {
    id: "RX006",
    patientId: "P006",
    patientName: "Jennifer Lee",
    medication: "Ferrous Sulfate",
    dosage: "325mg",
    frequency: "once daily",
    prescribedBy: "Dr. Johnson",
    date: "2025-04-09",
    status: "Active",
    refills: 5,
  },
  {
    id: "RX007",
    patientId: "P002",
    patientName: "Sarah Johnson",
    medication: "Glipizide",
    dosage: "5mg",
    frequency: "once daily before breakfast",
    prescribedBy: "Dr. Martinez",
    date: "2025-04-12",
    status: "Active",
    refills: 2,
  },
  {
    id: "RX008",
    patientId: "P007",
    patientName: "David Martinez",
    medication: "Alprazolam",
    dosage: "0.5mg",
    frequency: "twice daily",
    prescribedBy: "Dr. Williams",
    date: "2025-03-28",
    status: "Expired",
    refills: 0,
  },
  {
    id: "RX009",
    patientId: "P008",
    patientName: "Lisa Anderson",
    medication: "Albuterol",
    dosage: "90mcg",
    frequency: "2 puffs every 4-6 hours as needed",
    prescribedBy: "Dr. Williams",
    date: "2025-04-07",
    status: "Active",
    refills: 1,
  },
  {
    id: "RX010",
    patientId: "P009",
    patientName: "James Taylor",
    medication: "Tramadol",
    dosage: "50mg",
    frequency: "every 6 hours as needed for pain",
    prescribedBy: "Dr. Martinez",
    date: "2025-04-03",
    status: "Active",
    refills: 0,
  },
  {
    id: "RX011",
    patientId: "P010",
    patientName: "Patricia White",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "once daily at bedtime",
    prescribedBy: "Dr. Johnson",
    date: "2025-03-25",
    status: "Active",
    refills: 3,
  },
  {
    id: "RX012",
    patientId: "P001",
    patientName: "John Smith",
    medication: "Acetaminophen",
    dosage: "500mg",
    frequency: "every 6 hours as needed for fever",
    prescribedBy: "Dr. Williams",
    date: "2025-04-10",
    status: "Active",
    refills: 0,
  },
];

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 8;

  // Filter prescriptions based on search term and status
  const filteredPrescriptions = prescriptionsData.filter((prescription) => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || prescription.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Get current prescriptions
  const indexOfLastPrescription = currentPage * prescriptionsPerPage;
  const indexOfFirstPrescription = indexOfLastPrescription - prescriptionsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(
    indexOfFirstPrescription,
    indexOfLastPrescription
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get status styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Discontinued":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Prescriptions</h1>
          <Button asChild>
            <Link to="/prescriptions/new">
              <FilePlus className="mr-2 h-4 w-4" />
              New Prescription
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Prescription Management</CardTitle>
            <CardDescription>
              View and manage patient prescriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search prescriptions, patients, or medications..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchTerm("");
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
                    <TableHead>RX ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage & Frequency</TableHead>
                    <TableHead>Prescribed By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">
                        {prescription.id}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/patients/${prescription.patientId}`}
                          className="hover:underline text-health-700 dark:text-health-400 flex items-center"
                        >
                          <UserRound className="h-3 w-3 mr-1" />
                          {prescription.patientName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Pill className="h-3 w-3 mr-1 text-health-500" />
                          {prescription.medication}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{prescription.dosage}</span>
                          <span className="text-xs text-muted-foreground">
                            {prescription.frequency}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{prescription.prescribedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                          {prescription.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(
                              prescription.status
                            )}`}
                          >
                            {prescription.status}
                          </span>
                          {prescription.refills > 0 && (
                            <span className="ml-2 text-xs">
                              {prescription.refills} refill{prescription.refills !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
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
                              <Link to={`/prescriptions/${prescription.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/prescriptions/${prescription.id}/edit`}>
                                Edit Prescription
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/${prescription.patientId}`}>
                                View Patient Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <div className="flex items-center">
                                <Clipboard className="h-4 w-4 mr-2" />
                                Print Prescription
                              </div>
                            </DropdownMenuItem>
                            {prescription.status === "Active" && (
                              <DropdownMenuItem className="text-red-500">
                                Discontinue Prescription
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
                    { length: Math.ceil(filteredPrescriptions.length / prescriptionsPerPage) },
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
                          Math.ceil(filteredPrescriptions.length / prescriptionsPerPage)
                        )
                          paginate(currentPage + 1);
                      }}
                      className={
                        currentPage >=
                        Math.ceil(filteredPrescriptions.length / prescriptionsPerPage)
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Prescriptions;
