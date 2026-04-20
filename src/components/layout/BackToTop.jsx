import { useEffect, useState } from "react";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 220);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="backtotop" style={{ display: visible ? "block" : "none" }}>
      <a
        href="#thetop"
        id="scroll"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span aria-hidden="true">↑</span>
        <span className="sr-only">Back to top</span>
      </a>
    </div>
  );
}

export default BackToTop;
