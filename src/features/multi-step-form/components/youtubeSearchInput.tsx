import { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, Music, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { YouTubeTrackResponse, YouTubeTrack } from "@/types";
interface YouTubeSearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string, trackData?: YouTubeTrack) => void;
  value?: string;
  onPlayTrack: (track: YouTubeTrack, isPlaying: boolean) => void;
  currentlyPlayingId?: string | null;
}

const YouTubeSearchInput = forwardRef<
  HTMLInputElement,
  YouTubeSearchInputProps
>(
  (
    { className, onChange, value, onPlayTrack, currentlyPlayingId, ...props },
    ref
  ) => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, isDebouncing] = useDebounce(search, 1000);
    const [results, setResults] = useState<YouTubeTrack[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<YouTubeTrack | null>(
      null
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Combinar ref do input para ter controle interno
    const handleInputRef = (inputElement: HTMLInputElement | null) => {
      // Salvar na nossa ref interna
      inputRef.current = inputElement;

      // Encaminhar para ref externo
      if (typeof ref === "function") {
        ref(inputElement);
      } else if (ref) {
        ref.current = inputElement;
      }
    };

    // Buscar músicas quando o input mudar
    useEffect(() => {
      const fetchMusic = async () => {
        if (debouncedSearch.length < 2) {
          setResults([]);
          return;
        }

        setLoading(true);
        try {
          const response = await fetch(
            `/api/youtube-search?q=${encodeURIComponent(debouncedSearch)}`
          );
          const data: YouTubeTrackResponse = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Erro ao buscar músicas");
          }

          setResults(data.results || []);
        } catch (error) {
          console.error("Erro ao buscar músicas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMusic();
    }, [debouncedSearch]);

    useEffect(() => {
      if (value) {
        setSearch(value);

        const savedTrack = results.find(
          (track) =>
            track.title === value ||
            `${track.title} - ${track.channelTitle}` === value
        );

        if (savedTrack) {
          setSelectedTrack(savedTrack);
        }
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

    const playPreview = (track: YouTubeTrack) => {
      const isCurrentlyPlaying = currentlyPlayingId === track.id;
      onPlayTrack(track, !isCurrentlyPlaying);
    };

    const selectTrack = (track: YouTubeTrack) => {
      setSelectedTrack(track);
      const displayValue = track.title;
      setSearch(displayValue);
      onChange(displayValue, track);
      setOpen(false);
    };

    const handlePopoverChange = (isOpen: boolean) => {
      setOpen(isOpen);

      if (!isOpen) {
        if (selectedTrack && currentlyPlayingId !== selectedTrack.id) {
          onPlayTrack(selectedTrack, false);
        }
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
                placeholder="Procure por uma música no YouTube"
                className={cn("pr-10", className)}
                value={search}
                onChange={handleInputChange}
                onClick={() => search.length > 0 && setOpen(true)}
                {...props}
              />
              {loading ? (
                <Loader2
                  className="animate-spin absolute right-3 text-gray-400"
                  size={20}
                />
              ) : (
                <Music
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
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
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((track) => (
                  <div
                    key={track.id}
                    className={cn(
                      "flex items-center p-3 pr-9 hover:bg-foreground/10 cursor-pointer border-b last:border-b-0 relative",
                      selectedTrack?.id === track.id && "bg-foreground/20"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute right-3 top-1/2 z-10 -translate-y-1/2 opacity-0",
                        currentlyPlayingId === track.id && "opacity-100"
                      )}
                    >
                      <Music
                        size={20}
                        className="text-foreground/40 animate-pulse"
                      />
                    </div>
                    <div className="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-md">
                      <Image
                        src={track.thumbnailUrl}
                        alt={track.title || "Video thumbnail"}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 text-[8px] bg-black/70 text-white px-1 py-0.5 rounded-tl">
                        {track.duration}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute inset-0 !bg-black/70 opacity-0 hover:opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
                          currentlyPlayingId === track.id && "opacity-100"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          playPreview(track);
                        }}
                      >
                        {currentlyPlayingId === track.id ? (
                          <Pause size={20} className="text-white" />
                        ) : (
                          <Play size={20} className="text-white" />
                        )}
                      </Button>
                    </div>
                    <div
                      className="ml-3 flex-grow"
                      onClick={() => selectTrack(track)}
                    >
                      <div className="font-medium text-sm line-clamp-1">
                        {track.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {track.channelTitle}
                      </div>
                    </div>
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

YouTubeSearchInput.displayName = "YouTubeSearchInput";

export default YouTubeSearchInput;
