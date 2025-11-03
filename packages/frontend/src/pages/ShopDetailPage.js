import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppFooter from "../components/AppFooter";
import ChatWidget from "../components/ChatWidget";
import LoadingState from "../components/LoadingState";
const ShopDetailPage = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchShop = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/shops/${id}`);
                if (!response.ok) {
                    throw new Error("Unable to load shop details");
                }
                const payload = (await response.json());
                setShop(payload);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Unexpected error");
            }
            finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchShop();
        }
    }, [id]);
    if (isLoading) {
        return (_jsxs("div", { className: "min-h-screen bg-cream", children: [_jsx("header", { className: "border-b border-white/50 bg-cream/90 px-6 py-6", children: _jsx("div", { className: "mx-auto flex max-w-5xl items-center justify-between", children: _jsx(Link, { to: "/", className: "text-sm font-semibold text-primary hover:underline", children: "\u2190 Back to results" }) }) }), _jsx("main", { className: "mx-auto max-w-5xl px-6 py-10", children: _jsx(LoadingState, {}) })] }));
    }
    if (error || !shop) {
        return (_jsxs("div", { className: "flex min-h-screen flex-col bg-cream", children: [_jsxs("main", { className: "mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-6 text-center text-secondary", children: [_jsx("h1", { className: "font-display text-2xl font-semibold", children: "We could not find that shop." }), _jsx("p", { className: "text-secondary/70", children: error ?? "Try returning to the main list and selecting a shop again." }), _jsx(Link, { to: "/", className: "rounded-full bg-primary px-5 py-3 font-semibold text-white", children: "Back to home" })] }), _jsx(AppFooter, {})] }));
    }
    const phoneHref = `tel:${shop.contact.phoneNumber}`;
    const whatsappNumber = shop.contact.whatsappNumber ?? shop.contact.phoneNumber;
    const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^+\d]/g, "")}`;
    return (_jsxs("div", { className: "flex min-h-screen flex-col bg-cream", children: [_jsx("header", { className: "border-b border-white/50 bg-cream/90 px-6 py-6", children: _jsx("div", { className: "mx-auto flex max-w-5xl items-center justify-between", children: _jsx(Link, { to: "/", className: "text-sm font-semibold text-primary hover:underline", children: "\u2190 Back to results" }) }) }), _jsxs("main", { className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10", children: [_jsx("div", { className: "overflow-hidden rounded-3xl shadow-card", children: _jsx("img", { src: shop.imageUrl, alt: shop.name, className: "max-h-[420px] w-full object-cover" }) }), _jsxs("section", { className: "rounded-3xl bg-white/90 p-8 shadow-card", children: [_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-display text-3xl font-semibold text-secondary", children: shop.name }), _jsx("p", { className: "text-secondary/70", children: shop.location.address })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary", children: ["\u2B50 ", shop.rating.toFixed(1), " / 5"] }), _jsx("span", { className: "rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary/80", children: shop.category.toUpperCase() })] })] }), _jsx("p", { className: "mt-6 text-secondary/80", children: shop.description ?? "Delicious experiences await you here." }), _jsxs("div", { className: "mt-6 flex flex-wrap gap-4", children: [_jsx("a", { href: phoneHref, className: "flex-1 rounded-full border border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white md:flex-none", children: "\uD83D\uDCDE Call Now" }), _jsx("a", { href: whatsappHref, target: "_blank", rel: "noreferrer", className: "flex-1 rounded-full bg-green-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-600 md:flex-none", children: "\uD83D\uDCAC WhatsApp Now" })] })] }), _jsxs("section", { className: "grid gap-6 md:grid-cols-[2fr,3fr]", children: [_jsxs("div", { className: "rounded-3xl bg-white/90 p-6 shadow-card", children: [_jsx("h2", { className: "font-display text-xl font-semibold text-secondary", children: "Location" }), _jsx("p", { className: "mt-2 text-secondary/70", children: shop.location.address }), _jsx("p", { className: "mt-3 text-sm text-secondary/60", children: "Use the map to navigate or share the location with friends." })] }), _jsx("div", { className: "overflow-hidden rounded-3xl shadow-card", children: _jsx("iframe", { title: `${shop.name} location map`, src: `https://www.google.com/maps?q=${shop.location.latitude},${shop.location.longitude}&z=15&output=embed`, className: "h-64 w-full border-0", loading: "lazy", allowFullScreen: true }) })] })] }), _jsx(ChatWidget, {}), _jsx(AppFooter, {})] }));
};
export default ShopDetailPage;
