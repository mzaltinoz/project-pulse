export type ProgressData = {
  totalXp: number;
  careerLevelIndex: number;
  completedProjects: number;
};

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

export function saveGameProgress(earnedXp: number, careerLevelIndex: number) {
  const currentProgress = getProgress();
  const nextProgress = normalizeProgress({
    totalXp: currentProgress.totalXp + earnedXp,
    careerLevelIndex,
    completedProjects: currentProgress.completedProjects + 1,
  });

  saveProgress(nextProgress);

  return nextProgress;
}

export function resetProgress() {
  window.localStorage.removeItem(storageKey);

  return defaultProgress;
}
