"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-3 bg-white border-b p-4">
          <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
            <Menu />
          </Button>
          <h1 className="font-bold text-blue-600">Admin Panel</h1>
        </div>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
