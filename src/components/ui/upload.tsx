import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckCircleIcon, Trash2Icon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const Upload = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "value"> & {
    onFilesChange: (files: File[]) => void;
    value: File[];
    quantity?: number;
  }
>(({ className, quantity, onFilesChange, value = [], ...props }, ref) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploaded, setUploaded] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    let newFiles = [...files, ...selectedFiles];

    if (quantity && selectedFiles.length + files.length > quantity) {
      toast.error(
        `Você pode adicionar no máximo ${quantity} foto${
          quantity > 1 ? "s" : ""
        }`
      );
      newFiles = newFiles.slice(0, quantity);
      if (newFiles.length === files.length) return;
      setFiles(newFiles);
      onFilesChange(newFiles);
      setUploaded(true);
      setTimeout(() => setUploaded(false), 2000);
      return;
    }
    setFiles(newFiles);
    onFilesChange(newFiles);
    setUploaded(true);
    setTimeout(() => setUploaded(false), 2000);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  React.useEffect(() => {
    setFiles(value);
  }, [value]);

  return (
    <div className="w-full flex-grow">
      <div
        className={cn(
          "border-2 border-dashed border-primary relative col-span-full rounded-3xl min-h-36 grid place-items-center overflow-hidden",
          uploaded && "border-green-800"
        )}
      >
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 scale-0 rounded-full grid place-items-center transition-transform duration-1000",
            uploaded ? "scale-1 w-svw h-svh" : "scale-0"
          )}
        >
          <CheckCircleIcon className="text-white w-10 h-10" />
        </div>
        <div
          className={cn(
            "flex flex-col items-center gap-2",
            uploaded && "hidden"
          )}
        >
          <UploadIcon className="text-primary w-10 h-10" />
          <p className="text-primary">Escolha ou arraste suas fotos</p>
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className={cn(
            "flex-1 w-full h-full cursor-pointer absolute top-0 left-0 rounded-3xl opacity-0",
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
      </div>
      <div
        className={cn(
          "flex items-end gap-2 flex-wrap",
          files.length > 0 && "mt-4"
        )}
      >
        {files.map((file, index) => (
          <div
            key={index}
            className="relative rounded-full group border-2 border-transparent hover:border-red-700 hover:cursor-pointer"
            onClick={() => removeFile(index)}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="rounded-full object-cover w-12 h-12 bg-white group-hover:blur-sm group-hover:opacity-50"
              width={30}
              height={30}
            />
            <Trash2Icon className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        ))}
        {quantity && quantity > files.length && !!files.length && (
          <span className="text-sm block mt-2 ml-4 select-none">
            Faltam{" "}
            <strong className="bg-primary p-1 rounded-full">
              +{quantity - files.length}
            </strong>{" "}
            fotos
          </span>
        )}
      </div>
    </div>
  );
});
Upload.displayName = "Upload";

export { Upload };
