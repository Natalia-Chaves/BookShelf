import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#3e2723] text-[#f5f5dc] py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
        
        {/* Nome + ícone */}
        <div className="flex items-center gap-2">
          <Coffee size={20} className="text-[#d7a86e]" />
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="font-bold text-[#d7a86e]">Debug Café</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
