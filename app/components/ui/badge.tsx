import Typography from "./typography";

interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return (
    <div className="rounded-2xl bg-[#D13F62] px-1.5 py-1">
      <Typography as="span" variant="label" className="text-white">
        {text}
      </Typography>
    </div>
  );
}
