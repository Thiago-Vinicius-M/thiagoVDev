import type { Project } from "./types";

// Dados estáticos — utilizados quando Supabase não está configurado.
// Para adicionar/editar projetos: basta alterar este array.
// Quando Supabase estiver ativo, estes dados serão ignorados.
export const PROJECTS: Project[] = [
  {
    id: "orca",
    slug: "orca",
    name: "Orca — Sistema de Orçamentos Web",
    description:
      "Plataforma web para criação e gerenciamento de orçamentos comerciais com foco em usabilidade e geração de PDFs.",
    technologies: ["React", "Node.js", "TypeScript"],
    type: "Caso de estudo",
    desktopMockup: "/images/thumbNewOrcaPort.webp",
    mobileMockup: "/mockups/orca-mobile.png",
    githubUrl: "https://github.com/Thiago-Vinicius-M/Orcamento",
    featured: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
];

export const FOOTER_LINKS = {
  linkedin: "https://linkedin.com/in/TODO",
  github: "https://github.com/TODO",
  email: "thi.vinicius01@gmail.com",
  whatsapp: "https://wa.me/55TODO",
};

export const TECH_STACK = [
  { name: "Java" },
  { name: "React" },
  { name: "Python" },
  { name: "Node.js" },
  { name: "TypeScript" },
  { name: "CSS3" },
  { name: "JavaScript" },
  { name: "HTML5" },
];
