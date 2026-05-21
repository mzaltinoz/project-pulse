import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProjectMethodology } from "@/data/projects";

export type UserProgressRecord = {
  user_id: string;
  project_id: string;
  project_title: string;
  methodology: ProjectMethodology;
  stars: number;
  xp_earned: number;
  result: string;
  final_score: number;
};

export async function getUserProgress(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function insertUserProgress(
  supabase: SupabaseClient,
  record: UserProgressRecord,
) {
  const { data, error } = await supabase
    .from("user_progress")
    .insert(record)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
