import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MedicalRecords() {
  const medicalRecords = [
    { date: "2023-03-10", type: "Blood Test", result: "Normal" },
    { date: "2023-02-05", type: "X-Ray", result: "No fractures detected" },
    { date: "2022-12-20", type: "MRI", result: "No abnormalities found" },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Medical Records</h1>
      {medicalRecords.map((record, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{record.date}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Type:</strong> {record.type}
            </p>
            <p>
              <strong>Result:</strong> {record.result}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

