// @/lib/authStore.ts

interface UserCredentials {
    email: string;
    password?: string;
}

// SIMULAÇÃO: Lista de usuários registrados em memória
export const registeredUsers: UserCredentials[] = [
    // Usuário padrão para o primeiro teste
    { email: 'teste@mail.com', password: '1234' } 
];

export const addUser = (user: UserCredentials) => {
    // Note: Em um projeto real, você faria o hash da senha aqui.
    // Como é simulação, salvamos a senha em texto simples.
    registeredUsers.push(user);
};

export const findUser = (email: string) => {
    return registeredUsers.find(user => user.email === email);
};