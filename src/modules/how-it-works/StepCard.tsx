"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepCardProps {
  imagePath: string;
  icon: LucideIcon;
  title: string;
  description: string;
  primaryColor?: string;
  secondaryColor?: string;
  index: number;
  children?: ReactNode;
}

export function StepCard({
  imagePath,
  icon: Icon,
  title,
  description,
  primaryColor = "from-primary/20",
  secondaryColor = "to-secondary/20",
  index,
  children
}: StepCardProps) {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="relative h-64 w-full overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700`}
          style={{ backgroundImage: `url('${imagePath}')` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${primaryColor} ${secondaryColor} opacity-60`} />
        
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-lg">
          <span className="text-lg font-bold">{index + 1}</span>
        </div>
        
        <motion.div 
          className="absolute -bottom-2 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-primary/80 to-secondary/80 text-white shadow-lg"
          initial={{ rotate: -5 }}
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </motion.div>
      
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-base text-foreground/70">{description}</p>
        {children}
      </div>
      
    </motion.div>
  );
} 