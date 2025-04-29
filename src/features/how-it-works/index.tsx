"use client";

import { ChevronRight, Heart, Image, MessageSquareText, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { StepCard } from "./components/StepCard";
import { SectionTitle } from "../../components/shared/SectionTitle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Dados das etapas
const steps = [
  {
    id: 1,
    title: "Selecione suas fotos favoritas",
    description: "Escolha as melhores memórias para compartilhar com quem você ama. Adicione até 10 fotos especiais para contar sua história.",
    icon: Image,
    imagePath: "/images/how-it-works/plans.jpg",
    primaryColor: "from-rose-500/20",
    secondaryColor: "to-pink-500/20",
  },
  {
    id: 2,
    title: "Escreva sua mensagem especial",
    description: "Expresse seus sentimentos com palavras. Adicione textos personalizados que tocam o coração de quem você ama.",
    icon: MessageSquareText,
    imagePath: "/images/how-it-works/form.jpg",
    primaryColor: "from-purple-500/20",
    secondaryColor: "to-primary/20",
  },
  {
    id: 3,
    title: "Adicione música e contagem regressiva",
    description: "Escolha a trilha sonora do seu relacionamento e defina datas especiais para contagem regressiva automática.",
    icon: Timer, 
    imagePath: "/images/how-it-works/form.jpg",
    primaryColor: "from-purple-500/20",
    secondaryColor: "to-primary/20",
  },
  {
    id: 4,
    title: "Compartilhe com quem você ama",
    description: "Receba um link e QR Code exclusivos para compartilhar sua página de amor de forma surpreendente e emocionante.",
    icon: Heart,
    imagePath: "/images/how-it-works/qrcode.png",
    primaryColor: "from-purple-500/20",
    secondaryColor: "to-primary/20",
  }
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:py-28" id="tutorial">      
      <div className="mx-auto max-w-7xl">
        <SectionTitle 
          title="Como criar sua página de amor" 
          subtitle="Processo simples e rápido" 
        />
        
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              index={index}
              imagePath={step.imagePath}
              icon={step.icon}
              title={step.title}
              description={step.description}
              primaryColor={step.primaryColor}
              secondaryColor={step.secondaryColor}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href="/create"
            className={cn(
              buttonVariants(),
              "group relative flex items-center gap-2 px-8 py-6 text-lg font-medium"
            )}
          >
            Criar minha página agora
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.span>
            <motion.span 
              className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-primary to-secondary opacity-0 blur-md"
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
