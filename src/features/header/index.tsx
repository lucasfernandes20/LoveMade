import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-transparent text-primary-foreground mb-4">
      <div className="container px-4 py-2 flex items-center justify-between">
        <Link className="w-auto h-auto p-2" href="/">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        </Link>

        <div className="">
          <ul className="flex items-center gap-10">
            <li className="text-xs md:text-sm text-foreground/80 hover:text-foreground">
              <Link href="/#tutorial">Como funciona</Link>
            </li>
            <li className="text-xs md:text-sm text-foreground/80 hover:text-foreground">
              <Link href="/#prices">Pacotes</Link>
            </li>
            <li className="text-xs md:text-sm text-foreground/80 hover:text-foreground">
              <Link href="/#faqs">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
