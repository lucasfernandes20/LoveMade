import { Space } from "@/components/CanvasStars";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { prices } from "@/models";
import { CheckIcon, StarIcon, XIcon } from "lucide-react";
import Link from "next/link";

export default function Prices() {
  return (
    <section
      className="w-full min-h-[calc(100svh-10rem)] mt-12 relative overflow-hidden"
      id="prices"
    >
      <Space
        backgroundColor="transparent"
        particleCount={200}
        baseHue={300}
        baseSpeed={0.01}
        rangeSpeed={0.2}
        rangeY={650}
        className="flex items-center flex-col justify-center gap-16 px-2 md:px-10 py-8 w-full h-full"
      >
        <h2 className="text-2xl md:text-5xl font-bold text-center">
          Nossos Planos
        </h2>
        <p className="max-w-sm text-center mx-auto mt-6 text-xs md:text-sm">
          Escolha o plano ideal para sua página.
        </p>
        <div className="flex flex-col items-center gap-8 mt-8 mx-auto md:grid md:grid-cols-2 md:place-items-center max-w-2xl lg:mt-16">
          {prices.map((price) => (
            <div key={price.title} className="relative flex">
              {price.mostPopular && (
                <div className="absolute rounded-full bg-background px-2 top-0 left-12 -translate-y-1/2 z-10">
                  <span className="text-xs text-yellow-500 font-normal flex items-center gap-1 select-none">
                    <StarIcon className="size-4 inline fill-yellow-300" />
                    Recomendado
                  </span>
                </div>
              )}
              <Card
                variant="glow"
                className="bg-gradient-radial from-indigo-950 to-background text-primary-foreground relative px-10 flex flex-col"
              >
                <CardHeader className="text-2xl p-0 pt-12 pb-6 font-bold">
                  {price.title}
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <ul>
                    {price.features.map((feature) => (
                      <li
                        key={price.title + feature}
                        className="mb-1 text-white/80"
                      >
                        <span className="text-sm">
                          <CheckIcon className="text-green-500 inline-block mr-2 w-4 h-4" />
                          {feature}
                        </span>
                      </li>
                    ))}
                    {price.desvantagens.map((disvantage) => (
                      <li
                        key={price.title + disvantage}
                        className="mb-1 text-white/80"
                      >
                        <span className="text-sm">
                          <XIcon className="text-red-500 inline-block mr-2 w-4 h-4" />
                          {disvantage}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 mt-12 px-0">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-2xl text-red-600 line-through font-bold">
                      {price.totalPrice}
                    </h4>
                    <h2 className="text-4xl font-bold text-start">
                      {price.priceWithDiscount}
                      <span className="text-xs font-thin"> /uma vez</span>
                    </h2>
                  </div>
                  <Link
                    href={`/create?plan=${price.planName}`}
                    className={cn("w-full", buttonVariants())}
                  >
                    {
                      {
                        romantic: "Escolher esse 💗",
                        surprise: "Criar Meu Pedido",
                      }[price.planName]
                    }
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </Space>
    </section>
  );
}
