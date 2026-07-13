interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base leading-normal font-bold tracking-[-0.2px] text-black">
        {title}
      </p>
      <p className="text-xs leading-normal text-black">{description}</p>
    </div>
  );
}
