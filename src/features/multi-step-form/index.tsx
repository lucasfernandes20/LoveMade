"use client";

import { useCreateState } from "@/context";
import { HeaderStep } from "./components/step-header";
import PageTitleStep from "./components/steps/pageTitleStep";
import MessageStep from "./components/steps/messageStep";
import UploadStep from "./components/steps/uploadStep";
import MusicStep from "./components/steps/musicStep";
import CommemorativeDateStep from "./components/steps/commemorativeDateStep";
import PlanStep from "./components/steps/planStep";

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
    } else if (index === state.steps.length) {
      
    }
    setState((prev) => ({
      ...prev,
      steps: prev.steps.map((item, i) =>
        i === index - 1 ? { ...item, checked: true } : item
      ),
      activeStep: index + 1,
    }));
  };

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
