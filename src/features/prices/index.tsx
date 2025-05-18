"use client";

import { Stars } from "@/components/shared/stars-background";
import { prices } from "@/schemas/const";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/SectionTitle";
import PlanCard from "@/components/shared/planCard";

export default function Prices() {
  return (
    <section
      className="w-full min-h-[calc(100svh-10rem)] pt-16 pb-24 px-4 relative overflow-hidden"
      id="prices"
    >
      {/* Efeito de partículas de fundo */}
      <div className="absolute inset-0 w-full h-full">
        <Stars
          backgroundColor="transparent"
          particleCount={200}
          baseHue={300}
          baseSpeed={0.01}
          rangeSpeed={0.2}
          rangeY={650}
          className="w-full h-full"
        />
      </div>

      {/* Conteúdo da seção */}
      <div className="relative z-10 flex flex-col items-center w-full mx-auto max-w-7xl">
        <SectionTitle title="Nossos planos" subtitle="Feito para você" />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {prices.map((price) => (
            <PlanCard key={price.planName} plan={price} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
