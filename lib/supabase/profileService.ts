import type { SupabaseClient, User } from "@supabase/supabase-js";
import {
  type BadgeName,
  type ProgressData,
  defaultProgress,
} from "@/progressStorage";

export type ProfileRow = {
  id: string;
  email: string | null;
  username: string | null;
  role: string;
  total_xp: number;
  career_level_index: number;
  completed_projects: number;
  earned_badges: BadgeName[] | null;
  created_at: string;
  updated_at: string;
};

export type ProgressUpdate = {
  earnedXp: number;
  careerLevelIndex: number;
  earnedBadges: BadgeName[];
};

export function profileToProgress(profile: ProfileRow): ProgressData {
  return {
    totalXp: profile.total_xp ?? defaultProgress.totalXp,
    careerLevelIndex:
      profile.career_level_index ?? defaultProgress.careerLevelIndex,
    completedProjects:
      profile.completed_projects ?? defaultProgress.completedProjects,
    earnedBadges: profile.earned_badges ?? defaultProgress.earnedBadges,
  };
}

export async function getOrCreateProfile(
  supabase: SupabaseClient,
  user: User,
) {
  const { data: existingProfile, error: selectError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  if (selectError) {
    throw selectError;
  }

  if (existingProfile) {
    return existingProfile;
  }

  const { data: createdProfile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email,
      username:
        typeof user.user_metadata?.name === "string"
          ? user.user_metadata.name
          : null,
    })
    .select("*")
    .single<ProfileRow>();

  if (insertError) {
    throw insertError;
  }

  return createdProfile;
}

export async function updateProfileProgress(
  supabase: SupabaseClient,
  userId: string,
  progressUpdate: ProgressUpdate,
) {
  const { data: profile, error: selectError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single<ProfileRow>();

  if (selectError) {
    throw selectError;
  }

  const existingBadges = profile.earned_badges ?? [];
  const mergedBadges = Array.from(
    new Set([...existingBadges, ...progressUpdate.earnedBadges]),
  );
  const newBadges = progressUpdate.earnedBadges.filter(
    (badge) => !existingBadges.includes(badge),
  );

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({
      total_xp: profile.total_xp + progressUpdate.earnedXp,
      completed_projects: profile.completed_projects + 1,
      career_level_index: progressUpdate.careerLevelIndex,
      earned_badges: mergedBadges,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("*")
    .single<ProfileRow>();

  if (updateError) {
    throw updateError;
  }

  return {
    profile: updatedProfile,
    progress: profileToProgress(updatedProfile),
    newBadges,
  };
}
