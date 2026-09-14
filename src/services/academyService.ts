import { supabase } from "@/integrations/supabase/client";

export type AcademyCourseRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  cover_url: string | null;
  category_id: string | null;
  level: string | null;
  status: string;
  visibility: string;
  is_featured: boolean;
  duration_minutes: number | null;
  created_at: string;
};

/**
 * Leituras agregadas da Academy usadas pelo console.
 * As telas do aluno continuam usando `useAcademyCatalog`, que fala com a mesma
 * origem de dados.
 */
export const academyService = {
  async listCourses(): Promise<AcademyCourseRow[]> {
    const { data } = await supabase.from("courses").select("*").order("title");
    return (data ?? []) as unknown as AcademyCourseRow[];
  },

  async listCategories() {
    const { data } = await supabase.from("course_categories").select("*").order("sort_order");
    return (data ?? []) as unknown as { id: string; name: string; sort_order: number }[];
  },

  async courseCounts() {
    const courses = await academyService.listCourses();
    return {
      total: courses.length,
      published: courses.filter((c) => c.status === "published").length,
      drafts: courses.filter((c) => c.status !== "published").length,
    };
  },

  async listLessonsByCourse(courseId: string) {
    const { data } = await supabase.from("course_lessons").select("*").eq("course_id", courseId).order("sort_order");
    return (data ?? []) as unknown as Record<string, unknown>[];
  },
};
