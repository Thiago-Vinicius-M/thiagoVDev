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
    fullDescription: row.full_description as string | undefined,
    problemSolved: row.problem_solved as string | undefined,
    mainFeatures: row.main_features as string[] | undefined,
    status: row.status as Project["status"] | undefined,
    technologies: row.technologies as string[],
    architectureNotes: row.architecture_notes as string[] | undefined,
    automatedTests: row.automated_tests as Project["automatedTests"] | undefined,
    flowcharts: row.flowcharts as string[] | undefined,
    entityRelationshipDiagrams: row.entity_relationship_diagrams as string[] | undefined,
    type: row.type as Project["type"],
    coverImage: row.cover_image as string | undefined,
    desktopMockup: row.desktop_mockup as string,
    githubUrl: row.github_url as string | undefined,
    vercelUrl: row.vercel_url as string | undefined,
    documentationUrl: row.documentation_url as string | undefined,
    featured: row.featured as boolean,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
