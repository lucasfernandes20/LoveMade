"use client";
import React from "react";
import { FormData, PlanNameEnum } from "@/models";
import { StyledCarousel } from "@/components/styledCarousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProposalPreviewProps {
  formData: Record<PlanNameEnum, FormData | null>;
  selectedPlan: PlanNameEnum;
  selectedDisplay: "pc" | "phone";
}

export default function ProposalPreview({
  formData,
  selectedPlan,
  selectedDisplay,
}: ProposalPreviewProps) {
  const data = formData[selectedPlan];

  return (
    <div className={cn("py-8")}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center">Pedido Especial 💕</h2>
        <p className="py-4">
          {data?.senderName ||
            "[NOME DA PESSOA AMADA] tenho um pedido especial para você!"}
        </p>
      </div>
      <StyledCarousel photos={data?.photos} />
      <div className="container">
        <p className="text-lg text-center">
          {data?.message || "Aqui aparecerá sua mensagem personalizada."}
        </p>
        <div className="flex justify-center mt-5">
          <Button
            variant="glow"
            className="px-6 py-7 text-3xl font-bold uppercase"
          >
            Aceito🤍
          </Button>
        </div>
      </div>
    </div>
  );
}
