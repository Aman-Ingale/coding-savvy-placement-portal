"use client";

import Link from "next/link";
import { LayoutDashboard, Briefcase, Users, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
          <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </Button>
        </div>

        <nav className="space-y-2 px-4 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 p-2 rounded text-gray-900 hover:bg-blue-50">
            <LayoutDashboard size={18} className="text-blue-600" /> Dashboard
          </Link>
          <Link href="/admin/opportunities" className="flex items-center gap-2 p-2 rounded text-gray-900 hover:bg-blue-50">
            <Briefcase size={18} className="text-blue-600" /> Opportunities
          </Link>
          {/* <Link href="/admin/applicants/" className="flex items-center gap-2 p-2 rounded text-gray-900 hover:bg-blue-50">
            <Users size={18} className="text-blue-600" /> Applicants
          </Link> */}
          <Link href="/admin/students" className="flex items-center gap-2 p-2 rounded text-gray-900 hover:bg-blue-50">
            <GraduationCap size={18} className="text-blue-600" /> Students
          </Link>
        </nav>
      </aside>
    </>
  );
}
