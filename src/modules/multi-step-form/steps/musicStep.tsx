// Steps/About.js

import { useForm } from "react-hook-form";
import { useCreateState } from "@/context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Play, Pause } from "lucide-react";
import YouTubeSearchInput from "@/components/youtubeSearchInput";
import { useEffect, useState } from "react";
import { MusicData, YouTubeTrack } from "@/models";
import Image from "next/image";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { Slider } from "@/components/ui/slider";
import { TimeDisplay } from "@/components/timeDisplay";

interface MusicStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  music: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(90, "Máximo de 90 caracteres"),
});

export default function MusicStep({ handleSetStep }: MusicStepProps) {
  const [state, setState] = useCreateState();
  const [selectedTrackData, setSelectedTrackData] = useState<MusicData | null>(null);
  const { 
    previewTrackId, 
    playerContainerRef, 
    playTrack, 
    togglePlay, 
    duration, 
    handleSeek, 
    handleSeekStart, 
    handleSeekEnd,
    handleSliderValueChange,
    visualProgress
  } = useYouTubePlayer();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      music: state.checkoutForm?.music?.displayName || ""
    },
  });

  // Tenta recriar o estado do track se a música já foi selecionada anteriormente
  useEffect(() => {
    if (state.checkoutForm?.music && typeof state.checkoutForm.music === 'object') {
      setSelectedTrackData(state.checkoutForm.music as MusicData);
    }
  }, [state.checkoutForm?.music]);

  // Função para extrair dados da música a partir do evento onChange
  const handleMusicSelected = (value: string, trackData?: YouTubeTrack) => {
    // Atualiza o valor no formulário
    form.setValue("music", value);
    
    // Se recebeu dados completos da track
    if (trackData) {
      const musicData: MusicData = {
        displayName: value,
        artistName: trackData.channelTitle,
        trackName: trackData.title,
        albumCover: trackData.thumbnailUrl,
        videoId: trackData.id,
        duration: trackData.duration,
        embedUrl: trackData.embedUrl,
        youtubeUrl: trackData.watchUrl
      };
      
      setSelectedTrackData(musicData);
      
      // Parar qualquer reprodução quando seleciona uma nova música
      if (previewTrackId) {
        togglePlay(trackData);
      }
    } else {
      setSelectedTrackData(null);
    }
  };

  const handleTogglePlay = () => {
    if (!selectedTrackData?.videoId || !selectedTrackData.embedUrl) return;
    
    const track: YouTubeTrack = {
      id: selectedTrackData.videoId,
      title: selectedTrackData.trackName || '',
      channelTitle: selectedTrackData.artistName || '',
      thumbnailUrl: selectedTrackData.albumCover || '',
      duration: selectedTrackData.duration || '',
      embedUrl: selectedTrackData.embedUrl,
      watchUrl: selectedTrackData.youtubeUrl || ''
    };
    
    togglePlay(track);
  };

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: { 
        ...state.checkoutForm, 
        music: selectedTrackData || { 
          displayName: data.music,
          artistName: "",
          trackName: data.music
        } 
      },
    });
    handleSetStep(state.activeStep);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveData)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(saveData)();
          }
        }}
      >
        <div ref={playerContainerRef} className="hidden"></div>
        
        <FormField
          name="music"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <YouTubeSearchInput 
                  autoFocus 
                  autoComplete={"off"} 
                  {...field} 
                  onChange={handleMusicSelected}
                  onPlayTrack={playTrack}
                  currentlyPlayingId={previewTrackId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Preview da música selecionada */}
        {selectedTrackData && selectedTrackData.albumCover && (
          <div className="mt-6 bg-muted/30 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center">
              <div 
                className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative cursor-pointer group"
                onClick={handleTogglePlay}
              >
                <Image 
                  src={selectedTrackData.albumCover} 
                  alt={selectedTrackData.trackName}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-full h-full object-cover"  
                />
                {selectedTrackData.duration && (
                  <div className="absolute bottom-0 right-0 text-[10px] bg-black/70 text-white px-1 py-0.5 rounded-tl">
                    {selectedTrackData.duration}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {previewTrackId ? (
                    <Pause className="text-white" size={24} />
                  ) : (
                    <Play className="text-white" size={24} />
                  )}
                </div>
              </div>
              <div className="ml-4 flex-grow">
                <div className="font-medium">{selectedTrackData.trackName}</div>
                <div className="text-sm text-muted-foreground">{selectedTrackData.artistName}</div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-xs text-primary hover:text-primary/80 hover:bg-transparent"
                  onClick={handleTogglePlay}
                >
                  {previewTrackId ? (
                    <>
                      <Pause size={12} />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play size={12} />
                      Tocar
                    </>
                  )}
                </Button>
              </div>
            </div>

            {previewTrackId && duration > 0 && (
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
                <div className="flex justify-between text-xs text-muted-foreground">
                  <TimeDisplay seconds={visualProgress} />
                  <TimeDisplay seconds={duration} />
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="w-full mt-6 flex items-center gap-4">
          <Button
            type="button"
            onClick={() => handleSetStep()}
            className="flex-grow"
            disabled={state.activeStep === 1}
          >
            <ChevronRightIcon className="inline rotate-180" />
            Etapa anterior
          </Button>
          <Button type="submit" className="flex-grow">
            Próxima etapa
            <ChevronRightIcon className="inline" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
