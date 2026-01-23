"use server"

import { createClient } from "@/lib/supabase/supabaseClient"

// create opportunity
export async function createOpportunity(data) {
    const supabase = await createClient();
  const { data: opportunity, error } = await supabase
    .from("opportunities")
    .insert(data)
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return opportunity
}

// update opportunity
export async function updateOpportunity(id, data) {
    const supabase = await createClient();
  const { data: opportunity, error } = await supabase
    .from("opportunities")
    .update(data)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return opportunity
}

// close opportunity
export async function closeOpportunity(id) {
    const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .update({ status: "Closed" })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

// get all opportunities
export async function getAllOpportunities() {
    const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")

  if (error) throw error
  return data
}

// get opportunity by id
export async function getOpportunityById(id) {
    const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}