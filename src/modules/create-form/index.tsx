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
import { FormData } from "@/models";
import { cn } from "@/lib/utils";

interface CreateFormProps {
  changes: React.Dispatch<React.SetStateAction<FormData | undefined>>;
  className?: string;
}

const formSchema = z.object({
  senderName: z.string().min(2).max(50),
  receiverName: z.string().min(2).max(50),
  relationshipType: z.string().min(2).max(50),
  photos: z.array(z.instanceof(File)),
  message: z.string().min(10).max(500),
  music: z.string().min(2).max(300),
});

export default function CreateForm({ changes, className }: CreateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      receiverName: "",
      relationshipType: "",
      photos: [],
      message: "",
    },
  });

  function handleChange() {
    changes(form.getValues());
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={handleChange}
        className={cn("flex flex-col gap-3 md:grid md:grid-cols-2", className)}
      >
        <FormField
          name="senderName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Evite usar emojis</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="receiverName"
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
          name="music"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Música</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=2Vv-BfVoq4g"
                  {...field}
                />
              </FormControl>
              <FormDescription>Link do youtube</FormDescription>
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
                  quantity={3}
                  onFilesChange={(files: File[]) => field.onChange(files)}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>Pode usar até 3 fotos</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="message"
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
        <PaymentButton />
      </form>
    </Form>
  );
}
