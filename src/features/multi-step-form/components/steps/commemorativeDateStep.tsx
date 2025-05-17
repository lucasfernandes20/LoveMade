"use client";

import { useForm } from "react-hook-form";
import { useCreateState } from "@/context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";

interface CommemorativeDateStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  dateName: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  commemorativeDate: z.date({
    required_error: "Selecione uma data",
  }),
});

export default function CommemorativeDateStep({ handleSetStep }: CommemorativeDateStepProps) {
  const [state, setState] = useCreateState();
  const [month, setMonth] = useState<number>(state.checkoutForm?.commemorativeDate?.date ? 
    new Date(state.checkoutForm.commemorativeDate.date).getMonth() : 
    new Date().getMonth());
  const [year, setYear] = useState<number>(state.checkoutForm?.commemorativeDate?.date ? 
    new Date(state.checkoutForm.commemorativeDate.date).getFullYear() : 
    new Date().getFullYear());
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateName: state.checkoutForm?.commemorativeDate?.name || "",
      commemorativeDate: state.checkoutForm?.commemorativeDate?.date 
        ? new Date(state.checkoutForm.commemorativeDate.date)
        : undefined,
    },
  });

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: { 
        ...state.checkoutForm, 
        commemorativeDate: {
          name: data.dateName,
          date: data.commemorativeDate
        }
      },
    });
    handleSetStep(state.activeStep);
  };

  // Função para gerar anos para o seletor
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  };

  // Função para gerar meses para o seletor
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", 
    "Maio", "Junho", "Julho", "Agosto", 
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(saveData)}
        className="space-y-6"
      >
        <FormField
          name="dateName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da data</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Nosso aniversário"
                  autoFocus
                  autoComplete={"off"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="commemorativeDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div className="relative">
                    <Input
                      type="text"
                      placeholder="Selecione uma data"
                      readOnly
                      value={field.value ? format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    />
                    <CalendarIcon className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                    </div>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <div className="flex gap-2 p-3 justify-between items-center bg-muted/50">
                    <Select 
                      value={month.toString()} 
                      onValueChange={(value) => setMonth(parseInt(value))}
                    >
                      <SelectTrigger className="h-8" variant="transparent">
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((monthName, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {monthName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={year.toString()} 
                      onValueChange={(value) => setYear(parseInt(value))}
                    >
                      <SelectTrigger className="h-8" variant="transparent">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateYearOptions().map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    month={new Date(year, month)}
                    onMonthChange={(date) => {
                      setMonth(date.getMonth());
                      setYear(date.getFullYear());
                    }}
                    locale={ptBR}
                    className="border-none"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="w-full mt-6 flex items-center gap-2 md:gap-4">
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