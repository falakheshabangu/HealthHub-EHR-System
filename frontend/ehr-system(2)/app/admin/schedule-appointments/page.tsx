"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useNotification } from "@/components/notification-provider"

export default function ScheduleAppointments() {
  const [patientId, setPatientId] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("")
  const { showNotification } = useNotification()

  const handleScheduleAppointment = () => {
    // Implement actual appointment scheduling logic here
    showNotification("Appointment scheduled successfully!")
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Schedule Appointments</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
          <Select onValueChange={setDoctorId}>
            <SelectTrigger>
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Dr. Smith</SelectItem>
              <SelectItem value="2">Dr. Johnson</SelectItem>
              <SelectItem value="3">Dr. Williams</SelectItem>
            </SelectContent>
          </Select>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Button onClick={handleScheduleAppointment}>Schedule Appointment</Button>
        </CardContent>
      </Card>
    </div>
  )
}

