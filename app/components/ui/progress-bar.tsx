type ProgressBarColor = "success" | "primary" | "danger";

interface ProgressBarProps {
  /** Progresso de 0 a 100 */
  progress: number;
  /** Cor do preenchimento — 'success' (verde) é o padrão visto no print */
  color?: ProgressBarColor;
  /** Altura da barra */
  height?: number;
  /** Mostra o rótulo percentual à direita (ex: "40%") */
  showLabel?: boolean;
  className?: string;
}

const colorMap: Record<ProgressBarColor, string> = {
  success: "bg-[#4CAF50]",
  primary: "bg-[#E8825A]",
  danger: "bg-[#8B3A42]",
};

export function ProgressBar({
  progress,
  color = "success",
  height = 8,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className={`flex w-full items-center ${className ?? ""}`}>
      <div
        style={{ height, borderRadius: height / 2 }}
        className="flex-1 overflow-hidden bg-[#F0EDE8]"
      >
        <div
          style={{ width: `${clamped}%`, height, borderRadius: height / 2 }}
          className={`transition-[width] duration-400 ${colorMap[color]}`}
        />
      </div>

      {showLabel && (
        <span className="ml-2 min-w-8 text-right text-xs leading-4 font-normal text-[#8A8783]">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
