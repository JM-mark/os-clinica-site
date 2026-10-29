// Logo provisória (wordmark tipográfico). TODO substituir pela logo oficial:
// coloque o arquivo em public/brand/ e aponte OFFICIAL_LOGO abaixo — nada mais precisa mudar.
const OFFICIAL_LOGO: { full?: string; symbol?: string; white?: string } = {
  // full: "/brand/logo.svg",
  // symbol: "/brand/symbol.svg",
  // white: "/brand/logo-white.svg",
};

type Variant = "full" | "symbol" | "white";

export function Logo({ variant = "full", className = "" }: { variant?: Variant; className?: string }) {
  const src = OFFICIAL_LOGO[variant];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="OS Clínica — Odontologia Integrada" className={className} />;
  }

  const isWhite = variant === "white";
  const ink = isWhite ? "#ffffff" : "var(--brand)";
  const sub = isWhite ? "rgb(255 255 255 / 0.75)" : "var(--muted)";

  const symbol = (
    <span
      aria-hidden
      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full"
      style={{ background: isWhite ? "rgb(255 255 255 / 0.14)" : "var(--sage)" }}
    >
      <span className="font-serif text-[17px] leading-none" style={{ color: isWhite ? "#fff" : "var(--brand-dark)" }}>
        OS
      </span>
      <svg className="absolute inset-0" viewBox="0 0 40 40" fill="none">
        <path d="M9 28c6 6 17 6 22-2" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );

  if (variant === "symbol") {
    return (
      <span className={`inline-flex ${className}`} role="img" aria-label="OS Clínica">
        {symbol}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} role="img" aria-label="OS Clínica — Odontologia Integrada">
      {symbol}
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[22px] tracking-tight" style={{ color: ink }}>
          OS Clínica
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: sub }}>
          Odontologia Integrada
        </span>
      </span>
    </span>
  );
}
