import Typography from "./typography";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Texto ao lado do checkbox (ex: "Primeiro teste unitário") */
  label?: string;
  /** Aplica riscado no label quando marcado (visto no print: "Introdução à biblioteca Jest") */
  strikethroughWhenChecked?: boolean;
  disabled?: boolean;
  size?: number;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  strikethroughWhenChecked = false,
  disabled = false,
  size = 20,
  className,
}: CheckboxProps) {
  return (
    <button
      type="button"
      className={`flex items-center disabled:opacity-50 ${className ?? ""}`}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <span
        style={{ width: size, height: size, fontSize: size * 0.7 }}
        className={`flex items-center justify-center rounded border-[1.5px] ${
          checked
            ? "border-[#3B82F6] bg-[#3B82F6]"
            : "border-[#E5E1DC] bg-white"
        }`}
      >
        {checked && <span className="font-bold text-white">✓</span>}
      </span>

      {label ? (
        <Typography
          as="span"
          variant="body"
          className={`ml-2 shrink text-left leading-5 ${
            disabled
              ? "text-[#B0ADA7]"
              : checked && strikethroughWhenChecked
                ? "text-[#8A8783] line-through"
                : "text-[#1A1918]"
          }`}
        >
          {label}
        </Typography>
      ) : null}
    </button>
  );
}
