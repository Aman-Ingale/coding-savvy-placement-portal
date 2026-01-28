"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileImageUploader from "@/components/profile/ProfileImageUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createProfile } from "@/app/actions/profile.actions";
import { createClient } from "@/lib/supabase/supabaseClient";

export default function CreateProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "",
    college: "",
    branch: "",
    skills: "",
    resume_url: null,
  });

  useEffect(() => {
    async function getData() {
    }
    getData()
  }, [])

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile({ ...profile, resume: file });
  };

  const handleSubmit = () => {
    console.log("Profile data ready for backend:", profile);
    createProfile(profile)
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create Your Profile</h1>

        {/* Profile Image */}
        <div className="flex justify-center">
          {/* <ProfileImageUploader
            image={profile.imagePreview}
            onChange={handleImageChange}
          /> */}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Your Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        {/* College */}
        <div className="space-y-2">
          <Label>College</Label>
          <Input
            placeholder="College Name"
            value={profile.college}
            onChange={(e) => setProfile({ ...profile, college: e.target.value })}
          />
        </div>

        {/* Branch */}
        <div className="space-y-2">
          <Label>Branch</Label>
          <Input
            placeholder="Your Branch"
            value={profile.branch}
            onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label>Skills (comma separated)</Label>
          <Textarea
            placeholder="React, Next.js, Tailwind"
            value={profile.skills}
            onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {profile.skills
              .split(",")
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
          {profile.resume && (
            <p className="text-sm text-slate-500">{profile.resume.name}</p>
          )}
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}
