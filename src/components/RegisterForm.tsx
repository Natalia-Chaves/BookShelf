'use client';
import { useState } from 'react';
import Link from 'next/link';
import { addUser, findUser } from '@/lib/authStore'; 

interface RegisterFormProps {
    isDark: boolean;
    onSuccess: () => void; 
}

export default function RegisterForm({ isDark, onSuccess }: RegisterFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email.trim() || !password.trim() || !name.trim()) {
            setError('Por favor, preencha todos os campos.');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('A senha e a confirmação de senha não coincidem.');
            setIsLoading(false);
            return;
        }
        
        if (findUser(email)) {
            setError('Este e-mail já está cadastrado. Faça login.');
            setIsLoading(false);
            return;
        }
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            addUser({ email, password, name });
            onSuccess();
        } catch {
            setError('O cadastro falhou. Tente novamente.'); 
        } finally {
            setIsLoading(false);
        }
    };
    
    const cardBg = isDark ? "bg-[#3e2723] text-[#f5e6d5]" : "bg-white text-[#3e2723]";
    const buttonBg = isDark ? "bg-[#c7925c] hover:bg-[#a56734]" : "bg-[#512b1e] hover:bg-[#A56734]";
    const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a56734]";

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-lg p-8 rounded-xl shadow-2xl ${cardBg}`}>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#6e3b1f]">Criar Conta</h2>
            
            {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded">{error}</p>}

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome Completo</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputStyle} />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyle} />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputStyle} />
            </div>
            
            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirmar Senha</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={inputStyle} />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${buttonBg} text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-50 mt-2`}
            >
                {isLoading ? 'Cadastrando...' : 'Cadastre-se'}
            </button>

            <p className="mt-4 text-center text-sm text-[#6e3b1f]">
                Já tem uma conta?{' '}
                <Link href="/" className="font-bold underline hover:text-[#c7925c]">
                    Faça Login
                </Link>
            </p>
        </form>
    );
}
