import { useEffect, useState } from "react";
import projectBackground from "../assets/images/applications/Bridge-lighting-homepage-final.webp";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import PageMeta from "../components/PageMeta";

function ComingSoonHero({ backgroundImage, title, subtitle }) {
  const [typedTitle, setTypedTitle] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let titleIndex = 0;
    let subtitleTimer;

    const typeTitle = setInterval(() => {
      if (titleIndex < title.length) {
        setTypedTitle(title.slice(0, titleIndex + 1));
        titleIndex += 1;
      } else {
        clearInterval(typeTitle);

        subtitleTimer = setTimeout(() => {
          setShowSubtitle(true);
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(typeTitle);
      clearTimeout(subtitleTimer);
    };
  }, [title]);

  return (
    <section
      className="relative flex min-h-[calc(100vh-110px)] items-center justify-center overflow-hidden px-4 py-16 text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/65 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />

      <div className="relative z-[1] w-full max-w-4xl px-5">
        <h1 className="text-[28px] font-semibold text-white sm:text-[34px] lg:text-[42px]">
          {typedTitle}
          <span className="ml-4 inline-block animate-pulse">|</span>
        </h1>

        <p
          className={`mt-2 text-[15px] text-white/90 transition-all duration-700 ease-out sm:text-[17px] lg:text-[19px] ${
            showSubtitle ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageMeta
        title="Projects"
        description="Mecanav project showcase coming soon."
      />

      <ComingSoonHero
        backgroundImage={projectBackground}
        title="Coming Soon..."
        subtitle="We're working on something awesome."
      />

      {/* <HomeLegacyPartnersSection /> */}
    </>
  );
}

export default ProjectsPage;
