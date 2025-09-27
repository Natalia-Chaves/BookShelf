'use client';

interface DeleteConfirmationModalProps {
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  bookTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="p-6 rounded-md w-80 shadow-lg"
        style={{
          backgroundColor: 'var(--form-background)',
          color: 'var(--text-primary)',
        }}
      >
        <h2 className="text-xl font-bold mb-4">Confirma exclusão?</h2>
        <p className="mb-4">
          Deseja realmente excluir o livro <strong>{bookTitle}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded transition"
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--text-primary)',
              border: '1px solid var(--divider-color)',
            }}
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded text-white transition"
            style={{
              backgroundColor: 'var(--danger-color, #dc2626)',
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
