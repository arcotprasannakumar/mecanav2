import { Link } from "react-router-dom";

const toneClasses = {
  dark: "border-white/10 bg-white/[0.03] text-white",
  light: "border-black/10 bg-white text-black",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
};

function StatusPanel({
  title,
  message,
  tone = "dark",
  actionLabel,
  actionTo,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] ${toneClasses[tone]} ${className}`.trim()}
    >
      {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
      {message ? <p className={`${title ? "mt-3" : ""} text-sm leading-7 opacity-80`}>{message}</p> : null}
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className={`mt-6 inline-flex rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
            tone === "light"
              ? "border-black/15 hover:border-black/30"
              : "border-current/20 hover:border-current/40"
          }`}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default StatusPanel;
