import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type * as z from "zod";
import { signInSchema } from "~/schemas/auth-schema";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import type { IUserCredentials } from "~/domain/entities/user";
import * as actions from "../store/actions";
import { isSignInProgress } from "../store/selectors";

export type SignInForm = z.infer<typeof signInSchema>;

export function useSignIn() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isSignInProgress);

  const navigate = useNavigate();

  async function signIn(credentials: IUserCredentials) {
    try {
      const result = await dispatch(actions.signIn(credentials));

      if (actions.signIn.fulfilled.match(result)) {
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.log("Sign In Error:", error);
    }
  }

  function goToSignUp() {
    navigate("/sign-up");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    signIn,
    goToSignUp,
    loading,
    control,
    handleSubmit,
    errors,
  };
}
