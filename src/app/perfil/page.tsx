'use client';

import ProfilePage from './ProfilePage';

const userData = {
  name: 'Leitor Exemplo',
  profileImage: '/images/leitor-exemplo.jpg',
  bio: 'Sou um leitor apaixonado por histórias de aventura e suspense. Acredito que cada livro é uma nova jornada!',
};

export default function Perfil({ theme }) {
  return (
    <ProfilePage theme={theme} user={userData} />
  );
}