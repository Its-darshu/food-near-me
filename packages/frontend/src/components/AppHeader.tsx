import SearchBar from "./SearchBar";

interface AppHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onLocate: () => void;
}

const AppHeader = ({ searchTerm, onSearchChange, onLocate }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-secondary sm:text-3xl">
            Food Near Me
          </h1>
          <p className="text-secondary/80">Find and contact the tastiest spots around you.</p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <SearchBar value={searchTerm} onChange={onSearchChange} />
          <button
            type="button"
            className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-card"
            onClick={onLocate}
          >
            Use my location
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
