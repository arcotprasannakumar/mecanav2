import { useEffect, useState } from "react";

function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let mounted = true;
    let dismissTimer;
    let hardFallbackTimer;

    const dismiss = (delay = 300) => {
      window.clearTimeout(dismissTimer);
      dismissTimer = window.setTimeout(() => {
        if (mounted) {
          setHidden(true);
        }
      }, delay);
    };

    if (document.readyState === "complete") {
      dismiss(180);
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    // Safety net: never allow the overlay to block the app indefinitely.
    hardFallbackTimer = window.setTimeout(() => dismiss(0), 1400);

    return () => {
      mounted = false;
      window.clearTimeout(dismissTimer);
      window.clearTimeout(hardFallbackTimer);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  return (
    <div id="preloader-1" className={hidden ? "is-hidden" : ""} aria-hidden={hidden} />
  );
}

export default Preloader;
