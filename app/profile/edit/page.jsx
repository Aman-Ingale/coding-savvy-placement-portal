"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getProfileByUserId, updateProfile } from "@/app/actions/profile.actions";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";

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

        if (uploadError) throw uploadError;

        updatedProfile.resume_url = fileData.path; // save storage path
        delete updatedProfile.resume; // remove file object
      }

      // Call updateProfile server action
      const { success, error } = await updateProfile(profile.id, updatedProfile);

      if (success) {
        router.push("/profile");
      } else {
        console.error("Error updating profile:", error);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Edit Profile</h1>

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={profile?.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </div>

        {/* College */}
        <div className="space-y-2">
          <Label>College</Label>
          <Input
            value={profile?.college || ""}
            onChange={(e) => handleFieldChange("college", e.target.value)}
          />
        </div>

        {/* Branch */}
        <div className="space-y-2">
          <Label>Branch</Label>
          <Input
            value={profile?.branch || ""}
            onChange={(e) => handleFieldChange("branch", e.target.value)}
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label>Skills (comma separated)</Label>
          <Textarea
            placeholder="React, Next.js, Tailwind"
            value={profile?.skills || ""}
            onChange={(e) => handleFieldChange("skills", e.target.value)}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {profile?.skills?.split(",")
              .filter((s) => s.trim() !== "")
              .map((skill, i) => (
                <Badge
                  key={i}
                  className="bg-blue-50 text-blue-600 border border-blue-200"
                >
                  {skill.trim()}
                </Badge>
              ))}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <Label>Resume (PDF)</Label>
          <Input type="file" accept=".pdf" onChange={handleResumeChange} />
          {profile?.resume_url && (
            <p className="text-sm text-slate-500">Uploaded: {profile.resume_url}</p>
          )}
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
