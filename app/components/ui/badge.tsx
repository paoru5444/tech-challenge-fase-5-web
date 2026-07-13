interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return (
    <div className="rounded-2xl bg-[#D13F62] px-1.5 py-1">
      <span className="text-[10px] font-semibold text-white">{text}</span>
    </div>
  );
}
