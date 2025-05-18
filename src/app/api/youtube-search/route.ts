import { YouTubeTrackResponse } from "@/types";
import { NextResponse } from "next/server";
import YouTube from "youtube-sr";

// Esta função formata a duração em segundos para mm:ss
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export async function GET(
  request: Request
): Promise<NextResponse<YouTubeTrackResponse>> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { ok: false, error: "Query is required" },
      { status: 400 }
    );
  }

  try {
    const searchResults = await YouTube.search(`${query} música`, {
      limit: 10,
      type: "video",
    });

    const results = searchResults.map((video) => ({
      id: video.id,
      title: video.title || "Sem título",
      channelTitle: video.channel?.name || "Sem nome do canal",
      thumbnailUrl:
        video.thumbnail?.url ||
        `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      duration: video.duration
        ? formatDuration(video.duration / 1000)
        : "00:00",
      embedUrl: `https://www.youtube.com/embed/${video.id}?autoplay=1`,
      watchUrl: `https://www.youtube.com/watch?v=${video.id}`,
    }));

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error("Erro ao processar solicitação do YouTube:", error);
    return NextResponse.json(
      { error: "Falha ao buscar vídeos do YouTube", ok: false },
      { status: 500 }
    );
  }
}
