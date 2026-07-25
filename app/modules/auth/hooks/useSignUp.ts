import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type * as z from "zod";
import { signUpSchema } from "~/schemas/auth-schema";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import * as actions from "../store/actions";
import { isSignUpInProgress } from "../store/selectors";

export type SignUpForm = z.infer<typeof signUpSchema>;

export function useSignUp() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isSignUpInProgress);

  const navigate = useNavigate();

  function goToSignIn() {
    navigate("/sign-in");
  }

  async function signUp(data: SignUpForm) {
    try {
      const result = await dispatch(
        actions.signUp({ ...data, age: Number(data.age) }),
      );

      if (actions.signUp.fulfilled.match(result)) {
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.log("Sign Up Error:", error);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return {
    signUp,
    loading,
    goToSignIn,
    control,
    handleSubmit,
    errors,
  };
}
