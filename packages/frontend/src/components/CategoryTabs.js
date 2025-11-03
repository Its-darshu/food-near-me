import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const categories = [
    { id: "all", label: "All", emoji: "✨" },
    { id: "hotel", label: "Hotels", emoji: "🍴" },
    { id: "bakery", label: "Bakeries", emoji: "🧁" },
    { id: "street-food", label: "Street Food", emoji: "🌮" },
    { id: "other", label: "Other Shops", emoji: "🥤" }
];
const CategoryTabs = ({ active, onChange }) => (_jsx("nav", { className: "sticky top-[92px] z-10 flex gap-3 overflow-x-auto border-y border-white/40 bg-cream/90 px-6 py-4 backdrop-blur", children: categories.map((category) => {
        const isActive = category.id === active;
        return (_jsxs("button", { type: "button", className: `whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${isActive
                ? "bg-primary text-white shadow-card"
                : "bg-white/70 text-secondary hover:bg-white"}`, onClick: () => onChange(category.id), children: [_jsx("span", { className: "mr-2", children: category.emoji }), category.label] }, category.id));
    }) }));
export default CategoryTabs;
