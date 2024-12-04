import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const promos = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a",
    title: "Mega Promoção de Verão",
    description: "Até 50% OFF em produtos selecionados"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    title: "Frete Grátis",
    description: "Em compras acima de R$ 200"
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="relative w-full h-20 bg-gray-100 overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                <p className="text-lg">{promo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

  

     

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}