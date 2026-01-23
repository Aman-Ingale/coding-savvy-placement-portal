"use client";

import { useEffect, useState } from "react";
import ProfileImageUploader from "@/components/profile/ProfileImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getProfileById, updateProfile } from "@/app/actions/profile.actions";

export default function EditProfilePage() {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function getData() {
      // Hardcoded for now, will be updated after auth
      const data = await getProfileById("455be2f7-b09f-4c5c-9587-ee0d50440c14")
      setProfile(data.data)
    }
    getData()
  }, [])

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

  const handleSave = () => {
    console.log("Updated profile data:", profile);
    // hardcoded id for testing
    updateProfile("455be2f7-b09f-4c5c-9587-ee0d50440c14",profile)
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Edit Profile</h1>

        {/* Click-to-edit Profile Image */}
        {/* <div className="flex justify-center">
          <ProfileImageUploader
            image={profile?.imagePreview}
            onChange={handleImageChange}
          />
        </div> */}

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={profile?.name || "name"}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </div>

        {/* College */}
        <div className="space-y-2">
          <Label>College</Label>
          <Input
            value={profile?.college || "college"}
            onChange={(e) => handleFieldChange("college", e.target.value)}
          />
        </div>

        {/* Branch */}
        <div className="space-y-2">
          <Label>Branch</Label>
          <Input
            value={profile?.branch || "branch"}
            onChange={(e) => handleFieldChange("branch", e.target.value)}
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label>Skills (comma separated)</Label>
          <Textarea
            placeholder="React, Next.js, Tailwind"
            value={profile?.skills}
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
          {/* {profile.resume && (
            <p className="text-sm text-slate-500">{profile?.resume?.name}</p>
          )} */}
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
