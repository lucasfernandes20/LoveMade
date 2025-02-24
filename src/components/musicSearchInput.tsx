import { useState } from "react";
import { Input } from "./ui/input";
import { Popover, PopoverContent } from "./ui/popover";

export default function MusicSearchInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function searchMusic() {
    setLoading(true);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=track`
    );
    const data = await response.json();
    setResults(data.tracks.items);
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setOpen(true);

    console.log(e);
    if (e.target.value) {
      searchMusic();
    }
    props.onChange?.(e);
  };

  return (
    <div className="flex flex-col w-full ">
      <Input
        type="text"
        placeholder="Procure por uma música"
        {...props}
        onChange={handleChange}
      />
      <Popover open={true} onOpenChange={setOpen}>
        <PopoverContent className="min-w-full flex-grow">
          <p className="w-full flex-grow">Digite o nome de uma música</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
