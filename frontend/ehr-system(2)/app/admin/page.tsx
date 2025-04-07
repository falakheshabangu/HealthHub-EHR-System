import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Register Patient</CardTitle>
            <CardDescription>Add new patients to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/register-patient">Register Patient</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage User Accounts</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/manage-users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

