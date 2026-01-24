import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Updated opportunities with package ranges (LPA)
const opportunities = [
  { id: 1, company: "TechNova", role: "SDE Intern", skills: "Java, React", deadline: "2026-03-10", eligibility: "B.Tech CS", location: "Bangalore", package: "4-6 LPA" },
  { id: 2, company: "FinCorp", role: "Data Analyst", skills: "Python, SQL", deadline: "2026-02-25", eligibility: "B.Sc/BE", location: "Mumbai", package: "4-6 LPA" },
  { id: 3, company: "GreenSoft", role: "Frontend Developer", skills: "React, Next.js", deadline: "2026-03-15", eligibility: "B.Tech CS/IT", location: "Remote", package: "6-8 LPA" },
  { id: 4, company: "HealthPlus", role: "Backend Intern", skills: "Node.js, MongoDB", deadline: "2026-03-05", eligibility: "BE/ME CS", location: "Hyderabad", package: "4-6 LPA" },
  { id: 5, company: "EduLearn", role: "Fullstack Intern", skills: "React, Node.js, SQL", deadline: "2026-04-01", eligibility: "B.Tech CS", location: "Delhi", package: "6-8 LPA" },
];

export default function OpportunitiesPage() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
        <Link href="/admin/opportunities/new">
          <Button className="bg-blue-600 text-white">+ New Opportunity</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {opportunities.map((opp) => (
          <Card key={opp.id} className="shadow-sm hover:shadow-md transition">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold text-gray-900">{opp.role}</h3>
                <p className="text-sm text-gray-500">{opp.company}</p>
                <p className="text-sm text-gray-400">Skills: {opp.skills}</p>
                <p className="text-sm text-gray-400">Eligibility: {opp.eligibility}</p>
                <p className="text-sm text-gray-400">Location: {opp.location}</p>
                <p className="text-sm text-gray-400">Package: {opp.package}</p>
                <p className="text-sm text-gray-400">Deadline: {opp.deadline}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/opportunities/${opp.id}/edit`}>
                  <Button variant="outline" className="text-gray-900 border-gray-300">Edit</Button>
                </Link>
                <Button variant="destructive">Close</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
