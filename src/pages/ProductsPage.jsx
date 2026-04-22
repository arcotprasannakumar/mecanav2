import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <aside className="w-full bg-[#030303] lg:w-[280px] lg:shrink-0 lg:border-r lg:border-[#ccc]">
      <div className="bg-[#030303] px-4 pt-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-[3px] border border-[#141414] bg-black px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.04em] text-white"
        >
          <span>Categories</span>
          <span className="text-base leading-none">{mobileOpen ? "▴" : "▾"}</span>
        </button>
      </div>

      <div
        className={`bg-[#030303] px-5 pb-5 pt-4 transition-all duration-200 lg:block lg:h-full lg:px-4 lg:py-6 ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="space-y-[14px] bg-[#030303]">
          {sidebarCategories.map((category) => {
            const isOpen = openCategory === category.key;
            return (
              <div key={category.key}>
                <button
                  type="button"
                  onClick={() => setOpenCategory((prev) => (prev === category.key ? null : category.key))}
                  aria-expanded={isOpen}
                  className="flex min-h-[52px] w-full items-center justify-between rounded-[3px] border border-[#050505] bg-black px-4 py-2.5 text-left font-['Poppins',sans-serif] text-[13px] font-semibold uppercase leading-5 tracking-[0.02em] text-white transition-colors hover:bg-[#080808]"
                >
                  <span>{category.label}</span>
                  <span className="text-[15px] leading-none text-white">{isOpen ? "▼" : "▶"}</span>
                </button>

                {isOpen ? (
                  <div className="mt-0 border-l-[3px] border-white bg-[#2d2d2d] px-4 pb-2.5 pt-2.5">
                    {category.links.map((link) => (
                      <button
                        key={link.label}
                        type="button"
                        onClick={() => handleLinkClick(link)}
                        className="flex w-full items-start gap-2.5 py-[7px] text-left font-['Poppins',sans-serif] text-[13px] font-light leading-[1.5] text-white transition-colors hover:text-cyan-300"
                      >
                        <span className="mt-[3px] text-[13px] leading-none text-white">▶</span>
                        <span>{link.label}</span>
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
    <div className="flex-1 bg-[#fffafa] p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
        {productCards.map((product) => (
          <button
            key={product.slug}
            type="button"
            onClick={() => navigate(`/products/category/${product.slug}`)}
            className="group overflow-hidden rounded-[8px] border border-[#d1d1d1] bg-[#fffafa] text-left transition-colors hover:border-[#bcbcbc]"
          >
            <div className="h-[200px] overflow-hidden bg-[#eeeeee] sm:h-[230px] xl:h-[260px]">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105 sm:p-10"
              />
            </div>
            <h2 className="min-h-[56px] px-4 py-3 font-['Poppins',sans-serif] text-[18px] font-light leading-8 text-[#111]">
              {product.title}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductsPage() {
  const [openCategory, setOpenCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="border-t border-white bg-[#fffafa] text-black">
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
    </section>
  );
}

export default ProductsPage;
