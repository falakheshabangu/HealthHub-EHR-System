
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  FilePlus,
  SearchIcon,
  Filter,
  MoreHorizontal,
  UserRound,
  CalendarDays,
  RefreshCcw,
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

// Sample Medical Records Data
const medicalRecordsData = [
  {
    id: "MR001",
    patientId: "P001",
    patientName: "John Smith",
    recordType: "Progress Note",
    createdBy: "Dr. Williams",
    date: "2025-04-10",
    diagnosisCode: "J03.9",
    diagnosis: "Acute tonsillitis",
  },
  {
    id: "MR002",
    patientId: "P002",
    patientName: "Sarah Johnson",
    recordType: "Lab Result",
    createdBy: "Dr. Martinez",
    date: "2025-04-12",
    diagnosisCode: "E11.9",
    diagnosis: "Type 2 diabetes mellitus",
  },
  {
    id: "MR003",
    patientId: "P003",
    patientName: "Robert Wilson",
    recordType: "Consultation",
    createdBy: "Dr. Williams",
    date: "2025-04-05",
    diagnosisCode: "I10",
    diagnosis: "Essential hypertension",
  },
  {
    id: "MR004",
    patientId: "P001",
    patientName: "John Smith",
    recordType: "Medication",
    createdBy: "Dr. Johnson",
    date: "2025-04-10",
    diagnosisCode: "J03.9",
    diagnosis: "Acute tonsillitis",
  },
  {
    id: "MR005",
    patientId: "P004",
    patientName: "Emily Davis",
    recordType: "Progress Note",
    createdBy: "Dr. Johnson",
    date: "2025-04-08",
    diagnosisCode: "R51",
    diagnosis: "Headache",
  },
  {
    id: "MR006",
    patientId: "P005",
    patientName: "Michael Brown",
    recordType: "Imaging",
    createdBy: "Dr. Martinez",
    date: "2025-04-01",
    diagnosisCode: "M54.5",
    diagnosis: "Low back pain",
  },
  {
    id: "MR007",
    patientId: "P006",
    patientName: "Jennifer Lee",
    recordType: "Lab Result",
    createdBy: "Dr. Johnson",
    date: "2025-04-09",
    diagnosisCode: "D64.9",
    diagnosis: "Anemia, unspecified",
  },
  {
    id: "MR008",
    patientId: "P002",
    patientName: "Sarah Johnson",
    recordType: "Medication",
    createdBy: "Dr. Martinez",
    date: "2025-04-12",
    diagnosisCode: "E11.9",
    diagnosis: "Type 2 diabetes mellitus",
  },
  {
    id: "MR009",
    patientId: "P007",
    patientName: "David Martinez",
    recordType: "Consultation",
    createdBy: "Dr. Williams",
    date: "2025-03-28",
    diagnosisCode: "F41.9",
    diagnosis: "Anxiety disorder, unspecified",
  },
  {
    id: "MR010",
    patientId: "P008",
    patientName: "Lisa Anderson",
    recordType: "Progress Note",
    createdBy: "Dr. Williams",
    date: "2025-04-07",
    diagnosisCode: "J45.909",
    diagnosis: "Unspecified asthma, uncomplicated",
  },
  {
    id: "MR011",
    patientId: "P009",
    patientName: "James Taylor",
    recordType: "Imaging",
    createdBy: "Dr. Martinez",
    date: "2025-04-03",
    diagnosisCode: "S82.001A",
    diagnosis: "Fracture of patella",
  },
  {
    id: "MR012",
    patientId: "P010",
    patientName: "Patricia White",
    recordType: "Lab Result",
    createdBy: "Dr. Johnson",
    date: "2025-03-25",
    diagnosisCode: "E78.5",
    diagnosis: "Hyperlipidemia, unspecified",
  },
];

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  // Filter medical records based on search term and type
  const filteredRecords = medicalRecordsData.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosisCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || record.recordType === selectedType;

    return matchesSearch && matchesType;
  });

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get Record Type Icon
  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case "Progress Note":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "Lab Result":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "Consultation":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "Medication":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "Imaging":
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <Button asChild>
            <Link to="/medical-records/new">
              <FilePlus className="mr-2 h-4 w-4" />
              Create New Record
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Medical Records Database</CardTitle>
            <CardDescription>
              View and manage patient medical records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records, patients, or diagnoses..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Record type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Progress Note">Progress Notes</SelectItem>
                    <SelectItem value="Lab Result">Lab Results</SelectItem>
                    <SelectItem value="Consultation">Consultations</SelectItem>
                    <SelectItem value="Medication">Medications</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
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
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Record Type</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.id}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/patients/${record.patientId}`}
                          className="hover:underline text-health-700 dark:text-health-400 flex items-center"
                        >
                          <UserRound className="h-3 w-3 mr-1" />
                          {record.patientName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getRecordTypeIcon(record.recordType)}
                          <span className="ml-1">{record.recordType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{record.diagnosis}</span>
                          <span className="text-xs text-muted-foreground">
                            Code: {record.diagnosisCode}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{record.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                          {record.date}
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
                              <Link to={`/medical-records/${record.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/medical-records/${record.id}/edit`}>
                                Edit Record
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/${record.patientId}`}>
                                View Patient Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/medical-records/${record.patientId}/history`}>
                                Complete Medical History
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Generate Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Print Record
                            </DropdownMenuItem>
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
                    { length: Math.ceil(filteredRecords.length / recordsPerPage) },
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
                          Math.ceil(filteredRecords.length / recordsPerPage)
                        )
                          paginate(currentPage + 1);
                      }}
                      className={
                        currentPage >=
                        Math.ceil(filteredRecords.length / recordsPerPage)
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

export default MedicalRecords;
