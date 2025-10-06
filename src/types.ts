import { read } from "fs";
import { ReadingStatus } from "../src/types/reading-status";

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
  owner: string | null;
}

export const allReadingStatuses: ReadingStatus[] = [
  'QUERO_LER',
  'LENDO',
  'LIDO',
];

export const statusLabels: Record<ReadingStatus, string> = {
  'QUERO_LER': 'Quero Ler',
  'LENDO': 'Lendo',
  'LIDO': 'Lido'
};