'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import type { Book } from '@/types';

interface StatusSelectorProps {
  book: Book;
  onStatusUpdate: (newStatus: string) => void;
}

const STATUS_OPTIONS = ['Quero ler', 'Lendo', 'Lido'];

export default function StatusSelector({ book, onStatusUpdate }: StatusSelectorProps) {
  const [status, setStatus] = useState<string>(book.status ?? '');

  useEffect(() => {
    setStatus(book.status ?? '');
  }, [book.status]);

  const handleChange = (value: string) => {
    setStatus(value);
    onStatusUpdate(value); // <- Chama a função passada via props
  };

  const statusColors: Record<string, string> = {
    'Quero ler': 'bg-gray-200 text-gray-800',
    'Lendo': 'bg-yellow-300 text-yellow-900',
    'Lido': 'bg-green-500 text-white',
  };

  return (
    <div className="w-full px-4 mt-2">
      <Select value={status} onValueChange={handleChange}>
        <SelectTrigger className="w-full border border-gray-300 rounded-lg bg-white text-black px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#6E3D34] focus:outline-none transition-all">
          <SelectValue placeholder="Selecione status" />
        </SelectTrigger>
        <SelectContent className="bg-white text-black border border-gray-200 shadow-lg rounded-lg mt-1">
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem
              key={opt}
              value={opt}
              className={`rounded-md px-3 py-2 cursor-pointer select-none text-sm transition-colors ${
                status === opt ? `${statusColors[opt]} font-semibold` : 'hover:bg-gray-100'
              }`}
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
