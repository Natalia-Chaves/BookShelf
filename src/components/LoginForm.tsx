'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  isDark: boolean;
}

export default function LoginForm({ isDark }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha o e-mail e a senha.');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao tentar login.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardBg = isDark ? "bg-[#3e2723] text-[#f5e6d5]" : "bg-white text-[#3e2723]";
  const buttonBg = isDark ? "bg-[#c7925c] hover:bg-[#a56734]" : "bg-[#512b1e] hover:bg-[#A56734]";
  const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a56734]";

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-lg p-8 rounded-xl shadow-2xl ${cardBg}`}>
      <h2 className="text-3xl font-bold mb-6 text-center text-[#6e3b1f]">Acesso</h2>
      <p className="text-center mb-6 text-xl font-medium">Bem-vindo de volta!</p>

      {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded">{error}</p>}

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyle} />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full ${buttonBg} text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-50 mt-2`}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>

      <p className="mt-4 text-center text-sm text-[#6e3b1f]">
        Não tem uma conta?{' '}
        <Link href="/cadastro" className="font-bold underline hover:text-[#c7925c]">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
