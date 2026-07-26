import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DashboardLayout from "~/components/layout/dashboard-layout";
import Modal from "~/components/shared/modal";
import Card from "~/components/ui/card";
import { Toast } from "~/components/ui/toast";
import Typography from "~/components/ui/typography";
import {
  selectExtraConfirmation,
  selectVisualFeedback,
} from "~/modules/setup/store/selector";
import { useAppSelector } from "~/store/hooks";
import { useTask } from "../hooks/useTask";

type PendingAction = "complete" | "delete" | null;

export default function TasksDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, getTasks, updateTask, deleteTask } = useTask();
  const extraConfirmation = useAppSelector(selectExtraConfirmation);
  const visualFeedback = useAppSelector(selectVisualFeedback);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  const task = useMemo(() => tasks.find((item) => item.id === id), [tasks, id]);

  const runAction = async (action: PendingAction) => {
    if (!task) return;

    if (action === "complete") {
      await updateTask({ ...task, checked: !task.checked }, task.id);
      if (visualFeedback) setToastMessage("Atividade concluída!");
    } else if (action === "delete") {
      await deleteTask(task.id);
      if (visualFeedback) setToastMessage("Atividade excluída!");
    }

    if (visualFeedback) {
      setTimeout(() => navigate("/", { replace: true }), 900);
    } else {
      navigate("/", { replace: true });
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

  if (!task) {
    return (
      <DashboardLayout>
        <Typography variant="body">Atividade não encontrada.</Typography>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex w-fit flex-row items-center gap-2 text-[#8A8783] contrast:text-black"
        >
          <ArrowLeft size={20} />
          <Typography variant="body">Voltar</Typography>
        </button>

        <Card className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Typography
              variant="label"
              className="text-[#8A8783] contrast:text-black"
            >
              Atividade a fazer:
            </Typography>
            <Typography variant="h1">{task.title}</Typography>
          </div>

          <div className="flex flex-col gap-2">
            <Typography
              variant="label"
              className="text-[#8A8783] contrast:text-black"
            >
              Descrição da atividade:
            </Typography>
            <Typography variant="body">{task.description}</Typography>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          {!task.checked && (
            <button
              type="button"
              onClick={() => requestAction("complete")}
              className="flex h-12.5 items-center justify-center rounded-full bg-[#39A304]"
            >
              <Typography variant="title" className="text-white">
                Concluir atividade
              </Typography>
            </button>
          )}

          <button
            type="button"
            onClick={() => requestAction("delete")}
            className="flex h-12.5 items-center justify-center rounded-full bg-[#F05069]"
          >
            <Typography variant="title" className="text-white">
              Deletar atividade
            </Typography>
          </button>
        </div>
      </DashboardLayout>

      <Modal
        open={pendingAction !== null}
        onClose={() => setPendingAction(null)}
        title={
          pendingAction === "delete" ? "Deletar atividade?" : "Concluir atividade?"
        }
        description={
          pendingAction === "delete"
            ? "Essa ação não pode ser desfeita. Tem certeza que deseja excluir esta atividade?"
            : "Tem certeza que deseja marcar esta atividade como concluída?"
        }
        actions={[
          {
            label: "Cancelar",
            variant: "secondary",
            onPress: () => setPendingAction(null),
          },
          {
            label: "Confirmar",
            variant: pendingAction === "delete" ? "danger" : "primary",
            onPress: handleConfirm,
          },
        ]}
      />

      <Toast
        open={toastMessage !== null}
        message={toastMessage ?? ""}
        onClose={() => setToastMessage(null)}
      />
    </>
  );
}
