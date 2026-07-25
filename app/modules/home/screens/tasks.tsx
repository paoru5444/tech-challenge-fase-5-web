import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "~/components/layout/dashboard-layout";
import TaskCard from "~/components/shared/task-card";
import Typography from "~/components/ui/typography";
import { useTask } from "../hooks/useTask";

export default function Tasks() {
  const { getTasks, tasks } = useTask();
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [tasks, query],
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-3">
        <Typography variant="h2">
          Encontre suas <span className="text-[#F67653]">Atividades</span>
          <br />
          ao digitar seu nome abaixo:
        </Typography>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar atividade"
          className="h-10 rounded-[10px] border-2 border-[#EAEAEA] bg-white px-4 text-black contrast:border-black"
        />
      </div>

      <div className="flex flex-col gap-4 pt-8">
        {filteredTasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </DashboardLayout>
  );
}
