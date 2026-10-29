"use client";

// Foto com fallback elegante e tratamento de cor único (todas as fotos parecem do mesmo ensaio).
// Passe `src` (local "/photos/x.jpg" ou remota cadastrada em next.config.ts).
// Se não houver `src`, ou se a imagem falhar, mostra o placeholder com o rótulo.
// As fotos do site ficam centralizadas em src/content/photos.ts.
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const tones = [
  "from-sage-soft via-sage/60 to-[#d9d3c3]",
  "from-[#ece6d8] via-sage-soft to-sage/70",
  "from-sage/70 via-[#cfd3c1] to-[#efe9dc]",
  "from-[#dfe2d3] via-[#efe9dc] to-sage/60",
];

// Tratamento de cor único (DESIGN.md, "Photography").
const TREAT = "[filter:saturate(.88)_contrast(1.02)_sepia(.06)]";

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
  reveal = false,
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
  /** Entra com máscara de baixo para cima + zoom 1,12 → 1. */
  reveal?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const animate = reveal && !reduce;
  const chip = label && (
    <span className="absolute bottom-4 left-4 z-10 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brand backdrop-blur">
      {label}
    </span>
  );

  if (src && !failed) {
    return (
      <motion.div
        data-cursor="Ver"
        className={`relative overflow-hidden bg-sage-soft ${className}`}
        initial={animate ? { clipPath: "inset(100% 0 0 0)" } : false}
        whileInView={animate ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={animate ? { scale: 1.12 } : false}
          whileInView={animate ? { scale: 1 } : undefined}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
            className={`object-cover ${TREAT} ${imgClassName}`}
          />
        </motion.div>
        {/* véu leve na cor da marca para unificar as fotos */}
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-brand opacity-[0.06] mix-blend-soft-light" />
        {showLabelOnPhoto && chip}
      </motion.div>
    );
  }

  return (
    <div role="img" aria-label={alt} className={`grain relative overflow-hidden bg-gradient-to-br ${tones[tone % tones.length]} ${className}`}>
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <circle cx="78" cy="22" r="26" fill="none" stroke="var(--accent)" strokeWidth="0.25" />
        <circle cx="78" cy="22" r="38" fill="none" stroke="var(--accent)" strokeWidth="0.15" />
        <path d="M0 80 C 30 60, 60 95, 100 70" fill="none" stroke="var(--brand)" strokeWidth="0.2" />
      </svg>
      {chip}
    </div>
  );
}
