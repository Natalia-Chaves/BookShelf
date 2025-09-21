'use client';
import { User } from "lucide-react";
import Image from 'next/image';

export default function ProfilePage({ theme, user }) {
  const containerClass = `flex flex-col justify-center items-center min-h-screen w-full gap-4 px-4 text-center ${
    theme === 'dark' ? 'bg-[var(--main-background)] text-[var(--foreground)]' : 'bg-[var(--main-background)] text-[var(--foreground)]'
  }`;

  return (
    <div className={containerClass}>
      <div className="relative size-24 sm:size-28 md:size-32 rounded-full overflow-hidden border-2 border-[var(--foreground)]">
        {user?.profileImage ? (
          <Image
            src={user.profileImage}
            alt="Foto de Perfil"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex justify-center items-center size-full bg-[var(--form-background)]">
            <User className="size-16 sm:size-20 md:size-24 text-[var(--foreground)]" />
          </div>
        )}
      </div>

      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        {user?.name || 'Leitor Anônimo'}
      </h1>

      <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-2xl">
        {user?.bio || 'Este é um espaço para a sua biografia. Conte-nos um pouco sobre você e sua jornada de leitura!'}
      </p>
    </div>
  );
}