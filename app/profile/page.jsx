"use client"
import ProfileCard from "@/components/profile/ProfileCard";
import SkillsList from "@/components/profile/SkillsList";
import ResumeCard from "@/components/profile/ResumeCard";
import { useEffect, useState } from "react";
import { getProfileById } from "../actions/profile.actions";

export default function ProfilePage() {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    async function getData() {
      // Hardcoded for now, will be updated after auth
      const data = await getProfileById("455be2f7-b09f-4c5c-9587-ee0d50440c14")
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