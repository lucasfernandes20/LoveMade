"use client";
import PaymentButton from "@/components/paymentButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "@/components/ui/upload";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, maxPhotosByPlan, PlanNameEnum } from "@/models";

interface CreateFormProps {
  selectedPlan: PlanNameEnum;
  changes: React.Dispatch<
    React.SetStateAction<Record<PlanNameEnum, FormData | null>>
  >;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  relationshipType: z.string().min(2).max(50),
  photos: z.array(z.instanceof(File)),
  message: z.string().min(10).max(500),
});

export default function CreateForm({ selectedPlan, changes }: CreateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      relationshipType: "",
      photos: [],
      message: "",
    },
  });

  function handleChange() {
    changes((prev) => ({
      ...prev,
      [selectedPlan]: form.getValues(),
    }));
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={handleChange}
        className="flex flex-col gap-8 md:grid md:grid-cols-2"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da pessoa amada</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Evite usar emojis</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="relationshipType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pedido para</FormLabel>
              <FormControl>
                <Select defaultValue="dating" {...field}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dating">Namoro</SelectItem>
                    <SelectItem value="marriage">Casamento</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="photos"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Fotos</FormLabel>
              <FormControl>
                <Upload
                  multiple
                  quantity={maxPhotosByPlan[selectedPlan]}
                  onFilesChange={(files: File[]) => field.onChange(files)}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                Pode usar até {maxPhotosByPlan[selectedPlan]} fotos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="message"
          disabled={selectedPlan === PlanNameEnum.Basic}
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Pedido personalizado</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva seu lindo pedido. Capricha hein! ❤️"
                  className="col-span-2 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PaymentButton selectedPlan={selectedPlan} />
      </form>
    </Form>
  );
}
