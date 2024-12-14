import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Página não encontrada</h2>
      <p className="text-gray-500 mb-8">A página que você está procurando não existe ou foi removida.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound; 