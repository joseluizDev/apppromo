import { useEffect, useState } from 'react';
import BannerService from '../../services/bannerService';

interface Promo {
  id: number;
  titulo: string;
  imagem: string;
  temp: number; // Tempo em milissegundos que cada banner será exibido
}

const PromoBanner: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch banners inicial
  useEffect(() => {
    async function fetchPromos() {
      const bannerService = new BannerService();
    
      try {
        const response = await bannerService.listarBanners();
        if (!response) {
          console.error('Failed to fetch banners');
          return;
        }
        setPromos(response);
      } catch (error) {
        console.error('Failed to fetch banners', error);
      }
    }

    fetchPromos();
  }, []);

  // Efeito para gerenciar a rotação dos banners
  useEffect(() => {
    const timer = promos.length > 0 ? setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % promos.length);
    }, promos[currentIndex].temp || 5000) : undefined;

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [promos, currentIndex]);

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
              src={promo.imagem}
              alt={promo.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-2">
              <div className="text-white">
                <h5 className="text-2xl font-bold ">{promo.titulo}</h5>
               
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
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
