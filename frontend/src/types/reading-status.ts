
export enum ReadingStatus {

  WANT_TO_READ = 'QUERO_LER',
  
  READING = 'LENDO',
  
  READ = 'LIDO',
  
  PAUSED = 'PAUSADO',
}

export const allReadingStatuses = Object.values(ReadingStatus);

export interface Book {
  id: string;
  title: string;
  author: string;
  status: ReadingStatus; 
  currentPage?: number;
  finishDate?: Date;
}