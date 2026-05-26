import { cn } from "@/lib/utils";

interface GreenBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GreenBorderCard({ children, className }: GreenBorderCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 md:p-8",
        "bg-[var(--card)]",
        "border border-[var(--border)]",
        "border-l-4 border-l-[var(--green)]",
        className
      )}
    >
      {children}
    </div>
  );
}
