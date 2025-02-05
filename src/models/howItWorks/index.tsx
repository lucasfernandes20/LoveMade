"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, FormInput, Mail, QrCode } from "lucide-react";

const steps = [
  {
    title: "Escolha o Pacote",
    description: "Selecione o plano que mais combina com você.",
    icon: <CheckCircle className="w-12 h-12 text-foreground" />,
  },
  {
    title: "Preencha o Formulário",
    description: "Adicione fotos e escreva sua mensagem especial.",
    icon: <FormInput className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Receba seu QR Code",
    description: "O QR Code será enviado para o seu email em minutos.",
    icon: <Mail className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Acesso Liberado 🎉",
    description: "Compartilhe o QR Code e surpreenda a pessoa amada.",
    icon: <QrCode className="w-12 h-12 text-yellow-500" />,
  },
];

export default function Tutorial() {
  return (
    <section className="py-16 px-4" id="tutorial">
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Como Funciona?
      </h2>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <Card className="p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform flex-grow">
              <CardHeader>{step.icon}</CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
                <p className="text-foreground/80 mt-2">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
