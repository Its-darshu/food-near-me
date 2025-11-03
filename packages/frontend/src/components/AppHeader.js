import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SearchBar from "./SearchBar";
const AppHeader = ({ searchTerm, onSearchChange, onLocate }) => {
    return (_jsx("header", { className: "sticky top-0 z-20 border-b border-white/40 bg-cream/80 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-display text-2xl font-semibold text-secondary sm:text-3xl", children: "Food Near Me" }), _jsx("p", { className: "text-secondary/80", children: "Find and contact the tastiest spots around you." })] }), _jsxs("div", { className: "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center", children: [_jsx(SearchBar, { value: searchTerm, onChange: onSearchChange }), _jsx("button", { type: "button", className: "rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-card", onClick: onLocate, children: "Use my location" })] })] }) }));
};
export default AppHeader;
