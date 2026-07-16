import Typography from "../ui/typography";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col">
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body">{description}</Typography>
    </div>
  );
}
