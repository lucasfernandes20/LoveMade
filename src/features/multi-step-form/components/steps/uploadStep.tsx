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
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Upload } from "@/components/ui/upload";
import { Input } from "@/components/ui/input";

interface UploadStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  photos: z.array(z.instanceof(File)).nonempty("Envie ao menos uma foto"),
  label: z.string().max(20, "Máximo de 20 caracteres").optional(),
});

export default function UploadStep({ handleSetStep }: UploadStepProps) {
  const [state, setState] = useCreateState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photos: state.checkoutForm?.photos?.files || [],
      label: state.checkoutForm?.photos?.label || "",
    },
  });

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: { ...state.checkoutForm, photos: { files: data.photos, label: data.label } },
    });
    handleSetStep(state.activeStep);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveData)} className="">
        <FormField
          name="photos"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Upload
                  name={field.name}
                  ref={field.ref}
                  files={field.value}
                  disabled={field.disabled}
                  onFilesChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="label"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Adicione um rótulo para as fotos"
                  autoComplete={"off"}
                  className="mt-4"
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
            className="flex-1 text-xs px-0 md:px-4 md:text-base"
            disabled={state.activeStep === 1}
          >
            <ChevronRightIcon className="inline rotate-180" />
            Etapa anterior
          </Button>
          <Button type="submit" className="flex-1 text-xs px-0 md:px-4 md:text-base">
            Próxima etapa
            <ChevronRightIcon className="inline" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
