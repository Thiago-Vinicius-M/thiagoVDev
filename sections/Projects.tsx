"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsFilters } from "@/components/projects/ProjectsFilters";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";
import { ProjectModal } from "@/components/projects/ProjectModal";
import type { Project, ProjectType } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeType, setActiveType] = useState<ProjectType | "Todos">("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      activeType === "Todos"
        ? projects
        : projects.filter((p) => p.type === activeType),
    [projects, activeType]
  );

  if (projects.length === 0) return null;

  return (
    <>
      <section
        id="projetos"
        className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24"
      >
        <div className="mb-3.5">
          <SectionHeading title="Projetos" className="mb-3" />
        </div>

        <div className="mb-3.5">
          <ProjectsFilters
            activeType={activeType}
            onTypeChange={setActiveType}
          />
        </div>

        <ProjectsCarousel projects={filtered} onProjectClick={setSelectedProject} />
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
