// src/types/reading-status.ts

/**
 * Enum type-safe para os diferentes status de leitura de um livro.
 */
export enum ReadingStatus {
  // Padrão para livros novos ou na lista de desejos
  WANT_TO_READ = 'QUERO_LER',
  
  // Livro que está sendo lido ativamente
  READING = 'LENDO',
  
  // Livro que foi completamente concluído
  READ = 'LIDO',
  
  // Livro em pausa temporária
  PAUSED = 'PAUSADO',
  
  // Livro que o usuário decidiu não terminar
  ABANDONED = 'ABANDONADO',
}

// Opcional: Para facilitar a iteração em componentes de UI
export const allReadingStatuses = Object.values(ReadingStatus);

// Opcional: Um tipo para o modelo Livro
export interface Book {
  id: string;
  title: string;
  author: string;
  // Associa o campo de status ao Enum
  status: ReadingStatus; 
  currentPage?: number; // Para status READING
  finishDate?: Date;    // Para status READ
  // ... outras propriedades
}