import type { Route } from "./+types/profile";
import ProfileScreen from "~/modules/profile/screens/profile";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Meu Perfil" }];
}

export default function Profile() {
  return <ProfileScreen />;
}
