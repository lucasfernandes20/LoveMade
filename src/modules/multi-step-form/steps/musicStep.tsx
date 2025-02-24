// Steps/About.js

import { useForm } from "react-hook-form";
import { useAppState } from "@/context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import MusicSearchInput from "@/components/musicSearchInput";

interface MusicStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  music: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(90, "Máximo de 90 caracteres"),
});

export default function MusicStep({ handleSetStep }: MusicStepProps) {
  const [state, setState] = useAppState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      music: state.checkoutForm?.music || "",
    },
  });

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: { ...state.checkoutForm, music: data.music },
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
          name="music"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MusicSearchInput autoFocus autoComplete={"off"} {...field} />
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
