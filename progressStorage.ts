export type ProgressData = {
  totalXp: number;
  careerLevelIndex: number;
  completedProjects: number;
  earnedBadges: BadgeName[];
};

export type BadgeName =
  | "Agile Mindset"
  | "Waterfall Discipline"
  | "Deadline Saver"
  | "Team Builder"
  | "Scope Guardian";

export const careerLevels = [
  "Junior Project Coordinator",
  "Assistant Project Manager",
  "Project Manager",
  "Senior Project Manager",
];

const storageKey = "project-pulse-progress";

export const defaultProgress: ProgressData = {
  totalXp: 0,
  careerLevelIndex: 0,
  completedProjects: 0,
  earnedBadges: [],
};

function normalizeProgress(progress: Partial<ProgressData>): ProgressData {
  return {
    totalXp: Number(progress.totalXp ?? defaultProgress.totalXp),
    careerLevelIndex: Math.min(
      Math.max(
        Number(progress.careerLevelIndex ?? defaultProgress.careerLevelIndex),
        0,
      ),
      careerLevels.length - 1,
    ),
    completedProjects: Number(
      progress.completedProjects ?? defaultProgress.completedProjects,
    ),
    earnedBadges: Array.from(new Set(progress.earnedBadges ?? [])),
  };
}

export function getProgress(): ProgressData {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  const savedProgress = window.localStorage.getItem(storageKey);

  if (!savedProgress) {
    return defaultProgress;
  }

  try {
    return normalizeProgress(JSON.parse(savedProgress) as Partial<ProgressData>);
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressData) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function saveGameProgress(
  earnedXp: number,
  careerLevelIndex: number,
  unlockedBadges: BadgeName[] = [],
) {
  const currentProgress = getProgress();
  const earnedBadges = Array.from(
    new Set([...currentProgress.earnedBadges, ...unlockedBadges]),
  );
  const nextProgress = normalizeProgress({
    totalXp: currentProgress.totalXp + earnedXp,
    careerLevelIndex,
    completedProjects: currentProgress.completedProjects + 1,
    earnedBadges,
  });

  saveProgress(nextProgress);

  return {
    progress: nextProgress,
    newBadges: unlockedBadges.filter(
      (badge) => !currentProgress.earnedBadges.includes(badge),
    ),
  };
}

export function resetProgress() {
  window.localStorage.removeItem(storageKey);

  return defaultProgress;
}
