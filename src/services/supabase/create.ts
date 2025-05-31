import { supabase } from "@/lib/supabase";
import {
  deleteMultipleImages,
  uploadMultipleImages,
  UploadResult,
} from "@/services/storage/firebase";
import {
  CommemorativeDate,
  CreatePageFormData,
  MusicDetail,
  Page,
  Payment,
} from "@/types";
import { format } from "date-fns";

/**
 * ### Salva os dados do formulário no _Supabase_ e as imagens no _Firebase_.
 * - Se o upload das imagens do _Firebase_ falhar, o processo é interrompido e o restante das imagens são removidas do _Firebase_.
 * - Se o upload das imagens for bem-sucedido, mas o salvamento no _Supabase_ falhar, as imagens são removidas do _Firebase_.
 *
 * @param formData Dados do formulário
 * @param paymentId ID do pagamento (Stripe)
 * @returns slug da página criada
 */
export async function createPage(
  formData: CreatePageFormData,
  paymentId: string
): Promise<string> {
  let uploadedImagesSucceded: UploadResult[] = [];
  let pageId = "";

  try {
    const pageSlug = await generateUniqueSlug(formData.title || "love-page");

    if (formData.photos?.files.length) {
      try {
        uploadedImagesSucceded = await uploadMultipleImages(
          formData.photos.files,
          pageSlug
        );
      } catch (error) {
        console.error("Erro ao fazer upload das imagens:", error);
        throw new Error("Falha ao fazer upload das imagens. Tente novamente.");
      }
    }

    const photoUrls = uploadedImagesSucceded.map((img) => img.url);
    const photoFullPaths = uploadedImagesSucceded.map((img) => img.fullPath);

    // 2. Iniciar uma transação Supabase
    // Obs: Supabase não suporta transações diretamente via SDK, então faremos manualmente
    // e implementaremos uma lógica de compensação em caso de falha

    // 2.1 Criar a página principal
    const pageData: Partial<Page> = {
      title: formData.title || "Sem título",
      message: formData.message,
      page_slug: pageSlug,
      page_url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${pageSlug}`,
      plan: formData.plan || "",
    };

    const { data: pageResult, error: pageError } = await supabase
      .from("pages")
      .insert(pageData)
      .select("id")
      .single();

    if (pageError) {
      // Falha ao criar página, reverter uploads
      if (uploadedImagesSucceded.length > 0) {
        await deleteMultipleImages(photoFullPaths);
      }
      throw pageError;
    }

    pageId = pageResult.id;

    // 2.2 Salvar data comemorativa (se houver)
    if (formData.commemorativeDate?.name || formData.commemorativeDate?.date) {
      const commemorativeDateData: Partial<CommemorativeDate> = {
        page_id: pageId,
        name: formData.commemorativeDate?.name,
        date: formData.commemorativeDate?.date
          ? format(formData.commemorativeDate.date, "yyyy-MM-dd")
          : undefined,
        style: formData.commemorativeDate?.style,
      };

      const { error: commemorativeError } = await supabase
        .from("commemorative_dates")
        .insert(commemorativeDateData);

      if (commemorativeError) {
        console.error("Erro ao salvar data comemorativa:", commemorativeError);
        // Continuar mesmo com erro, não é crítico
      }
    }

    // 2.3 Salvar detalhes da música (se houver)
    if (formData.music?.displayName || formData.music?.videoId) {
      const musicData: Partial<MusicDetail> = {
        page_id: pageId,
        display_name: formData.music?.displayName,
        artist_name: formData.music?.artistName,
        track_name: formData.music?.trackName,
        album_cover: formData.music?.albumCover,
        preview_url: formData.music?.previewUrl,
        video_id: formData.music?.videoId || "",
        duration: formData.music?.duration
          ? parseInt(formData.music.duration)
          : undefined,
        embed_url: formData.music?.embedUrl,
        youtube_url: formData.music?.youtubeUrl,
      };

      const { error: musicError } = await supabase
        .from("music_details")
        .insert(musicData);

      if (musicError) {
        console.error("Erro ao salvar detalhes da música:", musicError);
        // Continuar mesmo com erro, não é crítico
      }
    }

    // 2.4 Registrar pagamento
    const paymentData: Partial<Payment> = {
      page_id: pageId,
      stripe_payment_id: paymentId,
      amount: 0, // Adicionar valor real do pagamento
      currency: "BRL",
      status: "completed",
    };

    const { error: paymentError } = await supabase
      .from("payments")
      .insert(paymentData);

    if (paymentError) {
      console.error("Erro ao registrar pagamento:", paymentError);
      // Continuar mesmo com erro, não é crítico para a experiência do usuário
    }

    // 2.5 Salvar referências de imagens
    if (photoUrls.length > 0) {
      const imageInserts = photoUrls.map((url) => ({
        page_id: pageId,
        url: url,
      }));

      const { error: imagesError } = await supabase
        .from("images")
        .insert(imageInserts);

      if (imagesError) {
        console.error("Erro ao salvar referências de imagens:", imagesError);
        // Continuar mesmo com erro, não é crítico
      }
    }

    return pageSlug; // Retornar o slug em vez do ID
  } catch (error) {
    console.error("Erro ao processar submissão do formulário:", error);

    // Se já criamos algumas entidades no banco mas ocorreu um erro,
    // tentar reverter o que foi possível
    if (pageId) {
      try {
        await supabase.from("pages").delete().eq("id", pageId);
      } catch (deleteError) {
        console.error("Erro ao reverter criação da página:", deleteError);
      }
    }

    // Reverter uploads de imagens
    if (uploadedImagesSucceded.length > 0) {
      try {
        const photoFullPaths = uploadedImagesSucceded.map(
          (img) => img.fullPath
        );
        await deleteMultipleImages(photoFullPaths);
      } catch (deleteError) {
        console.error("Erro ao reverter uploads no Firebase:", deleteError);
      }
    }

    throw error;
  }
}

/**
 * ### Gera um slug único para a página baseado no título fornecido pelo usuário.
 *
 * Normaliza o título para um formato de URL removendo acentos, caracteres especiais e espaços.
 * Se o slug já existir, adiciona um contador ao final.
 * @param title Título da página vindo do formulário
 * @returns Slug único e amigável
 */
async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/--+/g, "-") // Remove múltiplos hífens
    .trim();

  let finalSlug = baseSlug;
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const { data, error } = await supabase
      .from("pages")
      .select("id")
      .eq("page_slug", finalSlug)
      .single();

    if (error || !data) {
      isUnique = true;
    } else {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return finalSlug;
}
