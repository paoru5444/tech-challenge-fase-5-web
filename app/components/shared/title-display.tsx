import type { AvatarProps } from "~/components/ui/avatar";
import Avatar from "../ui/avatar";

interface TitleDisplayProps extends AvatarProps {
  title?: string;
  description?: string;
}

export default function TitleDisplay({
  user,
  letter,
  title,
  description,
  containerClassName,
}: TitleDisplayProps) {
  return (
    <div className="flex flex-row items-center gap-2.5">
      {letter && !user && (
        <Avatar letter={letter} containerClassName={containerClassName} />
      )}

      {!letter && user && (
        <Avatar user={user} containerClassName={containerClassName} />
      )}

      <div className="flex w-[90%] flex-col gap-1">
        {title && (
          <p className="text-xs leading-normal font-bold">{title}</p>
        )}

        {description && <p className="text-xs leading-normal">{description}</p>}
      </div>
    </div>
  );
}
