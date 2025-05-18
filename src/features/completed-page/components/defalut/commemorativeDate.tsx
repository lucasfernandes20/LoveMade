import { commemorativeDate } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CommemorativeDateSophisticatedProps {
  commemorativeDate: commemorativeDate;
}

export default function CommemorativeDateSophisticated({
  commemorativeDate,
}: CommemorativeDateSophisticatedProps) {
  const [countdown, setCountdown] = useState({
    days: 120,
    hours: 14,
    minutes: 30,
    seconds: 22,
  });

  const commemorativeDateString = new Date(
    commemorativeDate.date
  ).toLocaleDateString("pt-BR", { day: "numeric", month: "long" });

  useEffect(() => {
    if (commemorativeDate.date) {
      const updateCountdown = () => {
        const now = new Date();
        const toDate = new Date(commemorativeDate.date);

        // Criar uma data para a próxima ocorrência com o ano atual
        const nextOccurrence = new Date(
          now.getFullYear(),
          toDate.getMonth(),
          toDate.getDate()
        );

        // Se a data já passou este ano, considerar para o próximo ano
        if (nextOccurrence < now) {
          nextOccurrence.setFullYear(now.getFullYear() + 1);
        }

        const difference = nextOccurrence.getTime() - now.getTime();

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    } else {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev.seconds === 0) {
            if (prev.minutes === 0) {
              if (prev.hours === 0) {
                return {
                  ...prev,
                  days: Math.max(0, prev.days - 1),
                  hours: 23,
                  minutes: 59,
                  seconds: 59,
                };
              }
              return {
                ...prev,
                hours: prev.hours - 1,
                minutes: 59,
                seconds: 59,
              };
            }
            return {
              ...prev,
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          }

          return {
            ...prev,
            seconds: prev.seconds - 1,
          };
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [commemorativeDate.date]);

  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-3 md:mb-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs md:text-sm font-medium text-white/80">
            {commemorativeDate.name}
          </h3>
          <p className="text-[8px] md:text-xs text-white/60">
            {commemorativeDateString}
          </p>
        </div>
        <div className="text-right">
          <motion.p
            className="text-base md:text-lg font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
            key={countdown.days}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {countdown.days} dias
          </motion.p>
          <div className="flex gap-1 text-[8px] md:text-xs text-white/80 mt-1">
            <div className="flex flex-col items-center">
              <motion.span
                key={countdown.hours}
                initial={{ y: -3, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-mono"
              >
                {String(countdown.hours).padStart(2, "0")}
              </motion.span>
              <span className="text-[6px] md:text-[8px] text-white/50">
                horas
              </span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <motion.span
                key={countdown.minutes}
                initial={{ y: -3, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-mono"
              >
                {String(countdown.minutes).padStart(2, "0")}
              </motion.span>
              <span className="text-[6px] md:text-[8px] text-white/50">
                min
              </span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <motion.span
                key={countdown.seconds}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-mono"
              >
                {String(countdown.seconds).padStart(2, "0")}
              </motion.span>
              <span className="text-[6px] md:text-[8px] text-white/50">
                seg
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
