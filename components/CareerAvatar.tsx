import { careerLevels } from "@/progressStorage";

const avatarEmojiByTitle: Record<string, string> = {
  "Junior Project Coordinator": "🧑‍💼",
  "Assistant Project Manager": "👩‍💻",
  "Project Manager": "🧭",
  "Senior Project Manager": "👑",
};

type CareerAvatarProps = {
  careerLevelIndex?: number;
  title?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-12 w-12 text-2xl",
  md: "h-16 w-16 text-3xl",
  lg: "h-20 w-20 text-4xl",
};

export function CareerAvatar({
  careerLevelIndex = 0,
  title,
  size = "md",
}: CareerAvatarProps) {
  const careerTitle = title ?? careerLevels[careerLevelIndex] ?? careerLevels[0];
  const emoji = avatarEmojiByTitle[careerTitle] ?? avatarEmojiByTitle[careerLevels[0]];

  return (
    <div className={`${sizeClass[size]} flex shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-lg shadow-cyan-950/40`}>
      <span aria-label={careerTitle} role="img">
        {emoji}
      </span>
    </div>
  );
}
