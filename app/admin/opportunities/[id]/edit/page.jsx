"use client";

import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function EditOpportunityPage() {
  const { id } = useParams();

  // Mock existing opportunity data (later fetch from backend)
  const opportunity = {
    company: "TechNova Solutions",
    role: "SDE Intern",
    skills: "Java, Spring Boot, DSA",
    eligibility: "B.Tech CS",
    location: "Bangalore",
    package: "4-6 LPA",
    deadline: "2026-03-10",
    description: "Work on scalable backend systems.",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Opportunity</h1>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <Input
            defaultValue={opportunity.company}
            placeholder="Company Name"
          />

          <Input
            defaultValue={opportunity.role}
            placeholder="Role"
          />

          <Input
            defaultValue={opportunity.skills}
            placeholder="Required Skills"
          />

          <Input
            defaultValue={opportunity.eligibility}
            placeholder="Eligibility (e.g., B.Tech CS)"
          />

          <Input
            defaultValue={opportunity.location}
            placeholder="Location (e.g., Remote/Bangalore)"
          />

          {/* Package Dropdown */}
          <Select defaultValue={opportunity.package}>
            <SelectTrigger>
              <SelectValue placeholder="Select Package Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4-6 LPA">4-6 LPA</SelectItem>
              <SelectItem value="6-8 LPA">6-8 LPA</SelectItem>
              <SelectItem value="8-10 LPA">8-10 LPA</SelectItem>
              <SelectItem value="10+ LPA">10+ LPA</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            defaultValue={opportunity.deadline}
          />

          <Textarea
            defaultValue={opportunity.description}
            placeholder="Opportunity Description"
          />

          <div className="flex gap-3 pt-4">
            <Button className="bg-blue-600">Update Opportunity</Button>
            <Button variant="destructive">Close Opportunity</Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500 mt-4">
        Opportunity ID: {id}
      </p>
    </div>
  );
}
