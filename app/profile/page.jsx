"use client"
import ProfileCard from "@/components/profile/ProfileCard";
import SkillsList from "@/components/profile/SkillsList";
import ResumeCard from "@/components/profile/ResumeCard";
import { useEffect, useState } from "react";
import { getProfileById, getProfileByUserId } from "../actions/profile.actions";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState({})
  const router = useRouter()
  useEffect(() => {
    async function getData() {
      // Hardcoded for now, will be updated after auth
              const supabase = await createClient();
                const id = (await supabase.auth.getUser()).data.user.id
                const data = await getProfileByUserId(id)
                console.log(data)
      console.log(data)
      setProfile(data.data)
    }
    getData()
  }, [])
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
        <ProfileCard profile={profile} />
        <div className="md:col-span-2 space-y-6">

          <SkillsList skills={profile?.skills?.split(",").map(item => item.trim())} />
          <ResumeCard resumeUrl={profile?.resume_url} />
        </div>
      </div>
    </div>
  );
}