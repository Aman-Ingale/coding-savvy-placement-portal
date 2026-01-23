import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SkillsList({ skills }) {
  return (
    <Card className="bg-white shadow-md border border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-800">Skills</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {skills?.length > 0 ? (
          skills.map((skill, index) => (
            <Badge
              key={index}
              className="bg-blue-50 text-blue-600 border border-blue-200"
            >
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No skills added yet
          </p>
        )}
      </CardContent>
    </Card>
  );
}
