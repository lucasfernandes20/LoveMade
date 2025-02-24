"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, FormInput, Mail, QrCode } from "lucide-react";

export default function Tutorial() {
  return (
    <section className="py-16 px-4" id="tutorial">
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Como Funciona?
      </h2>

      <div className="max-w-5xl mx-auto mt-12 flex flex-col gap-5">
        <div className="grid grid-cols-[1fr_1.5fr] gap-5">
          <Card containerClassName="bg-card">
            <CardHeader className="p-0 h-56 bg-[linear-gradient(to_top,hsl(var(--card)),rgba(16,71,52,0)),url('/images/how-it-works/plans.jpg')] bg-cover bg-no-repeat bg-top"></CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mt-4">
                <CheckCircle className="inline-block w-6 h-6 mr-2" /> Escolha o
                Pacote
              </h3>
              <p className="text-foreground/80 mt-2">
                Selecione o plano que mais combina com você.
              </p>
            </CardContent>
          </Card>
          <Card containerClassName="bg-card">
            <CardHeader className="p-0 h-56 bg-[linear-gradient(to_top,hsl(var(--card)),rgba(16,71,52,0)),url('/images/how-it-works/form.jpg')] bg-cover bg-no-repeat bg-top"></CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mt-4">
                <FormInput className="inline-block w-6 h-6 mr-2" /> Preencha o
                formulário
              </h3>
              <p className="text-foreground/80 mt-2">
                Adicione fotos e escreva sua mensagem especial.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-[1.5fr_1fr] gap-5">
          <Card containerClassName="bg-card">
            <CardHeader className="p-0 h-56 bg-[linear-gradient(to_top,hsl(var(--card)),rgba(16,71,52,0)),url('/images/how-it-works/qrcode.png')] bg-cover bg-no-repeat bg-center"></CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mt-4">
                <Mail className="inline-block w-6 h-6 mr-2" />
                Receba seu QR Code
              </h3>
              <p className="text-foreground/80 mt-2">
                O QR Code será enviado para o seu email em minutos.
              </p>
            </CardContent>
          </Card>
          <Card containerClassName="bg-card">
            <CardHeader className="p-0 h-56 bg-[linear-gradient(to_top,hsl(var(--card)),rgba(16,71,52,0)),url('/images/how-it-works/form.jpg')] bg-cover bg-no-repeat bg-top"></CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mt-4">
                <QrCode className="inline-block w-6 h-6 mr-2" />
                Acesso Liberado 🎉
              </h3>
              <p className="text-foreground/80 mt-2">
                Compartilhe o QR Code e surpreenda a pessoa amada.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
