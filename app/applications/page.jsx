"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/supabaseClient";
import { getProfileByUserId } from "@/app/actions/profile.actions";
import { getMyApplications } from "@/app/actions/applications.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toISOString().slice(0, 10);
  } catch {
    return "-";
  }
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

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

      // NOTE: applications.student_id in this project refers to the student's profile id,
      // so we resolve user.id -> profile.id before calling getMyApplications.
      const profileRes = await getProfileByUserId(user.id);
      if (!profileRes.success || !profileRes.data?.id) {
        router.replace("/profile/edit");
        return;
      }

      const appsRes = await getMyApplications(profileRes.data.id);
      setApplications(appsRes?.data ?? []);
      setLoading(false);
    }

    getData();
  }, [router]);

  const hasApps = applications.length > 0;

  const stats = useMemo(() => {
    const counts = applications.reduce(
      (acc, app) => {
        const key = (app?.status || "unknown").toLowerCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {}
    );
    return counts;
  }, [applications]);

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-sm text-muted-foreground">
            Track the status of applications you've submitted.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border border-slate-200/80 bg-white rounded-xl">
            <CardContent className="px-6 py-5 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {applications.length}
              </p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200/80 bg-white rounded-xl">
            <CardContent className="px-6 py-5 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Applied
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.applied ?? 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200/80 bg-white rounded-xl">
            <CardContent className="px-6 py-5 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Shortlisted
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.shortlisted ?? 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : hasApps ? (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app) => (
                <Card
                  key={app.id}
                  className="border border-slate-200/80 bg-white hover:shadow-md transition-shadow rounded-xl"
                >
                  <CardContent className="px-6 py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">
                          Opportunity ID
                        </p>
                        <p className="font-semibold text-gray-900">
                          {app.opportunity_id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied on {formatDate(app.applied_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            app.status === "shortlisted"
                              ? "default"
                              : app.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {app.status || "unknown"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-slate-200/80 bg-white rounded-xl">
              <CardContent className="px-6 py-6">
                <p className="text-sm text-muted-foreground">
                  You haven’t applied to any opportunities yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

