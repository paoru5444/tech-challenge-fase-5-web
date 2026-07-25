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
        <div className="flex flex-col items-start gap-1">
          <Typography variant="subtitle" className={checked ? "line-through" : ""}>
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
