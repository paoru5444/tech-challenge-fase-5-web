import Typography from "../ui/typography";

export default function HelpButton({ onPress }: { onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex flex-col items-center gap-1 p-8"
    >
      <Typography variant="subtitle">
        Precisa de <span className="text-[#F67653]">ajuda</span> para criar a
        sua primeira tarefa?{" "}
        <span className="text-[#F67653]">Aperte aqui!</span>
      </Typography>
    </button>
  );
}
