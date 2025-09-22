'use client';

interface DeleteConfirmationModalProps {
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({ bookTitle, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">Confirma exclusão?</h2>
        <p className="mb-4">Deseja realmente excluir o livro <strong>{bookTitle}</strong>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-500 text-white rounded">Excluir</button>
        </div>
      </div>
    </div>
  );
}
