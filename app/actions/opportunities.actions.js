"use server"

import { supabase } from "@/lib/supabaseServer"

// create opportunity
export async function createOpportunity(data) {
  const { data: opportunity, error } = await supabase
    .from("opportunities")
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return opportunity
}

// update opportunity
export async function updateOpportunity(id, data) {
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
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// get opportunity by id
export async function getOpportunityById(id) {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}