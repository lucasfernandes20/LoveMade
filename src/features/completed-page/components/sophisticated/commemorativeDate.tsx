import { SectionTitle } from "@/components/shared/SectionTitle";
import { commemorativeDate } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CommemorativeDateDefaultProps {
  commemorativeDate: commemorativeDate;
}

export default function CommemorativeDateDefault({
  commemorativeDate,
}: CommemorativeDateDefaultProps) {
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
      className="mb-3 md:mb-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex flex-col items-center">
        <SectionTitle
          title={commemorativeDate.name}
          subtitle={commemorativeDateString}
          containerClassName="mb-5"
          titleClassName="text-xl md:text-2xl"
          subtitleClassName="text-xs"
        />
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="flex flex-col items-center bg-primary/20 rounded-lg p-4">
            <span className="text-3xl md:text-5xl font-bold text-primary">
              {countdown.days}
            </span>
            <span className="text-xs md:text-sm text-white/80 mt-1">Dias</span>
          </div>
          <div className="flex flex-col items-center bg-primary/20 rounded-lg p-4">
            <span className="text-3xl md:text-5xl font-bold text-primary">
              {String(countdown.hours).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm text-white/80 mt-1">Horas</span>
          </div>
          <div className="flex flex-col items-center bg-primary/20 rounded-lg p-4">
            <span className="text-3xl md:text-5xl font-bold text-primary">
              {String(countdown.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm text-white/80 mt-1">
              Minutos
            </span>
          </div>
          <div className="flex flex-col items-center bg-primary/20 rounded-lg p-4">
            <span className="text-3xl md:text-5xl font-bold text-primary">
              {String(countdown.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm text-white/80 mt-1">
              Segundos
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
