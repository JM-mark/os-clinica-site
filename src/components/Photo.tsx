"use client";

// Foto com fallback elegante. Passe `src` (local "/photos/x.jpg" ou remota cadastrada em next.config.ts).
// Se não houver `src`, ou se a imagem falhar ao carregar, mostra o placeholder com o rótulo.
// As fotos do site ficam centralizadas em src/content/photos.ts.
import Image from "next/image";
import { useState } from "react";

const tones = [
  "from-sage-soft via-sage/60 to-[#d9d3c3]",
  "from-[#ece6d8] via-sage-soft to-sage/70",
  "from-sage/70 via-[#cfd3c1] to-[#efe9dc]",
  "from-[#dfe2d3] via-[#efe9dc] to-sage/60",
];

export function Photo({
  src,
  alt,
  label,
  tone = 0,
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  showLabelOnPhoto = false,
}: {
  src?: string;
  alt: string;
  label?: string;
  tone?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  showLabelOnPhoto?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const chip = label && (
    <span className="absolute bottom-4 left-4 z-10 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur">
      {label}
    </span>
  );

  if (src && !failed) {
    return (
      <div className={`relative overflow-hidden bg-sage-soft ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover ${imgClassName}`}
        />
        {showLabelOnPhoto && chip}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`grain relative overflow-hidden bg-gradient-to-br ${tones[tone % tones.length]} ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <circle cx="78" cy="22" r="26" fill="none" stroke="var(--accent)" strokeWidth="0.25" />
        <circle cx="78" cy="22" r="38" fill="none" stroke="var(--accent)" strokeWidth="0.15" />
        <path d="M0 80 C 30 60, 60 95, 100 70" fill="none" stroke="var(--brand)" strokeWidth="0.2" />
      </svg>
      {chip}
    </div>
  );
}
