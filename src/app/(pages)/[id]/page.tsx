import { getPageBySlug } from "@/services/supabase/retrieve";
import { Image } from "@/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BuildedPage({ params }: PageProps) {
  const slug = params.id;
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{pageData.page.title}</h1>

      {pageData.page.message && (
        <div className="mb-6 text-lg">{pageData.page.message}</div>
      )}

      {/* Data comemorativa */}
      {pageData.commemorativeDate && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {pageData.commemorativeDate.name}
          </h2>
          <p>
            Data:{" "}
            {new Date(
              pageData.commemorativeDate.date as string
            ).toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}

      {/* Música */}
      {pageData.musicDetails && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Música</h2>
          <div>
            {pageData.musicDetails.display_name && (
              <p className="font-medium">
                {pageData.musicDetails.display_name}
              </p>
            )}
            {pageData.musicDetails.artist_name && (
              <p>{pageData.musicDetails.artist_name}</p>
            )}
            {/* Aqui você pode adicionar o player de música baseado nos dados disponíveis */}
          </div>
        </div>
      )}

      {/* Galeria de imagens */}
      {pageData.images.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pageData.images.map((image: Image) => (
              <div key={image.id} className="relative aspect-square">
                <img
                  src={image.url}
                  alt="Imagem da galeria"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
