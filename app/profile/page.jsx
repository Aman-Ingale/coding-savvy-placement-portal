"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import SkillsList from "@/components/profile/SkillsList";
import ResumeCard from "@/components/profile/ResumeCard";
import { useEffect, useState } from "react";
import { getProfileByUserId } from "../actions/profile.actions";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/login");
        return;
      }

      const result = await getProfileByUserId(user.id);

      if (!result.success || !result.data) {
        // If no profile exists yet, send the student to create/edit flow
        router.replace("/profile/edit");
        return;
      }

      setProfile({...result.data, email : user.email});
    }

    getData();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Middleware will prevent accessing protected routes after logout
    router.replace("/login");
  };

  const skills =
    typeof profile?.skills === "string"
      ? profile.skills.split(",").map((item) => item.trim())
      : [];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between pb-4">
        <h1 className="text-xl font-semibold">Your Profile</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <ProfileCard profile={profile} />
        <div className="space-y-6 md:col-span-2">
          <SkillsList skills={skills} />
          <ResumeCard resumeUrl={profile?.resume_url} />
        </div>
      </div>
    </div>
  );
}
