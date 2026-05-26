export type ProjectType =
  | "Caso de estudo"
  | "Projeto Acadêmico"
  | "Projeto Comercial";

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
  objective?: string;
  problem?: string;
  need?: string;
  technologies: string[];
  documentation?: string;
  flowcharts?: string[];
  erd?: string;
  type: ProjectType;
  desktopMockup: string;
  mobileMockup?: string;
  githubUrl?: string;
  deployUrl?: string;
  featured: boolean;
  technicalBreakdown?: TechnicalBreakdown;
  createdAt: string;
  updatedAt: string;
}
