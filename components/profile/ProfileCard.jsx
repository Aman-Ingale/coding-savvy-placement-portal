import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileCard({ profile }) {
  return (
    <Card className="h-fit bg-white shadow-md border border-slate-200">
      <CardContent className="p-6 text-center space-y-4">

        <Avatar className="w-28 h-28 mx-auto">
          {/* {profile.image && (
            <AvatarImage
              src={profile.image}
              alt="Profile image"
            />
          )} */}
          <AvatarFallback className="bg-blue-600 text-white text-2xl">
            {profile?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-xl font-semibold">{profile?.name}</h2>
          <p className="text-sm text-slate-500">{profile?.branch}</p>
        </div>

        <div className="text-sm text-slate-700 space-y-1">
          <p><strong>College:</strong> {profile?.college}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
        </div>

        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>

      </CardContent>
    </Card>
  );
}
