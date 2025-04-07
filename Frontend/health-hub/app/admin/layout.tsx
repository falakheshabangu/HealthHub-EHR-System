import type React from "react"
import { withRoleCheck } from "@/components/with-role-check"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Button asChild variant="ghost">
              <Link href="/admin">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/register-patient">Register Patient</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/manage-users">Manage Users</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin/schedule-appointments">Schedule Appointments</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

export default withRoleCheck(AdminLayout, ["admin"])

