import type { SupabaseClient, User } from "@supabase/supabase-js";
import {
  type BadgeName,
  type ProgressData,
  getProgress,
  saveProgress,
} from "@/progressStorage";
import {
  getOrCreateProfile,
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
  console.error(context, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });
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
      const projectId = String(progressRecord.project_id ?? "");

      if (projectId) {
        starsByProject[projectId] = Math.max(
          starsByProject[projectId] ?? 0,
          Number(progressRecord.stars ?? 0),
        );
      }

      return starsByProject;
    },
    {},
  );
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
  const [localProgress, cloudProfile, cloudRows] = await Promise.all([
    Promise.resolve(getProgress()),
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
