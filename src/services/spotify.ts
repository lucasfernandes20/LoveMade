// Spotify API Service

// Você precisará criar um aplicativo no Spotify Developer Dashboard para obter estas credenciais
// https://developer.spotify.com/dashboard/
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpiration: number = 0;

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

/**
 * Get a Spotify access token
 */
async function getAccessToken(): Promise<string> {
  // If we already have a valid token, return it
  if (accessToken && Date.now() < tokenExpiration) {
    return accessToken;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Falha na autenticação do Spotify: ${data.error}`);
    }
    
    accessToken = data.access_token;
    tokenExpiration = Date.now() + (data.expires_in * 1000);
    
    return data.access_token;
  } catch (error) {
    console.error("Erro ao obter token do Spotify:", error);
    throw error;
  }
}

/**
 * Search for tracks in Spotify
 */
export async function searchTracks(query: string): Promise<SpotifyTrack[]> {
  if (!query || query.length < 2) return [];
  
  try {
    const token = await getAccessToken();
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10&market=BR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: SpotifySearchResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(`Erro na busca do Spotify: ${data}`);
    }
    
    
    // return data.tracks.items;
    const tracksWithPreviews = await Promise.all(
      data.tracks.items.map(async (track) => {
        const previewUrl = await getPreviewUrlByTrackId(track.id);
        return { ...track, preview_url: previewUrl };
      })
    );
    return tracksWithPreviews;
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    return [];
  }
}

async function getPreviewUrlByTrackId(trackId: string): Promise<string> {
  const token = await getAccessToken();
  const response = await fetch(`https://developer.spotify.com/console/get-track/?id=${trackId}&market=BR`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Erro ao obter track do Spotify: ${data}`);
  }

  return data.preview_url;
}

export type { SpotifyTrack }; 