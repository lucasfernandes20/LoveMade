"use client";

import { useCreateState } from "@/context";
import { HeaderStep } from "./steps-header";
import PageTitle from "./steps/pageTitleStep";
import Message from "./steps/messageStep";
import { useEffect } from "react";
import UploadStep from "./steps/uploadStep";
import AnimationStep from "./steps/animationStep";

export default function MultiStepForm() {
  const [state, setState] = useCreateState();

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
    }
    setState((prev) => ({
      ...prev,
      steps: prev.steps.map((item, i) =>
        i === index - 1 ? { ...item, checked: true } : item
      ),
      activeStep: index + 1,
    }));
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <PageTitle handleSetStep={handleSetStep} />;
      case 2:
        return <Message handleSetStep={handleSetStep} />;
      case 3:
        return <UploadStep handleSetStep={handleSetStep} />;
      case 4:
        return <AnimationStep handleSetStep={handleSetStep} />;
      case 5:
        return <PageTitle handleSetStep={handleSetStep} />;
      case 6:
        return <PageTitle handleSetStep={handleSetStep} />;
      default:
        return <PageTitle handleSetStep={handleSetStep} />;
    }
  };

  return (
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
  );
}
