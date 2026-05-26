import { PROJECTS } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { projectRepository } from "@/lib/repositories/projectRepository";
import type { Project } from "@/lib/types";

// Ponto único de acesso a projetos.
// Usa Supabase quando configurado; caso contrário usa dados estáticos de lib/data.ts.
export const projectService = {
  async getAll(): Promise<Project[]> {
    if (isSupabaseConfigured) {
      return projectRepository.findAll();
    }
    return PROJECTS;
  },

  async getFeatured(): Promise<Project[]> {
    if (isSupabaseConfigured) {
      return projectRepository.findFeatured();
    }
    return PROJECTS.filter((p) => p.featured);
  },

  async getBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured) {
      return projectRepository.findBySlug(slug);
    }
    return PROJECTS.find((p) => p.slug === slug) ?? null;
  },
};
