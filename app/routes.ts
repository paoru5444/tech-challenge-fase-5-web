import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("protected-route.tsx", [
    index("routes/home.tsx"),
    route("tasks/:id", "routes/tasks-details.tsx"),
    route("tasks", "routes/tasks.tsx"),
    route("profile", "routes/profile.tsx"),
    route("setup", "routes/setup.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
] satisfies RouteConfig;
