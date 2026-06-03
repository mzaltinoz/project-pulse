import type { SupabaseClient, User } from "@supabase/supabase-js";
import {
  type BadgeName,
  type ProgressData,
  defaultProgress,
  getProgress,
  saveProgress,
} from "@/progressStorage";
import {
  getOrCreateProfile,
  type ProfileRow,
  profileToProgress,
} from "@/lib/supabase/profileService";
import { getUserProgress } from "@/lib/supabase/progressService";

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

function mergeBadges(
  localBadges: BadgeName[],
  cloudBadges: BadgeName[],
): BadgeName[] {
  return Array.from(new Set([...localBadges, ...cloudBadges]));
}

function mergeProjectStars(
  localStars: ProgressData["projectStars"],
  cloudStars: ProgressData["projectStars"],
) {
  const mergedStars = {
    ...localStars,
  };

  Object.entries(cloudStars).forEach(([projectId, stars]) => {
    mergedStars[projectId] = Math.max(mergedStars[projectId] ?? 0, stars);
  });

  return mergedStars;
}

function progressRowsToProjectStars(
  progressRows: Awaited<ReturnType<typeof getUserProgress>>,
) {
  return progressRows.reduce<ProgressData["projectStars"]>(
    (starsByProject, progressRecord) => {
      const mappedRecord = progressRecord as typeof progressRecord & {
        projectId?: string | null;
        projectID?: string | null;
      };
      const projectId = String(
        mappedRecord.project_id ??
          mappedRecord.projectId ??
          mappedRecord.projectID ??
          "",
      );

      if (projectId) {
        starsByProject[projectId] = Math.max(
          starsByProject[projectId] ?? 0,
          Number(mappedRecord.stars ?? 0),
        );
      }

      return starsByProject;
    },
    {},
  );
}

async function getCloudProgressOnly(supabase: SupabaseClient, userId: string) {
  const [profileResult, cloudRows] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle<ProfileRow>(),
    getUserProgress(supabase, userId).catch((error) => {
      logSupabaseError("Could not load cloud progress for read-only sync", error);
      return [];
    }),
  ]);

  if (profileResult.error) {
    logSupabaseError("Could not load cloud profile for read-only sync", profileResult.error);
  }

  console.log("Supabase'den okunan ham veri:", profileResult.data);
  console.error("Supabase okuma hatası varsa:", profileResult.error);

  const cloudProgress = profileResult.data
    ? profileToProgress(profileResult.data)
    : defaultProgress;
  const cloudProjectStars = progressRowsToProjectStars(cloudRows);

  return {
    ...cloudProgress,
    projectStars: cloudProjectStars,
  };
}

async function saveProgressToCloud(
  supabase: SupabaseClient,
  user: User,
  progress: ProgressData,
) {
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? null,
      username:
        typeof user.user_metadata?.username === "string"
          ? user.user_metadata.username
          : null,
      role: "user",
      total_xp: progress.totalXp,
      career_level_index: progress.careerLevelIndex,
      completed_projects: progress.completedProjects,
      earned_badges: progress.earnedBadges,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    logSupabaseError("Could not upsert merged profile progress", error);
    throw error;
  }
}

export async function syncLocalAndCloudProgress(
  supabase: SupabaseClient,
  user: User,
) {
  const localProgress = getProgress();

  if (localProgress.totalXp <= 0) {
    const cloudProgress = await getCloudProgressOnly(supabase, user.id);
    saveProgress(cloudProgress);

    return cloudProgress;
  }

  const [cloudProfile, cloudRows] = await Promise.all([
    getOrCreateProfile(supabase, user),
    getUserProgress(supabase, user.id).catch((error) => {
      logSupabaseError("Could not load cloud progress for merge", error);
      return [];
    }),
  ]);
  const cloudProgress = profileToProgress(cloudProfile);
  const cloudProjectStars = progressRowsToProjectStars(cloudRows);
  const mergedProjectStars = mergeProjectStars(
    localProgress.projectStars,
    cloudProjectStars,
  );
  const mergedBadges = mergeBadges(
    localProgress.earnedBadges,
    cloudProgress.earnedBadges,
  );
  const shouldPushLocal = localProgress.totalXp > cloudProgress.totalXp;
  const mergedProgress: ProgressData = shouldPushLocal
    ? {
        ...localProgress,
        completedProjects: Math.max(
          localProgress.completedProjects,
          cloudProgress.completedProjects,
        ),
        earnedBadges: mergedBadges,
        projectStars: mergedProjectStars,
      }
    : {
        ...cloudProgress,
        completedProjects: Math.max(
          localProgress.completedProjects,
          cloudProgress.completedProjects,
        ),
        earnedBadges: mergedBadges,
        projectStars: mergedProjectStars,
      };

  saveProgress(mergedProgress);

  if (shouldPushLocal) {
    try {
      await saveProgressToCloud(supabase, user, mergedProgress);
    } catch {
      saveProgress(mergedProgress);
    }
  }

  return mergedProgress;
}
