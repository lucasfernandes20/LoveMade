"use client";

import { useCreateState } from "@/context";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useCreateState();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("ID da sessão não encontrado");
      setLoading(false);
      return;
    }

    const processSuccessfulPayment = async () => {
      try {
        // 1. Buscar o registro da página no Supabase
        const { data: payment, error: fetchError } = await supabase
          .from("payments")
          .select("*, pages(*)")
          .eq("stripe_payment_id", sessionId)
          .single();

        if (fetchError || !payment || !payment.pages) {
          throw new Error("Registro de pagamento não encontrado");
        }

        const page = payment.pages;

        // 2. Verificar se a página foi criada corretamente
        if (!page.page_url && page.page_slug) {
          // Atualizar a URL da página se necessário
          const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/p/${page.page_slug}`;
          await supabase
            .from("pages")
            .update({ page_url: pageUrl })
            .eq("id", page.id);

          setPageUrl(pageUrl);
        } else if (page.page_url) {
          setPageUrl(page.page_url);
        } else {
          setPageUrl(`/p/${page.page_slug}`);
        }

        // 3. Limpar o estado do formulário
        setState({
          steps: state.steps.map((step) => ({ ...step, checked: false })),
          activeStep: 1,
          checkoutForm: undefined,
        });
      } catch (err: any) {
        console.error("Erro ao processar pagamento:", err);
        setError(err.message || "Erro ao processar pagamento");
      } finally {
        setLoading(false);
      }
    };

    processSuccessfulPayment();
  }, [searchParams, setState, state.steps]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h1 className="text-2xl font-bold text-center mb-2">
          Processando seu pagamento
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Estamos finalizando seu pedido. Por favor, não feche esta página.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Algo deu errado</h1>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          {error}
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-center mb-2">
        Pagamento confirmado!
      </h1>
      <p className="text-xl text-center mb-8 max-w-md">
        Sua página de amor foi criada com sucesso!
      </p>

      {pageUrl && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={pageUrl}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-center"
          >
            Ver minha página
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-center"
          >
            Voltar para o início
          </Link>
        </div>
      )}
    </div>
  );
}
