import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import CategoryTabs from "../components/CategoryTabs";
import ChatWidget from "../components/ChatWidget";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ShopCard from "../components/ShopCard";
import useShops from "../hooks/useShops";
const HomePage = () => {
    const { shops, isLoading, error, filters, setCategory, setSearchTerm, requestLocation } = useShops();
    return (_jsxs("div", { className: "min-h-screen bg-cream", children: [_jsx(AppHeader, { searchTerm: filters.searchTerm, onSearchChange: setSearchTerm, onLocate: requestLocation }), _jsx(CategoryTabs, { active: filters.category, onChange: setCategory }), _jsxs("main", { className: "mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10", children: [isLoading && _jsx(LoadingState, {}), error && _jsx(EmptyState, { message: error }), !isLoading && !error && shops.length === 0 && (_jsx(EmptyState, { message: "No food spots found yet. Try another category or search term." })), _jsx("section", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3", children: shops.map((shop) => (_jsx(ShopCard, { shop: shop }, shop.id))) })] }), _jsx(ChatWidget, {}), _jsx(AppFooter, {})] }));
};
export default HomePage;
