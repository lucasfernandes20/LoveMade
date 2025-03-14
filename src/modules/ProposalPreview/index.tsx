"use client";
import React from "react";
import { StyledCarousel } from "@/components/styledCarousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateState } from "@/context";
import { animationsIds, AnimationTypeEnum } from "@/models";
import { Aurora } from "@/components/animations/light-sky";
import { Stars } from "@/components/animations/stars";

interface ProposalPreviewProps {
  selectedDisplay: "pc" | "phone";
}

export default function ProposalPreview({
  selectedDisplay,
}: ProposalPreviewProps) {
  const [state] = useCreateState();
  const { checkoutForm } = state;

  const handleRenderAnimationContainer = (children: React.ReactNode) => {
    switch (checkoutForm?.pageAnimation) {
      case animationsIds[AnimationTypeEnum["SKY_LIGHT"]]:
        return <Aurora className="w-full h-full">{children}</Aurora>;
      case animationsIds[AnimationTypeEnum["STARS"]]:
        return (
          <Stars
            backgroundColor="transparent"
            particleCount={200}
            baseHue={300}
            baseSpeed={0.01}
            rangeSpeed={0.2}
            rangeY={650}
            className="w-full h-full"
          >
            {children}
          </Stars>
        );
      default:
        return children;
    }
  };

  return (
    <div
      className={cn(
        "container relative mx-auto py-8 transition-all duration-300 w-full min-h-full overflow-y-auto bg-black overflow-hidden",
        selectedDisplay === "pc" ? "grid grid-cols-[3fr_2fr] gap-4" : ""
      )}
    >
      {handleRenderAnimationContainer(
        <div>
          <h2
            className={cn(
              "mb-2 text-primary font-lobster",
              selectedDisplay === "pc"
                ? "text-start text-base"
                : "text-center text-2xl"
            )}
          >
            {checkoutForm?.pageTitle || "Título da proposta"}
          </h2>
          <StyledCarousel photos={checkoutForm?.photos} />
          <div className="pt-6">
            <p className="text-sm text-center">
              {checkoutForm?.message ||
                "Aqui aparecerá sua mensagem personalizada."}
            </p>
            <div className="flex justify-center mt-5">
              <Button>Aceito🤍</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
