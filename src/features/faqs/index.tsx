import { SectionTitle } from "@/components/shared/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs() {
  return (
    <section className="w-full py-16" id="faqs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <SectionTitle title="Perguntas Frequentes" subtitle="F.A.Q" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre a LoveMade e nosso processo de criação de páginas personalizadas.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-lg border-b border-border">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                Como recebo minha página personalizada após o pagamento?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Após a confirmação do seu pagamento, o QRCode será gerado e enviado para o e-mail que você cadastrou durante o processo de compra.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                A página personalizada tem validade?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Não, no plano Surpresa sua página personalizada ficará disponível permanentemente após a criação. 
                Nossa plataforma mantém sua página hospedada sem custos adicionais ou renovações necessárias. Já no plano Romântico, a página ficará disponível por 1 ano após a criação.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                Quais as formas de pagamento aceitas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Você pode efetuar o pagamento utilizando cartão de crédito.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                Como funciona a LoveMade?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                A LoveMade é uma plataforma que transforma suas mensagens de amor, fotos, músicas e datas especiais em páginas web bonitas e 
                personalizadas. O processo é simples: você preenche nosso formulário com suas informações
                e mensagem personalizada e efetua o pagamento. Em poucos minutos, você receberá um QR Code exclusivo para 
                compartilhar com a pessoa amada, surpreendendo-a com uma declaração digital inesquecível.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b-0">
              <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                O pagamento é seguro?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Sim, todos os pagamentos na LoveMade são 100% seguros. Utilizamos sistemas de criptografia 
                avançada e gateways de pagamento certificados que seguem os mais rigorosos padrões de segurança 
                do mercado. Seus dados financeiros não são armazenados em nossos servidores, garantindo total 
                privacidade e proteção.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
} 