"use client";
import React from "react";
import { FormData } from "@/models";
import { StyledCarousel } from "@/components/styledCarousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProposalPreviewProps {
  formData?: FormData;
  selectedDisplay: "pc" | "phone";
}

export default function ProposalPreview({
  formData,
  selectedDisplay,
}: ProposalPreviewProps) {
  return (
    <div
      className={cn(
        "py-8 transition-all duration-300 max-h-full overflow-y-auto",
        selectedDisplay === "pc"
          ? "grid grid-cols-[3fr_2fr] gap-4 container"
          : ""
      )}
    >
      <div>
        <div
          className={cn(selectedDisplay === "pc" ? "" : "container mx-auto")}
        >
          <h2
            className={cn(
              "mb-2 text-primary font-lobster",
              selectedDisplay === "pc"
                ? "text-start text-base"
                : "text-center text-2xl"
            )}
          >
            {formData?.senderName || "Seu Nome"} &{" "}
            {formData?.receiverName || "Nome da Pessoa Amada"}
          </h2>
        </div>
        <div className={cn(selectedDisplay === "pc" ? "hidden" : "")}>
          <StyledCarousel photos={formData?.photos} />
        </div>
        <div
          className={cn(selectedDisplay === "pc" ? "" : "container mx-auto")}
        >
          <p className="text-lg text-center">
            {formData?.message || "Aqui aparecerá sua mensagem personalizada."}
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
      <div className={cn(selectedDisplay === "pc" ? "" : "hidden")}>
        <StyledCarousel photos={formData?.photos} />
      </div>
    </div>
  );
}
