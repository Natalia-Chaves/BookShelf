'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Definindo os tipos para o usuário e para o valor do contexto
interface User {
  id: string;
  name: string;
  email: string;
}

// AQUI ESTÁ A CORREÇÃO PRINCIPAL: Adicionamos a função 'register' ao tipo
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>; // <-- ADICIONADO AQUI
  logout: () => void;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente Provedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Tentando login com:', { email, password });
    if (email && password) {
      const mockUser: User = { id: '1', name: 'Usuário Teste', email: email };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.push('/catalogo');
    } else {
      throw new Error('Email ou senha inválidos');
    }
  };

  // AQUI IMPLEMENTAMOS A FUNÇÃO 'register'
  const register = async (name: string, email: string, password: string) => {
    console.log('Tentando registrar com:', { name, email, password });
    if (name && email && password) {
      console.log('Usuário registrado com sucesso!');
      alert('Conta criada com sucesso! Por favor, faça o login.');
      router.push('/'); 
    } else {
      throw new Error('Não foi possível criar a conta. Tente novamente.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const value = {
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    register, // <-- Disponibilizamos a função para a aplicação
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};