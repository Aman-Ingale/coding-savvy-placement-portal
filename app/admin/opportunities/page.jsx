"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getAllOpportunities } from "@/app/actions/opportunities.actions";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const temp = await getAllOpportunities();
        setOpportunities(temp.data ?? []);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
        <Link href="/admin/opportunities/new">
          <Button className="bg-blue-600 text-white">+ New Opportunity</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {opportunities.map((opp, index) => (
          <Card
            key={opp?.id ?? index}
            className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition"
          >
            <CardContent className="p-5 flex justify-between gap-6">
              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {opp?.role}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {opp?.company_name}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                    <Label className="text-xs text-gray-500">
                      Required Skills
                    </Label>
                    <p className="text-gray-700">
                      {opp?.required_skills || "-"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Status</Label>
                    <Badge
                      variant={
                        opp?.status === "active" ? "default" : "secondary"
                      }
                    >
                      {opp?.status}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Description</Label>
                    <p className="text-gray-700 line-clamp-2">
                      {opp?.description || "-"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Deadline</Label>
                    <p className="text-gray-700">
                      {opp?.deadline
                        ? new Date(opp.deadline)
                            .toISOString()
                            .slice(0, 10)
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end gap-4">
                <div className="flex gap-2">
                  <Link href={`/admin/opportunities/${opp.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    Close
                  </Button>
                </div>

                <Link href={`/admin/opportunities/${opp.id}/applicants`}>
                  <Button variant="secondary" size="sm">
                    View Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
