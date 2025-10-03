'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/resetpassword`,
    });

    if (error) {
      setError('Erro ao enviar email de redefinição.');
    } else {
      setMessage('Email de redefinição enviado com sucesso!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--main-background)] text-[var(--foreground)] px-4">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-lg p-6 rounded-xl shadow-2xl bg-[var(--form-background)] text-[var(--foreground)]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[var(--title-color)]">
          Esqueci minha senha
        </h2>

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--divider-color)] text-black mb-4"
        />

        <button
          type="submit"
          className="w-full bg-[var(--divider-color)] hover:bg-[#70390cbb] text-white font-semibold py-2 rounded-md transition-colors"
        >
          Enviar link de redefinição
        </button>

        {message && (
          <p className="text-green-700 bg-green-100 rounded-md p-2 mt-4 text-sm text-center">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 rounded-md p-2 mt-4 text-sm text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
