// src/types.ts
import { ReadingStatus } from '@prisma/client';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  pagesread?: number | null;
  status: ReadingStatus;
  finishDate?: Date | string | null;
  rating?: number | null;
  synopsis?: string | null;
  cover?: string | null;
  imageurl?: string | null;
  created_at?: Date | string | null;
}

export const allReadingStatuses: ReadingStatus[] = [
  'QUERO_LER',
  'LENDO',
  'LIDO',
  'PAUSADO',
  'ABANDONADO'
];

export const statusLabels: Record<ReadingStatus, string> = {
  'QUERO_LER': 'Quero Ler',
  'LENDO': 'Lendo',
  'LIDO': 'Lido',
  'PAUSADO': 'Pausado',
  'ABANDONADO': 'Abandonado'
};