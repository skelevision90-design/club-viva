import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Transformations from "@/components/Transformations";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* 1. Header & Hero */}
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col">
        <Hero />

        {/* 2. What We Train (4 Programs) */}
        <Programs />

        {/* 3. Transformations (3 Athletes) */}
        <Transformations />

        {/* 4. Join (Complimentary Session Form) */}
        <JoinForm />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Floating White WhatsApp Action */}
      <FloatingWhatsApp />
    </div>
  );
}
