"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import PagePreview from "@/modules/hero-section/page-preview";
import DiscoverMore from "@/modules/hero-section/discover-more";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const featureCards = [
    { icon: "👨‍👩‍👧‍👦", text: "Para casais, família ou amigos especiais" },
    { icon: "🎵", text: "Adicione suas músicas favoritas" },
    { icon: "📸", text: "Conte histórias com suas melhores fotos" },
    { icon: "⏱️", text: "Acompanhe datas especiais com contagem regressiva" }
  ]

  return (
    <section className="relative min-h-[calc(100svh-6rem)] overflow-hidden">
      {isMounted && (
        <>
          <div className="absolute inset-0 -z-10">
            {Array.from({ length: 100 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full bg-primary"
                style={{
                  width: Math.random() * 3 + 2 + "px",
                  height: Math.random() * 3 + 2 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  y: [0, Math.random() * 300],
                  x: [0, Math.random() * 300],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 5 + 10,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className="relative z-10">
        <div className="container max-w-7xl mx-auto py-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              className="lg:col-span-7 px-4 md:px-8 lg:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-block mb-4 bg-primary/10 px-4 py-1 lg:py-2 rounded-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className= "text-xs lg:text-sm font-medium text-primary">Celebre seus momentos</span>
              </motion.div>

              <motion.h1 
                className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-tr from-pink-500 via-primary to-secondary text-transparent bg-clip-text select-none leading-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Eternize momentos especiais com quem você ama <span className="text-3xl md:text-5xl">✨</span>
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-lg lg:text-xl font-medium text-foreground/80 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Crie sua <span className="text-primary">página personalizada de amor</span> com fotos, música, textos especiais e contagem para datas importantes. <span className="text-primary">Compartilhe seus sentimentos</span> de um jeito único.
              </motion.p>
            
              <motion.div 
                className="grid md:grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {featureCards.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl p-3.5 border border-white/5 hover:border-primary/30 transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <p className="text-xs md:text-sm text-foreground/90">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8 self-center w-full md:w-auto"
              >
                <Link
                  href="/create"
                  className={cn(
                    buttonVariants(),
                    "text-base md:text-lg py-6 px-8 font-semibold transition-all relative overflow-hidden group w-full md:w-auto"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">Criar minha página <ArrowRight size={16} /></span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              
              </motion.div>
            </motion.div>
            
            <PagePreview />
          </div>
        </div>

        <DiscoverMore scrollIndicatorOpacity={scrollIndicatorOpacity} />
      </div>
    </section>
  );
} 