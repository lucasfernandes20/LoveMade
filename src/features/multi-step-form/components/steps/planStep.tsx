"use client";

import { useCreateState } from "@/context";
import { prices } from "@/schemas/const/plans";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlanNameEnum } from "@/types/plans";
import PlanCard from "@/components/shared/planCard";

interface PlanStepProps {
  handleSetStep: (arg?: number) => void;
}

export default function PlanStep({ handleSetStep }: PlanStepProps) {
  const [state, setState] = useCreateState();
  const [selectedPlan, setSelectedPlan] = useState<PlanNameEnum | undefined>(
    state.checkoutForm?.plan || PlanNameEnum.Surprise
  );

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName as PlanNameEnum);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;
    
    setState({
      ...state,
      checkoutForm: {
        ...state.checkoutForm,
        plan: selectedPlan
      }
    });
    
    // Avançar para o próximo passo ou finalizar
    handleSetStep(state.activeStep);
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prices.map((price) => (
          <PlanCard key={price.planName} plan={price} handleSelectPlan={handleSelectPlan} isPlanSelected={selectedPlan === price.planName} />
        ))}
      </div>

        {
          selectedPlan === PlanNameEnum.Romantic && (
            <div className="text-xs text-destructive">
              <p>Com o plano <span className="font-bold">Romântico</span> você vai perder:</p>
            <ul className="list-disc list-inside">
              <li>Música customizada</li>
              <li>Animações na página</li>
              <li>Página ativa para sempre</li>
            </ul>
            </div>
          )
        }

      <div className="w-full mt-6 flex items-center gap-2 md:gap-4">
        <Button
          type="button"
          onClick={() => handleSetStep()}
          className="flex-1 text-xs px-0 md:px-4 md:text-base"
          disabled={state.activeStep === 1}
        >
          <ChevronRightIcon className="inline rotate-180" />
          Etapa anterior
        </Button>
        <Button 
          onClick={handleContinue}
          className="flex-1 text-xs px-0 md:px-4 md:text-base"
          disabled={!selectedPlan}
        >
          Finalizar
          <ChevronRightIcon className="inline" />
        </Button>
      </div>
    </div>
  );
} 