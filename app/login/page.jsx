"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">Welcome to Coding Savvy</h1>
        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              role === "student" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              role === "admin" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email Label */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Label */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <a className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 font-medium hover:bg-blue-700 transition"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            Login as {role}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
            Continue with Google
          </button>

          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5" />
            Continue with GitHub
          </button>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">Coding Savvy Platform</div>

      </div>
    </div>
  );
}