import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChevronCircleRight } from "react-icons/fa";
import aboutInnovation from "../assets/icons/about-innovation.webp";
import aboutIntegrity from "../assets/icons/about-integrity.webp";
import aboutPassion from "../assets/icons/about-passion.webp";
import aboutFocus from "../assets/icons/about-focus.webp";
import aboutTeam from "../assets/icons/about-team.webp";
import aboutSafety from "../assets/icons/about-safety.webp";
import sustainability from "../assets/icons/sustainability.webp";
import excellence from "../assets/icons/excellence.webp";
import modelAsset from "../assets/media/wall washer and stand 2.glb";
import heroBackground from "../assets/images/brands/bri.webp";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import PageMeta from "../components/PageMeta";

const MODEL_VIEWER_SCRIPT_ID = "google-model-viewer-script";
 
const timelineItems = [
  {
    year: "2024",
    title: "Our Lighting Timeline",
    text: "Each project marks a step forward from our first glow to becoming a trusted name in architectural lighting.",
  },
  {
    year: "2023",
    title: "From Concept to Glow",
    text: "We turn bold ideas into brilliant facades, combining creativity with cutting-edge lighting technology.",
  },
  {
    year: "2022",
    title: "The MECANAV Company Story in Lights",
    text: "Born to make architecture shine, we craft stories through light, color, and motion.",
  },
  {
    year: "2021",
    title: "Milestones of Illumination",
    text: "From homes to smart buildings, every milestone reflects our passion to light up spaces and dreams.",
  },
];
 
const values = [
  {
    title: "Innovation",
    text: "Adapting to change with futuristic ideas and creative lighting design.",
    icon: aboutInnovation,
  },
  {
    title: "Integrity",
    text: "We shine with honesty, always ethical, always transparent.",
    icon: aboutIntegrity,
  },
  {
    title: "Passion",
    text: "Every project is powered by the fire to create dazzling experiences.",
    icon: aboutPassion,
  },
  {
    title: "Customer Focus",
    text: "We design with your vision in mind, always personalized, always glowing.",
    icon: aboutFocus,
  },
  {
    title: "Team Work",
    text: "Collaborative brilliance, like lights in sync, we work as one.",
    icon: aboutTeam,
  },
  {
    title: "Safety",
    text: "We light up buildings, not risks. Safety is always a priority.",
    icon: aboutSafety,
  },
  {
    title: "Sustainability",
    text: "Lighting up the world responsibly, we care for the planet as we illuminate it.",
    icon: sustainability,
  },
  {
    title: "Excellence",
    text: "Precision, perfection, and performance, we do not just deliver, we excel.",
    icon: excellence,
  },
];

function useModelViewerScript() {
  useEffect(() => {
    if (customElements.get("model-viewer")) {
      return undefined;
    }

    const existingScript = document.getElementById(MODEL_VIEWER_SCRIPT_ID);
    if (existingScript) {
      return undefined;
    }

    const script = document.createElement("script");
    script.id = MODEL_VIEWER_SCRIPT_ID;
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);

    return () => {
      if (script.parentNode && !customElements.get("model-viewer")) {
        script.remove();
      }
    };
  }, []);
}
 
