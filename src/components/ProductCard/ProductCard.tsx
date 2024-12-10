import React, { useState } from 'react';
import { Instagram, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  precoPromocional?: number; // Tornei opcional
  quantidade: number;
  instagram: string;
  whats: string;
  imagens: Array<{ url: string }>;
};

type ProductCardProps = {
  product: Product;
  isAcao: boolean;
};

export function ProductCard({ product, isAcao }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.imagens.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.imagens.length) % product.imagens.length);
  };

  function salvar(produto: Product) {
    localStorage.setItem('produto', JSON.stringify(produto));
    navigate('/reserva');
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4">
      {/* Imagem Principal */}
      <div className="relative h-64 mb-2">
        <img
          src={product.imagens[currentImageIndex]?.url}
          alt={`${product.titulo} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />

        {product.imagens.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-lg text-purple-600 hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-lg text-purple-600 hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Galeria de Thumbnails */}
      {product.imagens.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto p-2">
          {product.imagens.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-purple-600' : ''
                }`}
            >
              <img
                src={image.url}
                alt={`${product.titulo} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Detalhes do Produto */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{product.titulo}</h2>
      <p className="text-gray-600 mb-3">{product.descricao}</p>

      {/* Preço */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-purple-600">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.precoPromocional || product.preco)}
        </span>
        {product.precoPromocional! > 0 && (
          <span className="text-lg text-gray-400 line-through">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.preco)}
          </span>
        )}
      </div>

      {/* Quantidade */}
      <div className="text-sm text-gray-700 mb-4">
        Quantidade disponível: {product.quantidade} unidades
      </div>

      {isAcao ? (
        <>
          <div className="flex justify-center gap-6 mb-4">
            <a href={`https://www.instagram.com/${product.instagram}`} target='_blank' className="flex flex-col items-center text-pink-600">
              <Instagram className="h-6 w-6" />
              <span className="text-xs mt-1">Seguir</span>
            </a>
            <a href={`https://wa.me/${product.whats}?text=Olá, gostaria de saber mais sobre o produto ${encodeURIComponent(product.titulo)}`}  target='_blank' className="flex flex-col items-center text-green-600">
              <MessageCircle className="h-6 w-6" />
              <span className="text-xs mt-1">Contato</span>
            </a>
          </div>

          {
            product.quantidade > 0 ? (
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors" onClick={() => salvar(product)}>
                Reservar Agora
              </button>
            ) : (
              <button disabled={true} className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed">
                Produto Indisponível
              </button>
            )
          }
        </>
      ) : null
      }
    </div >
  );
}
