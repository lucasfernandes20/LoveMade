"use client";
import { Card } from "@/components/ui/card";
import Footer from "@/modules/footer";
import { useState } from "react";
import CreateForm from "@/modules/create-form";
import ProposalPreview from "@/modules/ProposalPreview";
import { Suspense } from "react";
import { SmartphoneIcon, TvMinimalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateContextProvider } from "@/context";

function FormContent() {
  const [selectedDisplay, setSelectedDisplay] = useState<"pc" | "phone">(
    "phone"
  );

  return (
    <div className="flex flex-col">
      <section className="container mx-auto flex-grow">
        <div
          className={cn(
            "w-full flex flex-col md:grid md:grid-cols-[3fr_1.5fr] gap-12 transition-all duration-300",
            selectedDisplay === "pc" && "md:grid-cols-[1.5fr_3fr]"
          )}
        >
          <CreateForm />
          <div className="relative mt-12 md:mt-0">
            <div className="absolute flex lg:flex-col gap-4 right-1/2 translate-x-1/2 -translate-y-[calc(100%+1rem)] lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:translate-x-[calc(100%+1rem)]">
              <div
                className={cn(
                  "rounded-full bg-muted-foreground/60 p-4 cursor-pointer hover:bg-card border-2 flex items-center gap-2",
                  selectedDisplay === "pc" && "bg-card border-primary"
                )}
                onClick={() => setSelectedDisplay("pc")}
              >
                <TvMinimalIcon className="size-4 md:size-max" />
                <p className="text-xs md:hidden">Computador</p>
              </div>
              <div
                className={cn(
                  "rounded-full bg-muted-foreground/60 p-4 cursor-pointer hover:bg-card border-2 flex items-center gap-2",
                  selectedDisplay === "phone" && "bg-card border-primary"
                )}
                onClick={() => setSelectedDisplay("phone")}
              >
                <SmartphoneIcon className="size-4 md:size-max" />
                <p className="text-xs md:hidden">Smartphone</p>
              </div>
            </div>
            <Card
              className={cn(
                "transition-all duration-300 border-2 border-primary rounded-xl bg-background",
                selectedDisplay === "phone" ? "aspect-[9/16]" : "aspect-[16/9]"
              )}
              containerClassName="h-full w-full"
            >
              <ProposalPreview selectedDisplay={selectedDisplay} />
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense>
      <CreateContextProvider>
        <FormContent />
      </CreateContextProvider>
    </Suspense>
  );
}
