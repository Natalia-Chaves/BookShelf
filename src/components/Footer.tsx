import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--background)] text-[var(--foreground)] py-5 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
        {/* Nome + ícone */}
        <div className="flex items-center gap-2">
          <Coffee size={20} />
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold">Debug Café</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
