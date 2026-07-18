import type { FormTask } from "~/domain/entities/task";
import { selectUser } from "~/modules/auth/store/selectors";
import { taskSchema } from "~/schemas/task-schema";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as actions from "../store/actions";
import { selectTasks } from "../store/selectors";

export function useTask() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectTasks);

  const getTasks = async () => {
    dispatch(actions.getTasks(user?.uid ?? ""));
  };

  const addTask = async (data: FormTask) => {
    return dispatch(
      actions.addTask({ userId: user?.uid ?? "", formData: data }),
    ).unwrap();
  };

  const deleteTask = async (taskId: string) => {
    return dispatch(
      actions.deleteTask({ userId: user?.uid ?? "", taskId }),
    ).unwrap();
  };

  const updateTask = async (formTask: FormTask, taskId: string) => {
    return dispatch(
      actions.updateTask({
        userId: user?.uid ?? "",
        taskId,
        formData: formTask,
      }),
    ).unwrap();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
    control,
    errors,
    handleSubmit,
    tasks,
  };
}
