"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreateState } from "@/context";
import { PlanNameEnum } from "@/types";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { HeaderStep } from "./components/step-header";
import CommemorativeDateStep from "./components/steps/commemorativeDateStep";
import MessageStep from "./components/steps/messageStep";
import MusicStep from "./components/steps/musicStep";
import PageTitleStep from "./components/steps/pageTitleStep";
import PlanStep from "./components/steps/planStep";
import UploadStep from "./components/steps/uploadStep";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function MultiStepForm() {
  const [state, setState] = useCreateState();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSetStep = (index?: number) => {
    if (!index) {
      setState((prev) => ({
        ...prev,
        activeStep: state.activeStep - 1,
        steps: prev.steps.map((item, i) =>
          i === 0 ? { ...item, checked: true } : { ...item, checked: false }
        ),
      }));
      return;
    } else if (index === state.steps.length) {
      // Quando o usuário completar o último passo, iniciar processamento de pagamento
      initiatePayment();
      return;
    }
    setState((prev) => ({
      ...prev,
      steps: prev.steps.map((item, i) =>
        i === index - 1 ? { ...item, checked: true } : item
      ),
      activeStep: index + 1,
    }));
  };

  const initiatePayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Validar dados do formulário antes de prosseguir
      if (!state.checkoutForm?.title) {
        toast.error("Por favor, informe um título para sua página");
        setIsProcessing(false);
        return;
      }

      if (!state.checkoutForm?.plan) {
        toast.error("Por favor, selecione um plano");
        setIsProcessing(false);
        return;
      }

      // Abrir modal de pagamento
      setIsPaymentModalOpen(true);
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
      setPaymentError(
        "Ocorreu um erro ao iniciar o pagamento. Por favor, tente novamente."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchClientSecret = useCallback(() => {
    // Aqui pegamos o plano que o usuário selecionou do state
    const selectedPlan = state.checkoutForm?.plan;

    setIsProcessing(true);
    setPaymentError(null);

    return fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: selectedPlan,
        formData: state.checkoutForm,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Erro ao processar pagamento");
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Client secret received:", data);
        setIsProcessing(false);
        return data.client_secret;
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        setPaymentError(error.message || "Erro ao processar pagamento");
        setIsProcessing(false);
        throw error;
      });
  }, [state.checkoutForm]);

  const options = { fetchClientSecret };

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <PageTitleStep handleSetStep={handleSetStep} />;
      case 2:
        return <MessageStep handleSetStep={handleSetStep} />;
      case 3:
        return <UploadStep handleSetStep={handleSetStep} />;
      case 4:
        return <CommemorativeDateStep handleSetStep={handleSetStep} />;
      case 5:
        return <MusicStep handleSetStep={handleSetStep} />;
      case 6:
        return <PlanStep handleSetStep={handleSetStep} />;
      default:
        return <PageTitleStep handleSetStep={handleSetStep} />;
    }
  };

  const getPlanDisplayName = () => {
    if (!state.checkoutForm?.plan) return "Seu Plano";

    const planMap: Record<PlanNameEnum, string> = {
      [PlanNameEnum.Romantic]: "Plano Romântico",
      [PlanNameEnum.Surprise]: "Plano Surpresa",
    };

    return planMap[state.checkoutForm.plan as PlanNameEnum] || "Seu Plano";
  };

  const handleClosePaymentModal = () => {
    if (!isProcessing) {
      setIsPaymentModalOpen(false);
      setPaymentError(null);
    }
  };

  return (
    <>
      <section className="max-w-xl">
        <div>
          <HeaderStep
            activeStep={state.activeStep}
            steps={state.steps}
            setStep={handleSetStep}
          />
        </div>
        <div className="w-full mt-8">{renderStep(state.activeStep)}</div>
      </section>

      {/* Modal de Pagamento */}
      <Dialog open={isPaymentModalOpen} onOpenChange={handleClosePaymentModal}>
        <DialogContent className="max-w-[60svw] bg-white text-muted">
          <VisuallyHidden.Root>
            <DialogTitle>{getPlanDisplayName()}</DialogTitle>
          </VisuallyHidden.Root>

          {/* Mostrar erro, se houver */}
          {paymentError && (
            <div className="bg-red-50 p-4 mb-4 rounded-md">
              <p className="text-red-600 text-sm">{paymentError}</p>
              <button
                className="mt-2 text-sm text-red-700 underline"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Fechar e tentar novamente
              </button>
            </div>
          )}

          {/* Indicador de carregamento */}
          {isProcessing && (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm text-gray-500">
                Processando pagamento...
              </span>
            </div>
          )}

          {isPaymentModalOpen && !paymentError && !isProcessing && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
