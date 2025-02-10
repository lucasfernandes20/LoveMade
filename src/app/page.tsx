import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "@/modules/footer";
import Tutorial from "@/modules/how-it-works";
import Prices from "@/modules/prices";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto">
        <section className="min-h-[calc(100svh-6rem)] flex flex-col my-20 md:my-0 md:grid md:grid-cols-[2.5fr_1.5fr] gap-10 items-center">
          <div>
            <h1 className="text-4xl text-center md:text-start md:text-7xl font-bold inline-block bg-gradient-to-bl from-foreground to-primary text-transparent bg-clip-text select-none leading-snug">
              Torne seu pedido inesquecível!💕
            </h1>
            <p className="text-base text-center md:text-start md:text-lg font-medium my-10">
              Crie um <span className="text-secondary">QR Code exclusivo</span>{" "}
              que, ao ser escaneado, revela uma página personalizada com a foto
              do casal e o <span className="text-secondary">grande pedido</span>
            </p>
            <Link
              href="/create"
              className={cn(
                buttonVariants({ variant: "glow" }),
                "text-xl w-full md:w-auto md:text-2xl p-8 font-bold hover:scale-[1.02]"
              )}
            >
              Quero criar meu site
            </Link>
          </div>
          <div>
            <Image
              alt="Pedido de casamento"
              src="/images/Pedido-de-casamento-flores.png"
              className="rounded-3xl object-contain w-full"
              width={1080}
              height={1920}
            />
          </div>
        </section>
        <Tutorial />
        <Prices />
      </main>
      <Footer />
    </div>
  );
}

