import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import heroVideo from "../assets/media/wall washor 2.mp4";
import whoWeAreBg from "../assets/images/applications/architectural-light-innerpage-final-001.webp";
import appVideoOne from "../assets/media/dddd.mp4";
import appVideoTwo from "../assets/media/dddd2.mp4";
import appVideoThree from "../assets/media/dddd1.mp4";
import parkImage from "../assets/images/applications/parklightingapplication.webp";
import riverImage from "../assets/images/applications/riverlighting.webp";
import stageImage from "../assets/images/applications/stagelightin1.webp";
import stadiumVideo from "../assets/media/stadiumvideo.mp4";
import lightOnBase from "../assets/images/animatedimages/withoutlightsss.webp";
import lightOnTop from "../assets/images/animatedimages/bridgeanimya.webp";
import wheelCover from "../assets/images/covers/wheel.webp";
import barCover from "../assets/images/covers/bar.webp";
import neonCover from "../assets/images/covers/neon.webp";
import panelCover from "../assets/images/covers/15.webp";
import faqBg from "../assets/images/applications/park-lighting-home-001.webp";
import contactBg from "../assets/images/banners/contactbg.png";
import modelAsset from "../assets/media/113133.glb";
import worldMapImage from "../assets/images/world-map.webp";

const MODEL_VIEWER_SCRIPT_ID = "google-model-viewer-script";

const animationImageModules = import.meta.glob("../assets/images/animationcode/*.webp", {
  eager: true,
  import: "default",
});

const animationImageMap = Object.fromEntries(
  Object.entries(animationImageModules).map(([path, source]) => [
    path.split("/").pop()?.replace(".webp", ""),
    source,
  ]),
);

const heroSlides = [
  {
    heading: "Innovative Lighting Solutions",
    body: "Bringing brilliance to every space with our cutting-edge display lights.",
  },
  {
    heading: "Quality Meets Design",
    body: "Stylish, energy-efficient lighting for modern interiors.",
  },
  {
    heading: "Illuminate Your Vision",
    body: "Custom lighting for retail, commercial, and residential spaces.",
  },
];

const controllerItems = [
  { id: "toggle0", stateIndex: 0, icon: "🎡", label: "Ferris Wheel Lighting" },
  { id: "toggle1", stateIndex: 1, icon: "⛲", label: "Fountain Lighting" },
  { id: "toggle5", stateIndex: 5, icon: "🏛️", label: "Architecture Lighting" },
  { id: "toggle4", stateIndex: 4, icon: "🏊", label: "Pool Lighting" },
  { id: "toggle2", stateIndex: 2, icon: "🌉", label: "Bridge Lighting" },
  { id: "toggle3", stateIndex: 3, icon: "🌳", label: "Park Lighting" },
];

const homeCatalogueCards = [
  { to: "/catalogues/catalogues1-1", image: wheelCover, alt: "Ferris Wheel Catalogue Cover" },
  { to: "/catalogues/catalogues1-2", image: barCover, alt: "Pixel LED Bars Catalogue Cover" },
  { to: "/catalogues/catalogues1-3", image: neonCover, alt: "Neon Flex Catalogue Cover" },
  { to: "/catalogues/catalogues1-4", image: panelCover, alt: "Pixel LED Panel Catalogue Cover" },
];

const faqItems = [
  {
    question: "What is your delivery timeline?",
    answer: "Our standard delivery time is 5-7",
  },
  {
    question: "Do you offer installation services?",
    answer: "Yes, we provide installation services through our certified partners in select cities.",
  },
  {
    question: "Can I customize my lighting solution?",
    answer: "Absolutely. We work with clients to create tailored solutions based on your design and functional needs.",
  },
  {
    question: "What warranty do you provide?",
    answer: "We offer a 2-year warranty on all our products against manufacturing defects.",
  },
];

