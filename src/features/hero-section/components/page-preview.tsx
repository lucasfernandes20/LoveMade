import { motion, AnimatePresence } from "framer-motion";
import { Ellipsis, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PagePreview() {
  const photos = [
    "/images/couple-preview/4.jpg",
    "/images/couple-preview/1.jpg",
    "/images/couple-preview/2.jpg",
    "/images/couple-preview/3.jpg",
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [countdown, setCountdown] = useState({
    days: 120,
    hours: 14,
    minutes: 30,
    seconds: 22,
  });

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => clearInterval(photoInterval);
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <motion.div
      className="lg:col-span-5 px-4 md:px-8 lg:px-0 max-w-[500px] mx-auto lg:mx-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-xl"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="relative bg-black/30 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/10 shadow-xl"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <span className="text-xs text-white">🤍</span>
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground/90">
                Nossa História
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ellipsis className="text-white/20 w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              "/images/couple-preview/1.jpg",
              "/images/couple-preview/2.jpg",
              "/images/couple-preview/3.jpg",
            ].map((photoSrc, index) => (
              <motion.div
                key={photoSrc}
                className="aspect-square rounded-lg overflow-hidden border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="relative bg-gradient-to-tr from-primary/20 to-secondary/20 h-full">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 + index * 0.3, duration: 0.5 }}
                  >
                    <Image
                      src={photoSrc}
                      alt="Foto do casal"
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="aspect-video w-full rounded-lg overflow-hidden mb-3 md:mb-5 border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="bg-gradient-to-tr from-secondary/30 to-primary/30 h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhotoIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={photos[currentPhotoIndex]}
                    alt="Foto do casal"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-[8px] md:text-xs px-2 py-1 rounded-md border border-white/10">
                Nosso lugar especial
              </div>

              <div className="absolute bottom-2 left-2 flex gap-1.5">
                {photos.map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-white/50"
                    animate={{
                      scale: currentPhotoIndex === index ? 1.2 : 1,
                      backgroundColor:
                        currentPhotoIndex === index
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(255, 255, 255, 0.5)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-3 md:mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs md:text-sm font-medium text-white/80">
                  Nosso aniversário
                </h3>
                <p className="text-[8px] md:text-xs text-white/60">
                  15 de outubro
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

          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <motion.div
                className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-[8px] text-white">▶</span>
              </motion.div>
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-medium">Nossa Música</h4>
              <p className="text-[8px] md:text-[10px] text-white/60">
                Perfect - Ed Sheeran
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[8px] text-white/60">1:24</span>
              <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: "30%" }}
                />
              </div>
              <span className="text-[8px] text-white/60">3:42</span>
            </div>
          </motion.div>

          <div className="mt-3 md:mt-6 flex flex-col items-center">
            <p className="text-[10px] text-white/50 mb-1">Mais memórias</p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={18} className="text-white/50" />
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 0 rgba(236, 72, 153, 0)",
                "0 0 15px rgba(236, 72, 153, 0.3)",
                "0 0 0 rgba(236, 72, 153, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
