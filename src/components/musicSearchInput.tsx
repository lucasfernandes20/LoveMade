import { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { searchTracks, SpotifyTrack } from "@/services/spotify";
import { Loader2, Music, Play, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

interface MusicSearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string, trackData?: SpotifyTrack) => void;
  value?: string;
}

const MusicSearchInput = forwardRef<HTMLInputElement, MusicSearchInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, isDebouncing] = useDebounce(search, 1000);
    const [results, setResults] = useState<SpotifyTrack[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
    const [playing, setPlaying] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Combinar ref do input para ter controle interno
    const handleInputRef = (inputElement: HTMLInputElement | null) => {
      // Salvar na nossa ref interna
      inputRef.current = inputElement;
      
      // Encaminhar para ref externo
      if (typeof ref === 'function') {
        ref(inputElement);
      } else if (ref) {
        ref.current = inputElement;
      }
    };

    // Criar elemento de áudio para preview das músicas
    useEffect(() => {
      audioRef.current = new Audio();
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }, []);

    // Buscar músicas quando o input mudar
    useEffect(() => {
      const fetchMusic = async () => {
        if (debouncedSearch.length < 2) {
          setResults([]);
          return;
        }

        setLoading(true);
        try {
          const tracks = await searchTracks(debouncedSearch);
          setResults(tracks);
        } catch (error) {
          console.error("Erro ao buscar músicas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMusic();
    }, [debouncedSearch]);

    // Inicializar valor do input se for passado como prop
    useEffect(() => {
      if (value) {
        // Tentar encontrar a música salva nos resultados
        const savedTrack = results.find(track => 
          `${track.name} - ${track.artists[0].name}` === value
        );
        
        if (savedTrack) {
          setSelectedTrack(savedTrack);
        }
        
        setSearch(value);
      }
    }, [value, results]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearch(newValue);
      if (!newValue) {
        setSelectedTrack(null);
        onChange?.("", undefined);
      } else {
        onChange?.(newValue, undefined);
      }
      setOpen(newValue.length > 0);
    };

    const playPreview = (track: SpotifyTrack) => {
      if (!track.preview_url) return;
      
      if (audioRef.current) {
        // Se estiver tocando a mesma música, pausar
        if (playing === track.id) {
          audioRef.current.pause();
          setPlaying(null);
          return;
        }
        
        // Pausar a música atual antes de tocar outra
        audioRef.current.pause();
        
        // Tocar nova música
        audioRef.current.src = track.preview_url;
        audioRef.current.play().catch(e => console.error("Erro ao tocar preview:", e));
        setPlaying(track.id);
      }
    };

    const selectTrack = (track: SpotifyTrack) => {
      setSelectedTrack(track);
      const displayValue = `${track.name} - ${track.artists[0].name}`;
      setSearch(displayValue);
      onChange?.(displayValue, track); // Passa os dados completos da track
      setOpen(false);
      
      // Pausar qualquer áudio que esteja tocando
      if (audioRef.current) {
        audioRef.current.pause();
        setPlaying(null);
      }
      
    };
    
    // Quando o estado do popover mudar
    const handlePopoverChange = (isOpen: boolean) => {
      setOpen(isOpen);
      
      // Se estiver fechando o popover, focar de volta no input
      if (!isOpen) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    };

    return (
      <div className="flex flex-col w-full relative">
        <Popover open={open} onOpenChange={handlePopoverChange}>
          <PopoverTrigger asChild>
            <div className="flex items-center relative">
              <Input
                ref={handleInputRef}
                type="text"
                placeholder="Procure por uma música"
                className={cn("pr-10", className)}
                value={search}
                onChange={handleInputChange}
                onClick={() => search.length > 0 && setOpen(true)}
                {...props}
              />
              {loading ? (
                <Loader2 className="animate-spin absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              ) : (
                <Music className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[calc(100vw-2rem)] max-w-md p-0 overflow-hidden" 
            align="start"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin text-gray-500" size={24} />
                <span className="ml-2">Buscando músicas...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {results.map((track) => (
                  <div
                    key={track.id}
                    className={cn(
                      "flex items-center p-3 hover:bg-foreground/10 cursor-pointer border-b last:border-b-0",
                      selectedTrack?.id === track.id && "bg-foreground/20"
                    )}
                  >
                    <div className="w-10 h-10 flex-shrink-0 relative overflow-hidden rounded-md">
                      {track.album.images[0]?.url ? (
                        <Image
                          src={track.album.images[0]?.url}
                          alt={track.album.name || "Album cover"}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                          <Music size={20} className="text-gray-500" />
                        </div>
                      )}
                      {track.preview_url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            playPreview(track);
                          }}
                        >
                          <Play
                            size={20}
                            className={cn(
                              "text-white",
                              playing === track.id && "hidden"
                            )}
                          />
                          <Loader2
                            size={20}
                            className={cn(
                              "animate-spin text-white",
                              playing !== track.id && "hidden"
                            )}
                          />
                        </Button>
                      )}
                    </div>
                    <div
                      className="ml-3 flex-grow"
                      onClick={() => selectTrack(track)}
                    >
                      <div className="font-medium text-sm">{track.name}</div>
                      <div className="text-xs text-gray-500">
                        {track.artists.map((a) => a.name).join(", ")}
                      </div>
                    </div>
                    {selectedTrack?.id === track.id && (
                      <Check size={18} className="text-green-500 mr-2" />
                    )}
                  </div>
                ))}
              </div>
            ) : search.length > 0 && !isDebouncing ? (
              <div className="p-4 text-center text-gray-500">
                Nenhuma música encontrada para &ldquo;{search}&rdquo;
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Digite o nome de uma música ou artista
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

MusicSearchInput.displayName = "MusicSearchInput";

export default MusicSearchInput;
