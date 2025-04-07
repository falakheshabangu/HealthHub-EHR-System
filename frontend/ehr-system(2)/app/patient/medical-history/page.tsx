import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MedicalHistory() {
  const medicalHistory = [
    { date: "2023-01-15", condition: "Common Cold", treatment: "Rest and fluids" },
    { date: "2022-11-03", condition: "Sprained Ankle", treatment: "RICE method and pain medication" },
    { date: "2022-05-20", condition: "Allergic Reaction", treatment: "Antihistamines" },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Medical History</h1>
      {medicalHistory.map((entry, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{entry.date}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Condition:</strong> {entry.condition}
            </p>
            <p>
              <strong>Treatment:</strong> {entry.treatment}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

