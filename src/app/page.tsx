import { BookOpen } from "lucide-react";
import BookCard from "@/components/BookCard";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4 bg-[#d7a86e] text-[#3e2723] px-4 text-center">
      <h1 className="font-bold flex items-center gap-2
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        <BookOpen className="size-12 sm:size-16 md:size-20 lg:size-24 xl:size-28" />
        CaféBooks
      </h1>

      <p className="font-bold 
        text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Sua biblioteca com cheirinho de café
      </p>
    </div>
  );
}