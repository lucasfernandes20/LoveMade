import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MOCK_COUPLE_IMAGES = [
  "/images/casal/casal-1.jpg",
  "/images/casal/casal-2.jpg",
];

interface CarouselProps {
  photos?: File[];
}

export function StyledCarousel({ photos }: CarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto  relative">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {(photos || MOCK_COUPLE_IMAGES)?.map((photo, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="relative aspect-square overflow-hidden cursor-grab">
                  <Image
                    key={index}
                    src={
                      typeof photo === "string"
                        ? photo
                        : URL.createObjectURL(photo)
                    }
                    alt={`Foto ${index + 1}`}
                    className="object-cover absolute top-0 left-0 w-full h-full"
                    width={1080}
                    height={1080}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="px-2 py-1 rounded-full text-muted flex items-center gap-1 bg-white/60 w-fit absolute bottom-3 left-1/2 -translate-x-1/2">
        {Array.from(Array(count)).map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full border-[1px] border-muted transition-colors duration-300 overflow-hidden relative cursor-pointer hover:bg-muted/20"
            onClick={() => api?.scrollTo(index)}
          >
            <div
              className={cn(
                "w-full h-full rounded-full transition-transform duration-300 scale-0 bg-muted",
                index === current - 1 && "scale-1"
              )}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
