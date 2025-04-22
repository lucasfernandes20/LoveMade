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
  "Desde o dia em que nos conhecemos, algo em mim mudou. Você trouxe cor para os meus dias, risadas para os meus momentos e paz para o meu coração. Hoje, quero dar mais um passo nessa história linda que estamos construindo. Você aceita namorar comigo?",
  "Sempre me disseram que o melhor lugar do mundo é aquele onde nos sentimos em casa. E eu encontrei esse lugar em você. Ao seu lado, tudo faz sentido, e cada dia é uma nova aventura. Quero continuar escrevendo essa história ao seu lado. Você aceita ser minha pessoa para sempre?",
  "Já percebeu como o tempo parece diferente quando estamos juntos? As horas voam quando rimos, mas cada abraço seu faz o mundo parar. Eu não quero apenas momentos com você, quero uma vida inteira. Então, que tal oficializarmos esse amor? Você aceita namorar comigo?",
];

interface MessageStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  message: z.coerce
    .string()
    .min(2, 'Mande ao menos um "Oi!" :(')
    .max(500, "Máximo de 500 caracteres"),
});

export default function Message({ handleSetStep }: MessageStepProps) {
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
                      {form.getValues("message").length}/{500}
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
            className="flex-grow"
            onClick={() => handleSetStep()}
            disabled={state.activeStep === 1}
          >
            <ChevronRightIcon className="inline rotate-180" />
            Etapa anterior
          </Button>
          <Button type="submit" className="flex-grow">
            Próxima etapa
            <ChevronRightIcon className="inline" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
