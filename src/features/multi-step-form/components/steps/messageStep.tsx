import { useForm } from "react-hook-form";
import { useCreateState } from "@/context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRightIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const messagePrompts = [
  "Tem dias que eu paro e fico pensando em como minha vida mudou depois que você entrou nela. Não falo de grandes revoluções, mas de coisas pequenas que fazem toda a diferença. Um bom dia com mais carinho, uma conversa que me acalma, uma risada inesperada no meio de um dia difícil. Você trouxe leveza, parceria e verdade. É bom saber que posso ser quem sou, sem máscaras, e ainda assim ser escolhido todos os dias. Com você, aprendi que amor também é paz.",
  "Às vezes, em meio à correria, tudo o que eu preciso é lembrar de você pra me sentir melhor. Não porque você resolve tudo, mas porque com você, tudo parece ter mais propósito. Gosto da forma como a gente se conecta, mesmo nos dias mais nublados. A gente não precisa de perfeição, só de presença. E você tem sido isso: presente. No olhar, nas palavras, no cuidado. É bom amar alguém e sentir que esse alguém também está construindo algo com você, passo a passo.",
  "Eu não sei o que o futuro reserva pra gente — ninguém sabe. Mas de tudo que vivi até hoje, uma das escolhas mais certeiras foi te amar. Não é sobre prometer que nunca vamos errar, mas sobre saber que estamos dispostos a crescer juntos. Cada momento contigo, dos mais simples aos mais intensos, carrega um valor que palavras não alcançam. E mesmo que o mundo mude lá fora, quero continuar sendo teu lugar seguro, assim como você é o meu.",
];

interface MessageStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  message: z.coerce
    .string()
    .min(2, "Mande ao menos um 'Oi!' :(")
    .max(1_500, "Máximo de 1500 caracteres"),
});

export default function MessageStep({ handleSetStep }: MessageStepProps) {
  const [state, setState] = useCreateState();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: state.checkoutForm?.message || "",
    },
  });

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: { ...state.checkoutForm, message: data.message },
    });
    handleSetStep(state.activeStep);
  };

  const handleApplyPrompts = (prompt: string) => {
    form.setValue("message", prompt);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveData)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(saveData)();
          }
        }}
      >
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="border border-input bg-card rounded-lg overflow-hidden">
                  <Textarea
                    className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-card"
                    rows={6}
                    autoFocus
                    autoComplete={"off"}
                    {...field}
                  />
                  <div className="border-t border-input flex items-center justify-end px-1 py-3">
                    <p className="text-neutral-400 text-xs mr-4">
                      {form.getValues("message").length}/{1_500}
                    </p>
                  </div>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.message?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-3 mt-8"
        >
          <div className="flex items-center justify-between px-4">
            <h4 className="text-sm font-semibold">Mensagens pré-definidas</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          {messagePrompts.map((prompt, index) => {
            return index === 0 ? (
              <div
                key={index}
                className="rounded-md border px-4 shadow-sm relative line-clamp-3"
              >
                <p className="text-sm text-neutral-300 font-sans pr-12">
                  {prompt}
                </p>
                <div
                  className="absolute top-1/2 right-2 p-3 rounded-full transform -translate-y-1/2 hover:bg-muted cursor-pointer"
                  onClick={() => handleApplyPrompts(prompt)}
                >
                  <PlusIcon className="h-5 w-5 text-neutral-300" />
                </div>
              </div>
            ) : (
              <CollapsibleContent key={index}>
                <div className="rounded-md border px-4 shadow-sm relative line-clamp-3">
                  <p className="text-sm text-neutral-300 font-sans pr-12">
                    {prompt}
                  </p>
                  <div
                    className="absolute top-1/2 right-2 p-3 rounded-full transform -translate-y-1/2 hover:bg-muted cursor-pointer"
                    onClick={() => handleApplyPrompts(prompt)}
                  >
                    <PlusIcon className="h-5 w-5 text-neutral-300" />
                  </div>
                </div>
              </CollapsibleContent>
            );
          })}
        </Collapsible>
        <div className="w-full mt-4 flex items-center gap-4">
          <Button
            className="flex-1 text-xs px-0 md:px-4 md:text-base"
            onClick={() => handleSetStep()}
            disabled={state.activeStep === 1}
          >
            <ChevronRightIcon className="inline rotate-180" />
            Etapa anterior
          </Button>
          <Button
            type="submit"
            className="flex-1 text-xs px-0 md:px-4 md:text-base"
          >
            Próxima etapa
            <ChevronRightIcon className="inline" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
