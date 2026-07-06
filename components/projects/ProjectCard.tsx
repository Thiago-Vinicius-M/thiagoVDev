import Image from "next/image";
import type { Project, ProjectType } from "@/lib/types";

const TYPE_BADGE: Record<ProjectType, { dot: string; label: string }> = {
  "Caso de estudo": {
    dot: "bg-purple-400/60",
    label: "text-purple-300/70",
  },
  "Projeto Acadêmico": {
    dot: "bg-blue-400/60",
    label: "text-blue-300/70",
  },
  "Projeto Comercial": {
    dot: "bg-emerald-400/60",
    label: "text-emerald-300/70",
  },
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const typeBadge = TYPE_BADGE[project.type];

  return (
    <button
      onClick={onClick}
      className="w-full text-left cursor-pointer rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden hover:border-white/10 transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-white/20 h-[420px]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] border-b border-[var(--border)]">
        <Image
          src={project.desktopMockup}
          alt={project.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 300px, (max-width: 768px) 320px, 340px"
          quality={90}
        />
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-6">
        {/* Type badge */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeBadge.dot}`} aria-hidden="true" />
          <span className={`text-[10px] tracking-wide font-medium ${typeBadge.label}`}>
            {project.type}
          </span>
        </div>

        <h3 className="font-semibold font-[var(--font-space)] text-white text-sm leading-snug mb-2">
          {project.name}
        </h3>

        <p className="text-[var(--text-muted)] text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[var(--text-muted)]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] text-[var(--text-muted)]/60">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 text-[11px] text-[var(--text-muted)] group-hover:text-white/50 transition-colors duration-200">
          Ver detalhes →
        </div>
      </div>
    </button>
  );
}
