import { NavLink } from "react-router-dom";
import { navigation } from "../../data/masterData";

function Footer() {
  const { footer } = navigation;
  const firstSocialRow = footer.social.slice(0, 6);
  const secondSocialRow = footer.social.slice(6);

  return (
    <footer id="footer-section" className="footer-section sec-ptb-10 clearfix" style={{ backgroundColor: "rgb(30, 32, 35)" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <div className="useful-links ul-li-block">
              <h5>Quick Links</h5>
              <ul className="clearfix">
                {footer.quickLinks.map((item) => (
                  <li key={item.label}>
                    <NavLink to={item.to}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <div className="useful-links ul-li-block clearfix">
              <h5>Products</h5>
              <ul className="clearfix">
                {footer.products.map((item) => (
                  <li key={item.label}><NavLink to={item.to}>{item.label}</NavLink></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <div className="useful-links ul-li-block clearfix">
              <h5>Applications</h5>
              <ul className="clearfix">
                {footer.applications.map((item) => (
                  <li key={item.label}><NavLink to={item.to}>{item.label}</NavLink></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <div className="useful-links ul-li-block clearfix">
              <h5>Services</h5>
              <ul className="clearfix">
                {footer.services.map((item) => (
                  <li key={item.label}><NavLink to={item.to}>{item.label}</NavLink></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 footer-contact-col" id="footer-contact">
            <div className="useful-links ul-li-block clearfix footer-contact-block">
              <h5>Contact</h5>
              <ul className="clearfix">
                <li>
                  <p>
                    <span>Address: </span>
                    <span style={{ color: "#8a8a8a" }}>
                      {footer.contact.addressLines.map((line, index) => (
                        <span key={line}>
                          {line}
                          {index !== footer.contact.addressLines.length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </span>
                    <br />
                    Mail Us: <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 footer-social-col">
            <div className="useful-links ul-li-block clearfix footer-social-block">
              <h5>Social Media</h5>
              <ul className="clearfix social-media-list">
                {[firstSocialRow, secondSocialRow].map((row, rowIndex) => (
                  <li key={rowIndex === 0 ? "social-row-primary" : "social-row-secondary"}>
                    {row.map((item) => (
                      item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                        >
                          <img src={item.icon} alt={item.label} loading="lazy" />
                        </a>
                      ) : (
                        <span key={item.label} className="social-link-unavailable" aria-label={`${item.label} unavailable`}>
                          <img src={item.icon} alt={item.label} loading="lazy" />
                        </span>
                      )
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0 text-muted text-left">© 2025 | MECANAV</p>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
