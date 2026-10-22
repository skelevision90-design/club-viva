import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const fixedWhatsAppUrl =
    "https://wa.me/919810834976?text=Hi%20Club%20Viva%2C%20I%20would%20like%20to%20book%20a%20free%20trial%20session";

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <a
        href={fixedWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-neutral-200 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
        <span className="font-anton tracking-wider text-xs">WHATSAPP VIVA</span>
      </a>
    </aside>
  );
}
