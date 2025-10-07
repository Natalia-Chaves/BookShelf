'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      // Verificar se há token salvo no localStorage
      const token = localStorage.getItem('access_token');
      if (token) {
        // Para simplificar, vamos apenas marcar como autenticado
        // Em um app real, você validaria o token com a API
        setUser({
          id: 'demo-user',
          name: 'Usuário Demo',
          email: 'demo@bookshelf.com'
        });
      }
      setIsLoading(false);
    };

    setup();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.signin(email, password);
      
      if (response.user) {
        setUser({
          id: response.user.id,
          name: response.user.full_name || 'Usuário',
          email: response.user.email
        });
        router.push('/catalogo');
      }
    } catch (error) {
      throw new Error('E-mail ou senha incorretos.');
    }
  };

  const logout = async () => {
    try {
      await authService.signout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
