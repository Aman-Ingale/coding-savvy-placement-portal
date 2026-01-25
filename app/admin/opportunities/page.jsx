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
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Opportunities
        </h1>
        <Link href="/admin/opportunities/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            + New Opportunity
          </Button>
        </Link>
      </div>

      {/* List */}
      <div className="space-y-4">
        {opportunities.map((opp) => (
          <Card
            key={opp.id}
            className="border hover:shadow-md transition"
          >
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
                {/* LEFT CONTENT */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {opp?.role}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {opp?.company_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Required Skills
                      </Label>
                      <p className="text-gray-700">
                        {opp?.required_skills || "-"}
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Status
                      </Label>
                      <div>
                        <Badge
                          variant={
                            opp?.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {opp?.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Description
                      </Label>
                      <p className="text-gray-700 line-clamp-2">
                        {opp?.description || "-"}
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Deadline
                      </Label>
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

                {/* RIGHT ACTIONS */}
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

                  <Link
                    href={`/admin/opportunities/${opp.id}/applicants`}
                  >
                    <Button variant="secondary" size="sm">
                      View Applications
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
