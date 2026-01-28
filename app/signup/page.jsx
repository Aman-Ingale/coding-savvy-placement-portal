"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ HANDLE INPUT CHANGE
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ✅ HANDLE SUBMIT
  async function handleSignup(e) {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    await SignUp(email, password, name);
    setLoading(false);
  }

  // ✅ SUPABASE SIGNUP
  async function SignUp(email, password, name) {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role, // student / admin
          },
        },
      });

      if (error) {
        console.log(error.message);
        return;
      }

      console.log("Signup success:", data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Coding Savvy</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <CardContent>
          {/* ROLE */}
          <Tabs value={role} onValueChange={setRole}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* NAME */}
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="John"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <button type="button" className="text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* SUBMIT */}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login as {role}
            </Button>
          </form>

          {/* OAUTH */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="px-3 text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
              Continue with Google
            </Button>

            <Button variant="outline" className="w-full gap-2">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5" />
              Continue with GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Coding Savvy Platform
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
