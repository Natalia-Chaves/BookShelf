// Mock do supabase client para evitar erros de importação
export const supabase = {
  auth: {
    signUp: () => Promise.resolve({ data: null, error: new Error('Use authService instead') }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Use authService instead') }),
    signOut: () => Promise.resolve({ error: new Error('Use authService instead') }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    updateUser: () => Promise.resolve({ data: null, error: new Error('Use authService instead') }),
    resetPasswordForEmail: () => Promise.resolve({ error: new Error('Use authService instead') }),
    onAuthStateChange: () => ({ 
      data: { subscription: { unsubscribe: () => {} } }
    }),
  },
  from: () => ({
    select: () => ({ 
      eq: () => ({ 
        single: () => Promise.resolve({ data: null, error: new Error('Use booksService instead') })
      })
    }),
    insert: () => Promise.resolve({ data: null, error: new Error('Use booksService instead') }),
    update: () => ({ 
      eq: () => Promise.resolve({ data: null, error: new Error('Use booksService instead') })
    }),
    delete: () => ({ 
      eq: () => Promise.resolve({ error: new Error('Use booksService instead') })
    }),
  }),
};