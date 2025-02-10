"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/modules/footer";
import { useEffect, useState } from "react";
import CreateForm from "@/modules/create-form";
import { FormData, PlanNameEnum, prices } from "@/models";
import ProposalPreview from "@/modules/ProposalPreview";
import { Suspense } from "react";
import { SmartphoneIcon, TvMinimalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function FormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<PlanNameEnum>(
    (searchParams.get("plan") as PlanNameEnum) || PlanNameEnum.Romantic
  );
  const [formData, setFormData] = useState<
    Record<PlanNameEnum, FormData | null>
  >({
    [PlanNameEnum.Basic]: null,
    [PlanNameEnum.Romantic]: null,
    [PlanNameEnum.Surprise]: null,
  });
  const [selectedDisplay, setSelectedDisplay] = useState<"pc" | "phone">(
    "phone"
  );

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan && plan !== selectedPlan) {
      setSelectedPlan(plan as PlanNameEnum);
    }
  }, [searchParams]);

  const handlePlanChange = (plan: string) => {
    setSelectedPlan(plan as PlanNameEnum);
    const params = new URLSearchParams(window.location.search);
    params.set("plan", plan);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <section className="container mx-auto flex-grow">
        <h1 className="text-4xl font-bold mb-6">Quase lá!</h1>
        <p className="text-lg mb-6">Preencha os dados para criar seu pedido</p>
        <div
          className={cn(
            "w-full flex flex-col md:grid md:grid-cols-[3fr_1.5fr] gap-12 transition-all duration-300",
            selectedDisplay === "pc" && "md:grid-cols-[1.5fr_3fr]"
          )}
        >
          <Tabs
            defaultValue={selectedPlan}
            onValueChange={handlePlanChange}
            className="w-full md:w-auto"
          >
            <TabsList className="flex-col h-auto w-full md:w-auto md:inline-flex md:flex-row md:h-10">
              {prices.map((price) => (
                <TabsTrigger
                  key={price.title}
                  value={price.planName}
                  className="w-full md:w-auto"
                >
                  {price.title} • {price.price}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="basic">
              <Card className="w-full md:w-auto bg-background p-8 mt-6 shadow-2xl shadow-black">
                <CreateForm selectedPlan={selectedPlan} changes={setFormData} />
              </Card>
            </TabsContent>

            <TabsContent value="romantic">
              <Card className="w-full md:w-auto bg-background p-8 mt-6 shadow-2xl shadow-black">
                <CreateForm selectedPlan={selectedPlan} changes={setFormData} />
              </Card>
            </TabsContent>

            <TabsContent value="surprise">
              <Card className="w-full md:w-auto bg-background p-8 mt-6 shadow-2xl shadow-black">
                <CreateForm selectedPlan={selectedPlan} changes={setFormData} />
              </Card>
            </TabsContent>
          </Tabs>
          <div className="relative mt-12 md:mt-0">
            <div className="absolute flex md:flex-col gap-4 right-1/2 translate-x-1/2 -translate-y-[calc(100%+1rem)] md:top-1/2 md:-translate-y-1/2 md:right-0 md:translate-x-[calc(100%+1rem)]">
              <div
                className={cn(
                  "rounded-full bg-muted-foreground/60 p-4 cursor-pointer hover:bg-card border-[1px] flex items-center gap-2",
                  selectedDisplay === "pc" && "bg-card border-primary"
                )}
                onClick={() => setSelectedDisplay("pc")}
              >
                <TvMinimalIcon className="size-4 md:size-max" />
                <p className="text-xs md:hidden">Computador</p>
              </div>
              <div
                className={cn(
                  "rounded-full bg-muted-foreground/60 p-4 cursor-pointer hover:bg-card border-[1px] flex items-center gap-2",
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
                "border-2 border-primary overflow-hidden transition-all duration-300",
                selectedDisplay === "phone" ? "aspect-[9/16]" : "aspect-[16/9]"
              )}
            >
              <ProposalPreview
                formData={formData}
                selectedPlan={selectedPlan}
                selectedDisplay={selectedDisplay}
              />
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
      <FormContent />
    </Suspense>
  );
}
