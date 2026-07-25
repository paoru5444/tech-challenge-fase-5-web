import type { Route } from "./+types/tasks";
import TasksDetails from "~/modules/home/screens/tasks-details";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Detalhes da Atividade" }];
}

export default function Tasks() {
  return <TasksDetails />;
}
