"use client";

import dynamic from "next/dynamic";
import ProfileForm from "@/components/ProfileForm";

const ResumeUploader = dynamic(
  () => import("@/components/ResumeUploader"),
  { ssr: false }
);

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6a85b6] to-[#bac8e0] flex items-center justify-center px-4 py-12">
      <div className="bg-[#344a72] p-8 rounded-2xl shadow-xl w-full max-w-2xl text-white space-y-6">
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-blue-200">Manage your personal details and resume</p>

        <ProfileForm />
        <ResumeUploader />
      </div>
    </div>
  );
}

