

export default function BookCard({ title, author, imageUrl }) {
  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-64">
       
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">
          {title}
        </h3>
        <p className="text-[#8B4513] italic">{author}</p>
      </div>
    </div>
  );
}
