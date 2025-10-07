'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import type { Book } from '@/types';

// Opções fixas e corretas de status (tamanho e capitalização devem bater)
const STATUS_OPTIONS = ['Quero ler', 'Lendo', 'Lido'];

// Normaliza o valor para um dos valores válidos de STATUS_OPTIONS, ou retorna ''
function normalizeStatus(status?: string): string {
  if (!status) return '';
  const normalized = status.trim().toLowerCase();
  const matched = STATUS_OPTIONS.find(
    (opt) => opt.toLowerCase() === normalized
  );
  return matched || '';
}

interface StatusSelectorProps {
  book: Book;
  onStatusUpdate: (newStatus: string) => void;
}

export default function StatusSelector({ book, onStatusUpdate }: StatusSelectorProps) {
  const [status, setStatus] = useState<string>(normalizeStatus(book.status));

  // Atualiza o status interno toda vez que a prop book.status mudar
  useEffect(() => {
    const normalized = normalizeStatus(book.status);
    if (normalized !== status) {
      setStatus(normalized);
    }
  }, [book.status]);

  const handleChange = (value: string) => {
    setStatus(value);       // Atualiza local para resposta imediata
    onStatusUpdate(value);  // Notifica para atualizar no banco
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
              className="rounded-md px-3 py-2 cursor-pointer select-none text-sm transition-colors hover:bg-gray-100"
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
