import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";
import Typography from "./typography";

type ToastVariant = "success" | "error";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  variant?: ToastVariant;
  duration?: number;
}

const variantIcon = {
  success: CheckCircle,
  error: XCircle,
};

const variantIconClassName: Record<ToastVariant, string> = {
  success: "text-[#39A304]",
  error: "text-[#F05069]",
};

export function Toast({
  open,
  message,
  onClose,
  variant = "success",
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const Icon = variantIcon[variant];

  return (
    <div className="fixed top-4 right-4 z-50 flex max-w-xs items-center gap-2 rounded-full bg-[#1A1918] px-4 py-3 shadow-lg md:top-6 md:right-6">
      <Icon size={18} className={variantIconClassName[variant]} />

      <Typography variant="body" className="text-white">
        {message}
      </Typography>
    </div>
  );
}
