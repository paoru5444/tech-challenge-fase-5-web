import Typography from "~/components/ui/typography";

interface CredentialsFooterProps {
  onPress: () => void;
  title: string;
  buttonLabel: string;
}

export default function CredentialsFooter({
  onPress,
  title,
  buttonLabel,
}: CredentialsFooterProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-1 pb-10 text-sm">
      <Typography as="span" variant="body" className="text-[#8A8783]">
        {title}
      </Typography>

      <button
        type="button"
        onClick={onPress}
        className="font-semibold text-[#F67653]"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
