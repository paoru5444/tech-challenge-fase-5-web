import type { AvatarProps } from "~/components/ui/avatar";
import Avatar from "../ui/avatar";
import Typography from "../ui/typography";

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
        {title && <Typography variant="subtitle">{title}</Typography>}

        {description && <Typography variant="body">{description}</Typography>}
      </div>
    </div>
  );
}
