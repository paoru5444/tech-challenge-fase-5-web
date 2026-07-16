import Button from "~/components/ui/button";
import { InputControl } from "~/components/ui/input-control";
import Typography from "~/components/ui/typography";
import AuthLayout from "../components/auth-layout";
import CredentialsFooter from "../components/credentials-footer";
import { useSignIn } from "../hooks/useSignIn";

export default function SignInScreen() {
  const { signIn, loading, goToSignUp, control, handleSubmit, errors } =
    useSignIn();

  return (
    <AuthLayout>
      <Typography variant="h1" className="text-black">
        Seja bem vindo!
      </Typography>

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
