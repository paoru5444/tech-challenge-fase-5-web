import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "~/components/layout/dashboard-layout";
import Banner from "~/components/shared/banner";
import TaskCard from "~/components/shared/task-card";
import { BottomSheet } from "~/components/ui/bottom-sheet";
import Button from "~/components/ui/button";
import Header from "~/components/ui/header";
import { InputControl } from "~/components/ui/input-control";
import { useTask } from "../hooks/useTask";
import PageHeader from "~/components/shared/page-header";
import Typography from "~/components/ui/typography";

export default function Home() {
  const { control, errors, handleSubmit, addTask, getTasks, tasks } = useTask();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.checked === false) || [],
    [tasks],
  );

  const onSubmit = handleSubmit(async (data) => {
    await addTask(data);
    setIsSheetOpen(false);
  });

  console.log("tasks: ", tasks);

  return (
    <>
      <DashboardLayout>
        <PageHeader
          title="Atividades"
          description="Suas metas e objetivos listados aqui"
        />

        <Banner
          title="Atividades pendentes"
          value={String(tasks.length || "")}
        />

        <div className="flex flex-col gap-4 pt-8">
          <Typography variant="subtitle">Minhas atividades</Typography>

          {tasks.length > 0 &&
            tasks.map((task) => <TaskCard task={task} key={task.id} />)}
        </div>
      </DashboardLayout>

      <button
        type="button"
        onClick={() => setIsSheetOpen(true)}
        className="fixed right-5 bottom-20 z-20 flex h-12.5 w-12.5 items-center justify-center rounded-full bg-[#F67653] md:bottom-5"
      >
        <Plus color="#FFFFFF" size={28} />
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
    </>
  );
}
