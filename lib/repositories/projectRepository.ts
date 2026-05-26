import { supabase } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

export const projectRepository = {
  async findAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  },

  async findFeatured(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  },

  async findBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return mapRow(data);
  },
};

// Mapeia colunas snake_case do Supabase para o modelo Project
function mapRow(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    description: row.description as string,
    technologies: row.technologies as string[],
    documentation: row.documentation as string | undefined,
    type: row.type as Project["type"],
    desktopMockup: row.desktop_mockup as string,
    mobileMockup: row.mobile_mockup as string,
    githubUrl: row.github_url as string | undefined,
    deployUrl: row.deploy_url as string | undefined,
    featured: row.featured as boolean,
    technicalBreakdown: row.technical_breakdown as Project["technicalBreakdown"],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
