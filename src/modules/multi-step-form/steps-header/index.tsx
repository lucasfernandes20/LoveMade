"use client";

import React from "react";

import { motion } from "framer-motion";

import { Steps } from "@/models";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleFadingArrowUpIcon,
} from "lucide-react";

interface HeaderStepProps {
  activeStep: number;
  setStep: (step: number) => void;
  steps: Steps[];
}

export function HeaderStep({ activeStep, steps, setStep }: HeaderStepProps) {
  const STEP_QUANTITY = 6;
  return (
    <div className="py-4">
      <div className="flex">
        {steps.map((step, index) =>
          step.id >= 1 && step.id <= STEP_QUANTITY ? (
            <motion.div
              key={index}
              className="relative flex flex-col cursor-pointer"
              onClick={() =>
                activeStep > index + 1 || (step.checked && !step.skip)
                  ? setStep(index)
                  : null
              }
            >
              <div className="absolute rounded-lg ml-[9.5px]">
                {(step.checked && !step.skip) || activeStep >= index + 1 ? (
                  <></>
                ) : (
                  <span className="text-xs font-semibold text-neutral-500">
                    {index + 1}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center">
                {index + 1 < activeStep || (step.checked && !step.skip) ? (
                  <CircleCheckIcon size={26} className="text-green-500" />
                ) : activeStep === index + 1 ? (
                  <CircleFadingArrowUpIcon
                    size={26}
                    className="text-yellow-500 rotate-90"
                  />
                ) : (
                  <CircleDashedIcon size={26} className="text-neutral-500" />
                )}

                {index + 1 >= 1 && index + 1 < STEP_QUANTITY && (
                  <div className="w-2 lg:w-14 lg:px-1 rounded-full block">
                    {index + 1 < activeStep || (step.checked && !step.skip) ? (
                      <div className="w-full h-0.5 bg-green-500 rounded-full" />
                    ) : activeStep === index + 1 ? (
                      <div className="w-full h-0.5 bg-yellow-500 rounded-full" />
                    ) : (
                      <div className="w-full h-0.5 bg-neutral-500 rounded-full" />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ) : null
        )}
      </div>

      <div className="mt-12">
        <h2 className="bg-clip-text text-transparent w-fit bg-gradient-to-tr from-neutral-400 via-white to-neutral-400 text-3xl lg:text-4xl py-2 relative z-20 font-bold tracking-tight">
          {steps[activeStep - 1].title}
        </h2>
        <p className="max-w-xl text-left text-sm relative text-neutral-300">
          {steps[activeStep - 1].description}
        </p>
      </div>
    </div>
  );
}
