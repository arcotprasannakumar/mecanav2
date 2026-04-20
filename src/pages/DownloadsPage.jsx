import { useEffect, useRef, useState } from "react";
import { downloads } from "../data/masterData";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";
import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";

const accentMap = {
  blue: "#8eb5dc",
  green: "#86bf89",
  amber: "#dfc36c",
};

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

function DownloadCard({ item, onDownload }) {
  const [hoverPhase, setHoverPhase] = useState("idle");
  const [overlayAnchor, setOverlayAnchor] = useState("left");
  const [overlayWidth, setOverlayWidth] = useState("0%");
  const hideTimerRef = useRef(null);

  const fileLabel = item.type || item.format || "PDF";
  const sizeLabel = item.sizeLabel || item.size || item.meta || "";
  const typeLower = String(fileLabel).toLowerCase();
  const accentColor = accentMap[item.accent] || accentMap.blue;

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const handleEnter = () => {
    clearHideTimer();
    setHoverPhase("hover");
    setOverlayAnchor("left");
    setOverlayWidth("0%");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayWidth("100%");
      });
    });
  };

  const handleLeave = () => {
    clearHideTimer();
    setHoverPhase("leaving");
    setOverlayAnchor("right");
    setOverlayWidth("100%");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayWidth("0%");
      });
    });

    hideTimerRef.current = setTimeout(() => {
      setHoverPhase("idle");
    }, 320);
  };

  const renderFileIcon = () => {
    if (typeLower.includes("zip")) {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 text-[#e0b51d]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
          <path d="M11 10h2" stroke="currentColor" strokeWidth="2" />
          <path d="M11 13h2" stroke="currentColor" strokeWidth="2" />
          <path d="M11 16h2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }

    if (item.title.toLowerCase().includes("iso")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-[#34b54a]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3 14.2 5.2 17 5.5 17.3 8.3 19.5 10.5 17.3 12.7 17 15.5 14.2 15.8 12 18 9.8 15.8 7 15.5 6.7 12.7 4.5 10.5 6.7 8.3 7 5.5 9.8 5.2 12 3Z" fill="currentColor" />
          <path d="M10 10.5 11.4 12 14.5 8.8" stroke="white" strokeWidth="2" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-[#e63756]" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
        <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
        <text x="12" y="17" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor">
          PDF
        </text>
      </svg>
    );
  };

  const showAccent = hoverPhase === "hover" || hoverPhase === "leaving";
  const isTextWhite = hoverPhase === "hover";

  return (
    <div className="rounded-[3px] bg-white px-6 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_5px_16px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <div className="shrink-0">{renderFileIcon()}</div>
        <div className="min-w-0">
          <h3 className="text-[21px] font-semibold leading-[1.1] tracking-[0.03em] text-black">
            {item.title}
          </h3>
          <p className="mt-1 text-[12px] font-medium uppercase leading-none tracking-[0.04em] text-[#6f6f6f]">
            {fileLabel}
            {sizeLabel ? ` • ${sizeLabel}` : ""}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDownload(item)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        className="relative mt-7 h-[45px] w-full overflow-hidden rounded-[8px] bg-[#e9e9e9]"
      >
        <span className={`absolute inset-0 transition-opacity duration-150 ${showAccent ? "opacity-100" : "opacity-0"}`} style={{ backgroundColor: accentColor }} />
        <span
          className="absolute inset-y-0 bg-black transition-[width] duration-300 ease-linear"
          style={{
            width: overlayWidth,
            left: overlayAnchor === "left" ? 0 : "auto",
            right: overlayAnchor === "right" ? 0 : "auto",
          }}
        />
        <span className={`absolute inset-0 z-10 flex items-center justify-center gap-2 text-[15px] font-semibold transition-colors duration-150 ${isTextWhite ? "text-white" : "text-black"}`}>
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4v10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="2" />
            <path d="M5 19h14" stroke="currentColor" strokeWidth="2" />
          </svg>
          Download
        </span>
      </button>
    </div>
  );
}
 
function DownloadsPage() {
  const [notice, setNotice] = useState("");
 
  const handleDownload = (item) => {
    if (!item.available || !item.file) {
      setNotice(`${item.title} is currently unavailable. ${item.note}`);
      return;
    }
 
    triggerFileDownload(item.file);
    setNotice("");
  };
 
  return (
    <section className="bg-[#e7e7ea] text-black">
      <PageMeta
        title="Downloads"
        description="Browse legacy Mecanav download references and document availability states."
      />
 
      <section className="px-4 pb-14 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-[1480px]">
          <h1 className="text-center text-[30px] font-semibold tracking-[0.08em] text-[#17385b] sm:text-[32px]">
            Downloads
          </h1>
 
          {notice ? (
            <StatusPanel
              tone="warning"
              message={notice}
              className="mx-auto mt-6 max-w-3xl shadow-none"
            />
          ) : null}
 
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {downloads.map((item) => (
              <DownloadCard
                key={item.slug}
                item={item}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </div>
      </section>
 
      <HomeLegacyPartnersSection />
    </section>
  );
}
 
export default DownloadsPage;
