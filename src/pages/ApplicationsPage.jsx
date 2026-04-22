

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { applications } from "../data/masterData";
import PageMeta from "../components/PageMeta";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_TOP = 80;

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

      if (window.innerWidth < 1024) {
        setSidebarMode("static");
        setSidebarLeft(0);
        setBottomOffset(0);
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

      if (scrollY < startStick) {
        setSidebarMode("static");
        setBottomOffset(0);
      } else if (scrollY >= startStick && scrollY < stopStick) {
        setSidebarMode("fixed");
        setBottomOffset(0);
      } else {
        setSidebarMode("bottom");
        setBottomOffset(Math.max(0, sectionRef.current.offsetHeight - sidebarHeight));
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

      <div className="px-5 pb-3 pt-0 sm:px-8 lg:px-10">
        <h1 className="text-left text-[32px] font-light leading-none text-white sm:text-[42px] lg:text-[48px]">
          Applications
        </h1>
      </div>

      <div className="mx-auto max-w-[1400px] bg-[#f6f2f2] px-5 pb-20 pt-[50px] sm:px-7 lg:px-[60px]">
        <div ref={sectionRef} className="relative">
          <div ref={gridRef} className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-[60px]">
            <aside className="hidden lg:block">
              <div
                ref={sidebarRef}
                className={`${desktopSidebarClassName} h-fit bg-black`}
                style={desktopSidebarStyle}
              >
                  <ul>
                    {applications.map((application) => (
                      <li
                        key={application.slug}
                        className={`border-l-[6px] transition-all duration-300 ${
                          activeSlug === application.slug
                            ? "border-l-[#615f5f] bg-white text-black"
                            : "border-l-transparent bg-black text-white hover:bg-[#111]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => scrollToApplication(application.slug)}
                          className="block w-full px-3 py-3 text-left text-[14px] font-normal leading-none"
                        >
                          {application.title}
                        </button>
                      </li>
                    ))}
                  </ul>
              </div>
            </aside>

            <div className="min-w-0 lg:ml-0">
              <div className="mb-5 lg:hidden">
                <ul className="flex gap-2 overflow-x-auto whitespace-nowrap rounded-[12px] bg-[#111] p-2">
                  {applications.map((application) => (
                    <li
                      key={application.slug}
                      className={`border-b-[3px] transition-all duration-300 ${
                        activeSlug === application.slug
                          ? "border-b-white bg-white text-black"
                          : "border-b-transparent bg-[#222] text-white hover:bg-black"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToApplication(application.slug)}
                        className="block rounded-full px-4 py-2 text-left text-[14px] font-normal leading-none"
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
                  className="mb-[60px] scroll-mt-[110px] lg:mb-[70px]"
                >
                  <h2 className="mb-5 px-[30px] py-4 text-left text-[20px] font-normal leading-none tracking-[-0.01em] text-[#7e7d7d] sm:text-[24px] lg:text-[28px]">
                    {application.title}
                  </h2>

                  <Link
                    to={`/applications/${application.slug}`}
                    className="group relative block overflow-hidden"
                  >
                    <div className="relative h-[260px] w-full bg-black sm:h-[360px] lg:h-[500px]">
                      <img
                        src={application.cardImage}
                        alt={application.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-[400ms] group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/40" />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center justify-center bg-white px-5 py-3 text-[16px] text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
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
