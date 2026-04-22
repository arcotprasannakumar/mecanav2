import { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";
import BackToTop from "./components/layout/BackToTop";
import Preloader from "./components/layout/Preloader";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductCategoryPage = lazy(() => import("./pages/ProductCategoryPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage"));
const ApplicationDetailPage = lazy(() => import("./pages/ApplicationDetailPage"));
const CataloguesPage = lazy(() => import("./pages/CataloguesPage"));
const CatalogueDetailPage = lazy(() => import("./pages/CatalogueDetailPage"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function SiteLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(110);
  const isHomePage = location.pathname === "/";
  const isProductsPage =
    location.pathname.startsWith("/products") || location.pathname.startsWith("/product/");
  const isProductDetailPage =
    location.pathname.startsWith("/product/") ||
    /^\/products\/(?!category\/)[^/]+\/?$/.test(location.pathname);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMobileMenuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    const headerElement = document.getElementById("header-section");
    if (!headerElement) {
      return undefined;
    }

    const updateHeaderHeight = () => {
      const nextHeight = Math.round(headerElement.getBoundingClientRect().height);
      if (nextHeight > 0) {
        setHeaderHeight(nextHeight);
      }
    };

    updateHeaderHeight();

    const onResize = () => window.requestAnimationFrame(updateHeaderHeight);
    window.addEventListener("resize", onResize, { passive: true });

    let observer;
    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(updateHeaderHeight);
      observer.observe(headerElement);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <div
      className={`legacy-site-shell min-h-screen bg-black text-white${isHomePage ? " is-home-page" : " is-inner-page"}${isProductsPage ? " is-products-page" : ""}${isProductDetailPage ? " is-product-detail-page" : ""}`}
      style={{ "--site-header-height": `${headerHeight}px` }}
    >
      <div id="thetop" />
      <Preloader />
      <Header
        pathname={location.pathname}
        onMenuToggle={() => setIsMobileMenuOpen(true)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-white">
          <p className="text-sm uppercase tracking-[0.25em] text-white/65">Loading Mecanav...</p>
        </div>
      }
    >
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/category/:slug" element={<ProductCategoryPage />} />
          <Route path="/products/:productSlug" element={<ProductDetailPage />} />
          <Route path="/product/:productSlug" element={<ProductDetailPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route
            path="/applications/:applicationSlug"
            element={<ApplicationDetailPage />}
          />
          <Route path="/catalogues" element={<CataloguesPage />} />
          <Route
            path="/catalogues/:catalogueSlug"
            element={<CatalogueDetailPage />}
          />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
