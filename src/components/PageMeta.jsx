import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultOgImage from "../assets/images/banners/allcoverimg.webp";

const SITE_NAME = "Mecanav";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function PageMeta({
  title,
  description,
  image = defaultOgImage,
  type = "website",
  noIndex = false,
}) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const pageDescription =
      description ??
      "Mecanav architectural lighting solutions, facade products, applications, catalogues, and project support.";
    const canonicalUrl = `${window.location.origin}${location.pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: pageDescription });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: pageDescription,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: pageDescription,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, image, location.pathname, noIndex, title, type]);

  return null;
}

export default PageMeta;
