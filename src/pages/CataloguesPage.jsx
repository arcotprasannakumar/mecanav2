import { useMemo, useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { catalogues } from "../data/masterData";
import CatalogueFormGate from "../components/CatalogueFormGate";
import PageMeta from "../components/PageMeta";

const legacyCatalogueOrder = [
  "catalogues1-1",
  "catalogues1-2",
  "catalogues1-3",
  "catalogues1-4",
  "catalogues1-5",
  "catalogues1-14",
  "catalogues1-15",
  "catalogues1-6",
  "catalogues1-9",
  "catalogues1-8",
  "catalogues1-12",
  "catalogues1-10",
  "catalogues1-11",
  "catalogues1-7",
  "catalogues1-13",
];

function triggerFileDownload(fileUrl) {
  if (!fileUrl) {
    return false;
  }

  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  link.remove();

  return true;
}

function CatalogueCard({ title, image, to, onDownload }) {
  return (
    <article className="group relative overflow-hidden bg-[#d7d4d4] transition duration-300 hover:-translate-y-1">
      <div className="relative w-full overflow-hidden bg-[#d7d4d4]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-cover transition duration-300 group-hover:scale-[1.05]"
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-[-60px] flex flex-col justify-center gap-3 opacity-0 transition-all duration-300 group-hover:right-[15px] group-hover:opacity-100">
        <Link
          to={to}
          aria-label={`Preview ${title}`}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-[16px] text-white transition hover:bg-black"
        >
          <FaEye aria-hidden="true" />
        </Link>

        <button
          type="button"
          aria-label={`Download ${title}`}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-[16px] text-white transition hover:bg-black"
          onClick={onDownload}
        >
          <FaDownload aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function CataloguesPage() {
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  const orderedCatalogues = useMemo(() => {
    const orderBySlug = new Map(legacyCatalogueOrder.map((slug, index) => [slug, index]));

    return [...catalogues].sort((first, second) => {
      const firstIndex = orderBySlug.get(first.slug) ?? 999;
      const secondIndex = orderBySlug.get(second.slug) ?? 999;

      return firstIndex - secondIndex;
    });
  }, []);

  const unavailableMessage = useMemo(() => {
    if (!selectedCatalogue || selectedCatalogue.pdfFile) {
      return "";
    }

    return "This catalogue is currently available as a preview. Please contact the Mecanav team for the downloadable PDF.";
  }, [selectedCatalogue]);

  const handleDownload = (catalogue) => {
    setSelectedCatalogue(catalogue);
  };

  const triggerDownload = () => {
    const didDownload = triggerFileDownload(selectedCatalogue?.pdfFile);
    if (didDownload) {
      setSelectedCatalogue(null);
    }
  };

  return (
    <section className="bg-black px-4 pb-10 pt-0 text-black sm:px-6 lg:px-8">
      <PageMeta
        title="Catalogues"
        description="Preview and download Mecanav product catalogues."
      />
      <div className="mx-auto max-w-[1400px] bg-[#d7d4d4] p-5">
        <div className="px-2 pb-8 pt-3 text-center">
          <h1 className="font-['Poppins',sans-serif] text-[24px] font-bold tracking-[0.08em] text-[#010101] sm:text-[28px]">
            <span className="catalogues-typing-heading" style={{ "--typing-characters": 14 }}>
              OUR CATALOGUES
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {orderedCatalogues.map((catalogue) => (
            <CatalogueCard
              key={catalogue.slug}
              title={catalogue.title}
              image={catalogue.cardImage}
              to={`/catalogues/${catalogue.slug}`}
              onDownload={() => handleDownload(catalogue)}
            />
          ))}
        </div>
      </div>

      <CatalogueFormGate
        isOpen={Boolean(selectedCatalogue)}
        onClose={() => setSelectedCatalogue(null)}
        onSubmit={triggerDownload}
        unavailableMessage={unavailableMessage}
        fields={selectedCatalogue?.formFields}
      />
    </section>
  );
}

export default CataloguesPage;
