'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;        // Avaliação atual
  total?: number;         // Total de estrelas (default: 5)
  onRate?: (rating: number) => void; // Callback ao clicar
  size?: number;          // Tamanho opcional das estrelas
  color?: string;         // Cor da estrela preenchida
  strokeColor?: string;   // Cor da borda
}

export default function StarRating({
  rating = 0,
  total = 5,
  onRate,
  size = 20,
  color = '#6F4E37',
  strokeColor = '#6F4E37',
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }, (_, i) => {
        const starIndex = i + 1;
        const filled = starIndex <= currentRating;

        return (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRate?.(starIndex);
            }}
            onMouseEnter={() => setHoverRating(starIndex)}
            onMouseLeave={() => setHoverRating(null)}
            aria-label={`Avaliar com ${starIndex} estrela${starIndex > 1 ? 's' : ''}`}
            className="focus:outline-none"
          >
            <Star
              size={size}
              fill={filled ? color : 'none'}
              stroke={strokeColor}
            />
          </button>
        );
      })}
    </div>
  );
}
