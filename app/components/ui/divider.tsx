interface DividerProps {
  size?: number;
}

export default function Divider({ size = 8 }: DividerProps) {
  return (
    <div
      style={{ marginTop: size, marginBottom: size }}
      className="h-px w-full bg-[#EAEAEA] contrast:bg-black"
    />
  );
}
