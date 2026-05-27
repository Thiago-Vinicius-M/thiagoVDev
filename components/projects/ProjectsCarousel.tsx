"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/types";

interface ProjectsCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectsCarousel({ projects, onProjectClick }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  // Reinitialize when projects change (filter update)
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, projects]);

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-[var(--text-muted)] text-sm">
        Nenhum projeto encontrado.
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-clip cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-[0_0_88%] sm:flex-[0_0_300px] md:flex-[0_0_340px]"
            >
              <ProjectCard project={project} onClick={() => onProjectClick(project)} />
            </div>
          ))}
        </div>
      </div>

      {projects.length > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Projeto anterior"
            className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Próximo projeto"
            className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
