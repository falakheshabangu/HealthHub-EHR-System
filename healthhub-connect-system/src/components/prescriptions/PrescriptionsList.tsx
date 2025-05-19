import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Prescription, getPrescriptions } from "@/api/patientApi";

export function PrescriptionsList() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getPrescriptions();
        setPrescriptions(data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch prescriptions",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [toast]);

  if (loading) {
    return <div className="text-center py-8">Loading prescriptions...</div>;
  }

  if (prescriptions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium">No Prescriptions Found</h3>
            <p className="text-muted-foreground">
              You don't have any active prescriptions.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Prescriptions</h2>
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{prescription.name}</CardTitle>
                <span className="text-sm font-medium">{prescription.dosage}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Take {prescription.frequency}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  Refill by: {prescription.refillDate}
                </span>
                <Button variant="outline" size="sm">
                  Request Refill
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
