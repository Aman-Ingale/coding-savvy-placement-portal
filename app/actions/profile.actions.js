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

    let resumeUrl = null;
    if (profileData.resume) {
      const uploadResult = await uploadResume(profileData.resume);
      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error };
      }
      resumeUrl = uploadResult.url;
    }

    const now = new Date().toISOString();

    const data = {
      ...profileData,
      resume_url: resumeUrl,
      skills: profileData.skills,
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
      error: "Profile ID is required",
    };
  }

  try {
    const supabase = await createClient();

    let resumeUrl = profileData.resume_url;

    if (profileData.resume) {
      const uploadResult = await uploadResume(profileData.resume);
      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error };
      }

      // delete old resume AFTER successful upload
      if (profileData.resume_url) {
        const oldPath = profileData.resume_url.split("/profiles/")[1];
        if (oldPath) {
          await supabase.storage.from("profiles").remove([oldPath]);
        }
      }

      resumeUrl = uploadResult.url;
    }

    const now = new Date().toISOString();

    const data = {
      ...profileData,
      resume_url: resumeUrl,
      ...(profileData.skills && {
        skills: profileData.skills,
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

async function uploadResume(file) {
  const supabase = await createClient();

  const safeName = file.name.replace(/\s+/g, "_");
  const filePath = `resumes/${Date.now()}_${safeName}`;

  const { error } = await supabase.storage
    .from("profiles")
    .upload(filePath, file, {
      contentType: file.type,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  const { data } = supabase.storage.from("profiles").getPublicUrl(filePath);

  return { success: true, url: data.publicUrl };
}

export async function getProfileById(profileId) {
  if (!profileId) {
    return {
      success: false,
      error: "Profile ID is required",
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
      error: "Profile ID is required",
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

export async function getProfileByUserId(userId) {
  if (!userId) {
    return { 
      success: false, 
      error: "User ID is required" 
    };
  }

  try {
    const supabase = await createClient();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single(); // single ensures we get one record

    if (error) {
      console.error("Error fetching profile:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: profile };
  } catch (err) {
    console.error("Unexpected error fetching profile:", err.message);
    return {
      success: false,
      error: "An unexpected error occurred while fetching profile",
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

// function processSkills(skills) {
//   if (!skills) return [];

//   if (Array.isArray(skills)) {
//     return [...new Set(skills.map((s) => String(s).trim()).filter((s) => s))];
//   }

//   if (typeof skills === "string") {
//     return [
//       ...new Set(
//         skills
//           .split(",")
//           .map((s) => s.trim())
//           .filter((s) => s),
//       ),
//     ];
//   }

//   return [];
// }
