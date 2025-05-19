
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionItem } from "@/components/prescription/PrescriptionItem";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample data for prescriptions
const pendingPrescriptions = [
  { id: 1, patient: "John Doe", medication: "Amoxicillin", dosage: "500mg", frequency: "3x daily", status: "pending" },
  { id: 2, patient: "Jane Smith", medication: "Lisinopril", dosage: "10mg", frequency: "1x daily", status: "pending" },
  { id: 3, patient: "Robert Johnson", medication: "Metformin", dosage: "850mg", frequency: "2x daily", status: "pending" },
];

const completedPrescriptions = [
  { id: 4, patient: "Emily Davis", medication: "Atorvastatin", dosage: "20mg", frequency: "1x daily", status: "completed" },
  { id: 5, patient: "Michael Wilson", medication: "Albuterol", dosage: "90mcg", frequency: "As needed", status: "completed" },
];

export function PharmacistDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Filter prescriptions based on search query
  const filteredPending = pendingPrescriptions.filter(
    (prescription) =>
      prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = completedPrescriptions.filter(
    (prescription) =>
      prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Pharmacist Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Prescriptions Management</CardTitle>
            <Badge className="bg-primary hover:bg-primary/80">
              {pendingPrescriptions.length} Pending
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search prescriptions..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="space-y-4 mt-4">
                  {filteredPending.length > 0 ? (
                    filteredPending.map((prescription) => (
                      <PrescriptionItem 
                        key={prescription.id} 
                        prescription={prescription} 
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No pending prescriptions found</p>
                  )}
                  <Button className="w-full">Process All Prescriptions</Button>
                </TabsContent>
                <TabsContent value="completed" className="space-y-4 mt-4">
                  {filteredCompleted.length > 0 ? (
                    filteredCompleted.map((prescription) => (
                      <PrescriptionItem 
                        key={prescription.id} 
                        prescription={prescription} 
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No completed prescriptions found</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>View and manage your appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4">
              <h3 className="font-medium">Today's Tasks</h3>
              <ul className="mt-2 space-y-1">
                <li className="text-sm flex justify-between">
                  <span>Inventory Check</span>
                  <span className="text-muted-foreground">9:00 AM</span>
                </li>
                <li className="text-sm flex justify-between">
                  <span>Staff Meeting</span>
                  <span className="text-muted-foreground">11:30 AM</span>
                </li>
                <li className="text-sm flex justify-between">
                  <span>Patient Consultations</span>
                  <span className="text-muted-foreground">2:00 PM</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Medication Inventory</CardTitle>
            <CardDescription>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Amoxicillin 500mg</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">In Stock (120)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Lisinopril 10mg</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock (15)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Metformin 850mg</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">In Stock (75)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Atorvastatin 20mg</span>
                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>
              </div>
              <Button className="w-full mt-4">Update Inventory</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Consultations</CardTitle>
            <CardDescription>Upcoming consultations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Diabetes medication review</p>
                </div>
                <Badge>2:30 PM</Badge>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Maria Garcia</h4>
                  <p className="text-sm text-muted-foreground">Blood pressure medication adjustment</p>
                </div>
                <Badge>3:45 PM</Badge>
              </div>
            </div>
            <Button className="w-full">Schedule New Consultation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
