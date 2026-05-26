export type ProjectType =
  | "Caso de estudo"
  | "Projeto Acadêmico"
  | "Projeto Pessoal"
  | "Outro";

export type ProjectStatus =
  | "Em desenvolvimento"
  | "Fase de testes"
  | "Em produção"
  | "Arquivado"
  | "Outro";

// Preparado para a futura seção "Destrinchamento técnico"
export interface TechnicalBreakdown {
  learnings?: string;
  architecture?: string;
  logic?: string;
  decisions?: string;
  ux?: string;
  mistakes?: string;
  improvements?: string;
  reasoning?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  documentation?: string;
  type: ProjectType;
  status: ProjectStatus;
  desktopMockup: string;
  mobileMockup: string;
  githubUrl?: string;
  deployUrl?: string;
  featured: boolean;
  technicalBreakdown?: TechnicalBreakdown;
  createdAt: string;
  updatedAt: string;
}
