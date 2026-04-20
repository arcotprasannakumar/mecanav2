

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { applications } from "../data/masterData";
import PageMeta from "../components/PageMeta";

const SIDEBAR_WIDTH = 360;
const SIDEBAR_TOP = 120;
const SIDEBAR_GAP = 70;
function ApplicationsPage() {
  const [activeSlug, setActiveSlug] = useState(applications[0]?.slug ?? null);
  const [sidebarMode, setSidebarMode] = useState("static"); // static | fixed | bottom
  const [sidebarLeft, setSidebarLeft] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const sections = applications
      .map((application) => document.getElementById(application.slug))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSlug(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateSidebar = () => {
      if (!sectionRef.current || !gridRef.current || !sidebarRef.current) {
        return;
      }

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const gridRect = gridRef.current.getBoundingClientRect();
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionBottom = sectionTop + sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const startStick = sectionTop - SIDEBAR_TOP;
      const stopStick = sectionBottom - sidebarHeight - SIDEBAR_TOP;

      setSidebarLeft(gridRect.left);

      if (window.innerWidth < 1024) {
        setSidebarMode("static");
        setBottomOffset(0);
        return;
      }

      if (scrollY < startStick) {
        setSidebarMode("static");
        setBottomOffset(0);
      } else if (scrollY >= startStick && scrollY < stopStick) {
        setSidebarMode("fixed");
        setBottomOffset(0);
      } else {
        setSidebarMode("bottom");
        const offset = Math.max(
          0,
          sectionRef.current.offsetHeight - sidebarHeight
        );
        setBottomOffset(offset);
      }
    };

    updateSidebar();
    window.addEventListener("scroll", updateSidebar, { passive: true });
    window.addEventListener("resize", updateSidebar);

    return () => {
      window.removeEventListener("scroll", updateSidebar);
      window.removeEventListener("resize", updateSidebar);
    };
  }, []);

  const scrollToApplication = (slug) => {
    setActiveSlug(slug);
    document.getElementById(slug)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const desktopSidebarClassName =
    sidebarMode === "fixed"
      ? "fixed"
      : sidebarMode === "bottom"
        ? "absolute"
        : "relative";

  const desktopSidebarStyle =
    sidebarMode === "fixed"
      ? {
          top: `${SIDEBAR_TOP}px`,
          left: `${sidebarLeft}px`,
          width: `${SIDEBAR_WIDTH}px`,
        }
      : sidebarMode === "bottom"
        ? {
            top: `${bottomOffset}px`,
            left: 0,
            width: `${SIDEBAR_WIDTH}px`,
          }
        : {
            width: `${SIDEBAR_WIDTH}px`,
          };

  return (
    <section className="bg-black pt-0 text-white">
      <PageMeta
        title="Applications"
        description="Explore Mecanav lighting applications across bridges, parks, facades, stages, and public environments."
      />

      <div className="px-5 pb-5 pt-1 sm:px-8 lg:px-10">
        <h1 className="text-left text-[32px] font-light leading-none text-white sm:text-[48px] lg:text-[64px]">
          Applications
        </h1>
      </div>

      <div className="mx-auto max-w-[1700px] bg-[#f3efef] px-4 pb-16 pt-8 sm:px-6 lg:px-7 lg:pb-24 lg:pt-8">
        <div
          ref={sectionRef}
          className="relative"
        >
          <div
            ref={gridRef}
            className="grid items-start gap-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-[70px]"
          >
            <aside className="hidden lg:block">
              <div className="h-full">
                <div
                  ref={sidebarRef}
                  className={`${desktopSidebarClassName} bg-black`}
                  style={desktopSidebarStyle}
                >
                  <ul>
                    {applications.map((application) => (
                      <li
                        key={application.slug}
                        className={`border-l-[8px] transition-all duration-300 ${
                          activeSlug === application.slug
                            ? "border-l-[#6d6d6d] bg-white text-black"
                            : "border-l-transparent bg-black text-white hover:bg-[#111]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => scrollToApplication(application.slug)}
                          className="block w-full px-6 py-7 text-left text-[18px] font-normal leading-none"
                        >
                          {application.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <div className="min-w-0 lg:ml-0">
              <div className="mb-5 lg:hidden">
                <ul className="flex overflow-x-auto whitespace-nowrap bg-black">
                  {applications.map((application) => (
                    <li
                      key={application.slug}
                      className={`border-b-[3px] transition-all duration-300 ${
                        activeSlug === application.slug
                          ? "border-b-white bg-white text-black"
                          : "border-b-transparent bg-black text-white hover:bg-[#111]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToApplication(application.slug)}
                        className="block px-5 py-4 text-left text-[15px] font-normal leading-none sm:text-[17px]"
                      >
                        {application.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {applications.map((application) => (
                <section
                  key={application.slug}
                  id={application.slug}
                  className="mb-16 scroll-mt-[140px] lg:mb-[78px]"
                >
                  <h2 className="mb-10 text-[20px] font-light leading-none tracking-[-0.02em] text-[#7a7a7a] sm:text-[34px] lg:text-[32px]">
                    {application.title}
                  </h2>

                  <Link
                    to={`/applications/${application.slug}`}
                    className="group relative block w-[92%] overflow-hidden"
                  >
                    <div className="relative aspect-[16/9] w-full bg-black">
                      <img
                        src={application.cardImage}
                        alt={application.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                      <span className="inline-flex min-w-[170px] items-center justify-center bg-white px-8 py-5 text-[18px] text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                        Know More
                      </span>
                    </div>
                  </Link>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationsPage;
