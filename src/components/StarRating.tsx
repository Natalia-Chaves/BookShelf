'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    total?: number;
    onRate?: (rating: number) => void;
}

export default function StarRating({ rating, total = 5, onRate }: StarRatingProps) {
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
                            size={20}
                            fill={filled ? '#6F4E37' : 'none'}
                            stroke="#6F4E37"
                        />
                    </button>
                );
            })}
        </div>
    );
}
