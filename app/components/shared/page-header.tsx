interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col">
      <p className="text-lg leading-normal font-bold tracking-[-0.2px] text-black">
        {title}
      </p>
      <p className="text-md leading-normal text-black">{description}</p>
    </div>
  );
}
