import { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex w-full max-w-xl items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-card backdrop-blur">
      <span className="text-secondary">🔍</span>
      <input
        aria-label="Search for food spots"
        className="w-full border-none bg-transparent font-medium text-secondary placeholder:text-secondary/60 focus:outline-none"
        placeholder="Search for a hotel, bakery, or street food"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
