import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha não preenchda"),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Nome não preenchido"),
  email: z.email("Email inválido"),
  age: z
    .string()
    .min(1, "Idade não preenchida")
    .refine((value) => {
      const parsed = Number(value);
      return !Number.isNaN(parsed) && parsed > 0 && parsed <= 120;
    }, "Idade inválida"),
  password: z.string().min(1, "Senha não preenchda"),
  passwordConfirm: z.string().min(1, "Confirmação de senha não preenchda"),
});
