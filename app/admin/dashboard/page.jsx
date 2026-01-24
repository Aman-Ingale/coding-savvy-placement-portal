import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    { title: "Total Students", value: 1240 },
    { title: "Total Opportunities", value: 36 },
    { title: "Applications Submitted", value: 2890 },
    { title: "Students Placed", value: 312 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 text-bold">{stat.title}</p>
              <h2 className="text-3xl font-bold text-blue-600">
                {stat.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
