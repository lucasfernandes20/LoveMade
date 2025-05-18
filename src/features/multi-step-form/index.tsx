"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateState } from "@/context";
import { PlanNameEnum } from "@/types";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
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
      // Quando o usuário completar o último passo, abrir o modal de pagamento
      setIsPaymentModalOpen(true);
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

  const fetchClientSecret = useCallback(() => {
    // Aqui pegamos o plano que o usuário selecionou do state
    const selectedPlan = state.checkoutForm?.plan;

    return fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: selectedPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Client secret received:", data);
        return data.client_secret;
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        throw error;
      });
  }, [state.checkoutForm?.plan]);

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
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-[60svw] bg-white text-muted">
          <VisuallyHidden.Root>
            <DialogTitle>{getPlanDisplayName()}</DialogTitle>
          </VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>{getPlanDisplayName()}</DialogTitle>
          </DialogHeader>
          {isPaymentModalOpen && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
