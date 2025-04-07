"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PharmacyDashboard() {
  const [patientId, setPatientId] = useState("")
  const [prescription, setPrescription] = useState<string | null>(null)

  const handleViewPrescription = () => {
    // Simulate API call to fetch prescription
    setPrescription("Amoxicillin 500mg, 3 times daily for 7 days")
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pharmacy Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>View Prescription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
          <Button onClick={handleViewPrescription}>View Prescription</Button>
          {prescription && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Prescription:</h3>
              <p>{prescription}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

