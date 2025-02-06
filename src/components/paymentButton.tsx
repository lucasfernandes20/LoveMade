"use client";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface PaymentButtonProps {
  plan: string;
}

export default function PaymentButton({ plan }: PaymentButtonProps) {
  const fetchClientSecret = useCallback(() => {
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.client_secret;
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Criar nosso site</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[60svw] bg-white text-muted">
        <VisuallyHidden.Root>
          <DialogTitle>Plano Romântico</DialogTitle>
        </VisuallyHidden.Root>
        <DialogHeader>
          <DialogTitle>Plano Romântico</DialogTitle>
        </DialogHeader>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </DialogContent>
    </Dialog>
  );
}
