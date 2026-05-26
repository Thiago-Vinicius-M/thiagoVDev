import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  pulsing?: boolean;
  className?: string;
}

export function Badge({ label, pulsing = false, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
        "bg-[var(--card)] border border-[var(--border)]",
        "text-[var(--text-muted)]",
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full bg-[var(--green)]",
          pulsing && "animate-pulse"
        )}
      />
      {label}
    </div>
  );
}
