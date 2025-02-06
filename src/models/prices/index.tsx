import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const prices = [
  {
    title: "Gratuito",
    features: [
      "QR Code exclusivo",
      "Somente 1 foto",
      "Pedido básico",
      "Link válido por 24h",
    ],
    desvantagens: ["Não inclui música", "Pedido não personalizável"],
    price: "Grátis",
    mostPopular: false,
    planName: "basic",
  },
  {
    title: "Romântico 💌",
    features: [
      "QR Code exclusivo",
      "Até 3 fotos",
      "Pedido personalizado",
      "Escolha de cor e estilo",
      "Link válido por tempo ilimitado",
    ],
    desvantagens: ["Não inclui música"],
    price: "R$ 14,90",
    mostPopular: true,
    planName: "romantic",
  },
  {
    title: "Surpresa 💎",
    features: [
      "Tudo do plano romântico",
      'Mensagem de resposta interativa ("Sim" ou "Não")',
      "Com música",
      "Download da página em PDF para recordação",
      "Animação especial ao abrir a página",
    ],
    desvantagens: [],
    price: "R$ 29,90",
    mostPopular: false,
    planName: "surprise",
  },
];

export default function Prices() {
  return (
    <section className="min-h-[calc(100svh-10rem)] mt-12" id="prices">
      <h2 className="text-5xl font-bold text-center">Preços</h2>
      <div className="flex flex-col gap-8 mt-10 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-14 lg:mt-28">
        {prices.map((price) => (
          <Card
            key={price.title}
            className={cn(
              "text-foreground relative px-4 flex flex-col",
              {
                basic: "bg-gradient-to-tr from-muted to-muted/50",
                romantic:
                  "lg:-translate-y-10 lg:scale-105 bg-primary text-primary-foreground border-2 border-yellow-500",
                surprise:
                  "bg-gradient-to-tr from-black to-gray-900 text-primary-foreground border-2 border-yellow-600 md:col-span-2 lg:col-span-1",
              }[price.planName]
            )}
          >
            {price.mostPopular && (
              <div className="absolute bg-secondary rounded-full px-6 py-2 top-0 left-0 right-0 -translate-y-1/2 w-fit mx-auto border-t-2 border-yellow-500">
                <span className="text-base text-foreground font-bold uppercase">
                  ⭐ Recomendado
                </span>
              </div>
            )}
            <CardHeader className="text-3xl font-bold border-b-[1px] border-foreground">
              {price.title}
            </CardHeader>
            <ul className="p-6 flex-grow">
              {price.features.map((feature) => (
                <li key={price.title + feature} className="mb-4 ">
                  <span>
                    <span className="text-xl mr-2">✅</span>
                    {feature}
                  </span>
                </li>
              ))}
              {price.desvantagens.map((disvantage) => (
                <li
                  key={price.title + disvantage}
                  className="flex items-center gap-2 mb-2 line-through opacity-70 text-sm"
                >
                  {disvantage}
                </li>
              ))}
            </ul>
            <h2 className="text-5xl font-bold text-center">{price.price}</h2>
            {price.planName !== "basic" && (
              <div className="bg-green-700 text-foreground text-xs px-3 py-1 mt-4 rounded-full text-center w-fit mx-auto">
                Pagamento Único 🏷️
              </div>
            )}
            <CardFooter className="flex items-center justify-center mt-6 px-0">
              <Button
                variant="glow"
                className="text-2xl p-8 font-bold hover:scale-[1.02] w-full"
              >
                <Link href={`/create?plan=${price.planName}`}>
                  {
                    {
                      basic: "Testar Agora",
                      romantic: "Escolher esse 💗",
                      surprise: "Criar Meu Pedido",
                    }[price.planName]
                  }
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
