import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { catalogueMap } from "../data/masterData";
import CatalogueFormGate from "../components/CatalogueFormGate";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";

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

function CataloguePreview({ flipbookUrl, title }) {
  return (
    <div className="mx-auto max-w-[1180px] space-y-4">
      <div className="hidden h-[82vh] w-full overflow-hidden rounded-[12px] shadow-[0_0_25px_rgba(255,255,255,0.1)] md:block">
        <iframe
          title={`${title} preview`}
          src={flipbookUrl}
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>

      <div className="rounded-[12px] border border-white/10 bg-white/5 p-5 text-left text-white md:hidden">
        <p className="text-sm leading-7 text-white/70">
          For the best mobile experience, open this catalogue in the full-screen flipbook viewer.
        </p>
        <a
          href={flipbookUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
        >
          Open Flipbook Preview
        </a>
      </div>
    </div>
  );
}

function CatalogueDetailPage() {
  const { catalogueSlug } = useParams();
  const catalogue = catalogueMap[catalogueSlug];
  const [isGateOpen, setIsGateOpen] = useState(false);

  const unavailableMessage = useMemo(() => {
    if (!catalogue || catalogue.pdfFile) {
      return "";
    }

    return "This catalogue preview is available now. Please contact the Mecanav team for the downloadable PDF.";
  }, [catalogue]);

  if (!catalogue) {
    return (
      <section className="bg-[#0f0f0f] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <StatusPanel
            title="Catalogue not found"
            message="The requested catalogue slug is not mapped yet."
            actionLabel="Back to Catalogues"
            actionTo="/catalogues"
          />
        </div>
      </section>
    );
  }

  const triggerDownload = () => {
    const didDownload = triggerFileDownload(catalogue.pdfFile);
    if (didDownload) {
      setIsGateOpen(false);
    }
  };

  return (
    <section className="bg-[#0f0f0f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <PageMeta
        title={catalogue.title}
        description={catalogue.summary}
      />
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          <Link to="/catalogues" className="hover:text-white">
            Catalogues
          </Link>
          <span>/</span>
          <span className="text-white/75">{catalogue.title}</span>
        </div>

        <div className="mx-auto max-w-[1240px]">
          <div>
            <CataloguePreview flipbookUrl={catalogue.flipbookUrl} title={catalogue.title} />
          </div>
        </div>
      </div>

      <CatalogueFormGate
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onSubmit={triggerDownload}
        unavailableMessage={unavailableMessage}
        fields={catalogue.formFields}
      />
      <HomeLegacyPartnersSection />
    </section>
  );
}

export default CatalogueDetailPage;
