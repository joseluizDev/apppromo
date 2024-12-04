import React, { useState } from 'react';
import { Instagram, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  images: string[];
  title: string;
  description: string;
  quantity: number;
  price: number;
  discountPrice?: number;
}

export function ProductCard({ images, title, description, quantity, price, discountPrice }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4">
      <div className="relative h-64 mb-2">
        <img
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
        
        {images.length > 1 && (
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

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
                index === currentImageIndex ? 'ring-2 ring-purple-600' : ''
              }`}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-3">{description}</p>
      
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-purple-600">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(discountPrice || price)}
        </span>
        {discountPrice && (
          <span className="text-lg text-gray-400 line-through">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(price)}
          </span>
        )}
      </div>
      
      <div className="text-sm text-gray-700 mb-4">
        Quantidade disponível: {quantity} unidades
      </div>
      
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://instagram.com" className="flex flex-col items-center text-pink-600">
          <Instagram className="h-6 w-6" />
          <span className="text-xs mt-1">Seguir</span>
        </a>
        <a href="https://wa.me/" className="flex flex-col items-center text-green-600">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Contato</span>
        </a>
      </div>
      
      <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Reservar Agora
      </button>
    </div>
  );
}