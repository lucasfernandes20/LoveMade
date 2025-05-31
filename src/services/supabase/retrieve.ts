import { supabase } from "@/lib/supabase";
import { PageWithDetails } from "@/types";

/**
 * Busca uma página completa e todos os seus detalhes pelo slug
 * @param slug O slug único da página
 * @returns Todos os dados relacionados à página ou null se não encontrar
 */
export async function getPageBySlug(
  slug: string
): Promise<PageWithDetails | null> {
  try {
    // 1. Buscar a página principal
    const { data: page, error: pageError } = await supabase
      .from("pages")
      .select("*")
      .eq("page_slug", slug)
      .single();

    if (pageError || !page) {
      console.error("Erro ao buscar página:", pageError);
      return null;
    }

    // 2. Buscar a data comemorativa (se houver)
    const { data: commemorativeDate, error: commemorativeDateError } =
      await supabase
        .from("commemorative_dates")
        .select("*")
        .eq("page_id", page.id)
        .single();

    if (
      commemorativeDateError &&
      !commemorativeDateError.message.includes("No rows found")
    ) {
      console.error(
        "Erro ao buscar data comemorativa:",
        commemorativeDateError
      );
    }

    // 3. Buscar detalhes da música (se houver)
    const { data: musicDetails, error: musicError } = await supabase
      .from("music_details")
      .select("*")
      .eq("page_id", page.id)
      .single();

    if (musicError && !musicError.message.includes("No rows found")) {
      console.error("Erro ao buscar detalhes da música:", musicError);
    }

    // 4. Buscar imagens
    const { data: images, error: imagesError } = await supabase
      .from("images")
      .select("*")
      .eq("page_id", page.id);

    if (imagesError) {
      console.error("Erro ao buscar imagens:", imagesError);
    }

    // 5. Retornar todos os dados agrupados
    return {
      page,
      commemorativeDate: commemorativeDate || undefined,
      musicDetails: musicDetails || undefined,
      images: images || [],
    };
  } catch (error) {
    console.error("Erro ao buscar dados da página:", error);
    return null;
  }
}
