"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload } from "@/components/ui/upload";
import { prices } from "@/models/prices";
import Footer from "@/models/footer";
import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);
export default function FormPage() {
  const searchParams = useSearchParams();

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  const plan = searchParams.get("plan");

  return (
    <div className="flex flex-col">
      <section className="container mx-auto flex-grow">
        <h1 className="text-4xl font-bold mb-6">Quase lá!</h1>
        <p className="text-lg mb-6">Preencha os dados para criar seu pedido</p>
        <div className="grid  grid-cols-[3fr_1.5fr] gap-12">
          <Tabs defaultValue={plan || "default"}>
            <TabsList className="">
              {prices.map((price) => (
                <TabsTrigger key={price.title} value={price.planName}>
                  {price.title} • {price.price}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="basic">
              <Card className="bg-background p-8 mt-6 shadow-2xl shadow-black grid grid-cols-2 gap-8">
                <Label htmlFor="name">
                  <span className="mb-2 ml-3">Nome da pessoa amada</span>
                  <Input id="name" />
                </Label>
                <Label htmlFor="name">
                  <span className="mb-2 ml-3">Pedido para</span>
                  <Select defaultValue="dating">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dating">Namoro</SelectItem>
                      <SelectItem value="marriage">Casamento</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
                <Label htmlFor="name" className="col-span-2">
                  <span className="mb-2 ml-3">Envie as fotos do casal</span>
                  <Upload id="upload" quantity={1} />
                </Label>
                <Button className="w-full">Criar nosso site</Button>
              </Card>
            </TabsContent>

            <TabsContent value="default">
              <Card className="bg-background p-8 mt-6 shadow-2xl shadow-black">
                <form className="grid grid-cols-2 gap-8">
                  <Label htmlFor="name">
                    <span className="mb-2 ml-3">Nome da pessoa amada</span>
                    <Input id="name" />
                  </Label>
                  <Label htmlFor="name">
                    <span className="mb-2 ml-3">Pedido para</span>
                    <Select defaultValue="dating">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dating">Namoro</SelectItem>
                        <SelectItem value="marriage">Casamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>
                  <Label htmlFor="name" className="col-span-2">
                    <span className="mb-2 ml-3">Envie as fotos do casal</span>
                    <Upload id="upload" multiple quantity={10} />
                  </Label>
                  <Label htmlFor="name" className="col-span-2">
                    <span className="mb-2 ml-3">Pedido personalizado</span>
                    <Textarea
                      placeholder="Escreva seu lindo pedido. Capricha hein! ❤️"
                      className="col-span-2 resize-none"
                    />
                  </Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Criar nosso site</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <VisuallyHidden.Root>
                        <DialogTitle>Plano Romântico</DialogTitle>
                      </VisuallyHidden.Root>
                      <DialogHeader>
                        <DialogTitle>Plano Romântico</DialogTitle>
                      </DialogHeader>
                      <DialogContent>
                        <EmbeddedCheckoutProvider
                          stripe={stripePromise}
                          options={options}
                        >
                          <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                      </DialogContent>
                    </DialogContent>
                  </Dialog>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="complete">
              <Card className="bg-background p-8 mt-6 shadow-2xl shadow-black grid grid-cols-2 gap-8">
                <Label htmlFor="name">
                  <span className="mb-2 ml-3">Nome da pessoa amada</span>
                  <Input id="name" />
                </Label>
                <Label htmlFor="name">
                  <span className="mb-2 ml-3">Pedido para</span>
                  <Select defaultValue="dating">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dating">Namoro</SelectItem>
                      <SelectItem value="marriage">Casamento</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
                <Label htmlFor="name" className="col-span-2">
                  <span className="mb-2 ml-3">Envie as fotos do casal</span>
                  <Upload id="upload" multiple quantity={10} />
                </Label>
                <Label htmlFor="name" className="col-span-2">
                  <span className="mb-2 ml-3">Pedido personalizado</span>
                  <Textarea
                    placeholder="Escreva seu lindo pedido. Capricha hein! ❤️"
                    className="col-span-2 resize-none"
                  />
                </Label>
                <Label htmlFor="music" className="col-span-2">
                  <span className="mb-2 ml-3">Música</span>
                  <Input placeholder="Link do youtube" className="col-span-2" />
                </Label>
                <Button className="w-full">Criar nosso site</Button>
              </Card>
            </TabsContent>
          </Tabs>
          <Card>Assim ficará seu site</Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
