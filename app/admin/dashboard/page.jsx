"use client"
import { getAllApplications } from "@/app/actions/applications.actions";
import { getAllOpportunities } from "@/app/actions/opportunities.actions";
import { getAllProfiles } from "@/app/actions/profile.actions";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { title: "Total Students", value: 0 },
    { title: "Total Opportunities", value: 0 },
    { title: "Applications Submitted", value: 0 },
    { title: "Students Placed", value: 0 },
  ]);
  useEffect(() => {
    async function getData() {
      const opp = ((await getAllOpportunities())?.data?.length)
      const stu = ((await getAllProfiles())?.data?.length)
      const app = ((await getAllApplications())?.data?.length)
      setStats([
        { title: "Total Students", value: stu },
        { title: "Total Opportunities", value: opp },
        { title: "Applications Submitted", value: app },
        { title: "Students Placed", value: 0 },
      ])
      console.log(stats)
    }
    getData()
  }, [])

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
