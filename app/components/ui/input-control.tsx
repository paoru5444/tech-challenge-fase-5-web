import type { InputHTMLAttributes } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { SignInForm } from "~/modules/auth/hooks/useSignIn";
import type { SignUpForm } from "~/modules/auth/hooks/useSignUp";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  control?: Control<SignInForm | SignUpForm>;
  error?: {
    message?: string;
  } | null;
  name?: string;
  disablePaddingVertical?: boolean;
}

export function InputControl({
  className,
  placeholder,
  autoCapitalize,
  type = "text",
  control,
  error,
  name = "",
  disablePaddingVertical,
  label,
  ...rest
}: InputProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.05)] ${
        disablePaddingVertical ? "" : "py-4"
      } ${className ?? ""}`}
    >
      {label && <span className="text-sm font-normal">{label}</span>}

      <Controller
        control={control}
        name={name as never}
        defaultValue={"" as never}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            type={type}
            className="h-10 rounded-[10px] border border-[#EAEAEA] bg-white px-4"
            {...rest}
          />
        )}
      />

      {error && (
        <span className="text-red-600">* {error?.message}</span>
      )}
    </div>
  );
}
