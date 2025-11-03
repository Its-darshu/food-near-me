import { Link } from "react-router-dom";
import type { Shop } from "@food-near-me/shared";

interface ShopCardProps {
  shop: Shop;
}

const formatRating = (rating: number) => rating.toFixed(1);

const ShopCard = ({ shop }: ShopCardProps) => {
  const phoneHref = `tel:${shop.contact.phoneNumber}`;
  const whatsappNumber = shop.contact.whatsappNumber ?? shop.contact.phoneNumber;
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^+\d]/g, "")}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white/90 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          alt={shop.name}
          src={shop.imageUrl}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-secondary">
          {shop.tags?.[0] ?? "Featured"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-secondary">
              {shop.name}
            </h3>
            <p className="text-sm text-secondary/70">{shop.location.address}</p>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            ⭐ {formatRating(shop.rating)}
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-secondary/80">{shop.description}</p>
        {typeof shop.location.distanceKm === "number" && (
          <p className="text-sm font-medium text-secondary">
            📍 {shop.location.distanceKm.toFixed(1)} km away
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-3">
          <a
            href={phoneHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary px-4 py-2 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            📞 Call
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
          >
            💬 WhatsApp
          </a>
        </div>
        <Link
          to={`/shops/${shop.id}`}
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          View details →
        </Link>
      </div>
    </article>
  );
};

export default ShopCard;
