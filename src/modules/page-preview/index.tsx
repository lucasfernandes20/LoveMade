"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Ellipsis, ChevronDown, Play, Pause } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCreateState } from "@/context";
import { cn } from "@/lib/utils";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { TimeDisplay } from "@/components/timeDisplay";
import { Slider } from "@/components/ui/slider";
import { YouTubeTrack } from "@/models";

const defaultPhotos = [
  '/images/couple-preview/4.jpg',
  '/images/couple-preview/1.jpg',
  '/images/couple-preview/2.jpg',
  '/images/couple-preview/3.jpg'
];

export default function PagePreview() {
  const [state] = useCreateState();

  const [photos, setPhotos] = useState<string[]>(defaultPhotos);
  const { 
    previewTrackId, 
    playerContainerRef, 
    togglePlay, 
    duration, 
    handleSeek, 
    handleSeekStart, 
    handleSeekEnd,
    handleSliderValueChange,
    visualProgress
  } = useYouTubePlayer();
  
  const { checkoutForm, formData } = state;
  
  // Usar dados do formulário ou fallback para valores padrão
  const title = formData?.title || checkoutForm?.title || "Nossa História";
  const message = formData?.message || checkoutForm?.message || "Sempre me disseram que o melhor lugar do mundo é aquele onde nos sentimos em casa. E eu encontrei esse lugar em você. Ao seu lado, tudo faz sentido, e cada dia é uma nova aventura. Quero continuar escrevendo essa história ao seu lado. Você aceita ser minha pessoa para sempre?";
  const label = formData?.photos?.label || checkoutForm?.photos?.label || "Nosso lugar especial";
  const musicData = formData?.music || checkoutForm?.music;
  const musicUrl = musicData?.displayName || "Perfect - Ed Sheeran";
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  
  useEffect(() => {
    if (checkoutForm?.photos?.files) {
      setPhotos(checkoutForm.photos.files.map(file => URL.createObjectURL(file)));
    }
  }, [checkoutForm?.photos]);
  
  // Estado para contagem regressiva
  const [countdown, setCountdown] = useState({
    days: 120,
    hours: 14,
    minutes: 30,
    seconds: 22
  });
  
  // Atualizar contagem regressiva se data comemorativa estiver disponível
  useEffect(() => {
    if (formData?.commemorativeDate?.date) {
      const targetDate = new Date(formData.commemorativeDate.date);
      const updateCountdown = () => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
        
        if (difference <= 0) {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    } else {
      // Contagem regressiva padrão se não houver data comemorativa
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev.seconds === 0) {
            if (prev.minutes === 0) {
              if (prev.hours === 0) {
                return {
                  ...prev,
                  days: Math.max(0, prev.days - 1),
                  hours: 23,
                  minutes: 59,
                  seconds: 59
                };
              }
              return {
                ...prev,
                hours: prev.hours - 1,
                minutes: 59,
                seconds: 59
              };
            }
            return {
              ...prev,
              minutes: prev.minutes - 1,
              seconds: 59
            };
          }
          
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        });
      }, 1000);
      
      return () => clearInterval(countdownInterval);
    }
  }, [formData?.commemorativeDate?.date]);
  
  // Rotacionar fotos a cada 3 segundos
  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    
    return () => clearInterval(photoInterval);
  }, [photos.length]);
  
  // Nome da data comemorativa
  const commemorativeDate = formData?.commemorativeDate?.name || "Nosso aniversário";
  const commemorativeDateString = formData?.commemorativeDate?.date 
    ? new Date(formData.commemorativeDate.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
    : "15 de outubro";
  
  // Função para controlar a reprodução de música
  const handleToggleMusic = () => {
    if (!musicData || typeof musicData !== 'object') return;
    
    // Verificar se temos os dados necessários
    if (!musicData.embedUrl || !musicData.videoId) {
      console.warn('Dados de música incompletos para reprodução');
      return;
    }
    
    // Agora temos certeza que embedUrl e videoId existem
    const track = {
      id: musicData.videoId,
      title: musicData.trackName || '',
      channelTitle: musicData.artistName || '',
      thumbnailUrl: musicData.albumCover || '',
      duration: musicData.duration || '',
      embedUrl: musicData.embedUrl,
      watchUrl: musicData.youtubeUrl || ''
    } as YouTubeTrack; // Usar type assertion para garantir compatibilidade
    
    togglePlay(track);
  };
  
  return (
    <motion.div
      className={`px-4 md:px-8 lg:px-0 w-full h-full`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative h-full">
        <motion.div
          className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-xl"
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <div 
          className="relative bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl aspect-[9/16] overflow-hidden"
        >
          <div className="relative w-full h-full overflow-y-auto p-4 md:p-6">
          {/* Container oculto para o player */}
          <div ref={playerContainerRef} className="hidden"></div>

          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <span className="text-xs text-white">🤍</span>
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground/90">{title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ellipsis className="text-white/20 w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            {photos.slice(0, 3).map((photoSrc, index) => (
              <motion.div 
                key={photoSrc}
                className="aspect-square rounded-lg overflow-hidden border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
              >
                <div className="relative bg-gradient-to-tr from-primary/20 to-secondary/20 h-full">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.3), duration: 0.5 }}
                  >
                    <Image src={photoSrc} alt="Foto do casal" fill className="object-cover" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="aspect-video w-full rounded-lg overflow-hidden mb-3 md:mb-5 border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
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
                {label}
              </div>
              
              <div className="absolute bottom-2 left-2 flex gap-1.5">
                {photos.map((_, index) => (
                  <motion.div 
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-white/50"
                    animate={{ 
                      scale: currentPhotoIndex === index ? 1.2 : 1,
                      backgroundColor: currentPhotoIndex === index ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mensagem */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10 mb-3 md:mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className={cn("text-xs md:text-sm text-white/90 line-clamp-3", showMore ? "line-clamp-none" : "")}>{message}</p>
            <div className="flex flex-col items-center justify-center mt-2 cursor-pointer" onClick={() => setShowMore(!showMore)}>
              <p className="text-xs md:text-sm text-primary/90">ver {showMore ? "menos" : "mais"}</p>
              <ChevronDown size={12} className={cn("text-primary/90", showMore ? "rotate-180" : "")} />
            </div>
          </motion.div>
          
          {/* Data comemorativa */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-3 md:mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs md:text-sm font-medium text-white/80">{commemorativeDate}</h3>
                <p className="text-[8px] md:text-xs text-white/60">{commemorativeDateString}</p>
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
                      {String(countdown.hours).padStart(2, '0')}
                    </motion.span>
                    <span className="text-[6px] md:text-[8px] text-white/50">horas</span>
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
                      {String(countdown.minutes).padStart(2, '0')}
                    </motion.span>
                    <span className="text-[6px] md:text-[8px] text-white/50">min</span>
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
                      {String(countdown.seconds).padStart(2, '0')}
                    </motion.span>
                    <span className="text-[6px] md:text-[8px] text-white/50">seg</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Música */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer"
                onClick={handleToggleMusic}
              >
                <motion.div 
                  className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                  animate={{ scale: previewTrackId ? [1, 0.8, 1] : 1 }}
                  transition={{ duration: 1, repeat: previewTrackId ? Infinity : 0 }}
                >
                  {previewTrackId ? (
                    <Pause size={8} className="text-white" />
                  ) : (
                    <Play size={8} className="text-white" />
                  )}
                </motion.div>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-medium">Nossa Música</h4>
                <p className="text-[8px] md:text-[10px] text-white/60 truncate max-w-[300px]">{musicUrl}</p>
              </div>
            </div>
            

              <div className="flex flex-col gap-1 px-1">
                <Slider
                  value={[visualProgress]}
                  max={duration}
                  step={1}
                  onValueChange={(values: number[]) => handleSliderValueChange(values[0])}
                  onValueCommit={(values: number[]) => handleSeek(values[0])}
                  onPointerDown={handleSeekStart}
                  onPointerUp={handleSeekEnd}
                  className="w-full"
                />
                <div className="flex justify-between text-[8px] text-white/60">
                  <TimeDisplay seconds={visualProgress} className="text-[8px]" />
                  <TimeDisplay seconds={duration} className="text-[8px]" />
                </div>
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
          
          </div>
        </div>
        <motion.div 
          className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none"
          animate={{ 
            boxShadow: ['0 0 0 rgba(236, 72, 153, 0)', '0 0 20px rgba(236, 72, 153, 0.4)', '0 0 0 rgba(236, 72, 153, 0)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
} 