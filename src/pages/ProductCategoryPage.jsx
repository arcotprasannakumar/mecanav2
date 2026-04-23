import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";
import {
  productCategories,
  productCategoryMap,
  productsByCategory,
} from "../data/masterData";

function ProductSidebar({ categories, activeCategorySlug, productCounts = {} }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (slug) => {
    setOpenCategory((current) => (current === slug ? null : slug));
  };

  return (
    <aside className="w-full bg-[#030303] p-4 lg:w-[280px] lg:shrink-0 lg:border-r lg:border-[#ccc] lg:px-4 lg:py-6">
      <div className="bg-[#030303]">
        <button
          type="button"
          className="flex items-center gap-1.5 bg-transparent p-0 text-left font-['Poppins',sans-serif] text-[14px] font-normal normal-case leading-none text-white"
          onClick={() => setIsMobileOpen((current) => !current)}
        >
          <span>Categories</span>
          <span className="text-[10px] leading-none">{isMobileOpen ? "▴" : "▾"}</span>
        </button>
      </div>

      <div
        className={`bg-[#030303] pt-3 transition-all duration-200 lg:block ${
          isMobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-4 bg-[#030303]">
        {categories.map((category) => {
          const isOpen = openCategory === category.slug;
          const items = category.sidebarItems ?? [];
          const count = productCounts[category.slug] ?? 0;

          return (
            <div key={category.slug}>
              <button
                type="button"
                aria-expanded={isOpen}
                className="flex min-h-[42px] w-full items-center justify-between rounded-[6px] bg-black px-4 py-[0.7rem] text-left font-['Poppins',sans-serif] text-[13px] font-bold uppercase leading-[1.2] text-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:scale-[1.03] hover:bg-[#050505]"
                onClick={() => toggleCategory(category.slug)}
              >
                <span className="min-w-0 pr-3">{category.title}</span>
                <span className="shrink-0 text-[13px] leading-none text-white">{isOpen ? "▾" : "▶"}</span>
              </button>

              <div
                className={`overflow-hidden border-l-[3px] border-white bg-[#2e2e2e] transition-all duration-300 ${
                  isOpen ? "max-h-[900px] rounded-b-[6px] px-4 pb-2 pt-2 opacity-100" : "max-h-0 px-4 py-0 opacity-0"
                }`}
              >
                <Link
                  to={`/products/category/${category.slug}`}
                  className="flex items-start gap-1.5 py-[0.4rem] font-['Helvetica Neue',Helvetica,Arial,sans-serif] text-[12px] font-extralight leading-[1.45] tracking-[0.3px] text-white transition-colors hover:text-cyan-300"
                >
                  <span className="mt-[3px] text-[13px] leading-none text-white">▶</span>
                  Browse category
                  {count ? <span className="text-white/45">({count})</span> : null}
                </Link>
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    to={item.to}
                    className="flex items-start gap-1.5 py-[0.4rem] font-['Helvetica Neue',Helvetica,Arial,sans-serif] text-[12px] font-extralight leading-[1.45] tracking-[0.3px] text-white transition-colors hover:text-cyan-300"
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

function ProductCard({ title, image, to }) {
  return (
    <article className="group relative min-w-0 overflow-hidden bg-[#eeeeee] text-left transition-transform duration-300">
      <Link to={to} className="relative block aspect-[1/1] h-full min-w-0 overflow-hidden bg-[#eeeeee]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <h2
          className="absolute bottom-0 left-0 m-0 w-full px-2 py-[0.7rem] text-left font-['Poppins',sans-serif] text-[15px] font-light leading-[1.5] text-[#6e6e6e] transition-colors"
          title={title}
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
    <section className="overflow-hidden border-t border-white bg-[#fffafa] text-black">
      <PageMeta title={category.title} description={category.description} />

      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col lg:flex-row">
          <ProductSidebar
            categories={productCategories}
            activeCategorySlug={category.slug}
            productCounts={productCounts}
          />

          <main className="min-w-0 flex-1 bg-[#fffafa] px-4 pb-4 sm:px-8 sm:pb-8">
            {displayProducts.length ? (
              <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 xl:grid-cols-4">
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
