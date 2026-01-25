import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, GraduationCap } from "lucide-react";
import { applyToOpportunity } from "@/app/actions/applications.actions";

export default function OpportunityCard({ opportunity }) {
  const stuid = "8694f8c4-39f4-4344-b225-419b586215d1"
  function handleApply(id) {
    applyToOpportunity(stuid,id)
  }
  return ( 
    <Card className="hover:shadow-xl transition-shadow rounded-xl h-full border border-gray-200 flex flex-col p-4">
      {/* Header */}
      <CardHeader className="space-y-2 p-0">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-blue-600">{opportunity.role}</h3>
          {/* <Badge className="bg-blue-100 text-blue-800">{opportunity.posted}</Badge> */}
        </div>
        <p className="text-sm text-gray-600">{opportunity.company_name}</p>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex flex-col flex-1 space-y-3 p-0">
        {/* Location & Salary */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            {/* <MapPin size={16} /> {opportunity.location} */}
          </span>
          <span className="flex items-center gap-1">
            {/* <Clock size={16} /> {opportunity.salary} */}
          </span>
        </div>

        {/* Eligibility */}
        <div className="flex items-start gap-2 text-sm min-h-12">
          <GraduationCap size={18} className="text-gray-500 mt-0.5" />
          <p className="text-gray-700 line-clamp-2">
            <span className="font-medium text-gray-900">Eligibility:</span> {opportunity.required_skills}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 min-h-12">
          {opportunity.description}
        </p>

        {/* Skills/Tags */}
        {/* <div className="flex flex-wrap gap-2 mt-1">
          {opportunity.tags.map((tag, index) => (
            <span
              key={index}
              className="text-blue-700 border border-blue-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div> */}

        {/* Apply Button */}
        <div className="mt-auto flex justify-end">
          <Button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-colors" onClick={(id)=>handleApply(opportunity.id)}>
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
