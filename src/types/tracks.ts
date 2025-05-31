export interface MusicData {
  displayName: string;
  artistName: string;
  trackName: string;
  albumCover?: string;
  previewUrl?: string;
  videoId?: string;
  duration?: string;
  embedUrl?: string;
  youtubeUrl?: string;
}

export interface YouTubeTrackRequest {
  query: string;
}
export interface YouTubeTrack {
  id?: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: string;
  embedUrl: string;
  watchUrl: string;
}

export interface YouTubeTrackResponse {
  ok: boolean;
  error?: string;
  results?: YouTubeTrack[];
}
