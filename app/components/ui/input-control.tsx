import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import Typography from "./typography";

interface InputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  label?: string;
  control?: Control<T>;
  error?: {
    message?: string;
  } | null;
  name?: Path<T>;
  disablePaddingVertical?: boolean;
}

export function InputControl<T extends FieldValues>({
  className,
  placeholder,
  autoCapitalize,
  type = "text",
  control,
  error,
  name,
  disablePaddingVertical,
  label,
  ...rest
}: InputProps<T>) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl ${
        disablePaddingVertical ? "" : "py-4"
      } ${className ?? ""}`}
    >
      {label && <Typography variant="label">{label}</Typography>}

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
            className="h-10 rounded-[10px] border-2 border-[#EAEAEA] bg-white px-4 text-black contrast:border-black"
            {...rest}
          />
        )}
      />

      {error && (
        <Typography as="span" variant="bodySmall" className="text-red-600">
          * {error?.message}
        </Typography>
      )}
    </div>
  );
}
