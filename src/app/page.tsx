import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Statement } from "@/components/Statement";
import { Marquee } from "@/components/Marquee";
import { Concerns } from "@/components/Concerns";
import { Treatments } from "@/components/Treatments";
import { About } from "@/components/About";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Journey } from "@/components/Journey";
import { Booking } from "@/components/Booking";
import { SocialProof, FAQ, Contact, Footer } from "@/components/Sections";
import { FloatingCta } from "@/components/FloatingCta";
import { FEATURES } from "@/config";
import { HairLine } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Trust />
        <Statement />
        <Marquee />
        <Concerns />
        <HairLine />
        <Treatments />
        <About />
        {FEATURES.beforeAfter && <BeforeAfter />}
        <Journey />
        <Booking />
        <SocialProof />
        <HairLine />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
