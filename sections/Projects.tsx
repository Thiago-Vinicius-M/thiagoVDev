"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden hover:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
      {/* Mockup area */}
      <div className="p-6 pb-4">
        <div className="flex items-end gap-3 justify-center">
          {/* Desktop mockup */}
          <div className="flex-1 max-w-[280px]">
            <div className="rounded-lg border border-[var(--border)] overflow-hidden bg-[#0d0d0d]">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-[var(--border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--border)]" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-[var(--border)]" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-[var(--border)]" aria-hidden="true" />
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.desktopMockup}
                  alt={`${project.name} — versão desktop`}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>
            </div>
          </div>

          {/* Mobile mockup */}
          <div className="w-[80px] shrink-0 -mb-2">
            <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[#0d0d0d]">
              <div className="flex justify-center py-1 border-b border-[var(--border)]">
                <span className="w-4 h-1 rounded-full bg-[var(--border)]" aria-hidden="true" />
              </div>
              <div className="relative aspect-[9/16]">
                <Image
                  src={project.mobileMockup}
                  alt={`${project.name} — versão mobile`}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="px-6 pb-6">
        <h3 className="font-semibold font-[var(--font-space)] text-white mb-1">
          {project.name}
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex items-center gap-4 mt-3">
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white hover:text-[var(--green)] transition-colors duration-200"
            >
              Ver projeto →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--green)] transition-colors duration-200"
            >
              Ver no GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: true });

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplayPlugin]
  );

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

  if (projects.length === 0) return null;

  return (
    <section
      id="projetos"
      className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20"
    >
      <SectionHeading title="Projetos" className="mb-8" />

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-[0_0_100%] md:flex-[0_0_90%] px-2"
              >
                <ProjectCard project={project} />
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
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Próximo projeto"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
