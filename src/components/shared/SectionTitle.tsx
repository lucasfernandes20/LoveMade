"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}

export function SectionTitle({
  title,
  subtitle,
  containerClassName,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) {
  const titleWords = title.split(" ");

  return (
    <div className={cn("mb-12 text-center", containerClassName)}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={cn(
          "inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4",
          subtitleClassName
        )}
      >
        {subtitle}
      </motion.div>

      <h2 className="relative mb-4 text-center text-3xl font-bold md:text-5xl">
        <div className="flex flex-wrap justify-center gap-x-2">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className={cn("relative inline-block", titleClassName)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
            >
              {word}
              {i === titleWords.length - 3 && (
                <motion.span
                  className="absolute -right-2 -top-2 text-xl text-secondary md:text-3xl"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  ✨
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
      </h2>

      <motion.div
        className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70"
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 0.7, width: 80 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      />
    </div>
  );
}
