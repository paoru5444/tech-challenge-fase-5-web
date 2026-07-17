import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { ITask } from "~/domain/entities/task";
import { useTask } from "~/modules/home/hooks/useTask";
import { selectExtraConfirmation } from "~/modules/setup/store/selector";
import { useAppSelector } from "~/store/hooks";
import Card from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ProgressBar } from "../ui/progress-bar";
import Typography from "../ui/typography";
import Modal from "./modal";

interface TaskCardProps {
  task: ITask;
}

type PendingAction = "complete" | "delete" | null;

export default function TaskCard({ task }: TaskCardProps) {
  const { id, title, description, checked, steps } = task;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const { deleteTask, updateTask } = useTask();
  const extraConfirmation = useAppSelector(selectExtraConfirmation);

  const runAction = (action: PendingAction) => {
    if (action === "complete") {
      updateTask({ ...task, checked: !task.checked }, task.id);
    } else if (action === "delete") {
      deleteTask(id);
    }
  };

  const requestAction = (action: PendingAction) => {
    if (extraConfirmation) {
      setPendingAction(action);
    } else {
      runAction(action);
    }
  };

  const handleConfirm = () => {
    runAction(pendingAction);
    setPendingAction(null);
  };

  return (
    <Card className="flex flex-col gap-3">
      <button
        type="button"
        className="flex flex-row items-center justify-between"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="flex flex-col items-start">
          <Typography variant="subtitle">{title}</Typography>
          <Typography variant="bodySmall">{description}</Typography>
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
                <Typography variant="body">Introdução à biblioteca Jest</Typography>
              </div>

              <div className="flex flex-row items-center gap-2">
                <Checkbox checked={false} onChange={() => {}} />
                <Typography variant="body">Introdução à biblioteca Jest</Typography>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            {!checked && (
              <button
                type="button"
                onClick={() => requestAction("complete")}
                className="flex h-7.5 items-center justify-center rounded-2xl bg-[#39A304]"
              >
                <Typography variant="subtitle" className="text-white">
                  Concluir atividade
                </Typography>
              </button>
            )}

            <button
              type="button"
              onClick={() => requestAction("delete")}
              className="flex h-7.5 items-center justify-center rounded-2xl bg-[#F05069]"
            >
              <Typography variant="subtitle" className="text-white">
                Deletar atividade
              </Typography>
            </button>
          </div>
        </>
      )}

      <Modal
        open={pendingAction !== null}
        onClose={() => setPendingAction(null)}
        title={
          pendingAction === "delete" ? "Excluir atividade?" : "Concluir atividade?"
        }
        description={
          pendingAction === "delete"
            ? "Essa ação não pode ser desfeita."
            : "Você poderá reabrir essa atividade depois, se precisar."
        }
        actions={[
          {
            label: "Cancelar",
            variant: "secondary",
            onPress: () => setPendingAction(null),
          },
          {
            label: pendingAction === "delete" ? "Excluir" : "Concluir",
            variant: pendingAction === "delete" ? "danger" : "primary",
            onPress: handleConfirm,
          },
        ]}
      />
    </Card>
  );
}
