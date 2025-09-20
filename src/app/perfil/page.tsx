'use client';
import { User } from "lucide-react";

export default function ProfilePage({ theme }) {
  const containerClass = `flex flex-col justify-center items-center min-h-screen w-full gap-4 px-4 text-center ${
    theme === 'dark' ? 'bg-[var(--main-background)] text-[var(--foreground)]' : 'bg-[#d7a86e] text-[#3e2723]'
  }`;

  return (
    <div className={containerClass}>
      <User className="size-24 sm:size-28 md:size-32" />
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        Página de Perfil
      </h1>
      <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Aqui você pode ver e editar suas informações.
      </p>
    </div>
  );
}
