// src/components/HeroSection.tsx

import React from 'react';
import { BookOpenText } from 'lucide-react';

export default function HeroSection() {
  return (
    <div
      // A Hero agora é full width (100% da largura da tela)
      // O PADDING HORIZONTAL (px-12) cria o espaçamento nas bordas
      className="h-[350px] overflow-hidden mb-12 py-10 px-12" // py-8 para padding vertical
      style={{ 
        // Aplicando o fundo e a Sombra do Card
        backgroundColor: 'var(--color-surface-hero)', 
        boxShadow: '0 10px 20px 1px rgba(38, 42, 62, 0.5), 0 4px 6px -2px rgba(38, 42, 62, 0.05)',
        borderRadius: '24px' // O valor do 'rounded-3xl'
      }}
    >
      <div 
        // Removido o max-w-7xl para ter largura total do container
        className="grid grid-cols-1 md:grid-cols-2 items-center h-full gap-8"
      >
        
        {/* Lado Esquerdo: Texto */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 
            className="flex justify-center text-4xl md:text-5xl font-extrabold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Explore Sua Biblioteca Virtual
          </h1>
          <p 
            className="text-lg"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Descubra sua vasta coleção de títulos, do clássico ao contemporâneo. O conhecimento espera por você.
          </p>
        </div>

        {/* Lado Direito: Ícone */}
        <div className="hidden md:flex justify-center items-center h-full">
          <BookOpenText 
            size={220} 
            style={{ color: 'var(--color-text-primary)' }}   
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
}