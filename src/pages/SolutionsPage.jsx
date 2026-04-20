import { useEffect, useState } from "react";
import solutionBackground from "../assets/images/applications/architectural-light-innerpage-final-001.webp";
import PageMeta from "../components/PageMeta";
 
function SolutionsPage() {
  const fullTitle = "Coming Soon...";
  const [typedTitle, setTypedTitle] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
 
  useEffect(() => {
    let titleIndex = 0;
    let subtitleTimer;
 
    const typeTitle = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, titleIndex + 1));
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
  }, []);
 
  return (
    <>
      <PageMeta
        title="Solutions"
        description="Mecanav solutions page. The migrated React route is live and the original page content remains a coming soon state."
      />
 
      <section
        className="relative flex min-h-[520px] items-end justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${solutionBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
 
        <div className="relative z-10 w-full px-4 pb-28 text-center sm:px-6 sm:pb-32 lg:px-8 lg:pb-36">
          <h1 className="text-[28px] font-semibold text-white sm:text-[34px] lg:text-[42px]">
            {typedTitle}
            <span className="ml-4 inline-block animate-pulse">|</span>
          </h1>
 
          <p
            className={`mt-2 text-[15px] text-white/90 transition-all duration-700 ease-out sm:text-[17px] lg:text-[19px] ${
              showSubtitle ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            We're working on something awesome.
          </p>
        </div>
      </section>
    </>
  );
}
 
export default SolutionsPage;