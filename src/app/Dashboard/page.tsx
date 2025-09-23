'use client';

import { useEffect, useState } from 'react';
import type { Book } from '@/types';
import { BookOpen, BookMarked, BookCheck, FileText } from 'lucide-react';

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem('myBooks');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  const totalBooks = books.length;
  const totalPagesRead = books.reduce((sum, book) => sum + (book.pagesRead || 0), 0);
  const booksReading = books.filter(book => book.status === 'lendo').length;
  const booksFinished = books.filter(book => book.status === 'finalizado').length;

  return (
    <main className="mx-auto px-4 py-10 bg-[var(--main-background)] min-h-screen" style={{ marginTop: '64px' }}>
      <h1 className="text-4xl font-bold text-center mb-10">Dashboard da Biblioteca</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<BookOpen size={40} className="text-[#6F4E37]" />} label="Total de Livros" value={totalBooks} />
        <StatCard icon={<BookMarked size={40} className="text-blue-600" />} label="Lendo Atualmente" value={booksReading} />
        <StatCard icon={<BookCheck size={40} className="text-green-600" />} label="Finalizados" value={booksFinished} />
        <StatCard icon={<FileText size={40} className="text-purple-600" />} label="Total de Páginas Lidas" value={totalPagesRead} />
      </div>
    </main>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <p className="text-2xl font-bold text-[#6F4E37]">{value}</p>
      <p className="text-[#8B4513] mt-1">{label}</p>
    </div>
  );
}