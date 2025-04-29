import Footer from "@/features/footer";
import CreateForm from "@/features/create-form";
import PagePreview from "@/features/completed-page";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { CreateContextProvider } from "@/context";

function FormContent() {

  return (
    <div className="flex flex-col">
      <section className="container mx-auto flex-grow">
        <div
          className={cn(
            "w-full flex flex-col md:grid md:grid-cols-[3fr_1.8fr] gap-12 transition-all duration-300 "
          )}
        >
          <CreateForm />
          <PagePreview />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense>
      <CreateContextProvider>
        <FormContent />
      </CreateContextProvider>
    </Suspense>
  );
}
