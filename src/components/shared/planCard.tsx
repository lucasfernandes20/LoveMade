"use client";

import { motion } from "framer-motion";
import { CheckIcon, SparklesIcon, HeartIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Price } from "@/types/plans";
import Link from "next/link";

interface PlanCardProps {
  plan: Price;
  handleSelectPlan?: (planName: string) => void;
  isPlanSelected?: boolean;
}

export default function PlanCard({
  plan,
  handleSelectPlan,
  isPlanSelected,
}: PlanCardProps) {
  const {
    title,
    features,
    desvantagens,
    priceWithDiscount,
    totalPrice,
    mostPopular,
    planName,
  } = plan;
  const planIcon =
    planName === "surprise" ? (
      <SparklesIcon className="w-4 h-4 text-yellow-300" />
    ) : (
      <HeartIcon className="w-4 h-4 text-rose-400" />
    );

  const gradientFrom =
    planName === "surprise" ? "from-violet-500/50" : "from-rose-500/50";

  const gradientTo =
    planName === "surprise" ? "to-blue-500/50" : "to-pink-500/50";

  const originalPrice = parseFloat(
    totalPrice.replace("R$ ", "").replace(",", ".")
  );
  const discountPrice = parseFloat(
    priceWithDiscount.replace("R$ ", "").replace(",", ".")
  );
  const discountPercentage = Math.round(
    ((originalPrice - discountPrice) / originalPrice) * 100
  );
  const discountText = `${discountPercentage}%`;

  const handleClick = () => {
    if (handleSelectPlan) {
      handleSelectPlan(planName);
    }
  };

  return (
    <motion.div
      className={cn(
        "relative w-full h-full max-w-sm group",
        !!handleSelectPlan && "cursor-pointer"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={handleClick}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-tl from-primary/30 via-blue-500/30 to-primary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 animate-gradient-x"></div>

      {mostPopular && (
        <motion.div
          className="absolute -top-3 z-10 left-0 right-0 mx-auto w-fit"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-sm opacity-60 rounded-full" />
            <div className="relative px-4 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10">
              <div className="flex items-center gap-1.5">
                {planIcon}
                <span className="text-xs font-medium text-white whitespace-nowrap">
                  Mais escolhido
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md relative h-full",
          isPlanSelected && "border-primary"
        )}
      >
        <motion.div
          className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-bl ${gradientFrom} ${gradientTo} blur-xl rounded-full opacity-40`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className={`absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-tr ${gradientFrom} ${gradientTo} blur-xl rounded-full opacity-40`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2.5,
          }}
        />

        <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
          <div className="mb-6">
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="p-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/5">
                {planIcon}
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {title}
              </h3>
            </motion.div>

            <div className="mt-4 mb-4">
              {totalPrice !== priceWithDiscount && (
                <span className="text-sm text-rose-400 line-through font-medium mb-1">
                  {totalPrice}
                </span>
              )}
              <motion.div
                className="flex items-end gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl font-bold text-white">
                  {priceWithDiscount}
                </span>
                <span className="text-xs mb-2 font-light text-muted-foreground">
                  /uma vez
                </span>
              </motion.div>

              {totalPrice !== priceWithDiscount && (
                <motion.div
                  className="mt-2 inline-flex items-center px-2 py-1 bg-green-950/60 rounded-md border border-green-500/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[10px] font-medium text-green-400">
                    {discountText} de desconto
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          <div className={cn("mb-8 flex-grow", handleSelectPlan && "mb-0")}>
            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <motion.li
                  key={`${planName}-feature-${idx}`}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20">
                    <CheckIcon className="text-green-500 w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm text-white/80">{feature}</span>
                </motion.li>
              ))}

              {desvantagens && desvantagens.length > 0 && (
                <motion.div
                  className="mt-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {desvantagens.map((disadvantage, idx) => (
                    <motion.li
                      key={`${planName}-disadvantage-${idx}`}
                      className="flex items-start gap-3 mb-3"
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20">
                        <XIcon className="text-rose-500 w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm text-white/60">
                        {disadvantage}
                      </span>
                    </motion.li>
                  ))}
                </motion.div>
              )}
            </ul>
          </div>

          {!handleSelectPlan && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative mt-auto"
            >
              <Link
                href={`/create?plan=${planName}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full py-6 font-medium text-base relative overflow-hidden group",
                  mostPopular && "border border-white/40"
                )}
              >
                <span className="relative z-10">
                  {planName === "romantic"
                    ? "Escolher esse"
                    : "Criar Meu Pedido"}
                </span>
                <motion.span
                  className={`absolute inset-0 transition-all duration-300 bg-gradient-to-r ${gradientFrom.replace(
                    "/30",
                    ""
                  )} ${gradientTo.replace(
                    "/30",
                    ""
                  )} opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              {mostPopular && (
                <motion.div
                  className="absolute -inset-px rounded-lg pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 8px rgba(255,255,255,0)",
                      "0 0 8px rgba(255,255,255,0.9)",
                      "0 0 8px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
