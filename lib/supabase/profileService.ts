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
  isFallback?: boolean;
};

type ProfileValueMap = ProfileRow & {
  totalXp?: number | null;
  totalXP?: number | null;
  careerLevelIndex?: number | null;
  completedProjects?: number | null;
  earnedBadges?: BadgeName[] | null;
};

export type ProgressUpdate = {
  earnedXp: number;
  careerLevelIndex: number;
  earnedBadges: BadgeName[];
};

type SupabaseErrorDetails = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

function logSupabaseError(context: string, error: SupabaseErrorDetails) {
  console.error(
    "%cSupabase database error",
    "color: #ef4444; font-weight: 700;",
    {
      context,
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      rawError: error,
    },
  );
}

function getUsername(user: User) {
  if (typeof user.user_metadata?.username === "string") {
    return user.user_metadata.username;
  }

  if (typeof user.user_metadata?.name === "string") {
    return user.user_metadata.name;
  }

  return null;
}

function createDefaultProfile(user: User): ProfileRow {
  const now = new Date().toISOString();

  return {
    id: user.id,
    email: user.email ?? null,
    username: getUsername(user),
    role: "user",
    total_xp: defaultProgress.totalXp,
    career_level_index: defaultProgress.careerLevelIndex,
    completed_projects: defaultProgress.completedProjects,
    earned_badges: defaultProgress.earnedBadges,
    created_at: now,
    updated_at: now,
    isFallback: true,
  };
}

export function profileToProgress(profile: ProfileRow): ProgressData {
  const mappedProfile = profile as ProfileValueMap;

  return {
    totalXp:
      mappedProfile.total_xp ??
      mappedProfile.totalXp ??
      mappedProfile.totalXP ??
      defaultProgress.totalXp,
    careerLevelIndex:
      mappedProfile.career_level_index ??
      mappedProfile.careerLevelIndex ??
      defaultProgress.careerLevelIndex,
    completedProjects:
      mappedProfile.completed_projects ??
      mappedProfile.completedProjects ??
      defaultProgress.completedProjects,
    earnedBadges:
      mappedProfile.earned_badges ??
      mappedProfile.earnedBadges ??
      defaultProgress.earnedBadges,
    projectStars: defaultProgress.projectStars,
  };
}

export async function getOrCreateProfile(
  supabase: SupabaseClient,
  user: User,
) {
  const defaultProfile = createDefaultProfile(user);
  const { data: existingProfile, error: selectError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  console.log("Supabase'den okunan ham veri:", existingProfile);
  console.error("Supabase okuma hatası varsa:", selectError);

  if (selectError) {
    logSupabaseError("Could not select profile", selectError);
    return defaultProfile;
  }

  if (existingProfile) {
    return existingProfile;
  }

  const { data: createdProfile, error: insertError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: defaultProfile.id,
        email: defaultProfile.email,
        username: defaultProfile.username,
        role: defaultProfile.role,
        total_xp: defaultProfile.total_xp,
        career_level_index: defaultProfile.career_level_index,
        completed_projects: defaultProfile.completed_projects,
        earned_badges: defaultProfile.earned_badges,
      },
      { onConflict: "id" },
    )
    .select("*")
    .single<ProfileRow>();

  if (insertError) {
    logSupabaseError("Could not upsert profile", insertError);
    return defaultProfile;
  }

  return createdProfile ?? defaultProfile;
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

  console.log("Supabase'den okunan ham veri:", profile);
  console.error("Supabase okuma hatası varsa:", selectError);

  if (selectError) {
    logSupabaseError("Could not select profile before progress update", selectError);
    throw selectError;
  }

  if (!profile) {
    const missingProfileError = new Error("Profile row was not found.");
    console.error(
      "%cSupabase database error",
      "color: #ef4444; font-weight: 700;",
      {
        context: "Could not select profile before progress update",
        message: missingProfileError.message,
        code: undefined,
        details: `No profile row for user id ${userId}`,
        hint: "Ensure profiles.id matches auth.users.id and RLS allows authenticated users to select their own row.",
        rawError: missingProfileError,
      },
    );
    throw missingProfileError;
  }

  const currentTotalXp = profile.total_xp ?? 0;
  const currentCompletedProjects = profile.completed_projects ?? 0;
  const existingBadges = profile.earned_badges ?? [];
  const earnedBadges = progressUpdate.earnedBadges ?? [];
  const mergedBadges = Array.from(
    new Set([...existingBadges, ...earnedBadges]),
  );
  const newBadges = earnedBadges.filter(
    (badge) => !existingBadges.includes(badge),
  );

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({
      total_xp: currentTotalXp + (progressUpdate.earnedXp ?? 0),
      completed_projects: currentCompletedProjects + 1,
      career_level_index: progressUpdate.careerLevelIndex ?? 0,
      earned_badges: mergedBadges,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("*")
    .single<ProfileRow>();

  if (updateError) {
    logSupabaseError("Could not update profile progress", updateError);
    throw updateError;
  }

  return {
    profile: updatedProfile,
    progress: profileToProgress(updatedProfile),
    newBadges,
  };
}
