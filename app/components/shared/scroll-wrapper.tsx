import type { ReactNode } from "react";

interface ScrollWrapperProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  contentContainerClassName?: string;
  headerContainerClassName?: string;
  footerContainerClassName?: string;
  className?: string;
}

export default function ScrollWrapper({
  header,
  footer,
  headerContainerClassName,
  contentContainerClassName,
  footerContainerClassName,
  className,
  children,
}: ScrollWrapperProps) {
  return (
    <div className={`flex-1 ${className ?? ""}`}>
      <div
        className={`overflow-y-auto ${contentContainerClassName ?? ""}`}
      >
        <div className={headerContainerClassName}>{header}</div>

        {children}

        <div className={footerContainerClassName}>{footer}</div>
      </div>
    </div>
  );
}
