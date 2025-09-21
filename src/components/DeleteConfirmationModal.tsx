
import { Book } from "@/types";
// src/components/DeleteConfirmationModal.tsx
export default function DeleteConfirmationModal({ bookTitle, onConfirm, onCancel }: { bookTitle: string; onConfirm: () => void; onCancel: () => void; }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#EFEAE4] p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h3 className="text-xl font-bold text-[#6F4E37] mb-4">
          Realmente excluir "{bookTitle}"?
        </h3>
        <p className="text-sm text-[#8B4513] mb-6">Esta ação não pode ser desfeita.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}