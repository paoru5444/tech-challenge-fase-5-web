import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { selectFontSize } from "~/modules/setup/store/selector";
import type { SetupType } from "~/modules/setup/store/slices";
import { useAppSelector } from "~/store/hooks";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "title"
  | "subtitle"
  | "body"
  | "bodySmall"
  | "label"
  | "caption";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /** Sobrescreve a tag HTML renderizada pelo variant (ex: usar h1 estilizado como "title") */
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

type FontSize = SetupType["fontSize"];

const sizeStyles: Record<TypographyVariant, Record<FontSize, string>> = {
  h1: { small: "text-xl", default: "text-2xl", big: "text-3xl" },
  h2: { small: "text-lg", default: "text-xl", big: "text-2xl" },
  title: { small: "text-sm", default: "text-base", big: "text-lg" },
  subtitle: { small: "text-sm", default: "text-base", big: "text-lg" },
  body: { small: "text-xs", default: "text-sm", big: "text-base" },
  bodySmall: { small: "text-[11px]", default: "text-xs", big: "text-sm" },
  label: { small: "text-[11px]", default: "text-xs", big: "text-sm" },
  caption: { small: "text-[9px]", default: "text-[10px]", big: "text-xs" },
};

const variantStyles: Record<TypographyVariant, string> = {
  h1: "font-bold tracking-[-0.2px]",
  h2: "font-bold tracking-[-0.2px]",
  title: "font-bold tracking-[-0.2px]",
  subtitle: "font-semibold tracking-[-0.4px]",
  body: "font-normal",
  bodySmall: "font-normal",
  label: "font-bold",
  caption: "leading-normal font-medium tracking-[-0.2px] text-[#828282]",
};

const variantElements: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  title: "p",
  subtitle: "p",
  body: "p",
  bodySmall: "p",
  label: "span",
  caption: "span",
};

export default function Typography({
  variant = "body",
  as,
  className,
  children,
  ...rest
}: TypographyProps) {
  const fontSize = useAppSelector(selectFontSize);
  const Component = as ?? variantElements[variant];

  return (
    <Component
      className={`${sizeStyles[variant][fontSize]} ${variantStyles[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
