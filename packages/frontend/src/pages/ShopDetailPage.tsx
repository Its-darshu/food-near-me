import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Shop } from "@food-near-me/shared";
import AppFooter from "../components/AppFooter";
import ChatWidget from "../components/ChatWidget";
import LoadingState from "../components/LoadingState";

const ShopDetailPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/shops/${id}`);
        if (!response.ok) {
          throw new Error("Unable to load shop details");
        }
        const payload = (await response.json()) as Shop;
        setShop(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchShop();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="border-b border-white/50 bg-cream/90 px-6 py-6">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <Link to="/" className="text-sm font-semibold text-primary hover:underline">
              ← Back to results
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">
          <LoadingState />
        </main>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="flex min-h-screen flex-col bg-cream">
        <main className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-6 text-center text-secondary">
          <h1 className="font-display text-2xl font-semibold">We could not find that shop.</h1>
          <p className="text-secondary/70">{error ?? "Try returning to the main list and selecting a shop again."}</p>
          <Link to="/" className="rounded-full bg-primary px-5 py-3 font-semibold text-white">
            Back to home
          </Link>
        </main>
        <AppFooter />
      </div>
    );
  }

  const phoneHref = `tel:${shop.contact.phoneNumber}`;
  const whatsappNumber = shop.contact.whatsappNumber ?? shop.contact.phoneNumber;
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^+\d]/g, "")}`;

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-white/50 bg-cream/90 px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">
            ← Back to results
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="overflow-hidden rounded-3xl shadow-card">
          <img src={shop.imageUrl} alt={shop.name} className="max-h-[420px] w-full object-cover" />
        </div>
        <section className="rounded-3xl bg-white/90 p-8 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold text-secondary">{shop.name}</h1>
              <p className="text-secondary/70">{shop.location.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                ⭐ {shop.rating.toFixed(1)} / 5
              </span>
              <span className="rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary/80">
                {shop.category.toUpperCase()}
              </span>
            </div>
          </div>
          <p className="mt-6 text-secondary/80">{shop.description ?? "Delicious experiences await you here."}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={phoneHref}
              className="flex-1 rounded-full border border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white md:flex-none"
            >
              📞 Call Now
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full bg-green-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-600 md:flex-none"
            >
              💬 WhatsApp Now
            </a>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-[2fr,3fr]">
          <div className="rounded-3xl bg-white/90 p-6 shadow-card">
            <h2 className="font-display text-xl font-semibold text-secondary">Location</h2>
            <p className="mt-2 text-secondary/70">{shop.location.address}</p>
            <p className="mt-3 text-sm text-secondary/60">
              Use the map to navigate or share the location with friends.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <iframe
              title={`${shop.name} location map`}
              src={`https://www.google.com/maps?q=${shop.location.latitude},${shop.location.longitude}&z=15&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <ChatWidget />
      <AppFooter />
    </div>
  );
};

export default ShopDetailPage;
