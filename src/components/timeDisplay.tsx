interface TimeDisplayProps {
  seconds: number;
  className?: string;
}

export function TimeDisplay({ seconds, className = "" }: TimeDisplayProps) {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <span className={className}>
      {formatTime(seconds)}
    </span>
  );
} 