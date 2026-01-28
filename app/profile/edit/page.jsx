"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, CheckCircle2 } from "lucide-react";
import { getProfileByUserId, updateProfile } from "@/app/actions/profile.actions";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProfilePage() {
  const [profile, setProfile] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { success, data, error } = await getProfileByUserId(user.id);

      if (success) {
        setProfile(data);
      } else {
        console.error("Error fetching profile:", error);
      }
    }

    getData();
  }, []);

  // Field change
  const handleFieldChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // Resume upload
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile({ ...profile, resume: file });
  };

  // Save changes
  const handleSave = async () => {
    try {
      let updatedProfile = { ...profile };

      // Handle resume upload to Supabase Storage if file exists
      if (profile.resume instanceof File) {
        const supabase = createClient();
        const fileExt = profile.resume.name.split(".").pop();
        const fileName = `${profile.user_id}/resume.${fileExt}`;
        const { data: fileData, error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, profile.resume, { upsert: true });

        if (uploadError) {
          toast.error("Failed to upload resume. Please try again.");
          throw uploadError;
        }

        updatedProfile.resume_url = fileData.path; // save storage path
        delete updatedProfile.resume; // remove file object
      }

      // Call updateProfile server action
      const { success, error } = await updateProfile(profile.id, updatedProfile);

      if (success) {
        toast.success("Profile updated successfully!");
        router.push("/profile");
      } else {
        toast.error(error || "Failed to update profile");
        console.error("Error updating profile:", error);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-muted-foreground text-sm">
            Update your profile information and upload your resume
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-white border border-slate-200/80 rounded-xl shadow-md">
          <CardContent className="p-6 space-y-6">

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Name</Label>
              <Input
                value={profile?.name || ""}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="h-10"
              />
            </div>

            {/* College */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">College</Label>
              <Input
                value={profile?.college || ""}
                onChange={(e) => handleFieldChange("college", e.target.value)}
                placeholder="Enter your college name"
                className="h-10"
              />
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Branch</Label>
              <Input
                value={profile?.branch || ""}
                onChange={(e) => handleFieldChange("branch", e.target.value)}
                placeholder="Enter your branch/stream"
                className="h-10"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Skills (comma separated)
              </Label>
              <Textarea
                placeholder="React, Next.js, Tailwind CSS, JavaScript..."
                value={profile?.skills || ""}
                onChange={(e) => handleFieldChange("skills", e.target.value)}
                className="min-h-24"
              />
              {profile?.skills && (
                <div className="flex gap-2 flex-wrap mt-2 pt-2 border-t border-slate-100">
                  {profile.skills
                    .split(",")
                    .filter((s) => s.trim() !== "")
                    .map((skill, i) => (
                      <Badge
                        key={i}
                        className="bg-blue-50 text-blue-700 border border-blue-200 text-sm font-medium"
                      >
                        {skill.trim()}
                      </Badge>
                    ))}
                </div>
              )}
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                Resume (PDF)
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="h-10 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {profile?.resume_url && (
                <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                  <CheckCircle2 size={16} />
                  <span>Resume uploaded successfully</span>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 mt-2"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
