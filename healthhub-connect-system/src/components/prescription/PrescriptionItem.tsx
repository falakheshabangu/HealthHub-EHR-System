
import { Check, ChevronDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Prescription {
  id: number;
  patient: string;
  medication: string;
  dosage: string;
  frequency: string;
  status: string;
}

interface PrescriptionItemProps {
  prescription: Prescription;
}

export function PrescriptionItem({ prescription }: PrescriptionItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{prescription.patient}</h3>
            <Badge variant={prescription.status === 'pending' ? 'secondary' : 'outline'}>
              {prescription.status === 'pending' ? 'Pending' : 'Completed'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {prescription.medication} {prescription.dosage}, {prescription.frequency}
          </p>
        </div>
        <div className="flex space-x-2">
          {prescription.status === 'pending' && (
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Check className="h-4 w-4" />
              <span>Verify</span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
