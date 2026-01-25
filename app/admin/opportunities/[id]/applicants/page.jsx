"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getApplicantsByOpportunity } from "@/app/actions/applications.actions";
import { getOpportunityById } from "@/app/actions/opportunities.actions";
import { useParams } from "next/navigation";

export default function ApplicantsPage() {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    async function getData() {
      const appsRes = await getApplicantsByOpportunity(id);
      if (appsRes?.success) {
        setApplicants(appsRes.data ?? []);
      }

      const oppRes = await getOpportunityById(id);
      if (oppRes?.data) {
        setOpportunity(oppRes.data);
      }
    }

    if (id) getData();
  }, [id]);

  return (
    <div className="space-y-6">
      {opportunity && (
        <Card className="border border-gray-200">
          <CardContent className="p-5 space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Opportunity Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-xs text-gray-500">Company</Label>
                <p className="text-gray-800">
                  {opportunity.company_name}
                </p>
              </div>

              <div>
                <Label className="text-xs text-gray-500">Role</Label>
                <p className="text-gray-800">{opportunity.role}</p>
              </div>

              <div>
                <Label className="text-xs text-gray-500">Status</Label>
                <Badge
                  variant={
                    opportunity.status === "open"
                      ? "default"
                      : "secondary"
                  }
                >
                  {opportunity.status}
                </Badge>
              </div>

              <div>
                <Label className="text-xs text-gray-500">Deadline</Label>
                <p className="text-gray-800">
                  {opportunity.deadline
                    ? new Date(opportunity.deadline)
                        .toISOString()
                        .slice(0, 10)
                    : "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h1 className="text-2xl font-bold mb-6">Applicants</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.profiles?.name || "-"}</TableCell>
                <TableCell>{app.profiles?.email || "-"}</TableCell>
                <TableCell>{app.profiles?.college || "-"}</TableCell>
                <TableCell>{app.profiles?.branch || "-"}</TableCell>
                <TableCell>
                  {Array.isArray(app.profiles?.skills)
                    ? app.profiles.skills.join(", ")
                    : app.profiles?.skills || "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      app.status === "shortlisted"
                        ? "default"
                        : app.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button className="mt-4" variant="outline">
          Download CSV
        </Button>
      </div>
    </div>
  );
}
