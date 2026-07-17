import { X } from "lucide-react";
import type { ReactNode } from "react";
import Typography from "~/components/ui/typography";

export interface ModalAction {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actions?: ModalAction[];
  children?: ReactNode;
}

const actionStyles: Record<NonNullable<ModalAction["variant"]>, string> = {
  primary: "bg-[#F67653]",
  secondary: "border border-[#EAEAEA] bg-white contrast:border-black",
  danger: "bg-[#F05069]",
};

const actionTextClassName: Record<NonNullable<ModalAction["variant"]>, string> = {
  primary: "text-white",
  secondary: "text-[#1A1918]",
  danger: "text-white",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  actions,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative flex w-full max-w-md flex-col gap-4 rounded-t-3xl bg-white p-6 md:rounded-3xl">
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A8783] contrast:text-black"
        >
          <X size={20} />
        </button>

        {title && <Typography variant="h2">{title}</Typography>}

        {description && (
          <Typography variant="body" className="text-[#8A8783] contrast:text-black">
            {description}
          </Typography>
        )}

        {children}

        {actions && actions.length > 0 && (
          <div className="flex flex-col gap-2">
            {actions.map((action) => {
              const variant = action.variant ?? "primary";

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onPress}
                  className={`flex h-12.5 items-center justify-center rounded-full ${actionStyles[variant]}`}
                >
                  <Typography variant="title" className={actionTextClassName[variant]}>
                    {action.label}
                  </Typography>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
