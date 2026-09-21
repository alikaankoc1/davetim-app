import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { TemplateGallery } from "@/components/landing/TemplateGallery";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <TemplateGallery />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
