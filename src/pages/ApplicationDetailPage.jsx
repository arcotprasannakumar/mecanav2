import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationMap } from "../data/masterData";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";

function ApplicationCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images?.length) {
    return null;
  }

  const goPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="w-full flex-none">
            <div className="group relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[500px]">
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                loading={index === activeIndex ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className="absolute left-5 top-1/2 z-10 -translate-y-1/2 bg-transparent text-[34px] text-white transition hover:text-white/75"
            onClick={goPrevious}
          >
            &#10094;
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="absolute right-5 top-1/2 z-10 -translate-y-1/2 bg-transparent text-[34px] text-white transition hover:text-white/75"
            onClick={goNext}
          >
            &#10095;
          </button>
        </>
      ) : null}
    </div>
  );
}
 
function ApplicationDetailPage() {
  const { applicationSlug } = useParams();
  const application = applicationMap[applicationSlug];
 
  if (!application) {
    return (
      <section className="bg-black px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <StatusPanel
            title="Application not found"
            message="The requested application slug is not mapped yet."
            actionLabel="Back to Applications"
            actionTo="/applications"
          />
        </div>
      </section>
    );
  }
 
  return (
    <section className="bg-black text-white">
      <PageMeta
        title={application.title}
        description={application.overview || application.summary || application.title}
      />
 
      <div className="mx-auto max-w-[1300px] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="text-center">
          <h1 className="text-[30px] font-300 leading-none text-white sm:text-[36px] lg:text-[44px]">
            {application.title} Applications
          </h1>
        </div>
 
        <div className="mx-auto mt-10 max-w-[1000px] lg:mt-12">
          <ApplicationCarousel
            images={application.heroImages}
            title={application.title}
          />
        </div>
 
        <div className="mx-auto mt-8 max-w-[860px] text-center lg:mt-10">
          <h2 className="text-[22px] font-semibold leading-tight text-white sm:text-[26px]">
            {application.headline || application.title}
          </h2>
 
          <p className="mx-auto mt-4 max-w-[760px] text-[14px] leading-8 text-white/65 sm:text-[15px]">
            {application.overview ||
              "Explore this lighting application as part of the Mecanav solution range. Contact our team for project-specific design guidance and product recommendations."}
          </p>
        </div>
      </div>
 
      <HomeLegacyPartnersSection />
 
    </section>
  );
}
 
export default ApplicationDetailPage;
