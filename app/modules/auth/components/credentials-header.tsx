import backgroundImage from "~/assets/auth-banner.jpg";

export default function CredentialsHeader() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${backgroundImage})`,
      }}
      className="flex h-48 w-full shrink-0 flex-col items-start justify-end bg-[#E8825A] bg-cover bg-center px-6 py-8 md:h-auto md:w-1/2 md:px-16 md:py-16"
    >
      <span className="text-3xl font-extrabold tracking-[-0.4px md:text-5xl text-[#E8825A]">
        SeniorEase
      </span>

      <span className="mt-2 max-w-xs text-sm font-medium text-white/90 md:text-base">
        Facilite sua vida profissional e acadêmica.
      </span>
    </div>
  );
}
