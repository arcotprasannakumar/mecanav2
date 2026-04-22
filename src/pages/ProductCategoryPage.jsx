import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    <aside className="w-full bg-[#030303] lg:w-[280px] lg:shrink-0 lg:border-r lg:border-[#ccc]">
      <div className="bg-[#030303] px-4 pt-4 lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-[3px] border border-[#141414] bg-black px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.04em] text-white"
          onClick={() => setIsMobileOpen((current) => !current)}
        >
          <span>Categories</span>
          <span className="text-base leading-none">{isMobileOpen ? "▴" : "▾"}</span>
        </button>
      </div>

      <div
        className={`bg-[#030303] px-5 pb-5 pt-4 transition-all duration-200 lg:block lg:h-full lg:px-4 lg:py-6 ${
          isMobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-[14px] bg-[#030303]">
        {categories.map((category) => {
          const isOpen = openCategory === category.slug;
          const items = category.sidebarItems ?? [];
          const count = productCounts[category.slug] ?? 0;

          return (
            <div key={category.slug}>
              <button
                type="button"
                aria-expanded={isOpen}
                className={`flex min-h-[52px] w-full items-center justify-between rounded-[3px] border border-[#050505] bg-black px-4 py-2.5 text-left font-['Poppins',sans-serif] text-[13px] font-semibold uppercase leading-5 tracking-[0.02em] text-white transition-colors hover:bg-[#080808] ${
                  activeCategorySlug === category.slug ? "ring-1 ring-white/25" : ""
                }`}
                onClick={() => toggleCategory(category.slug)}
              >
                <span>{category.title}</span>
                <span className="text-[15px] leading-none text-white">{isOpen ? "▼" : "▶"}</span>
              </button>

              <div
                className={`overflow-hidden border-l-[3px] border-white bg-[#2d2d2d] transition-all duration-300 ${
                  isOpen ? "max-h-[900px] px-4 pb-2.5 pt-2.5 opacity-100" : "max-h-0 px-4 py-0 opacity-0"
                }`}
              >
                <Link
                  to={`/products/category/${category.slug}`}
                  className="flex items-start gap-2.5 py-[7px] font-['Poppins',sans-serif] text-[13px] font-light leading-[1.5] text-white transition-colors hover:text-cyan-300"
                >
                  <span className="mt-[3px] text-[13px] leading-none text-white">▶</span>
                  Browse category
                  {count ? <span className="text-white/45">({count})</span> : null}
                </Link>
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    to={item.to}
                    className="flex items-start gap-2.5 py-[7px] font-['Poppins',sans-serif] text-[13px] font-light leading-[1.5] text-white transition-colors hover:text-cyan-300"
                  >
                    <span className="mt-[3px] text-[13px] leading-none text-white">▶</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </aside>
  );
}

function ProductCard({ title, image, to, className = "", captionClassName = "" }) {
  return (
    <article
      className={`group min-w-0 overflow-hidden rounded-none bg-[#eeeeee] text-left max-lg:mx-auto max-lg:w-full max-lg:max-w-[430px] ${className}`}
    >
      <Link to={to} className="flex h-full min-w-0 flex-col">
        <div className="flex aspect-[1.28/1] min-h-0 items-center justify-center overflow-hidden bg-[#eeeeee]">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105 sm:p-2"
          />
        </div>
        <div className="min-w-0 bg-transparent px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
          <h2
            className={`truncate font-['Poppins',sans-serif] text-[13px] font-light leading-5 text-[#111] sm:text-[14px] ${captionClassName}`}
            title={title}
          >
            {title}
          </h2>
        </div>
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
    <section className="overflow-hidden border-t border-white bg-[#fffafa] text-black">
      <PageMeta title={category.title} description={category.description} />

      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col lg:flex-row">
          <ProductSidebar
            categories={productCategories}
            activeCategorySlug={category.slug}
            productCounts={productCounts}
          />

          <main className="min-w-0 flex-1 bg-[#fffafa] px-5 pb-6 sm:px-6 md:px-8 lg:px-10">
            {displayProducts.length ? (
              <div className="mx-auto mt-10 grid w-full max-w-[1500px] grid-cols-1 gap-x-5 gap-y-8 sm:mt-11 lg:mt-11 lg:grid-cols-2 xl:grid-cols-4">
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
          </main>
        </div>
      </div>
    </section>
  );
}

export default ProductCategoryPage;
