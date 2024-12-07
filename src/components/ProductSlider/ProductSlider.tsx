import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../ProductCard/ProductCard';

type Product = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  precoPromocional?: number;
  quantidade: number;
  imagens: Array<{ url: string }>;
};

type ProductSliderProps = {
  products: Product[];
};

export function ProductSlider({ products }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum produto disponível.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 py-8">
      {/* Botão Esquerdo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="p-2 bg-white rounded-full shadow-lg text-purple-600"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Botão Direito */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="p-2 bg-white rounded-full shadow-lg text-purple-600"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
