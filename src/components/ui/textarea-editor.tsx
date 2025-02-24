import { useState, useRef } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export default function MessageEditor() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");

    // Aplica os estilos ativos
    if (selectedFormats.includes("bold")) span.style.fontWeight = "bold";
    if (selectedFormats.includes("italic")) span.style.fontStyle = "italic";
    if (selectedFormats.includes("underline"))
      span.style.textDecoration = "underline";

    // Insere o caractere digitado dentro da tag
    span.textContent = e.key;

    // Insere o elemento no local do cursor
    range.deleteContents();
    range.insertNode(span);

    // Move o cursor para depois do novo caractere
    range.setStartAfter(span);
    range.setEndAfter(span);
    selection.removeAllRanges();
    selection.addRange(range);

    e.preventDefault(); // Previne o comportamento padrão de digitação
  };

  return (
    <div className="border border-input bg-card rounded-lg overflow-hidden">
      {/* Campo de Texto Editável */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="resize-none border-0 h-36 overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-card p-2"
        onKeyDown={handleKeyDown}
      ></div>

      {/* Botões de Formatação */}
      <div className="border-t border-input flex items-center justify-between p-1">
        <ToggleGroup
          type="multiple"
          value={selectedFormats}
          onValueChange={setSelectedFormats}
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={() => toggleFormat("bold")}
          >
            <BoldIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => toggleFormat("italic")}
          >
            <ItalicIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={() => toggleFormat("underline")}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
