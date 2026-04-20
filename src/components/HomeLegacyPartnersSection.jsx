import { useEffect, useMemo, useRef, useState } from "react";
import floodOff from "../assets/images/Final-Products/Product spec imgs/flood_off0.webp";
import floodOn from "../assets/images/Final-Products/Product spec imgs/flood_on.webp";
import fountainOff from "../assets/images/Final-Products/Product spec imgs/fountain off.webp";
import fountainOn from "../assets/images/Final-Products/Product spec imgs/fountain on.webp";
import groundOff from "../assets/images/Final-Products/Product spec imgs/ground_light_off.webp";
import groundOn from "../assets/images/Final-Products/Product spec imgs/ground light on.webp";
import neonOff from "../assets/images/Final-Products/Product spec imgs/neon_flex_off.webp";
import neonOn from "../assets/images/Final-Products/Product spec imgs/neon_flex_on.webp";
import pixelDotOff from "../assets/images/Final-Products/Product spec imgs/pixel dot_off.webp";
import pixelDotOn from "../assets/images/Final-Products/Product spec imgs/pixel_dot_on.webp";
import poolOff from "../assets/images/Final-Products/Product spec imgs/pool_off.webp";
import poolOn from "../assets/images/Final-Products/Product spec imgs/pool_light.webp";
import stripOff from "../assets/images/Final-Products/Product spec imgs/strip_off.webp";
import stripOn from "../assets/images/Final-Products/Product spec imgs/strip_on.webp";
import wallWindowOff from "../assets/images/Final-Products/Product spec imgs/wall window off.webp";
import wallWindowOn from "../assets/images/Final-Products/Product spec imgs/wall window on.webp";
import treeOn from "../assets/images/Final-Products/Product spec imgs/treehighlighters_on.webp";
import treeOff from "../assets/images/Final-Products/Product spec imgs/treehighlighters_off.webp";
import goboOff from "../assets/images/Final-Products/Product spec imgs/gobo_off.webp";
import goboOn from "../assets/images/Final-Products/Product spec imgs/gobo_on.webp";
import fanOff from "../assets/images/Final-Products/Product spec imgs/fan-off.webp";
import fanOn from "../assets/images/Final-Products/Product spec imgs/fan-on.webp";
import pillarOff from "../assets/images/Final-Products/Product spec imgs/piller-highlighter-off.webp";
import pillarOn from "../assets/images/Final-Products/Product spec imgs/piller-highlighter-on.webp";
import pixelBarOff from "../assets/images/Final-Products/Product spec imgs/pixel eld bar off.webp.webp";
import pixelBarOn from "../assets/images/Final-Products/Product spec imgs/pixel led bar on.webp";
import pixelPanelOff from "../assets/images/Final-Products/Product spec imgs/pixel panel off.webp.webp";
import pixelPanelOn from "../assets/images/Final-Products/Product spec imgs/pixel panel on.webp.webp";
import wallWasherOff from "../assets/images/Final-Products/Product spec imgs/wallwasher_off.webp";
import wallWasherOn from "../assets/images/Final-Products/Product spec imgs/wallwasher_on.webp";

const partnerItems = [
  { off: floodOff, on: floodOn },
  { off: fountainOff, on: fountainOn },
  { off: groundOff, on: groundOn },
  { off: neonOff, on: neonOn },
  { off: pixelDotOff, on: pixelDotOn },
  { off: poolOff, on: poolOn },
  { off: stripOff, on: stripOn },
  { off: wallWindowOff, on: wallWindowOn },
  { off: treeOn, on: treeOff },
  { off: goboOff, on: goboOn },
  { off: fanOff, on: fanOn },
  { off: pillarOff, on: pillarOn },
  { off: pixelBarOff, on: pixelBarOn },
  { off: pixelPanelOff, on: pixelPanelOn },
  { off: wallWasherOff, on: wallWasherOn },
];

const partnersCarouselConfig = {
  autoplay: true,
  autoplayTimeout: 3600,
  smartSpeed: 5200,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    992: { items: 4 },
  },
};

function HomeLegacyPartnersSection() {
  const [partnerOnState, setPartnerOnState] = useState(false);
  const [partnerVisibleItems, setPartnerVisibleItems] = useState(4);
  const [partnerSlideIndex, setPartnerSlideIndex] = useState(0);
  const [partnerTransitionEnabled, setPartnerTransitionEnabled] = useState(true);
  const partnerTrackRef = useRef(null);

  useEffect(() => {
    const toggleInterval = window.setInterval(() => {
      setPartnerOnState((current) => !current);
    }, 2000);

    return () => window.clearInterval(toggleInterval);
  }, []);

  useEffect(() => {
    const getVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 992) {
        return partnersCarouselConfig.responsive[992].items;
      }
      if (width >= 768) {
        return partnersCarouselConfig.responsive[768].items;
      }
      if (width >= 576) {
        return partnersCarouselConfig.responsive[576].items;
      }
      return partnersCarouselConfig.responsive[0].items;
    };

    const syncVisibleItems = () => {
      setPartnerVisibleItems(getVisibleItems());
      setPartnerSlideIndex(0);
      setPartnerTransitionEnabled(false);
      window.requestAnimationFrame(() => {
        setPartnerTransitionEnabled(true);
      });
    };

    syncVisibleItems();
    window.addEventListener("resize", syncVisibleItems, { passive: true });
    return () => window.removeEventListener("resize", syncVisibleItems);
  }, []);

  useEffect(() => {
    if (!partnersCarouselConfig.autoplay) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setPartnerSlideIndex((current) => current + 1);
    }, partnersCarouselConfig.autoplayTimeout);

    return () => window.clearInterval(interval);
  }, []);

  const partnerTrackItems = useMemo(
    () => [...partnerItems, ...partnerItems.slice(0, partnerVisibleItems)],
    [partnerVisibleItems],
  );

  return (
    <section id="partners-section" className="partners-section sec-ptb-60 bg-light-gray">
      <div className="container">
        <div id="partners-carousel" className="legacy-partners-carousel">
          <div
            className={`legacy-partners-track${partnerTransitionEnabled ? " is-animated" : ""}`}
            ref={partnerTrackRef}
            onTransitionEnd={() => {
              if (partnerSlideIndex >= partnerItems.length) {
                setPartnerTransitionEnabled(false);
                setPartnerSlideIndex(0);
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    setPartnerTransitionEnabled(true);
                  });
                });
              }
            }}
            style={{
              transform: `translate3d(-${(partnerSlideIndex * 100) / partnerVisibleItems}%, 0, 0)`,
              transitionDuration: `${partnersCarouselConfig.smartSpeed}ms`,
            }}
          >
            {partnerTrackItems.map((item, index) => (
              <div
                className="item"
                key={`partner-${index}`}
                style={{ flex: `0 0 ${100 / partnerVisibleItems}%` }}
              >
                <span className="partner-logo" aria-hidden="true">
                  <img className="toggle-image" src={partnerOnState ? item.on : item.off} alt={`Product ${(index % partnerItems.length) + 1}`} loading="lazy" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLegacyPartnersSection;
