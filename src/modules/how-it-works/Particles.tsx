"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  yMove: number;
}

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Gerar partículas apenas no lado do cliente
    const particlesArray = Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 10,
      yMove: Math.random() * 30 - 15
    }));
    
    setParticles(particlesArray);
  }, []);
  
  if (particles.length === 0) return null;
  
  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, particle.yMove],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
} 