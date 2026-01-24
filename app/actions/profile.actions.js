"use server";

import { createClient } from "@/lib/supabase/supabaseClient";

export async function createProfile(profileData) {
  try {
    const supabase = await createClient();

    if (!profileData.name?.trim()) {
      return {
        success: false,
        error: "name is required",
      };
    }

    const now = new Date().toISOString();

    const data = {
      ...profileData,
      skills: (profileData.skills),
      created_at: now,
      updated_at: now,
    };

    const { data: newProfile, error } = await supabase
      .from("profiles")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Error creating profile : ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: newProfile };
  } catch (err) {
    console.error("Error creating profile : ", err.message);
    return {
      success: false,
      error: "An unexpected error occurred while creating profile",
    };
  }
}

export async function updateProfile(profileId, profileData) {
  if (!profileId) {
    return { 
      success: false, 
      error: "Profile ID is required" 
    };
  }

  try {
    const supabase = await createClient();

    const now = new Date().toISOString();

    const data = {
      ...profileData,
      ...(profileData.skills && {
        skills: (profileData.skills),
      }),
      updated_at: now,
    };

    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", profileId)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile : ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: updatedProfile };
  } catch (err) {
    console.error("Error updating profile : ", err.message);
    return {
      success: false,
      error: "An unexpected error occurred while updating profile",
    };
  }
}

export async function getProfileById(profileId) {
  if (!profileId) {
    return { 
      success: false, 
      error: "Profile ID is required" 
    };
  }
  try {
    const supabase = await createClient();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", profileId)
      .single();

    if (error) {
      console.error("Error geting profile : ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: profile };
  } catch (err) {
    console.error("Error getting profile : ", err.message);
    return {
      success: false,
      error: "An unexpected error occurred while getting profile",
    };
  }
}

export async function getAllProfiles() {
  try {
    const supabase = await createClient();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*");

    if (error) {
      console.error("Error geting profiles : ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: profile };
  } catch (err) {
    console.error("Error getting profiles : ", err.message);
    return {
      success: false,
      error: "An unexpected error occurred while getting profile",
    };
  }
}

export async function deleteProfileById(profileId) {
  if (!profileId) {
    return { 
      success: false, 
      error: "Profile ID is required" 
    };
  }

  try {
    const supabase = await createClient();

    const { data: deletedProfile, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", profileId)
      .select()
      .single();

    if (error) {
      console.error("Error deletin profile : ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: deletedProfile };
  } catch (err) {
    console.error("Error deleting  profile : ", err.message);
    return {
      success: false,
      error: "An unexpected error occurred while deleting profile",
    };
  }
}

function processSkills(skills) {
  if (!skills) return [];
  
  if (Array.isArray(skills)) {
    return [...new Set(skills 
      .map(s => String(s).trim())
      .filter(s => s)
    )];
  }
  
  if (typeof skills === "string") {
    return [...new Set(skills 
      .split(",")
      .map(s => s.trim())
      .filter(s => s)
    )];
      
  }
  
  return [];
}
