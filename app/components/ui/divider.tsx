interface DividerProps {
  size?: number;
}

export default function Divider({ size = 8 }: DividerProps) {
  const margin = `calc(var(--spacing) * ${size / 4})`;

  return (
    <div
      style={{ marginTop: margin, marginBottom: margin }}
      className="h-px w-full bg-[#EAEAEA] contrast:bg-black"
    />
  );
}
