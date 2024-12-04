import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../ProductCard/ProductCard';

const products = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56"
    ],
    title: "Relógio Smart Premium",
    description: "Material: Aço inoxidável, Cor: Prata, Resistente à água",
    quantity: 15,
    price: 899.90,
    discountPrice: 699.90
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      "https://images.unsplash.com/photo-1520170350707-b2da59970118"
    ],
    title: "Fones de Ouvido Pro",
    description: "Wireless, Cancelamento de ruído, Bateria 20h",
    quantity: 25,
    price: 499.90,
    discountPrice: 399.90
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a",
    ],
    title: "Câmera Polaroid Modern",
    description: "Instantânea, HD, Flash automático, Cor: Branca",
    quantity: 10,
    price: 799.90
  }
];

export function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative w-full px-4 py-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="p-2 bg-white rounded-full shadow-lg text-purple-600"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="p-2 bg-white rounded-full shadow-lg text-purple-600"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
      
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