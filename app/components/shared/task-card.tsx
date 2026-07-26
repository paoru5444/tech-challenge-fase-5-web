import type { ITask } from "~/domain/entities/task";
import Card from "../ui/card";
import Typography from "../ui/typography";

interface TaskCardProps {
  task: ITask;
  onPress: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
  const { title, description, checked } = task;

  return (
    <Card>
      <button
        type="button"
        onClick={onPress}
        className="flex w-full flex-row items-center justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1 items-start">
          <Typography
            variant="subtitle"
            className={checked ? "line-through" : ""}
          >
            {title}
          </Typography>
          <Typography
            variant="bodySmall"
            className={`truncate ${checked ? "line-through" : ""}`}
          >
            {description}
          </Typography>
        </div>
      </button>
    </Card>
  );
}
