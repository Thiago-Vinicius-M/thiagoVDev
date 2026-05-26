"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiX, FiExternalLink, FiGithub, FiFileText } from "react-icons/fi";
import type { Project } from "@/lib/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2.5">
      {children}
    </h3>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasLinks = project.githubUrl || project.deployUrl || project.documentation;
  const hasBreakdown =
    project.technicalBreakdown &&
    Object.values(project.technicalBreakdown).some(Boolean);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="animate-modal relative z-10 w-full sm:max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col">
        {/* Header — sticky */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 py-4 border-b border-[var(--border)]">
          <div className="min-w-0">
            <h2 className="font-semibold font-[var(--font-space)] text-white text-[15px] leading-snug truncate">
              {project.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-[var(--text-muted)]">{project.type}</span>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200"
          >
            <FiX size={13} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed">{project.description}</p>

          {/* Objective / Problem / Need */}
          {(project.objective || project.problem || project.need) && (
            <div className="grid gap-4 sm:grid-cols-3">
              {project.objective && (
                <div>
                  <SectionLabel>Objetivo</SectionLabel>
                  <p className="text-xs text-white/65 leading-relaxed">{project.objective}</p>
                </div>
              )}
              {project.problem && (
                <div>
                  <SectionLabel>Problema</SectionLabel>
                  <p className="text-xs text-white/65 leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.need && (
                <div>
                  <SectionLabel>Necessidade</SectionLabel>
                  <p className="text-xs text-white/65 leading-relaxed">{project.need}</p>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          <div>
            <SectionLabel>Prévia</SectionLabel>
            <div className="rounded-lg border border-[var(--border)] overflow-hidden relative aspect-[16/10]">
              <Image
                src={project.desktopMockup}
                alt={project.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 600px"
                quality={90}
              />
            </div>
          </div>

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div>
              <SectionLabel>Tecnologias</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded bg-[var(--border)]/60 text-white/65"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Flowcharts */}
          {project.flowcharts && project.flowcharts.length > 0 && (
            <div>
              <SectionLabel>Fluxogramas</SectionLabel>
              <div className="flex flex-col gap-3">
                {project.flowcharts.map((src, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg border border-[var(--border)] overflow-hidden bg-[#0d0d0d]"
                  >
                    <Image
                      src={src}
                      alt={`Fluxograma ${i + 1}`}
                      width={640}
                      height={360}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ERD */}
          {project.erd && (
            <div>
              <SectionLabel>Modelo Entidade-Relacionamento</SectionLabel>
              <div className="relative rounded-lg border border-[var(--border)] overflow-hidden bg-[#0d0d0d]">
                <Image
                  src={project.erd}
                  alt="Modelo Entidade-Relacionamento"
                  width={640}
                  height={360}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

          {/* Technical breakdown — extensível para futura seção */}
          {hasBreakdown && (
            <div className="rounded-lg border border-[var(--border)] p-4">
              <SectionLabel>Destrinchamento Técnico</SectionLabel>
              <div className="space-y-4">
                {project.technicalBreakdown?.architecture && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Arquitetura</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.architecture}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.decisions && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Decisões técnicas</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.decisions}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.logic && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Lógica implementada</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.logic}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.ux && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">UX</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.ux}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.learnings && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Aprendizados</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.learnings}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.mistakes && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Problemas enfrentados</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.mistakes}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.improvements && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Melhorias futuras</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.improvements}
                    </p>
                  </div>
                )}
                {project.technicalBreakdown?.reasoning && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Raciocínio</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {project.technicalBreakdown.reasoning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer — links */}
        {hasLinks && (
          <div className="shrink-0 px-6 py-4 border-t border-[var(--border)] flex flex-wrap gap-2">
            {project.deployUrl && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg border border-[var(--border)] text-white/80 hover:border-white/20 hover:text-white transition-colors duration-200"
              >
                <FiExternalLink size={12} />
                Ver no Vercel
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200"
              >
                <FiGithub size={12} />
                Ver no GitHub
              </a>
            )}
            {project.documentation && (
              <a
                href={project.documentation}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-white/20 hover:text-white transition-colors duration-200"
              >
                <FiFileText size={12} />
                Documentação
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
