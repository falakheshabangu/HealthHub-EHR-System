
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PatientRecord, getPatientRecord } from "@/api/patientApi";

export function PatientRecordList() {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const data = await getPatientRecord();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching patient records:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch patient records",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, [toast]);

  if (loading) {
    return <div className="text-center py-8">Loading medical records...</div>;
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium">No Medical Records Found</h3>
            <p className="text-muted-foreground">
              You don't have any medical records in the system.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Medical Records</h2>
      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id}>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{record.type}</CardTitle>
                <span className="text-sm text-muted-foreground">{record.date}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Attending Doctor: {record.doctor}
              </p>
              <p className="text-sm mb-4">{record.details}</p>
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  View Full Record
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
