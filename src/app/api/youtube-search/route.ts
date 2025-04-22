import { NextResponse } from 'next/server';

// Esta função formata a duração em segundos para mm:ss
function formatDuration(duration: string): string {
  // Duração do YouTube geralmente está no formato ISO 8601: PT1H2M3S
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Extrair horas, minutos e segundos
  const hoursMatch = duration.match(/(\d+)H/);
  const minutesMatch = duration.match(/(\d+)M/);
  const secondsMatch = duration.match(/(\d+)S/);

  if (hoursMatch) hours = parseInt(hoursMatch[1]);
  if (minutesMatch) minutes = parseInt(minutesMatch[1]);
  if (secondsMatch) seconds = parseInt(secondsMatch[1]);

  // Adicionar horas aos minutos se houver
  if (hours > 0) {
    minutes += hours * 60;
  }

  // Formatar como mm:ss
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Interfaces para tipar os objetos
interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
  };
}

// Dados de músicas de casamento populares para mock
const mockWeddingSongs = [
  {
    id: "0yW5XUGJsOU",
    title: "Perfect - Ed Sheeran",
    channelTitle: "Ed Sheeran",
    thumbnailUrl: "https://i.ytimg.com/vi/0yW5XUGJsOU/hqdefault.jpg",
    duration: "04:23",
    embedUrl: "https://www.youtube.com/embed/0yW5XUGJsOU?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=0yW5XUGJsOU"
  },
  {
    id: "4uTNVumfm84",
    title: "All of Me - John Legend",
    channelTitle: "John Legend",
    thumbnailUrl: "https://i.ytimg.com/vi/4uTNVumfm84/hqdefault.jpg",
    duration: "04:30",
    embedUrl: "https://www.youtube.com/embed/4uTNVumfm84?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=4uTNVumfm84"
  },
  {
    id: "450p7goxZqg",
    title: "A Thousand Years - Christina Perri",
    channelTitle: "Christina Perri",
    thumbnailUrl: "https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg",
    duration: "04:45",
    embedUrl: "https://www.youtube.com/embed/450p7goxZqg?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=450p7goxZqg"
  },
  {
    id: "2Vv-BfVoq4g",
    title: "Thinking Out Loud - Ed Sheeran",
    channelTitle: "Ed Sheeran",
    thumbnailUrl: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    duration: "04:56",
    embedUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g"
  },
  {
    id: "fV4DiAyExN0",
    title: "Can't Help Falling In Love - Elvis Presley",
    channelTitle: "Elvis Presley",
    thumbnailUrl: "https://i.ytimg.com/vi/fV4DiAyExN0/hqdefault.jpg",
    duration: "03:01",
    embedUrl: "https://www.youtube.com/embed/fV4DiAyExN0?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=fV4DiAyExN0"
  },
  {
    id: "rtOvBOTyX00",
    title: "At Last - Etta James",
    channelTitle: "Etta James",
    thumbnailUrl: "https://i.ytimg.com/vi/rtOvBOTyX00/hqdefault.jpg",
    duration: "03:02",
    embedUrl: "https://www.youtube.com/embed/rtOvBOTyX00?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=rtOvBOTyX00"
  },
  {
    id: "UXxXIVXUvvE",
    title: "Marry You - Bruno Mars",
    channelTitle: "Bruno Mars",
    thumbnailUrl: "https://i.ytimg.com/vi/UXxXIVXUvvE/hqdefault.jpg",
    duration: "03:50",
    embedUrl: "https://www.youtube.com/embed/UXxXIVXUvvE?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=UXxXIVXUvvE"
  },
  {
    id: "3JWTaaS7LdU",
    title: "I Will Always Love You - Whitney Houston",
    channelTitle: "Whitney Houston",
    thumbnailUrl: "https://i.ytimg.com/vi/3JWTaaS7LdU/hqdefault.jpg",
    duration: "04:51",
    embedUrl: "https://www.youtube.com/embed/3JWTaaS7LdU?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=3JWTaaS7LdU"
  },
  {
    id: "DXCUgjzOa1E",
    title: "Spend My Life With You - Eric Benet ft. Tamia",
    channelTitle: "Eric Benet",
    thumbnailUrl: "https://i.ytimg.com/vi/DXCUgjzOa1E/hqdefault.jpg",
    duration: "04:38",
    embedUrl: "https://www.youtube.com/embed/DXCUgjzOa1E?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=DXCUgjzOa1E"
  },
  {
    id: "QgaTQ5-XfMM",
    title: "Make You Feel My Love - Adele",
    channelTitle: "Adele",
    thumbnailUrl: "https://i.ytimg.com/vi/QgaTQ5-XfMM/hqdefault.jpg",
    duration: "03:32",
    embedUrl: "https://www.youtube.com/embed/QgaTQ5-XfMM?autoplay=1",
    watchUrl: "https://www.youtube.com/watch?v=QgaTQ5-XfMM"
  }
];

// Função para filtrar os dados de mock com base na consulta
function filterMockResults(query: string) {
  const lowerQuery = query.toLowerCase();
  return mockWeddingSongs.filter(song => 
    song.title.toLowerCase().includes(lowerQuery) || 
    song.channelTitle.toLowerCase().includes(lowerQuery)
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Parâmetro de busca "q" é obrigatório' },
      { status: 400 }
    );
  }

  // Usar a API de dados do YouTube para buscar vídeos
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
  
  // Se não houver chave de API, usar os dados de mock
  if (!YOUTUBE_API_KEY) {
    console.log('Usando dados de mock para busca do YouTube. Configure YOUTUBE_API_KEY para usar a API real.');
    const mockResults = filterMockResults(query);
    return NextResponse.json({ results: mockResults });
  }

  try {
    // Buscar vídeos relacionados à consulta
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}%20music&type=video&key=${YOUTUBE_API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      throw new Error(`Erro ao buscar vídeos: ${JSON.stringify(searchData)}`);
    }

    // Extrair IDs dos vídeos para buscar informações adicionais
    const videoIds = searchData.items
      .map((item: YouTubeSearchItem) => item.id.videoId)
      .join(',');

    // Buscar informações detalhadas dos vídeos
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    if (!videosResponse.ok) {
      throw new Error(`Erro ao buscar detalhes dos vídeos: ${JSON.stringify(videosData)}`);
    }

    // Mapear os resultados para o formato desejado
    const results = videosData.items.map((video: YouTubeVideo) => {
      return {
        id: video.id,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        duration: formatDuration(video.contentDetails.duration),
        embedUrl: `https://www.youtube.com/embed/${video.id}?autoplay=1`,
        watchUrl: `https://www.youtube.com/watch?v=${video.id}`
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Erro ao processar solicitação do YouTube:', error);
    
    // Em caso de erro, retornar os dados de mock como fallback
    console.log('Usando dados de mock como fallback após erro da API.');
    const mockResults = filterMockResults(query);
    return NextResponse.json({ results: mockResults });
  }
} 