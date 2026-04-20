import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { locations, navigation } from "../data/masterData";
import PageMeta from "../components/PageMeta";
import StatusPanel from "../components/StatusPanel";
import contactBackground from "../assets/images/applications/od3.webp";
 
const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer architectural and MECANAV design, installation, and maintenance services.",
  },
  {
    question: "How can I request a quote?",
    answer: "You can request a quote through our contact form or by emailing us.",
  },
  {
    question: "Do you provide installation services?",
    answer: "Yes, we provide full installation services for all our lighting systems.",
  },
];

const formFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", required: true },
  { name: "message", label: "Message", required: true },
];

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());
}

function validateRequiredFields(values, fields) {
  for (const field of fields) {
    if (field.required && !String(values[field.name] ?? "").trim()) {
      return `The ${field.label} field is required.`;
    }
  }

  return "";
}

function ContactInfoCard({ text, href, icon, iconColor = "text-white" }) {
  const content = href ? (
    <a href={href} className="transition hover:text-white">
      {text}
    </a>
  ) : (
    <span>{text}</span>
  );

  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-6 w-6 items-center justify-center text-[20px] ${iconColor}`}>
        {icon}
      </div>
      <div className="text-[16px] font-normal text-white/95">{content}</div>
    </div>
  );
}

function ContactForm() {
  const initialValues = useMemo(
    () => Object.fromEntries(formFields.map((field) => [field.name, ""])),
    [],
  );
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (fieldName, fieldValue) => {
    setValues((current) => ({ ...current, [fieldName]: fieldValue }));
    setError("");
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(false);

    const requiredError = validateRequiredFields(values, formFields);
    if (requiredError) {
      setError(requiredError);
      return;
    }

    if (!validateEmail(values.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);

    if (formRef.current) {
      formRef.current.submit();
    }

    setValues(initialValues);
  };

  return (
    <div className="min-h-[520px] rounded-[16px] bg-[#171717] px-8 py-9 sm:px-8 sm:py-9">
      <form
        ref={formRef}
        action="https://docs.google.com/forms/d/e/1FAIpQLSciugRivuyedJbIg43J4NRSpY_Dkws23M4re6GvCv8WaX8ogQ/formResponse"
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        className="flex h-full flex-col"
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-[15px] font-normal text-white">Name</label>
            <input
              type="text"
              name="entry.1323039583"
              value={values.name}
              placeholder="Your Name"
              onChange={(event) => handleChange("name", event.target.value)}
              className="h-12 w-full rounded-[6px] border border-[#474747] bg-[#2a2a2a] px-4 text-[16px] font-normal text-white placeholder:text-[#707784] focus:border-[#5d5d5d] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[15px] font-normal text-white">Email</label>
            <input
              type="email"
              name="entry.140045828"
              value={values.email}
              placeholder="Your Email"
              onChange={(event) => handleChange("email", event.target.value)}
              className="h-12 w-full rounded-[6px] border border-[#474747] bg-[#2a2a2a] px-4 text-[16px] font-normal text-white placeholder:text-[#707784] focus:border-[#5d5d5d] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[15px] font-normal text-white">Message</label>
            <textarea
              rows={7}
              name="entry.165633033"
              value={values.message}
              placeholder="Your Message"
              onChange={(event) => handleChange("message", event.target.value)}
              className="h-40 w-full resize-none rounded-[6px] border border-[#474747] bg-[#2a2a2a] px-4 py-3 text-[16px] font-normal text-white placeholder:text-[#707784] focus:border-[#5d5d5d] focus:outline-none"
            />
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

        {submitted ? (
          <div className="mt-4 rounded-[10px] border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Thank you! Your message has been sent.
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-5 flex h-[54px] w-full items-center justify-center rounded-[14px] bg-[#e7e7e7] text-[16px] font-semibold text-black transition duration-300 hover:bg-white"
        >
          Send Message
        </button>
      </form>

      <iframe name="hidden_iframe" title="hidden_iframe" className="hidden" />
    </div>
  );
}

function LocationCard({ location }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
      <h3 className="text-lg font-semibold text-black">{location.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{location.address}</p>
      <p className="mt-2 text-sm text-slate-600">{location.phone}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${location.name} ${location.address}`,
        )}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:border-black"
      >
        Open in Maps
      </a>
    </div>
  );
}
 
function ContactPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("translate-y-12", "opacity-0");
            entry.target.classList.add("translate-y-0", "opacity-100");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -70px 0px",
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [hasSearched]);
 
  const filteredLocations = useMemo(() => {
    const term = query.trim().toLowerCase();
 
    if (!term) {
      return [];
    }
 
    return locations.filter((location) =>
      `${location.name} ${location.country}`.toLowerCase().includes(term),
    );
  }, [query]);
 
  const contactEmail = navigation.footer.contact.email;
  const socialLinks = navigation.footer.social;
  const revealClass =
    "translate-y-12 opacity-0 transition-all duration-700 ease-out will-change-transform";
 
  return (
    <section className="bg-[#0f0f0f] text-white">
      <PageMeta
        title="Contact"
        description="Contact Mecanav for project inquiries, lighting support, and location information."
      />
 
      <section
        id="breadcrumb-section"
        className="relative overflow-hidden text-center"
        style={{
          backgroundImage: `url(${contactBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 mx-auto flex min-h-[340px] max-w-[1280px] flex-col items-center justify-center px-4 py-16 sm:min-h-[380px] lg:min-h-[400px]">
          <div className="mt-12 flex flex-col items-center sm:mt-14 lg:mt-16">
            <h2
              data-reveal
              className={`${revealClass} mb-3 text-[24px] font-semibold text-white sm:text-[28px]`}
            >
              Contact
            </h2>
 
            <div
              data-reveal
              className={`${revealClass} flex items-center gap-2 text-sm`}
              style={{ transitionDelay: "120ms" }}
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#0d6efd] transition hover:text-[#5da1ff] sm:text-[14px]"
              >
                <FaHome className="text-[14px] text-[#0d6efd]" />
                <span>Home</span>
              </Link>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#9c9c9c] shadow-sm">
                <FaChevronRight className="text-[10px]" />
              </span>

              <span className="text-[13px] font-medium text-white sm:text-[14px]">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </section>
 
<section id="contact" className="bg-black px-4 py-6 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-[1600px]">
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        <div
          data-reveal
          className={`${revealClass} min-h-[450px] rounded-[16px] bg-[#171717] px-6 py-7 sm:px-6 sm:py-7`}
        >
          <h2 className="text-[42px] font-semibold leading-[1.08] text-white sm:text-[44px]">
            Get in Touch
          </h2>
 
          <p className="mt-6 max-w-[650px] text-[17px] font-normal leading-[1.9] text-white/85">
            We&apos;d love to hear from you. Reach out for project inquiries, feedback, or
            general questions.
          </p>
 
          <div className="mt-10 space-y-6">
            <ContactInfoCard
              text="123 Light Street, Glow City"
              icon="📍"
              iconColor="text-[#14b8d4]"
            />
 
            <ContactInfoCard
              text={contactEmail}
              href={`mailto:${contactEmail}`}
              icon="✉"
              iconColor="text-[#ff4d5a]"
            />
          </div>
 
          <div className="mt-8 flex flex-wrap gap-2">
            {socialLinks.map((social) =>
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2b2b] transition duration-300 hover:bg-[#363636]"
                  aria-label={social.label}
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="h-[18px] w-[18px] object-contain"
                  />
                </a>
              ) : (
                <span
                  key={social.label}
                  className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full bg-[#2b2b2b] opacity-50"
                  aria-label={`${social.label} unavailable`}
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="h-[18px] w-[18px] object-contain"
                  />
                </span>
              ),
            )}
          </div>
        </div>
 
      <div
        data-reveal
        className={revealClass}
        style={{ transitionDelay: "120ms" }}
      >
        <ContactForm />
      </div>
    </div>
  </div>
</section>
 
<section id="faq" className="bg-[#1c1c1c] px-4 py-10 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-[1280px]">
    <div data-reveal className={revealClass}>
      <h2 className="mb-10 text-center text-[32px] font-semibold text-white">
        Frequently Asked Questions
      </h2>
    </div>
 
    <div
      data-reveal
      className={`${revealClass} mx-auto max-w-[1100px] space-y-3`}
      style={{ transitionDelay: "120ms" }}
    >
      {faqs.map((item, index) => {
        const isOpen = activeFaqIndex === index;
 
        return (
            <div
              key={item.question}
              className="rounded-[6px] border border-white/10 bg-[#181818]"
            >
              <button
                type="button"
                onClick={() => setActiveFaqIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between px-5 py-5 text-left"
              >
                <span className="text-[17px] font-medium text-white">
                  {item.question}
                </span>
 
                <span className="text-[22px] text-white">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
 
              {isOpen && (
                <div className="border-t border-white/10 bg-[#222222] px-5 py-4 text-[15px] leading-7 text-white/75">
                  {item.answer}
                </div>
              )}
            </div>
        );
      })}
    </div>
  </div>
</section>
 
 
<section className="bg-black px-2 pt-8 sm:px-4 lg:px-6">
  <div className="mx-auto max-w-[1600px]">
    <div data-reveal className={revealClass}>
      <div className="text-center">
        <h2 className="text-[26px] font-semibold text-white sm:text-[30px]">
          Search Your Nearest Location
        </h2>
      </div>
    </div>
 
      <form
        data-reveal
        className={`${revealClass} mx-auto mt-6 flex w-full max-w-[760px] flex-col gap-2 rounded-[12px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center`}
        style={{ transitionDelay: "120ms" }}
        onSubmit={(event) => {
          event.preventDefault();
          setHasSearched(true);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search By City Or Country..."
          className="h-[52px] flex-1 rounded-[8px] border border-[#d7d7d7] bg-[#f3f3f3] px-4 text-[15px] text-black placeholder:text-[#8a8a8a] focus:border-[#0d6efd] focus:outline-none"
        />
 
        <button
          type="submit"
          className="h-[52px] rounded-[8px] bg-[#0d57d8] px-6 text-[15px] font-medium text-white transition hover:bg-[#0b4cc0] sm:min-w-[100px]"
        >
          Search
        </button>
      </form>
 
      <div
        data-reveal
        className={`${revealClass} mt-8 mb-1 overflow-hidden rounded-[14px]`}
        style={{ transitionDelay: "180ms" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9650744.676098576!2d-1.5541365!3d54.559322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487931b71d11600f%3A0xf6ba7d65126b47d3!2sUnited%20Kingdom!5e0!3m2!1sen!2sin!4v1716118513051!5m2!1sen!2sin"
          title="Mecanav map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[420px] w-full border-0"
        />
      </div>
 
    {hasSearched && (
        <div
          data-reveal
          className={`${revealClass} mx-auto mt-3 max-w-[760px]`}
          style={{ transitionDelay: "240ms" }}
        >
          {filteredLocations.length ? (
            <div className="space-y-3">
              {filteredLocations.map((location) => (
                <LocationCard key={location.slug} location={location} />
              ))}
            </div>
          ) : (
            <StatusPanel
              tone="light"
              message="No matching location found."
              className="rounded-[12px] bg-white px-4 py-4 text-sm"
            />
          )}
        </div>
    )}
  </div>
</section>
    </section>
  );
}
 
export default ContactPage;
