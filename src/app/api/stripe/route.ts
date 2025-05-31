import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
  const body = await request.json();
  const { plan, formData } = body;

  if (!formData) {
    return NextResponse.json(
      { error: "Dados do formulário não fornecidos" },
      { status: 400 }
    );
  }

  if (!plan) {
    return NextResponse.json({ error: "Plano não informado" }, { status: 400 });
  }

  const priceIdMap: Record<string, string | undefined> = {
    romantic: process.env.NEXT_PUBLIC_STRIPE_ROMANTIC_PLAN_ID,
    surprise: process.env.NEXT_PUBLIC_STRIPE_SURPRISE_PLAN_ID,
  };

  const selectedPriceId = priceIdMap[plan];

  if (!selectedPriceId) {
    return NextResponse.json(
      { error: `Plano inválido: ${plan}` },
      { status: 400 }
    );
  }

  try {
    // Validar dados do formulário
    if (!formData.title) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    // 1. Criar sessão do Stripe
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            quantity: 1,
            price: selectedPriceId,
          },
        ],
        mode: "payment",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          formDataId: Date.now().toString(), // Identificador único para o formulário
          plan: plan,
          title: formData.title,
        },
      });
    } catch (stripeError: any) {
      console.error("Erro ao criar sessão do Stripe:", stripeError);
      return NextResponse.json(
        { error: `Erro ao processar pagamento: ${stripeError.message}` },
        { status: 500 }
      );
    }

    // 2. Preparar dados do formulário para o Supabase
    const pageSlug = generateUniqueSlug(formData.title || "love-page");
    const submissionData = {
      title: formData.title || "Sem título",
      message: formData.message,
      plan: plan,
      payment_status: "pending",
      payment_id: session.id,

      // Dados de data comemorativa
      commemorative_date_name: formData.commemorativeDate?.name,
      commemorative_date: formData.commemorativeDate?.date
        ? new Date(formData.commemorativeDate.date).toISOString().split("T")[0]
        : null,
      date_style: formData.commemorativeDate?.style,

      // Dados de música
      music_display_name: formData.music?.displayName,
      music_artist_name: formData.music?.artistName,
      music_track_name: formData.music?.trackName,
      music_album_cover: formData.music?.albumCover,
      music_preview_url: formData.music?.previewUrl,
      music_spotify_url: formData.music?.spotifyUrl,
      music_video_id: formData.music?.videoId,
      music_duration: formData.music?.duration,
      music_embed_url: formData.music?.embedUrl,
      music_youtube_url: formData.music?.youtubeUrl,

      // O upload das imagens será feito após o pagamento
      page_slug: pageSlug,
      page_url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${pageSlug}`,
    };

    // 3. Salvar dados no Supabase
    try {
      const { error } = await supabase
        .from("form_submissions")
        .insert(submissionData);

      if (error) {
        // Se falhar ao salvar no Supabase, precisamos cancelar a sessão do Stripe
        try {
          await stripe.checkout.sessions.expire(session.id);
        } catch (expireError) {
          console.error("Erro ao expirar sessão do Stripe:", expireError);
          // Continuamos com o erro original
        }

        console.error("Erro ao salvar dados do formulário:", error);
        return NextResponse.json(
          { error: "Erro ao salvar dados do formulário" },
          { status: 500 }
        );
      }
    } catch (supabaseError) {
      // Se falhar ao salvar no Supabase, precisamos cancelar a sessão do Stripe
      try {
        await stripe.checkout.sessions.expire(session.id);
      } catch (expireError) {
        console.error("Erro ao expirar sessão do Stripe:", expireError);
        // Continuamos com o erro original
      }

      console.error("Erro ao salvar no Supabase:", supabaseError);
      return NextResponse.json(
        { error: "Erro ao processar os dados do formulário" },
        { status: 500 }
      );
    }

    // 4. Retornar os dados da sessão
    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    console.error("Erro ao processar pagamento:", error);
    return NextResponse.json(
      { error: `Erro inesperado: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * Gera um slug único para a página
 * @param title Título da página
 * @returns Slug único
 */
function generateUniqueSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();

  // Adicionar timestamp para garantir unicidade
  return `${baseSlug}-${Date.now().toString(36)}`;
}
