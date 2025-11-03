import type { CategoryFilter } from "../hooks/useShops";

const categories: { id: CategoryFilter; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "hotel", label: "Hotels", emoji: "🍴" },
  { id: "bakery", label: "Bakeries", emoji: "🧁" },
  { id: "street-food", label: "Street Food", emoji: "🌮" },
  { id: "other", label: "Other Shops", emoji: "🥤" }
];

interface CategoryTabsProps {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

const CategoryTabs = ({ active, onChange }: CategoryTabsProps) => (
  <nav className="sticky top-[92px] z-10 flex gap-3 overflow-x-auto border-y border-white/40 bg-cream/90 px-6 py-4 backdrop-blur">
    {categories.map((category) => {
      const isActive = category.id === active;
      return (
        <button
          key={category.id}
          type="button"
          className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
            isActive
              ? "bg-primary text-white shadow-card"
              : "bg-white/70 text-secondary hover:bg-white"
          }`}
          onClick={() => onChange(category.id)}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.label}
        </button>
      );
    })}
  </nav>
);

export default CategoryTabs;
