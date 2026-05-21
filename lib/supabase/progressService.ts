import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProjectMethodology } from "@/data/projects";

export type UserProgressRecord = {
  user_id: string;
  project_id: string;
  project_title: string;
  methodology: ProjectMethodology | "";
  stars: number;
  xp_earned: number;
  result: string;
  final_score: number;
};

type SupabaseErrorDetails = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

function logSupabaseError(context: string, error: SupabaseErrorDetails) {
  console.error(context, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });
}

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
    logSupabaseError("Could not load user progress", error);
    throw error;
  }

  return data;
}

export async function insertUserProgress(
  supabase: SupabaseClient,
  record: UserProgressRecord,
) {
  const safeRecord: UserProgressRecord = {
    user_id: record.user_id ?? "",
    project_id: record.project_id ?? "",
    project_title: record.project_title ?? "",
    methodology: record.methodology ?? "",
    stars: record.stars ?? 0,
    xp_earned: record.xp_earned ?? 0,
    result: record.result ?? "",
    final_score: record.final_score ?? 0,
  };

  const { data, error } = await supabase
    .from("user_progress")
    .insert(safeRecord)
    .select("*")
    .single();

  if (error) {
    logSupabaseError("Could not insert user progress", error);
    throw error;
  }

  return data;
}
