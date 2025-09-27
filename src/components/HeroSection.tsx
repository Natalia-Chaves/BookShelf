// src/components/HeroSection.tsx

import React from "react";
import { BookOpenText } from "lucide-react";

export default function HeroSection() {
  return (
    <div
      // Largura: Full Width (sem padding lateral, controlado pelo componente pai). Altura: 350px.
      className="h-[350px] overflow-hidden mb-12 py-8 rounded-3xl"
      style={{
        // Usa a variável de fundo que se adapta ao tema
        backgroundColor: "var(--color-surface-hero)",

        // Sombra uniforme e forte, adaptável com a variável CSS
        boxShadow: "0 0 20px 0 var(--color-shadow-hero)",
        borderRadius: "24px", // Bordas arredondadas
      }}
    >
      <div
        // O max-w-[1500px] mx-auto centraliza o conteúdo.
        // O padding interno (px-4 md:px-8) impede que o conteúdo grude nas bordas do Hero.
        className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full gap-8 px-4 md:px-8"
      >
        {/* Lado Esquerdo: Bloco de Mensagem */}
        <div className="flex flex-col justify-center space-y-4">
          <h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ color: "var(--text-primary)" }}
          >
            Explore Sua Biblioteca Virtual
          </h1>
          <p
            className="text-md md:text-xl flex text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Descubra sua vasta coleção de títulos, do clássico ao contemporâneo.
            O conhecimento espera por você.
          </p>
        </div>

        {/* Lado Direito: Ícone (Ilustração) */}
        <div className="hidden md:flex justify-center items-center h-full">
          <BookOpenText
            size={220}
            style={{ color: "var(--text-primary)" }}
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
}
