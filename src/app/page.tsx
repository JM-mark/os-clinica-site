import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Treatments } from "@/components/Treatments";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Booking } from "@/components/Booking";
import { InstagramSection, Reviews, FAQ, Contact, Footer } from "@/components/Sections";
import { FloatingCta } from "@/components/FloatingCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Trust />
        <Treatments />
        <About />
        <Journey />
        <Booking />
        <InstagramSection />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
