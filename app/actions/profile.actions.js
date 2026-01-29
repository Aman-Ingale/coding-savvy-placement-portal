"use server";

import { createClient } from "@/lib/supabase/supabaseClient";

export async function createProfile(profileData) {
  try {
    const supabase = await createClient();

    if (!profileData.name?.trim()) {
      return { success: false, error: "name is required" };
    }

    let resumePath = null;

    if (profileData.resume) {
      const uploadResult = await uploadResume(profileData.resume);
      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error };
      }
      resumePath = uploadResult.path;
    }

    const now = new Date().toISOString();

    const data = {
      ...profileData,
      resume_path: resumePath,
      created_at: now,
      updated_at: now,
    };

    delete data.resume;

    const { data: newProfile, error } = await supabase
      .from("profiles")
      .insert([data])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: newProfile };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred while creating profile",
    };
  }
}

export async function updateProfile(profileId, profileData) {
  if (!profileId) {
    return { success: false, error: "Profile ID is required" };
  }

  try {
    const supabase = await createClient();

    let resumePath = profileData.resume_path;

    if (profileData.resume) {
      const uploadResult = await uploadResume(profileData.resume);
      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error };
      }

      if (profileData.resume_path) {
        await supabase.storage
          .from("resumes")
          .remove([profileData.resume_path]);
      }

      resumePath = uploadResult.path;
    }

    const now = new Date().toISOString();

    const data = {
      ...profileData,
      resume_path: resumePath,
      updated_at: now,
    };

    delete data.resume;

    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", profileId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: updatedProfile };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred while updating profile",
    };
  }
}

async function uploadResume(file) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const safeName = file.name.replace(/\s+/g, "_");
  const filePath = `${user.id}/${Date.now()}_${safeName}`;

  const { error } = await supabase.storage
    .from("resumes")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, path: filePath };
}

export async function getProfileById(profileId) {
  if (!profileId) {
    return { success: false, error: "Profile ID is required" };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profileId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred while getting profile",
    };
  }
}

export async function getAllProfiles() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred while getting profile",
    };
  }
}

export async function deleteProfileById(profileId) {
  if (!profileId) {
    return { success: false, error: "Profile ID is required" };
  }

  try {
    const supabase = await createClient();

    const { data: profile } = await supabase
      .from("profiles")
      .select("resume_path")
      .eq("id", profileId)
      .single();

    if (profile?.resume_path) {
      await supabase.storage
        .from("resumes")
        .remove([profile.resume_path]);
    }

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", profileId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred while deleting profile",
    };
  }
}

export async function getProfileByUserId(userId) {
  if (!userId) {
    return { success: false, error: "User ID is required" };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred while fetching profile",
    };
  }
}
