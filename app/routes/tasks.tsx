import type { Route } from "./+types/tasks";
import TasksScreen from "~/modules/home/screens/tasks";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Atividades" }];
}

export default function Tasks() {
  return <TasksScreen />;
}
