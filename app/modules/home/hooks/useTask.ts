import type { FormTask, ITask } from "~/domain/entities/task";
import { selectUser } from "~/modules/auth/store/selectors";
import { taskSchema } from "~/schemas/task-schema";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as actions from "../store/actions";
import { selectTasks } from "../store/selectors";

export function useTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectTasks);

  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const getTasks = async () => {
    dispatch(actions.getTasks(user?.uid ?? ""));
  };

  const addTask = async (data: FormTask) => {
    const task = await dispatch(
      actions.addTask({ userId: user?.uid ?? "", formData: data }),
    ).unwrap();

    reset();

    return task;
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
    reset,
  } = useForm<any>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.checked) || [],
    [tasks],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.checked) || [],
    [tasks],
  );

  const lastTasks = useMemo(() => tasks.slice(0, 3) || [], [tasks]);

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;

    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearch),
    );
  }, [tasks, search]);

  const goToTaskDetails = (task: ITask) => {
    navigate(`/tasks/${task.id}`);
  };

  return {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
    control,
    errors,
    handleSubmit,
    tasks,
    pendingTasks,
    completedTasks,
    lastTasks,
    query,
    setQuery,
    filteredTasks,
    reset,
    goToTaskDetails,
  };
}
