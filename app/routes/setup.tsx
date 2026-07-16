import type { Route } from "./+types/setup";
import SetupScreen from "~/modules/setup/screens/setup";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Configurações" }];
}

export default function Setup() {
  return <SetupScreen />;
}
