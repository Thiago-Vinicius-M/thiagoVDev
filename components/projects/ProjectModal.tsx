"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiX, FiExternalLink, FiGithub, FiFileText, FiMaximize2 } from "react-icons/fi";
import type { Project, ProjectStatus } from "@/lib/types";
import { CodeBlock } from "@/components/ui/CodeBlock";

type TabId = "overview" | "architecture" | "tests" | "flowcharts" | "mer";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Visão Geral" },
  { id: "architecture", label: "Arquitetura" },
  { id: "tests", label: "Testes" },
  { id: "flowcharts", label: "Fluxogramas" },
  { id: "mer", label: "MER" },
];

const STATUS_CONFIG: Record<ProjectStatus, { dot: string; text: string }> = {
  "Concluído": { dot: "bg-emerald-400/70", text: "text-emerald-400/80" },
  "Em desenvolvimento": { dot: "bg-amber-400/70", text: "text-amber-400/80" },
  "Pausado": { dot: "bg-zinc-500/70", text: "text-zinc-400/70" },
  "Arquivado": { dot: "bg-rose-400/60", text: "text-rose-400/70" },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3">
      {children}
    </h4>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-xs text-white/65 leading-relaxed">
          <span className="mt-[5px] w-1 h-1 rounded-full bg-white/25 shrink-0" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function EmptyTabState() {
  return (
    <div className="flex items-center justify-center h-28 text-[11px] text-[var(--text-muted)] opacity-40 select-none">
      Em breve
    </div>
  );
}

function OverviewTab({ project }: { project: Project }) {
  const description = project.fullDescription ?? project.description;
  const hasContent =
    description ||
    project.problemSolved ||
    project.mainFeatures?.length ||
    project.technicalDifferentials?.length;

  if (!hasContent) return <EmptyTabState />;

  return (
    <div className="space-y-6">
      {description && (
        <div>
          <SectionLabel>O que é</SectionLabel>
          <p className="text-sm text-white/75 leading-relaxed">{description}</p>
        </div>
      )}
      {project.problemSolved && (
        <div>
          <SectionLabel>Problema resolvido</SectionLabel>
          <div className="space-y-2">
            {project.problemSolved.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-white/70 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      )}
      {project.mainFeatures && project.mainFeatures.length > 0 && (
        <div>
          <SectionLabel>Principais funcionalidades</SectionLabel>
          <BulletList items={project.mainFeatures} />
        </div>
      )}
      {project.technicalDifferentials && project.technicalDifferentials.length > 0 && (
        <div>
          <SectionLabel>Diferenciais técnicos</SectionLabel>
          <BulletList items={project.technicalDifferentials} />
        </div>
      )}
    </div>
  );
}

function ArchitectureTab({ project }: { project: Project }) {
  const hasContent =
    project.architectureStack?.length ||
    project.systemStructure?.length ||
    project.architectureNotes?.length ||
    project.architectureFinancial ||
    project.architectureSecurity;

  if (!hasContent) return <EmptyTabState />;

  return (
    <div className="space-y-6">
      {project.architectureStack && project.architectureStack.length > 0 && (
        <div>
          <SectionLabel>Stack principal</SectionLabel>
          <div className="space-y-2">
            {project.architectureStack.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="text-[var(--text-muted)] shrink-0 w-20">{item.category}</span>
                <span className="text-white/70 leading-relaxed">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {project.systemStructure && project.systemStructure.length > 0 && (
        <div>
          <SectionLabel>Estrutura do sistema</SectionLabel>
          <div className="space-y-3">
            {project.systemStructure.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <code className="text-[11px] font-mono text-white/55 shrink-0 bg-white/[0.05] px-1.5 py-0.5 rounded">
                  {item.folder}
                </code>
                <p className="text-xs text-white/55 leading-relaxed pt-0.5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {project.architectureNotes && project.architectureNotes.length > 0 && (
        <div>
          <SectionLabel>Decisões técnicas</SectionLabel>
          <BulletList items={project.architectureNotes} />
        </div>
      )}
      {project.architectureFinancial && (
        <div>
          <SectionLabel>Arquitetura financeira</SectionLabel>
          <div className="space-y-2">
            {project.architectureFinancial.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-white/70 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      )}
      {project.architectureSecurity && (
        <div>
          <SectionLabel>Segurança e multi-tenant</SectionLabel>
          <p className="text-sm text-white/70 leading-relaxed">{project.architectureSecurity}</p>
        </div>
      )}
    </div>
  );
}

function TestsTab({ project }: { project: Project }) {
  const hasContent =
    project.testsCoverage ||
    project.testsScenarios?.length ||
    project.testsStrategy ||
    project.testsTools?.length ||
    project.testsCodeExample ||
    project.automatedTests?.length;

  if (!hasContent) return <EmptyTabState />;

  return (
    <div className="space-y-6">
      {project.testsCoverage && (
        <div>
          <SectionLabel>Cobertura atual</SectionLabel>
          <div className="space-y-2">
            {project.testsCoverage.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-white/70 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      )}
      {project.testsScenarios && project.testsScenarios.length > 0 && (
        <div>
          <SectionLabel>Cenários validados</SectionLabel>
          <ul className="space-y-2">
            {project.testsScenarios.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/65 leading-relaxed">
                <span className="mt-[1px] text-emerald-400/60 shrink-0 select-none">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {project.testsStrategy && (
        <div>
          <SectionLabel>Estratégia utilizada</SectionLabel>
          <div className="space-y-2">
            {project.testsStrategy.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-white/70 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      )}
      {project.testsTools && project.testsTools.length > 0 && (
        <div>
          <SectionLabel>Ferramentas utilizadas</SectionLabel>
          <BulletList items={project.testsTools} />
        </div>
      )}
      {project.testsCodeExample && (
        <div>
          <SectionLabel>Exemplo de validação real</SectionLabel>
          <CodeBlock code={project.testsCodeExample} />
          {project.testsCodeContext && (
            <div className="mt-3 space-y-2">
              {project.testsCodeContext.split("\n\n").map((para, i) => (
                <p key={i} className="text-xs text-white/50 leading-relaxed">{para}</p>
              ))}
            </div>
          )}
        </div>
      )}
      {project.automatedTests && project.automatedTests.length > 0 && (
        <div className="space-y-3">
          <SectionLabel>Testes automatizados</SectionLabel>
          {project.automatedTests.map((test, i) => (
            <div key={i} className="rounded-lg border border-[var(--border)] px-4 py-3">
              <p className="text-xs font-medium text-white/80 mb-1">{test.title}</p>
              <p className="text-xs text-white/50 leading-relaxed">{test.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fechar visualização"
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-200"
      >
        <FiX size={14} />
      </button>
      <div
        className="relative max-w-[95vw] max-h-[95vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-none w-auto h-auto max-h-[90vh]"
          style={{ minWidth: "min(100vw, 900px)" }}
        />
      </div>
    </div>
  );
}

function DiagramCard({ src, alt }: { src: string; alt: string }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="relative group rounded-lg border border-[var(--border)] overflow-hidden bg-[#0d0d0d]">
        <Image
          src={src}
          alt={alt}
          width={640}
          height={360}
          className="w-full h-auto object-contain"
        />
        <button
          onClick={() => setLightbox(true)}
          aria-label="Ver em tela cheia"
          className="absolute top-2 right-2 w-7 h-7 rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 hover:text-white hover:border-white/25 transition-all duration-200"
        >
          <FiMaximize2 size={12} />
        </button>
      </div>
      {lightbox && <ImageLightbox src={src} alt={alt} onClose={() => setLightbox(false)} />}
    </>
  );
}

function FlowchartsTab({ project }: { project: Project }) {
  if (!project.flowcharts?.length) return <EmptyTabState />;

  return (
    <div className="space-y-3">
      <SectionLabel>Fluxogramas</SectionLabel>
      {project.flowcharts.map((src, i) => (
        <DiagramCard key={i} src={src} alt={`Fluxograma ${i + 1}`} />
      ))}
    </div>
  );
}

function MERTab({ project }: { project: Project }) {
  if (!project.entityRelationshipDiagrams?.length) return <EmptyTabState />;

  return (
    <div className="space-y-3">
      <SectionLabel>Modelo Entidade-Relacionamento</SectionLabel>
      {project.entityRelationshipDiagrams.map((src, i) => (
        <DiagramCard key={i} src={src} alt={`MER ${i + 1}`} />
      ))}
    </div>
  );
}

function TabContent({ activeTab, project }: { activeTab: TabId; project: Project }) {
  switch (activeTab) {
    case "overview":     return <OverviewTab project={project} />;
    case "architecture": return <ArchitectureTab project={project} />;
    case "tests":        return <TestsTab project={project} />;
    case "flowcharts":   return <FlowchartsTab project={project} />;
    case "mer":          return <MERTab project={project} />;
  }
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    if (!project) return;
    setActiveTab("overview");
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

  const statusConfig = project.status ? STATUS_CONFIG[project.status] : null;
  const hasLinks = project.githubUrl || project.vercelUrl || project.documentationUrl;

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
      <div className="animate-modal relative z-10 w-full sm:max-w-[760px] bg-[var(--card)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Cover */}
        <div className="shrink-0 relative h-28 bg-[#0d0d0d] overflow-hidden">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="760px"
              quality={85}
              aria-hidden="true"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
          )}
          {/* Bottom gradient to blend into card bg */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/20 to-transparent" />

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-colors duration-200"
          >
            <FiX size={13} />
          </button>
        </div>

        {/* Header info */}
        <div className="shrink-0 px-5 pt-3 pb-4 border-b border-[var(--border)]">
          <h2 className="font-semibold font-[var(--font-space)] text-white text-[15px] leading-snug">
            {project.name}
          </h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[11px] text-[var(--text-muted)]">{project.type}</span>
            {statusConfig && (
              <>
                <span className="text-[var(--text-muted)] opacity-30" aria-hidden="true">·</span>
                <span className={`flex items-center gap-1.5 text-[11px] ${statusConfig.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} aria-hidden="true" />
                  {project.status}
                </span>
              </>
            )}
          </div>
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">

          {/* Mobile tab strip */}
          <div
            className="sm:hidden shrink-0 flex overflow-x-auto scrollbar-hide border-b border-[var(--border)]"
            role="tablist"
            aria-label="Seções"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 relative text-xs py-2.5 px-3.5 whitespace-nowrap transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-[var(--text-muted)] hover:text-white/60"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-white/30 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop sidebar */}
          <nav
            className="hidden sm:flex flex-col w-36 shrink-0 border-r border-[var(--border)] py-2 overflow-y-auto"
            aria-label="Seções do projeto"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative text-left text-xs px-4 py-2.5 w-full transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "text-white bg-white/[0.04]"
                    : "text-[var(--text-muted)] hover:text-white/60 hover:bg-white/[0.02]"
                }`}
              >
                {activeTab === tab.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[1.5px] bg-white/30 rounded-full" />
                )}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-5">
            <TabContent activeTab={activeTab} project={project} />
          </div>
        </div>

        {/* Footer */}
        {hasLinks && (
          <div className="shrink-0 px-5 py-3.5 border-t border-[var(--border)] flex flex-wrap gap-2">
            {project.vercelUrl && (
              <a
                href={project.vercelUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg border border-[var(--border)] text-white/80 hover:border-white/20 hover:text-white transition-colors duration-200"
              >
                <FiExternalLink size={12} />
                Deploy
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
                Ver GitHub
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
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
