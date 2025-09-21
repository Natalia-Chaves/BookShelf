

import React from 'react'; // Arquivo de estilização

interface Book {
  id: string;
  titulo: string;
  autor: string;
  imageUrl: string;
}

// O componente recebe os dados do livro através de "props"
const Card = ({ titulo, autor, imageUrl }: Book): React.JSX.Element => {
  return (
    <div className="card-container">
      <img src={imageUrl} alt={`Capa do livro ${titulo}`} className="book-cover" />
      <h3>{titulo}</h3>
      <p>{autor}</p>
    </div>
  );
};

export default Card;