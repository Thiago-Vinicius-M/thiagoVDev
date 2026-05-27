export type ProjectType =
  | "Caso de estudo"
  | "Projeto Acadêmico"
  | "Projeto Comercial";

export type ProjectStatus =
  | "Concluído"
  | "Em desenvolvimento"
  | "Pausado"
  | "Arquivado";

export interface AutomatedTest {
  title: string;
  description: string;
}

export interface ArchitectureStackItem {
  category: string;
  value: string;
}

export interface SystemFolder {
  folder: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription?: string;
  problemSolved?: string;
  mainFeatures?: string[];
  technicalDifferentials?: string[];
  status?: ProjectStatus;
  technologies: string[];
  architectureStack?: ArchitectureStackItem[];
  systemStructure?: SystemFolder[];
  architectureNotes?: string[];
  architectureFinancial?: string;
  architectureSecurity?: string;
  automatedTests?: AutomatedTest[];
  testsCoverage?: string;
  testsScenarios?: string[];
  testsStrategy?: string;
  testsTools?: string[];
  testsCodeExample?: string;
  testsCodeContext?: string;
  flowcharts?: string[];
  entityRelationshipDiagrams?: string[];
  type: ProjectType;
  coverImage?: string;
  desktopMockup: string;
  githubUrl?: string;
  vercelUrl?: string;
  documentationUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
