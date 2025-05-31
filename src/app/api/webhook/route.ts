import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    // Obter a assinatura diretamente do cabeçalho da requisição
    const signature = request.headers.get("stripe-signature") || "";

    if (!signature) {
      return NextResponse.json(
        { error: "Assinatura do webhook não fornecida" },
        { status: 400 }
      );
    }

    // Verificar a assinatura do webhook
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Erro na verificação da assinatura: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Processar evento
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          // Verificar se o pagamento está completo
          if (session.payment_status === "paid") {
            // Buscar o pagamento existente
            const { data: existingPayment, error: fetchError } = await supabase
              .from("payments")
              .select("id, status, page_id")
              .eq("stripe_payment_id", session.id)
              .single();

            if (fetchError) {
              console.error("Erro ao buscar pagamento:", fetchError);
              return NextResponse.json(
                { error: "Pagamento não encontrado" },
                { status: 404 }
              );
            }

            // Só atualizar se ainda não estiver marcado como completo
            if (existingPayment.status !== "completed") {
              // Obter o valor do pagamento
              const paymentInfo = await stripe.checkout.sessions.retrieve(
                session.id,
                {
                  expand: ["line_items", "payment_intent"],
                }
              );

              let amount = 0;
              if (paymentInfo.amount_total) {
                amount = paymentInfo.amount_total / 100; // Converter de centavos para reais
              }

              // Atualizar o status e o valor do pagamento
              const { error: updateError } = await supabase
                .from("payments")
                .update({
                  status: "completed",
                  amount: amount,
                })
                .eq("id", existingPayment.id);

              if (updateError) {
                console.error(
                  "Erro ao atualizar status de pagamento:",
                  updateError
                );
                return NextResponse.json(
                  { error: "Erro ao atualizar status de pagamento" },
                  { status: 500 }
                );
              }
            }
          }
        } catch (error) {
          console.error(
            "Erro ao processar evento checkout.session.completed:",
            error
          );
          return NextResponse.json(
            { error: "Erro interno ao processar evento" },
            { status: 500 }
          );
        }
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          // Buscar o pagamento existente
          const { data: existingPayment, error: fetchError } = await supabase
            .from("payments")
            .select("id, status")
            .eq("stripe_payment_id", session.id)
            .single();

          if (fetchError) {
            console.error("Erro ao buscar pagamento:", fetchError);
            return NextResponse.json(
              { error: "Pagamento não encontrado" },
              { status: 404 }
            );
          }

          // Só atualizar se ainda não estiver marcado como completo
          if (existingPayment.status !== "completed") {
            // Obter o valor do pagamento
            const paymentInfo = await stripe.checkout.sessions.retrieve(
              session.id,
              {
                expand: ["line_items", "payment_intent"],
              }
            );

            let amount = 0;
            if (paymentInfo.amount_total) {
              amount = paymentInfo.amount_total / 100; // Converter de centavos para reais
            }

            const { error: updateError } = await supabase
              .from("payments")
              .update({
                status: "completed",
                amount: amount,
              })
              .eq("id", existingPayment.id);

            if (updateError) {
              console.error(
                "Erro ao atualizar status de pagamento:",
                updateError
              );
              return NextResponse.json(
                { error: "Erro ao atualizar status de pagamento" },
                { status: 500 }
              );
            }
          }
        } catch (error) {
          console.error(
            "Erro ao processar evento async_payment_succeeded:",
            error
          );
          return NextResponse.json(
            { error: "Erro interno ao processar evento" },
            { status: 500 }
          );
        }
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          // Buscar o pagamento existente
          const { data: existingPayment, error: fetchError } = await supabase
            .from("payments")
            .select("id, page_id")
            .eq("stripe_payment_id", session.id)
            .single();

          if (fetchError) {
            console.error("Erro ao buscar pagamento:", fetchError);
            return NextResponse.json(
              { error: "Pagamento não encontrado" },
              { status: 404 }
            );
          }

          // Atualizar o status do pagamento para falha
          const { error: updateError } = await supabase
            .from("payments")
            .update({ status: "failed" })
            .eq("id", existingPayment.id);

          if (updateError) {
            console.error(
              "Erro ao atualizar status de pagamento:",
              updateError
            );
            return NextResponse.json(
              { error: "Erro ao atualizar status de pagamento" },
              { status: 500 }
            );
          }
        } catch (error) {
          console.error(
            "Erro ao processar evento async_payment_failed:",
            error
          );
          return NextResponse.json(
            { error: "Erro interno ao processar evento" },
            { status: 500 }
          );
        }
        break;
      }

      default:
        console.log(`Evento não processado: ${event.type}`);
    }

    // Retornar resposta de sucesso
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

// Configuração para aceitar o corpo cru da requisição
export const config = {
  api: {
    bodyParser: false,
  },
};
