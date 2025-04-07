"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const patients = [
    { id: "1", name: "John Doe", dob: "1980-05-15" },
    { id: "2", name: "Jane Smith", dob: "1992-11-22" },
    { id: "3", name: "Bob Johnson", dob: "1975-03-08" },
  ]

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Patient Records</h1>
      <Input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {filteredPatients.map((patient) => (
                <li key={patient.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    {patient.name} - {patient.dob}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {selectedPatient && (
          <Card>
            <CardHeader>
              <CardTitle>Patient Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display detailed patient information here */}
              <p>Detailed information for patient {selectedPatient}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

