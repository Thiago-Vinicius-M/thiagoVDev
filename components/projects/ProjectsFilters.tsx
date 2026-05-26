"use client";

import type { ProjectType } from "@/lib/types";

type FilterOption = ProjectType | "Todos";

const TYPE_OPTIONS: FilterOption[] = [
  "Todos",
  "Caso de estudo",
  "Projeto Acadêmico",
  "Projeto Comercial",
];

const TYPE_DOT: Record<ProjectType, string> = {
  "Caso de estudo": "bg-purple-400/60",
  "Projeto Acadêmico": "bg-blue-400/60",
  "Projeto Comercial": "bg-emerald-400/60",
};

interface ProjectsFiltersProps {
  activeType: FilterOption;
  onTypeChange: (type: FilterOption) => void;
}

export function ProjectsFilters({ activeType, onTypeChange }: ProjectsFiltersProps) {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      {TYPE_OPTIONS.map((type) => {
        const isActive = activeType === type;
        return (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`flex items-center gap-2 text-xs tracking-wide transition-colors duration-200 ${
              isActive ? "text-white" : "text-[var(--text-muted)] hover:text-white/60"
            }`}
          >
            {type !== "Todos" && (
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-opacity duration-200 ${
                  TYPE_DOT[type as ProjectType]
                } ${isActive ? "opacity-100" : "opacity-30"}`}
              />
            )}
            {type}
          </button>
        );
      })}
    </div>
  );
}

export type { ProjectsFiltersProps };
