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
import { animations } from "@/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimationStepProps {
  handleSetStep: (arg?: number) => void;
}

const formSchema = z.object({
  animation: z.coerce.number(),
});

export default function AnimationStep({ handleSetStep }: AnimationStepProps) {
  const [state, setState] = useAppState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animation: state.checkoutForm?.pageAnimation,
    },
  });

  const saveData = (data: z.infer<typeof formSchema>) => {
    setState({
      ...state,
      checkoutForm: {
        ...state.checkoutForm,
        pageAnimation: data.animation,
      },
    });
    handleSetStep(state.activeStep);
  };

  const handleCheckboxChange = (
    animationId: number,
    checked: string | boolean
  ) => {
    if (checked) {
      setState({
        ...state,
        checkoutForm: {
          ...state.checkoutForm,
          pageAnimation: animationId,
        },
      });
    } else {
      setState({
        ...state,
        checkoutForm: { ...state.checkoutForm, pageAnimation: undefined },
      });
    }
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
        <div className="grid grid-cols-3 gap-4">
          {Object.values(animations).map((animation) => (
            <FormField
              key={animation.id}
              name="animation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Card
                      key={animation.id}
                      className={cn(
                        "cursor-pointer aspect-square",
                        animation.id === state.checkoutForm?.pageAnimation &&
                          "border-primary"
                      )}
                    >
                      <CardHeader className="space-y-0.5 p-3 bg-black">
                        <CardTitle className="text-base">
                          {animation.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative h-full">
                        <Image
                          src={`/images/animations/${animation.id}.jpg`}
                          alt={`${animation.name} preview`}
                          width={300}
                          height={200}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <Checkbox
                          id={animation.id.toString()}
                          className="w-full h-full opacity-0 bg-white z-30 absolute top-0 left-0"
                          {...field}
                          checked={
                            state.checkoutForm?.pageAnimation === animation.id
                          }
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(animation.id, checked)
                          }
                        />
                        <div className="after:content-[''] after:absolute after:inset-0 after:z-10 after:bg-gradient-to-b after:from-black after:via-transparent after:to-transparent"></div>
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
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
