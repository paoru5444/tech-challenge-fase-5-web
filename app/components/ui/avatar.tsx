import type { IUser } from "~/domain/entities/user";

export interface AvatarProps {
  user?: IUser | null;
  letter?: string;
  containerClassName?: string;
}

export default function Avatar({ user, letter, containerClassName }: AvatarProps) {
  const userFirstLetter = user?.displayName?.split("")[0] || "U";

  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#F67653] ${containerClassName ?? ""}`}
    >
      <span className="text-base font-bold tracking-[-0.4px] text-white">
        {user && !letter && userFirstLetter}
        {letter && !user && letter}
      </span>
    </div>
  );
}
