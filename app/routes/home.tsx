import type { Route } from "./+types/home";
import HomeScreen from "~/modules/home/screens/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Senior Ease" },
    { name: "description", content: "Senior Ease" },
  ];
}

export default function Home() {
  return <HomeScreen />;
}
