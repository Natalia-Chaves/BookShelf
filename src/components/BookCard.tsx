import Image from 'next/image';

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
}

export default function BookCard({ title, author, imageUrl }: BookCardProps) {
  return (
    <div className="flex flex-col items-center bg-[var(--form-background)] rounded-xl shadow-md p-4 transition-transform transform hover:scale-105">
      <div className="relative w-full h-48 mb-4">
       
      </div>
      <div className="flex flex-col text-center">
        <h3 className="text-lg font-bold text-gray-800">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {author}
        </p>
      </div>
    </div>
  );
}