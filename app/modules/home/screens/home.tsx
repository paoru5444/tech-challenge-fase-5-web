import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "~/components/layout/dashboard-layout";
import Banner from "~/components/shared/banner";
import TaskCard from "~/components/shared/task-card";
import { BottomSheet } from "~/components/ui/bottom-sheet";
import Button from "~/components/ui/button";
import { InputControl } from "~/components/ui/input-control";
import { Toast } from "~/components/ui/toast";
import Typography from "~/components/ui/typography";
import { selectVisualFeedback } from "~/modules/setup/store/selector";
import { useAppSelector } from "~/store/hooks";
import { useTask } from "../hooks/useTask";

export default function Home() {
  const {
    control,
    errors,
    handleSubmit,
    addTask,
    getTasks,
    pendingTasks,
    completedTasks,
    lastTasks,
    goToTaskDetails,
  } = useTask();
  const visualFeedback = useAppSelector(selectVisualFeedback);
  const navigate = useNavigate();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addTask(data);
      if (visualFeedback) setToastMessage("Atividade criada!");
      setIsSheetOpen(false);
    } catch (error) {
      console.log("onSubmit failed: ", error);
    }
  });

  return (
    <>
      <DashboardLayout>
        <Typography variant="h2">
          Organize suas atividades
          <br />
          com <span className="text-[#F67653]">SeniorEase</span>
        </Typography>

        <div className="flex flex-row gap-4">
          <Banner
            title="Tarefas Pendentes"
            value={String(pendingTasks.length || "0")}
          />

          <Banner
            title="Tarefas Concluidas"
            value={String(completedTasks.length || "0")}
            variant="history"
          />
        </div>

        <div className="flex flex-col gap-3 pt-8">
          <div className="flex flex-row items-center justify-between">
            <Typography variant="subtitle">Últimas atividades</Typography>

            <button type="button" onClick={() => navigate("/tasks")}>
              <Typography variant="body" className="font-semibold text-[#F67653]">
                Ver todas
              </Typography>
            </button>
          </div>

          {lastTasks.length > 0 &&
            lastTasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                onPress={() => goToTaskDetails(task)}
              />
            ))}
        </div>
      </DashboardLayout>

      <button
        type="button"
        aria-label="Criar nova atividade"
        onClick={() => setIsSheetOpen(true)}
        className="fixed right-5 bottom-20 z-20 flex h-18 w-18 items-center justify-center rounded-full bg-[#F67653] md:bottom-5"
      >
        <Plus color="#FFFFFF" size={40} />
      </button>

      <BottomSheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <Typography variant="h2">Nova atividade</Typography>

        <div className="flex w-full flex-col gap-6">
          <InputControl
            label="Nome da atividade"
            placeholder="Assistir ao módulo 01*"
            control={control}
            error={errors["title"]}
            name="title"
            disablePaddingVertical
          />

          <InputControl
            label="Descrição da atividade"
            placeholder="Finalizar as aulas 01 e 02*"
            autoCapitalize="none"
            control={control}
            error={errors["description"]}
            name="description"
            disablePaddingVertical
          />
        </div>

        <Button text="Criar atividade" onPress={onSubmit} />
      </BottomSheet>

      <Toast
        open={toastMessage !== null}
        message={toastMessage ?? ""}
        onClose={() => setToastMessage(null)}
      />
    </>
  );
}
