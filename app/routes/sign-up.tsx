import type { Route } from "./+types/sign-up";
import SignUpScreen from "~/modules/auth/screens/sign-up";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cadastrar" }];
}

export default function SignUp() {
  return <SignUpScreen />;
}
