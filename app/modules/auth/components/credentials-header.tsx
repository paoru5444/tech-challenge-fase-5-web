import backgroundImage from "~/assets/web-banner-background.png";

export default function CredentialsHeader() {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="flex h-48 w-full shrink-0 flex-col items-start justify-end bg-[#E8825A] bg-cover bg-center px-6 py-8 md:h-auto md:w-1/2 md:px-16 md:py-16"
    >
      <span className="text-3xl font-extrabold tracking-[-0.4px] text-white md:text-5xl">
        SeniorEase
      </span>

      <span className="mt-2 max-w-xs text-sm font-medium text-white/90 md:text-base">
        Cuidando da sua rotina com simplicidade e carinho.
      </span>
    </div>
  );
}
