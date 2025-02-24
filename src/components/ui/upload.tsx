import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, Trash2Icon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";

const MAX_QUANTITY = 7;

const Upload = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    onFilesChange: (files: File[]) => void;
    files: File[];
  }
>(({ className, onFilesChange, ...props }, ref) => {
  const [files, setFiles] = React.useState<File[]>(props.files || []);
  const [uploaded, setUploaded] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files, ...selectedFiles];

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
          <span className="text-xs font-sans text-neutral-400">
            PNG, JPG, JPEG (Máx 7 fotos)
          </span>
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className={cn(
            "flex-1 w-full h-full cursor-pointer absolute top-0 left-0 rounded-3xl opacity-0",
            className
          )}
          multiple
          max={MAX_QUANTITY}
          ref={ref}
          {...props}
          onChange={handleChange}
        />
      </div>
      <div
        className={cn(
          "flex items-end gap-6 flex-wrap",
          files.length > 0 && "mt-6"
        )}
      >
        {files.map((file, index) => (
          <div key={index} className="relative border-2 border-transparent">
            <div
              className="absolute -top-3 -right-3 bg-neutral-500 rounded-full overflow-hidden group cursor-pointer hover:bg-muted"
              onClick={() => removeFile(index)}
            >
              <XIcon className="" />
            </div>
            <Image
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="rounded object-cover w-12 h-12"
              width={30}
              height={30}
            />
            <Trash2Icon className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
});
Upload.displayName = "Upload";

export { Upload };
