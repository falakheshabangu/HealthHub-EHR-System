import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DoctorDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>View and manage patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/doctor/patient-records">View Patient Records</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>View upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/doctor/appointments">View Appointments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

