interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={`rounded-4xl border-2 border-[#EAEAEA] bg-white px-5 py-6 contrast:border-black ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
