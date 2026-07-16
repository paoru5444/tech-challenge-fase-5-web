import { X } from "lucide-react";
import type { ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
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
          className="absolute top-4 right-4 text-[#8A8783]"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}
