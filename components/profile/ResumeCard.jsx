import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function ResumeCard({ resumeUrl }) {
  return (
    <Card className="bg-white shadow-md border border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-800">Resume</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <FileText size={18} className="text-blue-600" />
          <span>My Resume (PDF)</span>
        </div>

        {resumeUrl ? (
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <a href={resumeUrl} target="_blank">
              View
            </a>
          </Button>
        ) : (
          <p className="text-sm text-slate-500">
            No resume uploaded
          </p>
        )}
      </CardContent>
    </Card>
  );
}
