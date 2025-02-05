import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-16">
      <div className="container mx-auto flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} - Todos os direitos reservados.
        </p>

        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/terms-of-use" className="hover:text-white transition">
            Termos de Uso
          </Link>
          <Link href="/suporte" className="hover:text-white transition">
            Suporte
          </Link>
          <Link href="/contato" className="hover:text-white transition">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  );
}
