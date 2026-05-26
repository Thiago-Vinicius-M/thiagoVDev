import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl font-bold font-[var(--font-space)]",
        "flex items-center gap-3",
        className
      )}
    >
      <span className="w-2 h-2 rounded-sm bg-[var(--green)] shrink-0" />
      {title}
    </h2>
  );
}
