import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import CategoryTabs from "../components/CategoryTabs";
import ChatWidget from "../components/ChatWidget";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ShopCard from "../components/ShopCard";
import useShops from "../hooks/useShops";

const HomePage = () => {
  const { shops, isLoading, error, filters, setCategory, setSearchTerm, requestLocation } =
    useShops();

  return (
    <div className="min-h-screen bg-cream">
      <AppHeader
        searchTerm={filters.searchTerm}
        onSearchChange={setSearchTerm}
        onLocate={requestLocation}
      />
      <CategoryTabs active={filters.category} onChange={setCategory} />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        {isLoading && <LoadingState />}
        {error && <EmptyState message={error} />}
        {!isLoading && !error && shops.length === 0 && (
          <EmptyState message="No food spots found yet. Try another category or search term." />
        )}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </section>
      </main>
      <ChatWidget />
      <AppFooter />
    </div>
  );
};

export default HomePage;
