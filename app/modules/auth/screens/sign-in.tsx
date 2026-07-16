import Button from "~/components/ui/button";
import { InputControl } from "~/components/ui/input-control";
import AuthLayout from "../components/auth-layout";
import CredentialsFooter from "../components/credentials-footer";
import { useSignIn } from "../hooks/useSignIn";

export default function SignInScreen() {
  const { signIn, loading, goToSignUp, control, handleSubmit, errors } =
    useSignIn();

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold tracking-[-0.2px] text-black">
        Seja bem vindo!
      </h1>

      <div className="flex flex-col">
        <InputControl
          label="Digite seu email"
          placeholder="john.doe@mail.com"
          autoCapitalize="none"
          control={control}
          error={errors["email"]}
          name="email"
        />

        <InputControl
          label="Digite sua senha"
          placeholder="✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎"
          autoCapitalize="none"
          type="password"
          control={control}
          error={errors["password"]}
          name="password"
        />
      </div>

      <Button text="Entrar" disabled={loading} onPress={handleSubmit(signIn)} />

      <CredentialsFooter
        onPress={goToSignUp}
        title="Não tem uma conta?"
        buttonLabel="Cadastre-se"
      />
    </AuthLayout>
  );
}
