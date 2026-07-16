import Typography from "../ui/typography";

interface BannerProps {
  value?: string;
  title: string;
  imageUrl?: string;
}

export default function Banner({ title, value, imageUrl }: BannerProps) {
  return (
    <div
      style={
        imageUrl
          ? { backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }
          : undefined
      }
      className={`flex h-33.25 flex-col justify-around rounded-2xl px-7 py-4 ${
        imageUrl ? "" : "bg-[#E8825A]"
      }`}
    >
      <div className="flex h-15 w-15 items-center justify-center self-end rounded-full bg-white/25 p-4">
        <Typography variant="h1" className="text-white">
          {value}
        </Typography>
      </div>

      <div>
        <Typography variant="h2" className="text-white">
          {title}
        </Typography>
      </div>
    </div>
  );
}
