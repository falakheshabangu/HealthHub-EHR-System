import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DoctorAppointments() {
  const appointments = [
    { id: 1, patient: "John Doe", date: "2023-06-15", time: "10:00 AM" },
    { id: 2, patient: "Jane Smith", date: "2023-06-15", time: "11:30 AM" },
    { id: 3, patient: "Bob Johnson", date: "2023-06-16", time: "2:00 PM" },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Upcoming Appointments</h1>
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader>
            <CardTitle>{appointment.patient}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

