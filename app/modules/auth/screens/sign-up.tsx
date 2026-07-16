import Button from "~/components/ui/button";
import { InputControl } from "~/components/ui/input-control";
import Typography from "~/components/ui/typography";
import AuthLayout from "../components/auth-layout";
import CredentialsFooter from "../components/credentials-footer";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUpScreen() {
  const { signUp, loading, goToSignIn, control, handleSubmit, errors } =
    useSignUp();

  return (
    <AuthLayout>
      <Typography variant="h1" className="text-black">
        Cadastre-se
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

        <InputControl
          label="Confirme sua senha"
          placeholder="✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎"
          autoCapitalize="none"
          type="password"
          control={control}
          error={errors["passwordConfirm"]}
          name="passwordConfirm"
        />
      </div>

      <Button
        text="Cadastre-se"
        disabled={loading}
        onPress={handleSubmit(signUp)}
      />

      <CredentialsFooter
        onPress={goToSignIn}
        title="Já tem uma conta?"
        buttonLabel="Fazer login"
      />
    </AuthLayout>
  );
}
