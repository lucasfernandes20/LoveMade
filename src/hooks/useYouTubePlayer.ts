import { useEffect, useRef, useState } from 'react';
import { YouTubeTrack } from '@/models';

interface UseYouTubePlayerReturn {
  previewTrackId: string | null;
  playerContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  playTrack: (track: YouTubeTrack, shouldPlay: boolean) => void;
  togglePlay: (track: YouTubeTrack) => void;
  progress: number;
  duration: number;
  seeking: boolean;
  handleSeek: (value: number) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
  handleSliderValueChange: (value: number) => void;
  visualProgress: number;
}

export function useYouTubePlayer(): UseYouTubePlayerReturn {
  const [previewTrackId, setPreviewTrackId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [visualProgress, setVisualProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Mantém o progresso visual sincronizado com o progresso real quando não estiver arrastando
  useEffect(() => {
    if (!seeking) {
      setVisualProgress(progress);
    }
  }, [progress, seeking]);

  useEffect(() => {
    // Carregar a API do YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const startProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      if (playerRef.current && !seeking) {
        const currentTime = playerRef.current.getCurrentTime() || 0;
        const videoDuration = playerRef.current.getDuration() || 0;
        setProgress(currentTime);
        setDuration(videoDuration);
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    setProgress(0);
    setVisualProgress(0);
    setDuration(0);
  };

  const handleSeekStart = () => {
    setSeeking(true);
  };

  const handleSeekEnd = () => {
    setSeeking(false);
  };

  // Esta função será chamada quando o usuário soltar o slider (onValueCommit)
  const handleSeek = (value: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(value, true);
      setProgress(value);
    }
  };

  // Esta função atualiza apenas o valor visual enquanto arrasta (onValueChange)
  const handleSliderValueChange = (value: number) => {
    setVisualProgress(value);
  };

  const startTrack = (track: YouTubeTrack) => {
    if (playerContainerRef.current && track.embedUrl && track.id) {
      const videoId = track.id;
      
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new YT.Player(playerContainerRef.current, {
        videoId,
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.playVideo();
            startProgressTracking();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.ENDED) {
              stopCurrentTrack();
            }
          }
        }
      });

      setPreviewTrackId(videoId);
    }
  };

  const stopCurrentTrack = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    stopProgressTracking();
    setPreviewTrackId(null);
  };

  const playTrack = (track: YouTubeTrack, shouldPlay: boolean) => {
    if (previewTrackId) {
      stopCurrentTrack();
    }

    if (shouldPlay) {
      startTrack(track);
    }
  };

  const togglePlay = (track: YouTubeTrack) => {
    if (!track.embedUrl) return;

    if (previewTrackId === track.id) {
      stopCurrentTrack();
    } else {
      if (previewTrackId) {
        stopCurrentTrack();
      }
      startTrack(track);
    }
  };

  return {
    previewTrackId,
    playerContainerRef,
    playTrack,
    togglePlay,
    progress,
    duration,
    seeking,
    handleSeek,
    handleSeekStart,
    handleSeekEnd,
    handleSliderValueChange,
    visualProgress
  };
} 