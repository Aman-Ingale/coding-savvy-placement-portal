"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function NewOpportunity() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Opportunity</h1>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <Input placeholder="Company Name" className="text-gray-900" />
          <Input placeholder="Role" className="text-gray-900" />
          <Input placeholder="Required Skills" className="text-gray-900" />
          <Input placeholder="Eligibility (e.g., B.Tech CS)" className="text-gray-900" />
          <Input placeholder="Location (e.g., Remote/Bangalore)" className="text-gray-900" />
          
          {/* Package Range Dropdown */}
          <Select>
            <SelectTrigger className="text-gray-900">
              <SelectValue placeholder="Select Package Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4-6 LPA">4-6 LPA</SelectItem>
              <SelectItem value="6-8 LPA">6-8 LPA</SelectItem>
              <SelectItem value="8-10 LPA">8-10 LPA</SelectItem>
              <SelectItem value="10+ LPA">10+ LPA</SelectItem>
            </SelectContent>
          </Select>

          <Input type="date" className="text-gray-900" />
          <Textarea placeholder="Opportunity Description" className="text-gray-900" />
          <Button className="bg-blue-600 text-white w-full">Create Opportunity</Button>
        </CardContent>
      </Card>
    </div>
  );
}
