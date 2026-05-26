import { PROJECTS } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { projectRepository } from "@/lib/repositories/projectRepository";
import type { Project } from "@/lib/types";

// Ponto único de acesso a projetos.
// Usa Supabase quando configurado; caso contrário usa dados estáticos de lib/data.ts.
export const projectService = {
  async getAll(): Promise<Project[]> {
    if (isSupabaseConfigured) {
      try {
        const results = await projectRepository.findAll();
        return results.length > 0 ? results : PROJECTS;
      } catch {
        return PROJECTS;
      }
    }
    return PROJECTS;
  },

  async getFeatured(): Promise<Project[]> {
    if (isSupabaseConfigured) {
      try {
        const results = await projectRepository.findFeatured();
        return results.length > 0 ? results : PROJECTS.filter((p) => p.featured);
      } catch {
        return PROJECTS.filter((p) => p.featured);
      }
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
