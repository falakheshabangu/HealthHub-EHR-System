"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotification } from "@/components/notification-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string | undefined>()
  const { showNotification } = useNotification()

  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

  const scheduleAppointment = () => {
    if (!date || !time) {
      showNotification("Please select both date and time")
      return
    }
    // Implement actual appointment scheduling logic here
    showNotification(`Appointment scheduled for ${date.toDateString()} at ${time}`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Appointments</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <Select onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={scheduleAppointment}>Schedule Appointment</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Dr. Smith - General Checkup - 2023-06-15 10:00 AM</li>
              <li>Dr. Johnson - Dental Cleaning - 2023-06-22 2:00 PM</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

