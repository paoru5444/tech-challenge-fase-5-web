import { useAnimationsEnabled } from "~/modules/setup/hooks/useAnimationsEnabled";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ className, children }: CardProps) {
  const animationsEnabled = useAnimationsEnabled();

  return (
    <div
      className={`rounded-4xl border-2 border-[#EAEAEA] bg-white px-5 py-6 contrast:border-black ${
        animationsEnabled ? "animate-[fade-slide-in_200ms_ease-out]" : ""
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
