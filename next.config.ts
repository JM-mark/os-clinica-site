import type { NextConfig } from "next";

// GitHub Pages: export estático sob /<repo>. Em dev/Vercel, nada muda.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/os-clinica-site" : "";

const nextConfig: NextConfig = {
  /* config options here */
  // PPR/cacheComponents não existem em export estático.
  ...(pages ? {} : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(pages ? { output: "export", basePath, images: { unoptimized: true }, trailingSlash: true } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
