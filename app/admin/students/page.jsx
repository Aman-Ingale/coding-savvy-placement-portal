"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getAllProfiles } from "@/app/actions/profile.actions";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const temp = await getAllProfiles();
        setStudents(temp.data ?? []);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-sm text-muted-foreground">
          Browse all registered student profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <Card
            key={student?.id}
            className="border border-slate-200/80 bg-white hover:shadow-md transition-shadow rounded-xl"
          >
            <CardContent className="space-y-3 px-6 py-5">
              <div>
                <Label className="text-xs text-gray-500">Name</Label>
                <p className="text-base font-semibold text-gray-900">
                  {student?.name ?? ""}
                </p>
              </div>

              <div>
                <Label className="text-xs text-gray-500">College</Label>
                <p className="text-sm text-gray-700">
                  {student?.college ?? ""}
                </p>
              </div>

              <div>
                <Label className="text-xs text-gray-500">Branch</Label>
                <p className="text-sm text-gray-700">
                  {student?.branch ?? ""}
                </p>
              </div>

              <div>
                <Label className="text-xs text-gray-500">Skills</Label>
                <p className="text-sm text-gray-700">
                  {student?.skills ?? ""}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
