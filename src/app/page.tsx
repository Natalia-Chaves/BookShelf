'use client';

import { BookOpen } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function HomePage({ theme }) {
  const router = useRouter();

  // Define as classes Tailwind dinamicamente com base no tema
  const containerClass = `flex flex-col justify-center items-center min-h-screen w-full gap-4 px-4 text-center ${
    theme === 'dark' ? 'bg-[var(--main-background)] text-[var(--foreground)]' : 'bg-[#d7a86e] text-[#3e2723]'
  }`;

  return (
    <div className={containerClass}>
      <h1 className="font-bold flex items-center gap-2
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        <BookOpen className="size-12 sm:size-16 md:size-20 lg:size-24 xl:size-28" />
        CaféBooks
      </h1>

      <p className="font-bold 
        text-lg sm:text-xl md:text-2xl lg:text-3xl inline-flex items-center gap-2 mb-4">
        Sua biblioteca com cheirinho de café!
      </p>

      {/* Botão de Login */}
      <button
        onClick={() => router.push('/biblioteca')}
        className="bg-[#80633f] text-[#ffffff] px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#c7925c] transition-colors"
      >
        Entrar
      </button>
    </div>
  );
}
