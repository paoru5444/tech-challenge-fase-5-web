import type { Route } from "./+types/sign-in";
import SignInScreen from "~/modules/auth/screens/sign-in";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Entrar" }];
}

export default function SignIn() {
  return <SignInScreen />;
}
