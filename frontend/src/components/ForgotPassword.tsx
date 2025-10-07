'use client';

import { useState } from 'react';
import { authService } from '@/services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await authService.resetPassword(email);
      setMessage('Confira seu e-mail para redefinir sua senha.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--main-background)] text-[var(--foreground)] p-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-[var(--form-background)] text-[var(--text-primary)] p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--title-color)] text-center">
          Recuperar Senha
        </h2>

        {message && (
          <p className="text-green-700 bg-green-100 p-2 rounded mb-4 text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <label htmlFor="email" className="block text-sm mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-6 border border-[var(--divider-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--divider-color)] text-[var(--foreground)] bg-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--title-color)] hover:bg-[var(--divider-color)] text-white font-semibold py-3 rounded-md transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </button>
      </form>
    </div>
  );
}
