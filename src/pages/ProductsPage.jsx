import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import { productCategories } from "../data/masterData";
import PageMeta from "../components/PageMeta";

const sidebarCategories = productCategories.map((category) => {
  const links = category.sidebarItems?.length
    ? category.sidebarItems.map((item) => ({
        label: item.label,
        slug: item.slug,
        to: item.to,
      }))
    : [{ label: `View ${category.title} Products`, to: `/products/category/${category.slug}` }];

  return {
    key: category.slug,
    label: category.title,
    links,
  };
});

function SidebarCategories({ openCategory, setOpenCategory, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    if (link.to) {
      navigate(link.to);
      return;
    }
    navigate(`/products/${link.slug}`);
  };

  return (
    <aside className="w-full lg:w-[280px] lg:shrink-0 lg:border-r lg:border-white/10">
      <div className="px-4 pt-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full rounded-md bg-black px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] text-white"
        >
          Categories {mobileOpen ? "▴" : "▾"}
        </button>
      </div>

      <div
        className={`bg-black px-4 py-4 transition-all duration-200 lg:block lg:h-full ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="space-y-2">
          {sidebarCategories.map((category) => {
            const isOpen = openCategory === category.key;
            return (
              <div key={category.key}>
                <button
                  type="button"
                  onClick={() => setOpenCategory((prev) => (prev === category.key ? null : category.key))}
                  className="flex w-full items-center justify-between rounded-md bg-black px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.06em] text-white transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span>{category.label}</span>
                  <span className={`text-xs transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
                </button>

                {isOpen ? (
                  <div className="ml-2 mt-2 rounded-md border-l-2 border-white/65 bg-[#2e2e2e] py-2 pl-4 pr-2">
                    {category.links.map((link) => (
                      <button
                        key={link.label}
                        type="button"
                        onClick={() => handleLinkClick(link)}
                        className="block w-full py-1.5 text-left text-xs font-light text-white/90 transition-colors hover:text-cyan-300"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function ProductsGrid() {
  const navigate = useNavigate();
  const productCards = useMemo(
    () =>
      productCategories.map((category) => ({
        slug: category.slug,
        title: category.title,
        image: category.image,
      })),
    [],
  );

  return (
    <div className="flex-1 bg-[#f5f5f5] p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {productCards.map((product) => (
          <button
            key={product.slug}
            type="button"
            onClick={() => navigate(`/products/category/${product.slug}`)}
            className="group overflow-hidden rounded-[4px] border-2 border-[#dedede] bg-white text-left"
          >
            <div className="h-[245px] overflow-hidden bg-[#f2f2f2] sm:h-[265px] xl:h-[280px]">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h2 className="px-4 py-3 text-[15px] font-light leading-6 text-[#111]">
              {product.title}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductsPage() {
  const [openCategory, setOpenCategory] = useState("pixel-led-strip");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="bg-[#f5f5f5] text-black">
      <PageMeta
        title="Products"
        description="Explore Mecanav product categories and listings."
      />
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col lg:flex-row">
          <SidebarCategories
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
          <ProductsGrid />
        </div>
      </div>
      {/* <HomeLegacyPartnersSection /> */}
    </section>
  );
}

export default ProductsPage;
