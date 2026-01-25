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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Students</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student?.id} className="hover:shadow-md transition">
            <CardContent className="p-5 space-y-3">

              <div>
                <Label className="text-xs text-gray-500">Name</Label>
                <p className="font-semibold text-gray-900">
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
