import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const students = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", course: "B.Tech CSE", placed: true },
  { id: 2, name: "Ananya Singh", email: "ananya@gmail.com", course: "B.Sc Data Science", placed: false },
  { id: 3, name: "Vikram Patil", email: "vikram@gmail.com", course: "B.Tech IT", placed: false },
  { id: 4, name: "Priya Verma", email: "priya@gmail.com", course: "BCA", placed: true },
  { id: 5, name: "Arjun Mehta", email: "arjun@gmail.com", course: "B.Tech ECE", placed: false },
];

export default function StudentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Link key={student.id} href={`/admin/students/${student.id}`}>
            <Card className="hover:shadow-md transition">
              <CardContent className="p-5 space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <Badge className={student.placed ? "bg-green-600 text-white" : "bg-gray-400 text-white"}>
                    {student.placed ? "Placed" : "Not Placed"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{student.email}</p>
                <p className="text-sm text-gray-500">{student.course}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
