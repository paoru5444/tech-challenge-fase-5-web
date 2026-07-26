import { useAnimationsEnabled } from "~/modules/setup/hooks/useAnimationsEnabled";
import Typography from "./typography";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  text,
  onPress,
  type = "button",
  disabled,
}: ButtonProps) {
  const animationsEnabled = useAnimationsEnabled();

  return (
    <button
      type={type}
      onClick={onPress}
      disabled={disabled}
      className={`flex h-12.5 w-full items-center justify-center rounded-full bg-[#F67653] text-white disabled:opacity-50 ${
        animationsEnabled
          ? "transition duration-150 ease-out hover:opacity-90 active:scale-95"
          : ""
      }`}
    >
      <Typography variant="title">{text}</Typography>
    </button>
  );
}
