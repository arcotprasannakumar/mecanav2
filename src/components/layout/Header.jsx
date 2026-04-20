import { NavLink } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { navigation } from "../../data/masterData";

const productColumns = navigation.header.find((item) => item.variant === "mega")?.columns ?? [];
const services = navigation.header.find((item) => item.variant === "dropdown")?.children ?? [];

function Header({ pathname, onMenuToggle }) {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [spotlightLeft, setSpotlightLeft] = useState(null);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsAtTop(scrollY < 4);
      setIsStuck(scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    setIsAtTop(true);
    setIsStuck(false);
  }, [pathname]);

  const activeMainPath = useMemo(() => {
    if (pathname.startsWith("/products")) {
      return "/products";
    }

    if (["/catalogues", "/downloads", "/solutions", "/projects"].some((path) => pathname.startsWith(path))) {
      return "services";
    }

    return pathname;
  }, [pathname]);

  const moveSpotlight = (event) => {
    const navElement = event.currentTarget;
    const headerElement = headerRef.current;

    if (!headerElement) {
      return;
    }

    const headerRect = headerElement.getBoundingClientRect();
    const rect = navElement.getBoundingClientRect();
    const center = rect.left - headerRect.left + rect.width / 2;
    setSpotlightLeft(center);
  };

  const closeDesktopMenus = () => {
    const focusedElement = navRef.current?.querySelector(":focus");

    if (focusedElement instanceof HTMLElement) {
      focusedElement.blur();
    }
  };

  const restoreActiveSpotlight = () => {
    const navList = navRef.current?.querySelector("ul");
    const headerElement = headerRef.current;
    const active = navList?.querySelector("[data-nav-active='true']");

    if (!headerElement || !active) {
      return;
    }

    const headerRect = headerElement.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    setSpotlightLeft(rect.left - headerRect.left + rect.width / 2);
  };

  useEffect(() => {
    const timeout = window.setTimeout(restoreActiveSpotlight, 40);
    const onResize = () => restoreActiveSpotlight();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  useEffect(() => {
    closeDesktopMenus();
  }, [pathname]);

  return (
    <header
      id="header-section"
      ref={headerRef}
      className={`header-section sticky-header clearfix${isAtTop ? " at-top" : ""}${isStuck ? " stuck" : ""}${isHomePage ? "" : " solid-header"}`}
    >
      {spotlightLeft !== null ? (
        <div
          className="spotlight"
          style={{ left: `${spotlightLeft}px`, opacity: 1 }}
          aria-hidden="true"
        />
      ) : null}
      <div className="container">
        <div className="row align-items-center header-layout">
          <div className="col-lg-2">
            <div className="brand-logo">
              <NavLink to="/">
                <img src={navigation.brand.logo} alt="mecanavlogo" />
              </NavLink>
              <div className="mobile-menu-btns float-right ul-li-right">
                <ul className="clearfix">
                  <li>
                    <button type="button" className="menu-btn" onClick={onMenuToggle} aria-label="Open menu">
                      <span />
                      <span />
                      <span />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-10 header-nav-wrap">
            <nav ref={navRef} className="main-menu ul-li-right clearfix" onMouseLeave={restoreActiveSpotlight}>
              <ul className="clearfix">
                <li className="menu-item">
                  <NavLink
                    to="/"
                    className={activeMainPath === "/" ? "active" : ""}
                    data-nav-active={activeMainPath === "/"}
                    onMouseEnter={moveSpotlight}
                    onFocus={moveSpotlight}
                  >
                    HOME
                  </NavLink>
                </li>

                <li className="menu-item">
                  <NavLink
                    to="/about"
                    className={activeMainPath === "/about" ? "active" : ""}
                    data-nav-active={activeMainPath === "/about"}
                    onMouseEnter={moveSpotlight}
                    onFocus={moveSpotlight}
                  >
                    ABOUT US
                  </NavLink>
                </li>

                <li className="menu-item mega-menu">
                  <NavLink
                    to="/products"
                    className={activeMainPath === "/products" ? "active" : ""}
                    data-nav-active={activeMainPath === "/products"}
                    onMouseEnter={moveSpotlight}
                    onFocus={moveSpotlight}
                    onClick={closeDesktopMenus}
                  >
                    PRODUCTS <span className="dropdown-icon" />
                  </NavLink>
                  <div className="mega-menu-wrapper">
                    <div className="mega-menu-grid">
                      {productColumns.map((column) => (
                        <div className="menu-group" key={column[0].label}>
                          {column.map((item) => (
                            <NavLink key={item.label} to={item.to} onClick={closeDesktopMenus}>
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="menu-item">
                  <NavLink
                    to="/applications"
                    className={activeMainPath === "/applications" ? "active" : ""}
                    data-nav-active={activeMainPath === "/applications"}
                    onMouseEnter={moveSpotlight}
                    onFocus={moveSpotlight}
                  >
                    APPLICATIONS
                  </NavLink>
                </li>

                <li className="menu-item-has-child">
                  <button
                    type="button"
                    className={activeMainPath === "services" ? "active menu-trigger" : "menu-trigger"}
                    data-nav-active={activeMainPath === "services"}
                    onMouseEnter={moveSpotlight}
                    onFocus={moveSpotlight}
                    aria-haspopup="menu"
                  >
                    SERVICES <span className="dropdown-icon" />
                  </button>
                  <ul className="submenu">
                    {services.map((item) => (
                      <li key={item.label}>
                        <NavLink to={item.to} onClick={closeDesktopMenus}>{item.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item">
                  <NavLink
                    to="/contact"
                    className={activeMainPath === "/contact" ? "active" : ""}
                    data-nav-active={activeMainPath === "/contact"}
                    onMouseEnter={moveSpotlight}
                    onFocus={moveSpotlight}
                  >
                    CONTACT US
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
