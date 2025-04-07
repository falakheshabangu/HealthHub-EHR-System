import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PatientDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
            <CardDescription>View your complete medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/patient/medical-history">View Medical History</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Schedule or manage your appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/patient/appointments">Manage Appointments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