const mapDots = [
  { key: "dot1", label: "Hyderabad, India", className: "mappingpoint-dot1" },
  { key: "dot2", label: "United Kingdom", className: "mappingpoint-dot2" },
  { key: "dot3", label: "China", className: "mappingpoint-dot3" },
  { key: "dot4", label: "Italy", className: "mappingpoint-dot4" },
  { key: "dot5", label: "Canada", className: "mappingpoint-dot5" },
  { key: "dot6", label: "Dubai, UAE", className: "mappingpoint-dot6" },
  { key: "dot7", label: "Germany", className: "mappingpoint-dot7" },
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

function HomeLegacyHeroSection() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroVideoRef = useRef(null);
  const activeHeroSlide = heroSlides[heroIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const heroVideoElement = heroVideoRef.current;
    if (!heroVideoElement) {
      return undefined;
    }

    const handleLoaded = () => {
      if (heroVideoElement.duration > 12) {
        heroVideoElement.currentTime = 10.8;
      }
    };

    heroVideoElement.addEventListener("loadedmetadata", handleLoaded);
    heroVideoElement.play().catch(() => {});
    return () => heroVideoElement.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  return (
    <section className="hero-slider-container">
      <video
        ref={heroVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="video-bg"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="overlay" />

      <div className="hero-slider">
        <div
          key={activeHeroSlide.heading}
          className="hero-content text-white text-center active"
        >
          {heroIndex === 0 ? <h1 className="small-text">{activeHeroSlide.heading}</h1> : <h2 className="small-text">{activeHeroSlide.heading}</h2>}
          <p>{activeHeroSlide.body}</p>
        </div>
      </div>
    </section>
  );
}

function HomeWhoWeAreSection() {
  return (
    <section
      className="whoweareaboutus section professional-bg-container"
      style={{ backgroundImage: `url(${whoWeAreBg})`, backgroundSize: "cover", backgroundAttachment: "fixed", position: "relative" }}
    >
      <div className="image-mask" />

      <div className="container content-center">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 content">
            <h3 className="text-white">Who We Are</h3>
            <p className="text-white">
              We specialize in innovative facade lighting solutions that enhance architecture, create stunning visual effects, and improve ambiance. <br /> From homes to commercial buildings, we bring structures to life with light.
            </p>
            <Link to="/about" className="read-more text-dark bg-white">
              <span>Read More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeLegacyApplicationsSection() {
  return (
    <section className="application-section py-2">
      <div className="container my-2">
        <h2 className="text-white mb-2 text-center small-text">Applications</h2>

        <div className="row g-4">
          <div className="col-lg-8 col-md-6 col-12 px-0">
            <Link to="/applications">
              <div className="bg-card">
                <video className="bg-video" autoPlay muted loop playsInline>
                  <source src={appVideoOne} type="video/mp4" />
                </video>
                <div className="overlay" />
                <div className="content">
                  <h3>Architectural Lighting</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-12 px-0">
            <Link to="/applications">
              <div className="bg-card">
                <div className="bg-image" style={{ backgroundImage: `url('${parkImage}')` }} />
                <div className="overlay" />
                <div className="content">
                  <h3>Park Lighting</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-4 col-md-6 col-12 px-0">
            <Link to="/applications">
              <div className="bg-card">
                <div className="bg-image" style={{ backgroundImage: `url('${riverImage}')` }} />
                <div className="overlay" />
                <div className="content">
                  <h3>River Lighting</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-8 col-md-6 col-12 px-0">
            <Link to="/applications">
              <div className="bg-card">
                <video className="bg-video" autoPlay muted loop playsInline>
                  <source src={appVideoTwo} type="video/mp4" />
                </video>
                <div className="overlay" />
                <div className="content">
                  <h3>Ferris Wheel Lighting</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8 col-md-6 col-12 px-0">
            <Link to="/applications">
              <div className="bg-card">
                <video className="bg-video" autoPlay muted loop playsInline>
                  <source src={appVideoThree} type="video/mp4" />
                </video>
                <div className="overlay" />
                <div className="content">
                  <h3>Bridge Lighting</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-12 px-0">
            <Link to="/applications">
              <div className="bg-card">
                <div className="bg-image" style={{ backgroundImage: `url('${stageImage}')` }} />
                <div className="overlay" />
                <div className="content">
                  <h3>Stage Lighting</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeLegacyTaglineVideoSection() {
  return (
    <section className="animiyaa-video-section home-screen-fit-section">
      <video id="animiyaaVideo" autoPlay muted playsInline loop>
        <source src={stadiumVideo} type="video/mp4" />
      </video>
      <div className="centered-text">
        <h2 id="animatedSingleText">Beyond Illumination - Into Imagination</h2>
      </div>
    </section>
  );
}

function HomeLegacyLightCompareSection() {
  const [splitX, setSplitX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const lightCompareRef = useRef(null);

  useEffect(() => {
    const onMove = (event) => {
      if (!dragging) {
        return;
      }

      const compareElement = lightCompareRef.current;
      if (!compareElement) {
        return;
      }

      const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
      const bounds = compareElement.getBoundingClientRect();
      const next = Math.max(0, Math.min(((clientX - bounds.left) / bounds.width) * 100, 100));
      setSplitX(next);
    };

    const stopDrag = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [dragging]);

  return (
    <section ref={lightCompareRef} className="lightoffandon-container mt-0 mb-0 bg-white">
      <img
        src={lightOnBase}
        className="lightoffandon-image on"
        alt="Without light"
      />

      <img
        src={lightOnTop}
        className="lightoffandon-image off"
        id="lightoffandon-off"
        alt="With light"
        style={{ clipPath: `inset(0 ${100 - splitX}% 0 0)` }}
      />

      <div
        className="lightoffandon-divider"
        id="lightoffandon-divider"
        style={{ left: `${splitX}%` }}
        onMouseDown={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onTouchStart={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
      >
        <div className="lightoffandon-buttons">
          <span className="left">&lt;</span>
          <span className="right">&gt;</span>
        </div>

        <span
          className={`light-text${dragging ? " show" : ""}`}
          id="light-text"
          style={{ left: `${splitX / 2}%` }}
        >
          {"Light On".split("").map((letter, index) => (
            <span key={`${letter}-${index}`}>
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}

function HomeLegacyControllerSection() {
  const [controllerState, setControllerState] = useState([0, 0, 0, 0, 0, 0]);

  const controllerImage = useMemo(() => {
    const key = controllerState.join("");
    return animationImageMap[key] ?? animationImageMap["000000"];
  }, [controllerState]);

  const toggleController = (index) => {
    setControllerState((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? (item ? 0 : 1) : item)),
    );
  };

  return (
    <div className="legacy-controller-wrap">
      <div className="sidebar">
        {controllerItems.map((item) => (
          <div className="toggle-group" key={item.id}>
            <label htmlFor={item.id} className="toggle-label">
              <span className="toggle-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </label>
            <label className="switch" aria-label={`Toggle ${item.label}`}>
              <input
                type="checkbox"
                id={item.id}
                checked={Boolean(controllerState[item.stateIndex])}
                onChange={() => toggleController(item.stateIndex)}
              />
              <span className="slider" />
            </label>
          </div>
        ))}

        <div className="control-buttons">
          <button type="button" className="control-btn on-btn" onClick={() => setControllerState([1, 1, 1, 1, 1, 1])}>
            <span aria-hidden="true">🔆</span>
            <span>All ON</span>
          </button>
          <button type="button" className="control-btn off-btn" onClick={() => setControllerState([0, 0, 0, 0, 0, 0])}>
            <span aria-hidden="true">🌑</span>
            <span>All OFF</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <img id="display" src={controllerImage} alt="Lighting View" />
      </div>
    </div>
  );
}

function HomeLegacyCataloguesSection() {
  const navigate = useNavigate();

  return (
    <section className="bookcats-section">
      <h2 className="bookcats-title text-lg">Catalogues</h2>

      <div className="bookcats-wrapper show" id="bookcatsWrapper">
        {homeCatalogueCards.map((item) => (
          <Link key={item.to} to={item.to} className="bookcats-link">
            <div className="bookcats-item">
              <img src={item.image} alt={item.alt} />
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="bookcats-btn mt-4"
        onClick={() => navigate("/catalogues")}
      >
        View More
      </button>
    </section>
  );
}

function HomeLegacyFaqContactSection() {
  const [activeFaq, setActiveFaq] = useState(0);
  useModelViewerScript();

  return (
    <section className="position-relative" style={{ background: "transparent", overflow: "hidden" }}>
      <div className="container position-relative">
        <section className="home-faq-panel" style={{ backgroundImage: `url(${faqBg})` }}>
          <div className="image-mask" />
          <div className="row justify-content-center mb-5 position-relative" style={{ zIndex: 1 }}>
            <div className="col-lg-11 col-xl-10 mx-auto home-faq-content">
              <h2
  className="text-center mb-3 text-uppercase fw-semibold fs-4"
  style={{ color: "#e0e0e0" }}
>
  FAQ
</h2>
              <div className="accordion-faq">
                {faqItems.map((item, index) => (
                  <div key={item.question} className={`faq-box faq-bg${activeFaq === index ? " active" : ""}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setActiveFaq((current) => (current === index ? null : index))}
                      aria-expanded={activeFaq === index}
                    >
                      {item.question}
                    </button>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="my-5" />

        <div className="row align-items-center contact-background gy-4" style={{ backgroundImage: `url(${contactBg})` }}>
          <div className="col-lg-6">
            <form
              id="contact_form"
              className="contact-box p-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="row">
                <div className="col-md-6">
                  <input type="text" className="form-control contact-input transparent-input" placeholder="Full Name" required />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control contact-input transparent-input" placeholder="Email Address" required />
                </div>
                <div className="col-12">
                  <input type="tel" className="form-control contact-input transparent-input" placeholder="Phone Number" required />
                </div>
                <div className="col-12">
                  <textarea className="form-control contact-input transparent-input" rows="4" placeholder="Your Message" required />
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="contact-btn px-5 py-2 rounded-pill shadow-sm">Send Message</button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-6 text-center">
            <model-viewer src={modelAsset} alt="3D Product View" auto-rotate camera-controls ar background-color="#f3f3f3" style={{ width: "100%", height: "390px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeSupportMapSection() {
  return (
    <div className="mappingpoint-section">
      <div className="mappingpoint-text">
        <h2>Our Support</h2>
        <p>Serving numerous countries with pre-sales and after-sales technical support</p>
      </div>

      <div className="mappingpoint-container">
        <img src={worldMapImage} alt="World Map" className="mappingpoint-image" />
        {mapDots.map((dot) => (
          <div key={dot.key} className={`mappingpoint-dot ${dot.className}`} data-country={dot.label}>
            <div className="mappingpoint-inner-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const headerElement = document.getElementById("header-section");
    if (!headerElement) {
      return undefined;
    }

    const updateNavbarHeight = () => {
      const nextHeight = Math.round(headerElement.getBoundingClientRect().height);
      if (nextHeight > 0) {
        setNavbarHeight(nextHeight);
      }
    };

    updateNavbarHeight();

    const onResize = () => window.requestAnimationFrame(updateNavbarHeight);
    window.addEventListener("resize", onResize, { passive: true });

    let observer;
    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(updateNavbarHeight);
      observer.observe(headerElement);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="legacy-home-page" style={{ "--home-navbar-height": `${navbarHeight}px` }}>
      <PageMeta
        title="Mecanav - Create Impact After Sunset"
        description="Mecanav facade lighting homepage with products, catalogues, applications, and support sections."
      />

      <HomeLegacyHeroSection />
      <HomeWhoWeAreSection />
      <HomeLegacyApplicationsSection />
      <HomeLegacyTaglineVideoSection />
      <HomeLegacyLightCompareSection />
      <HomeLegacyControllerSection />
      <HomeLegacyCataloguesSection />
      <HomeLegacyFaqContactSection />
      <HomeSupportMapSection />
      <HomeLegacyPartnersSection />
    </div>
  );
}

export default HomePage;