function AboutPage() {
  useModelViewerScript();
 
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [aboutIntroVisible, setAboutIntroVisible] = useState(false);
  const [journeyVisible, setJourneyVisible] = useState(false);
  const [coreValuesVisible, setCoreValuesVisible] = useState(false);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroTextVisible(true);
    }, 120);
 
    return () => clearTimeout(timer);
  }, []);
 
  useEffect(() => {
    const section = document.getElementById("about-intro-section");
    if (!section) return;
 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutIntroVisible(true);
        }
      },
      { threshold: 0.2 }
    );
 
    observer.observe(section);
 
    return () => observer.disconnect();
  }, []);
 
  useEffect(() => {
    const section = document.getElementById("lighting-journey-section");
    if (!section) return;
 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setJourneyVisible(true);
        }
      },
      { threshold: 0.35 }
    );
 
    observer.observe(section);
 
    return () => observer.disconnect();
  }, []);
 
  useEffect(() => {
    const section = document.getElementById("core-values-section");
    if (!section) return;
 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCoreValuesVisible(true);
        }
      },
      { threshold: 0.3 }
    );
 
    observer.observe(section);
 
    return () => observer.disconnect();
  }, []);
 
  return (
    <div className="about-page bg-black text-white">
      <PageMeta
        title="About"
        description="Learn about Mecanav, our lighting journey, and the core values behind our architectural lighting solutions."
      />
 
      <section className="bg-black">
        <div className="mx-auto w-full px-0">
          <div className="relative h-[290px] overflow-hidden sm:h-[360px] lg:h-[420px]">
            <img
              src={heroBackground}
              alt="Who We Are"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/35" />
 
            <div className="absolute inset-0 flex flex-col items-center px-4 pt-[12%] text-center sm:pt-[13%] lg:pt-[14%]">
              <h1 className="text-[24px] font-semibold leading-tight text-white sm:text-[30px] lg:text-[33px]">
                Who We Are
              </h1>
 
              <div
                className={`mt-6 transition-all duration-700 ease-out ${heroTextVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                  }`}
              >
                <div className="flex flex-wrap items-center justify-center gap-3 text-[15px] font-medium leading-none text-white sm:text-[16px]">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-[#0a84ff] hover:text-[#49a3ff]"
                  >
                    <FaHome className="text-[18px] sm:text-[19px]" />
                    <span>Home</span>
                  </Link>
 
                  <span className="flex items-center text-white/85">
                    <FaChevronCircleRight className="text-[16px] sm:text-[17px]" />
                  </span>
 
                  <span className="text-white">About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section
        id="about-intro-section"
        className="bg-black px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      >
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:gap-14">
          <div
            className={`w-full min-w-0 flex-1 transition-all duration-1000 ease-out ${aboutIntroVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
              }`}
          >
            <div className="mx-auto w-full max-w-[590px]">
              <model-viewer
                src={modelAsset}
                alt="3D Spotlight"
                auto-rotate=""
                camera-controls=""
                camera-orbit="18deg 92deg 4.8m"
                field-of-view="34deg"
                background-color="#ffffff"
                style={{ width: "100%", height: "350px", maxWidth: "100%" }}
              />
            </div>
          </div>
 
          <div
            className={`w-full min-w-0 flex-1 transition-all duration-1000 ease-out ${aboutIntroVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            <div className="w-full max-w-[690px] break-words text-left">
              <h2 className="max-w-[650px] text-[28px] font-light leading-[1.18] tracking-[0.02em] text-[#f2f2f2] sm:text-[34px] lg:text-[38px]">
                Illuminate the Extraordinary
              </h2>
 
              <p className="mt-5 max-w-[650px] text-[15px] font-light leading-[1.9] tracking-normal text-[#b7b7b7] sm:text-[16px] lg:text-[17px]">
                At Mecanav, we do not just light up structures. We create unforgettable experiences.
                From sleek Pixel LED Strips that trace every curve of a design to bold Neon Flex
                LEDs that splash vibrant personality across any surface, our lighting turns spaces
                into living, breathing art.
              </p>
 
              <p className="mt-6 max-w-[650px] text-[15px] font-light leading-[1.9] tracking-normal text-[#b7b7b7] sm:text-[16px] lg:text-[17px]">
                Every glow, every pulse, every shift in color is crafted to inspire awe and spark
                emotion. Whether it is elevating a skyscraper, reimagining a storefront, or making a
                landmark unforgettable, we deliver lighting that leaves a lasting impression.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      <section
        id="lighting-journey-section"
        className="bg-[#111111] px-6 py-20 sm:px-10 lg:px-16 xl:px-24"
      >
        <div className="mx-auto max-w-[1180px]">
          <div
            className={`transition-all duration-700 ease-out ${journeyVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
          >
            <h2 className="text-center text-[28px] font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-[34px] lg:text-[36px]">
              Our Lighting Journey
            </h2>
          </div>
 
          <div className="relative mx-auto mt-10 max-w-[1180px] pl-[76px] sm:pl-[112px]">
            <div className="absolute left-[6px] top-[18px] z-0 h-[calc(100%-36px)] w-[3px] bg-[#8b1fff] shadow-[0_0_14px_#8b1fff,0_0_30px_rgba(139,31,255,0.95)] sm:left-0" />
            <div className="absolute left-[42px] top-[18px] z-0 h-[calc(100%-36px)] w-[3px] bg-[#8b1fff] shadow-[0_0_14px_#8b1fff,0_0_30px_rgba(139,31,255,0.95)] sm:left-[50px]" />
 
            <div className="space-y-9">
              {timelineItems.map((item, index) => {
                const fromLeft = index % 2 === 0;
 
                return (
                  <div
                    key={item.year}
                    className={`group relative transition-all duration-700 ease-out ${journeyVisible
                        ? "translate-x-0 opacity-100"
                        : fromLeft
                          ? "-translate-x-24 opacity-0"
                          : "translate-x-24 opacity-0"
                      }`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  >
                    <div className="absolute left-[-62px] top-[13px] z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#7a18ff] text-[11px] font-bold leading-none text-white shadow-[0_0_12px_#912aff,0_0_30px_rgba(145,42,255,0.95)] sm:left-[-86px] sm:h-[48px] sm:w-[48px] sm:text-[13px]">
                      {item.year}
                    </div>
 
                    <div className="relative z-10 rounded-[14px] border border-[#2e2550] bg-[#181936] px-7 py-5 shadow-[0_0_18px_rgba(130,0,255,0.28),0_0_42px_rgba(130,0,255,0.14)] transition-all duration-300 group-hover:translate-x-[6px] group-hover:shadow-[0_0_26px_rgba(151,27,255,0.48),0_0_56px_rgba(151,27,255,0.24)] sm:px-8 sm:py-6">
                      <h3 className="text-[18px] font-bold leading-snug text-white sm:text-[22px]">
                        {item.title}
                      </h3>
 
                      <p className="mt-2 text-[13px] leading-6 text-white/80 sm:text-[14px] sm:leading-7">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
 
      <section
        id="core-values-section"
        className="about-core-values-section"
      >
        <div className="about-core-values-container">
          <div
            className={`about-core-values-heading ${
              coreValuesVisible ? "is-visible" : ""
            }`}
          >
            <h2>Our Core Values</h2>
            <p>Guided by light, powered by principles.</p>
          </div>

          <div className="about-values-grid">
            {values.map((value, index) => {
              return (
                <article
                  key={value.title}
                  className={`about-value-card ${
                    coreValuesVisible ? "is-visible" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="about-value-icon">
                    <img
                      src={value.icon}
                      alt={value.title}
                      loading="lazy"
                      className="about-value-icon-image"
                    />
                  </div>

                  <div className="about-value-content">
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <HomeLegacyPartnersSection />
    </div>
  );
}
 
export default AboutPage;
