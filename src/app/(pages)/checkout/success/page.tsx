import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default async function CheckoutSuccessPage() {
  return (
    <main className="container">
      <Card
        className="max-w-lg mx-auto mt-24 text-center"
        containerClassName="bg-black/90"
      >
        <CardContent>
          <CardHeader className="mb-6">
            <ShoppingBagIcon className="mx-auto mb-4 w-12 h-12 text-green-500" />
            <CardTitle>Pagamento Confirmado!</CardTitle>
            <CardDescription>
              Obrigado por fazer parte do romantismo moderno
            </CardDescription>
          </CardHeader>
          <div className="text-gray-200 text-sm">
            <p>
              Seu pagamento foi processado com sucesso e seu link foi enviado
              para seu e-mail.
            </p>
            <p>Agora é com você! Boa sorte neste pedido tão importante.</p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-12 text-lg "
              )}
            >
              Visualizar minha página
              <ChevronRightIcon />
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
