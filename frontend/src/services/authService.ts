import api from '../lib/api';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
}

export interface AuthResponse {
  message: string;
  user?: AuthUser;
  session?: any;
}

export const authService = {
  // Cadastrar usuário
  async signup(email: string, password: string, fullName: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/signup', {
        email,
        password,
        fullName,
      });
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Fazer login
  async signin(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/signin', {
        email,
        password,
      });
      
      // Salvar token no localStorage
      if (response.data.session?.access_token) {
        localStorage.setItem('access_token', response.data.session.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Fazer logout
  async signout(): Promise<void> {
    try {
      await api.post('/auth/signout');
      localStorage.removeItem('access_token');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Resetar senha
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/reset-password', {
        email,
      });
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // Atualizar senha
  async updatePassword(password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/update-password', {
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },
};