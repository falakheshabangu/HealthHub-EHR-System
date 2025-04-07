"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotification } from "@/components/notification-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DiagnosePatient() {
  const [patientId, setPatientId] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [treatment, setTreatment] = useState("")
  const [referToSpecialist, setReferToSpecialist] = useState("")
  const { showNotification } = useNotification()

  const handleDiagnosis = () => {
    // Implement actual diagnosis submission logic here
    showNotification("Diagnosis submitted successfully!")
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Diagnose Patient</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patient Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
          <Textarea placeholder="Enter diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
          <Textarea
            placeholder="Enter treatment plan"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />
          <Select onValueChange={setReferToSpecialist}>
            <SelectTrigger>
              <SelectValue placeholder="Refer to specialist (if necessary)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cardiologist">Cardiologist</SelectItem>
              <SelectItem value="neurologist">Neurologist</SelectItem>
              <SelectItem value="orthopedist">Orthopedist</SelectItem>
              <SelectItem value="dermatologist">Dermatologist</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleDiagnosis}>Submit Diagnosis</Button>
        </CardContent>
      </Card>
    </div>
  )
}

