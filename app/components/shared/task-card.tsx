import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { ITask } from "~/domain/entities/task";
import { useTask } from "~/modules/home/hooks/useTask";
import Card from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ProgressBar } from "../ui/progress-bar";

interface TaskCardProps {
  task: ITask;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { id, title, description, checked, steps } = task;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { deleteTask, updateTask } = useTask();

  return (
    <Card className="flex flex-col gap-3">
      <button
        type="button"
        className="flex flex-row items-center justify-between"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="flex flex-col items-start">
          <p className="text-md leading-normal font-bold">{title}</p>
          <p className="text-sm leading-normal">{description}</p>
        </div>

        {isCollapsed ? (
          <ChevronDown color="#1F2024" size={20} />
        ) : (
          <ChevronUp color="#1F2024" size={20} />
        )}
      </button>

      {!isCollapsed && (
        <>
          {steps && steps.length > 0 && (
            <>
              <ProgressBar progress={50} />

              <div className="flex flex-row items-center gap-2">
                <Checkbox checked={true} onChange={() => {}} />
                <p>Introdução à biblioteca Jest</p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <Checkbox checked={false} onChange={() => {}} />
                <p>Introdução à biblioteca Jest</p>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            {!checked && (
              <button
                type="button"
                onClick={() =>
                  updateTask({ ...task, checked: !task.checked }, task.id)
                }
                className="flex h-7.5 items-center justify-center rounded-2xl bg-[#39A304]"
              >
                <span className="font-semibold text-white">
                  Concluir atividade
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => deleteTask(id)}
              className="flex h-7.5 items-center justify-center rounded-2xl bg-[#F05069]"
            >
              <span className="font-semibold text-white">
                Deletar atividade
              </span>
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
