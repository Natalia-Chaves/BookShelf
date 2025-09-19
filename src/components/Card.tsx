

import React from 'react'; // Arquivo de estilização

// O componente recebe os dados do livro através de "props"
const Card = ({ titulo, autor }) => {
  return (
    <div className="card-container">
      <h3>{titulo}</h3>
      <p>{autor}</p>
    </div>
  );
};

export default Card;