import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SearchBar = ({ value, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (_jsxs("div", { className: "flex w-full max-w-xl items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-card backdrop-blur", children: [_jsx("span", { className: "text-secondary", children: "\uD83D\uDD0D" }), _jsx("input", { "aria-label": "Search for food spots", className: "w-full border-none bg-transparent font-medium text-secondary placeholder:text-secondary/60 focus:outline-none", placeholder: "Search for a hotel, bakery, or street food", value: value, onChange: handleChange })] }));
};
export default SearchBar;
