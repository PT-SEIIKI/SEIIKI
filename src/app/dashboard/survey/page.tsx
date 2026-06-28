import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardSurveyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Hasil Survey</h1>
      <p className="text-muted-foreground">Tinjau hasil survey kepuasan pelanggan.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Survey</CardTitle>
            <CardDescription>Hasil dari survey TR dan Non-TR akan ditampilkan di sini.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Grafik dan data hasil survey akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
