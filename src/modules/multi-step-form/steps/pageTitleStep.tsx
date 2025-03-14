// Steps/About.js

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

interface PageTitleStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  pageTitle: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(90, "Máximo de 90 caracteres"),
});

export default function PageTitle({ handleSetStep }: PageTitleStepProps) {
  const [state, setState] = useCreateState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageTitle: state.checkoutForm?.pageTitle || "",
    },
  });

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: { ...state.checkoutForm, pageTitle: data.pageTitle },
    });
    handleSetStep(state.activeStep);
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
          name="pageTitle"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ex: Maria e João"
                  autoFocus
                  autoComplete={"off"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full mt-4 flex items-center gap-4">
          <Button
            type="button"
            onClick={() => handleSetStep()}
            className="flex-grow"
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
