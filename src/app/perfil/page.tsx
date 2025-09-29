'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Erro ao buscar usuário:', error.message);
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-[#3e2723]">
        <p>Carregando seu perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-[#8b0000] font-semibold">
        <p>⚠️ Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-[#f2d1a0]">
      <section className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full border border-[#a56734]">
        <h1 className="text-4xl font-bold text-[#3e2723] mb-6 text-center">Meu Perfil</h1>

        <div className="space-y-4 text-[#3e2723] text-lg">
          <div>
            <span className="font-semibold">👤 Nome:</span>{' '}
            {user.user_metadata?.name || 'Não informado'}
          </div>
          <div>
            <span className="font-semibold">📧 Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">🆔 ID:</span> {user.id}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-[#a56734] hover:bg-[#6e3b1f] text-white font-bold py-3 rounded-md transition-colors"
        >
          Sair da Conta
        </button>
      </section>
    </main>
  );
}
