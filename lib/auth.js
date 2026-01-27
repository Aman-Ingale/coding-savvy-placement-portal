// Server-side auth helpers for Supabase
// Used by backend actions to identify logged-in users
import { supabase } from "@/lib/supabase/supabaseServer"

export async function getCurrentUser() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) return null
  return user
}
