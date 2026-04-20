import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";
import { productCategoryMap, productMap } from "../data/masterData";

const tabs = [
  { id: "info", label: "Product Info" },
  { id: "gallery", label: "Gallery" },
  { id: "downloads", label: "Downloads" },
];

function ProductGallery({ images, title }) {
  if (!images.length) {
    return (
      <div className="rounded-[6px] bg-[#b3b3b3] px-6 py-6 text-sm text-black/80">
        <h2 className="mb-4 text-lg font-semibold text-black">Gallery</h2>
        Gallery not available for this product yet.
      </div>
    );
  }

  return (
    <div className="rounded-[6px] bg-[#b3b3b3] px-5 py-6 text-black sm:px-6">
      <h2 className="mb-4 text-lg font-semibold text-black">Gallery</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="aspect-square overflow-hidden rounded-[6px] bg-[#f1f1f1]"
          >
            <img
              src={image}
              alt={`${title} gallery image ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain p-2 sm:p-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductSpecsTable({ specs }) {
  return (
    <div className="overflow-hidden border border-white/10 bg-black shadow-[0_0_28px_rgba(255,255,255,0.05)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#242424] text-left text-white">
              <th className="border-r border-white/10 px-5 py-4 text-sm font-semibold uppercase">
                Feature
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={`${spec.feature}-${index}`}
                className={`group transition duration-300 hover:relative hover:z-[1] hover:shadow-[0_0_22px_rgba(255,255,255,0.22)] ${
                  index % 2 === 0 ? "bg-[#090909]" : "bg-[#171717]"
                }`}
              >
                <td className="border-r border-white/10 px-5 py-4 text-sm font-semibold uppercase text-white/60 transition duration-300 group-hover:text-white">
                  {spec.feature}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-white/90">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductShowcasePanel({ title, image }) {
  if (!image) {
    return null;
  }

  return (
    <section className="product-detail-showcase mx-auto mt-12 w-full max-w-6xl overflow-hidden rounded-[8px] bg-[#4a4949] px-6 py-10 text-white sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-4xl font-light text-white/70 sm:text-6xl">
            {title}
          </h2>
        </div>

        <div className="relative flex min-h-[260px] items-center justify-end">
          <div className="product-detail-showcase-glow" />
          <img
            src={image}
            alt={title}
            className="product-detail-showcase-image relative z-[1] max-h-[330px] w-full max-w-[560px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function RevealOnScroll({ children, from = "bottom", delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const hiddenClass =
    from === "left" ? "-translate-x-12 opacity-0" : "translate-y-12 opacity-0";

  return (
    <div
      ref={sectionRef}
      className={`transform-gpu transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? "translate-x-0 translate-y-0 opacity-100" : hiddenClass
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProductDetailPage() {
  const { productSlug } = useParams();
  const product = productMap[productSlug] ?? productMap[productSlug?.toLowerCase()];
  const category = product
    ? productCategoryMap[product.categorySlug] ?? productCategoryMap[product.categorySlug?.toLowerCase()]
    : null;

  const [activeTab, setActiveTab] = useState("info");
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeInstructions, setActiveInstructions] = useState(null);

  useEffect(() => {
    setActiveHeroIndex(0);
    setActiveTab("info");
    setActiveInstructions(null);
  }, [productSlug]);

  const heroImages = useMemo(
    () => (product?.heroImages?.length ? product.heroImages : [product?.cardImage].filter(Boolean)),
    [product],
  );

  const galleryImages = useMemo(
    () => [...new Set((product?.gallery ?? []).filter(Boolean))],
    [product],
  );

  useEffect(() => {
    if (!heroImages.length || heroImages.length === 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [heroImages]);

  const handlePrevHero = () => {
    setActiveHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    setActiveHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId !== "downloads") {
      setActiveInstructions(null);
    }
  };

  if (!product) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <StatusPanel
          title="Product not found"
          message="This product slug is not mapped yet."
          actionLabel="Back to Products"
          actionTo="/products"
        />
      </section>
    );
  }

  const activeHeroImage = heroImages[activeHeroIndex] ?? heroImages[0] ?? null;
  const cta = product.cta ?? { label: "Explore Features", href: "#product-tabs" };
  const documents = product.documents ?? [];
  const technicalSpecs = product.technicalSpecs?.length
    ? product.technicalSpecs
    : [{ feature: "Product", value: product.title }];

  return (
    <section className="bg-black text-white">
      <PageMeta title={product.title} description={product.description} type="product" />

      <div className="mx-auto w-full max-w-[1320px] px-4 pb-8 pt-2 sm:px-6 sm:pt-3 lg:px-8 lg:pb-12 lg:pt-4">
        <RevealOnScroll>
          <section className="relative mt-1 overflow-hidden bg-black sm:mt-2 lg:mt-3">
            <div className="relative h-[220px] sm:h-[280px] lg:h-[340px]">
              {heroImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={handlePrevHero}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-3xl font-light text-white/85 transition hover:text-white sm:left-6"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={handleNextHero}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-3xl font-light text-white/85 transition hover:text-white sm:right-6"
                  >
                    ›
                  </button>
                </>
              ) : null}

              <div className="h-[220px] w-full sm:h-[280px] lg:h-[340px]">
                {activeHeroImage ? (
                  <img
                    src={activeHeroImage}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                ) : null}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <section className="mt-8 max-w-5xl">
            <h1 className="font-['Poppins',sans-serif] text-xl font-light leading-snug text-white sm:text-3xl">
              {product.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 sm:text-base">
              {product.description}
            </p>

            <a
              href={cta.href}
              className="mt-6 inline-flex w-fit items-center rounded-[8px] bg-[#f1ece9] px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-white"
            >
              {cta.label}
            </a>
          </section>
        </RevealOnScroll>

        <RevealOnScroll from="left" delay={120}>
          <section className="mt-12">
            <h2 className="font-['Poppins',sans-serif] text-lg font-light text-white sm:text-2xl">
              Overview
            </h2>

            <p className="mt-2 max-w-5xl text-xs leading-5 text-white/80 sm:text-sm">
              {product.overview}
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <section className="mt-8">
            <div
              id="product-tabs"
              className="flex flex-wrap gap-3"
              role="tablist"
              aria-label="Product detail sections"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  className={`rounded-[8px] border px-6 py-3 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "border-[#b8b3b0] bg-[#b8b3b0] text-black"
                      : "border-white/70 bg-transparent text-white hover:border-white"
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {activeTab === "info" ? (
                <RevealOnScroll key={`info-${productSlug}`}>
                  <div
                    id="panel-info"
                    role="tabpanel"
                    aria-labelledby="tab-info"
                    className="space-y-4"
                  >
                    <div className="mx-auto w-full max-w-7xl rounded-[8px] bg-[#b7b3b3] px-5 py-5 text-black sm:px-6">
                      <h3 className="text-base font-semibold sm:text-lg">Product Information</h3>
                      <p className="mt-2 text-[11px] leading-5 text-black/90 sm:text-xs">
                        {product.productInfo}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ) : null}

              {activeTab === "gallery" ? (
                <RevealOnScroll key={`gallery-${productSlug}`}>
                  <div id="panel-gallery" role="tabpanel" aria-labelledby="tab-gallery">
                    <ProductGallery images={galleryImages} title={product.title} />
                  </div>
                </RevealOnScroll>
              ) : null}

              {activeTab === "downloads" ? (
                <RevealOnScroll key={`downloads-${productSlug}`}>
                  <div id="panel-downloads" role="tabpanel" aria-labelledby="tab-downloads">
                    <div className="mt-6 rounded-[8px] bg-[#b8b3b3] px-5 py-5 sm:px-6 sm:py-6">
                      <h2 className="font-['Poppins',sans-serif] text-xl font-semibold text-black">
                        Downloads
                      </h2>

                      {documents.length ? (
                        <>
                          <div className="mt-3 flex flex-col gap-1">
                            {documents.map((document) => {
                              if ((document.action === "download" || document.href) && document.href) {
                                return (
                                  <a
                                    key={document.label}
                                    href={document.href}
                                    download={document.action === "download" ? true : undefined}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-fit text-base text-black/80 transition hover:text-black hover:underline"
                                  >
                                    {document.label}
                                  </a>
                                );
                              }

                              if (document.action === "instructions") {
                                return (
                                  <button
                                    key={document.label}
                                    type="button"
                                    onClick={() =>
                                      setActiveInstructions(
                                        activeInstructions === document.label ? null : document.label,
                                      )
                                    }
                                    className="w-fit text-left text-base text-black/80 transition hover:text-black hover:underline"
                                  >
                                    {document.label}
                                  </button>
                                );
                              }

                              return null;
                            })}
                          </div>

                          {documents.map((document) =>
                            document.action === "instructions" &&
                            activeInstructions === document.label ? (
                              <div
                                key={`${document.label}-content`}
                                className="mt-4 rounded-[8px] bg-black/10 px-4 py-4"
                              >
                                <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-black">
                                  {document.label}
                                </h3>

                                <div className="mt-2 space-y-2">
                                  {document.instructions?.map((item, index) => (
                                    <p key={`${document.label}-${index}`} className="text-sm leading-6 text-black/80">
                                      {index + 1}. {item}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            ) : null,
                          )}
                        </>
                      ) : (
                        <p className="mt-3 text-base text-black/80">
                          No downloadable documents are linked for this product yet.
                        </p>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ) : null}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <section className="mt-14">
            <h2 className="text-center font-['Poppins',sans-serif] text-4xl font-light text-white sm:text-3xl">
              Specifications
            </h2>

            <div className="mx-auto mt-8 w-full max-w-4xl px-4">
              <ProductSpecsTable specs={technicalSpecs} />
            </div>
          </section>
        </RevealOnScroll>

        <ProductShowcasePanel
          title={category?.title ?? "Product Family"}
          image={category?.showcaseImage ?? category?.image ?? product.cardImage}
        />
      </div>

      {/* <HomeLegacyPartnersSection /> */}
    </section>
  );
}

export default ProductDetailPage;
