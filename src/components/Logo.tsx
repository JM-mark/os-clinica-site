// Logo em vetor (SVG), recriada no estilo da marca: monograma OS entrelaçado + "OS CLÍNICA" + "Odontologia Integrada".
// ATENÇÃO: é uma recriação, não o arquivo oficial. TODO substituir pelos arquivos oficiais da clínica,
// mantendo os mesmos nomes em public/brand/ (symbol.svg, logo-horizontal.svg, logo-horizontal-white.svg, logo-stacked-white.svg).
// Os SVGs convertem as letras em curvas (fontes Cormorant Garamond e Jost), então não dependem de fonte instalada.
type Variant = "full" | "symbol" | "white" | "stacked";

const FILES: Record<Variant, { file: string; ratio: number }> = {
  full: { file: "logo-horizontal.svg", ratio: 4.65 },
  white: { file: "logo-horizontal-white.svg", ratio: 4.65 },
  symbol: { file: "symbol.svg", ratio: 1 },
  stacked: { file: "logo-stacked-white.svg", ratio: 640 / 720 },
};

export function Logo({ variant = "full", className = "", height = 40 }: { variant?: Variant; className?: string; height?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const { file, ratio } = FILES[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}/brand/${file}`}
      alt="OS Clínica — Odontologia Integrada"
      height={height}
      width={Math.round(height * ratio)}
      className={`block w-auto ${className}`}
      style={{ height }}
    />
  );
}
