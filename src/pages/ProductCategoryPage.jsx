import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";
import {
  productCategories,
  productCategoryMap,
  productsByCategory,
} from "../data/masterData";

function ProductSidebar({ categories, activeCategorySlug, productCounts = {} }) {
  const initialOpen = useMemo(() => activeCategorySlug ?? null, [activeCategorySlug]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(initialOpen);

  const toggleCategory = (slug) => {
    setOpenCategory((current) => (current === slug ? null : slug));
  };

  return (
    <aside className="w-full border-b border-black/10 bg-[#030303] p-4 lg:min-h-full lg:w-[290px] lg:flex-none lg:border-b-0 lg:border-r lg:border-r-black/10 lg:p-6">
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-md bg-black px-4 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white lg:hidden"
        onClick={() => setIsMobileOpen((current) => !current)}
      >
        Categories
        <span className={`ml-3 transition ${isMobileOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      <div className={`${isMobileOpen ? "mt-4 flex" : "hidden"} flex-col gap-3 lg:mt-0 lg:flex`}>
        {categories.map((category) => {
          const isOpen = openCategory === category.slug;
          const items = category.sidebarItems ?? [];
          const count = productCounts[category.slug] ?? 0;

          return (
            <div key={category.slug}>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-white transition sm:text-sm ${
                  activeCategorySlug === category.slug ? "bg-white/10" : "bg-black hover:scale-[1.02]"
                }`}
                onClick={() => toggleCategory(category.slug)}
              >
                <span>{category.title}</span>
                <span className={`transition ${isOpen ? "rotate-90" : ""}`}>▶</span>
              </button>

              <div
                className={`overflow-hidden rounded-b-md border-l-4 border-l-white bg-[#2e2e2e] transition-all duration-300 ${
                  isOpen ? "mt-0 max-h-[900px] px-4 py-3 opacity-100" : "max-h-0 px-4 py-0 opacity-0"
                }`}
              >
                <Link
                  to={`/products/category/${category.slug}`}
                  className="flex items-center gap-2 py-2 text-[11px] font-light tracking-[0.03em] text-white transition hover:translate-x-1 hover:text-[#00ffe5]"
                >
                  <span className="text-[10px]">▶</span>
                  Browse category
                  {count ? <span className="text-white/45">({count})</span> : null}
                </Link>
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    to={item.to}
                    className="flex items-center gap-2 py-2 text-[11px] font-light tracking-[0.03em] text-white transition hover:translate-x-1 hover:text-[#00ffe5]"
                  >
                    <span className="text-[10px]">▶</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function ProductCard({ title, image, to, className = "", captionClassName = "" }) {
  return (
    <article
      className={`group overflow-hidden rounded-[4px] border-2 border-[#dedede] bg-white ${className}`}
    >
      <Link to={to} className="block h-full">
        <div className="h-[245px] overflow-hidden bg-[#f2f2f2] sm:h-[265px] xl:h-[280px]">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105 sm:p-6"
          />
        </div>
        <h2
          className={`px-4 py-3 font-['Poppins',sans-serif] text-[15px] font-light leading-6 text-[#111] ${captionClassName}`}
        >
          {title}
        </h2>
      </Link>
    </article>
  );
}

function ProductCategoryPage() {
  const { slug } = useParams();
  const category = productCategoryMap[slug] ?? productCategoryMap[slug?.toLowerCase()];
  const categoryProducts = slug ? productsByCategory(slug) : [];
  const displayProducts = categoryProducts.map((product) => ({
    slug: product.slug,
    title: product.title,
    image: product.cardImage ?? category?.image,
    to: `/products/${product.slug}`,
  }));

  const productCounts = Object.fromEntries(
    productCategories.map((item) => [
      item.slug,
      item.sidebarItems?.length || productsByCategory(item.slug).length,
    ]),
  );

  if (!category) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <StatusPanel
          title="Product category not found"
          message="The requested category slug is not mapped yet."
          actionLabel="Back to Products"
          actionTo="/products"
        />
      </section>
    );
  }

  return (
    <section className="bg-[#fffafa] text-black">
      <PageMeta title={category.title} description={category.description} />

      <div className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-[1600px] flex-col lg:flex-row">
        <ProductSidebar
          categories={productCategories}
          activeCategorySlug={category.slug}
          productCounts={productCounts}
        />

        <div className="flex-1 bg-[#fffafa] p-4 sm:p-6 lg:p-8">
          {displayProducts.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  title={product.title}
                  image={product.image}
                  to={product.to}
                />
              ))}
            </div>
          ) : (
            <StatusPanel
              tone="light"
              message="Product details for this category are being prepared. Please contact the Mecanav team for the latest specification support."
              className="mt-8 shadow-none"
            />
          )}
        </div>
      </div>

      {/* <HomeLegacyPartnersSection /> */}
    </section>
  );
}

export default ProductCategoryPage;
