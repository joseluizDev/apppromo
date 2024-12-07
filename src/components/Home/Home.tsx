import { useEffect, useState } from 'react';
import { Banner } from '../Banner/Banner';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { PromoBanner } from '../PromoBanner/PromoBanner';
import HomeService from '../../services/homeService';
import { toast } from 'react-toastify';
import Loading from '../Loading';

type Product = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  precoPromocional?: number; // Tornei opcional
  quantidade: number;
  imagens: Array<{ url: string }>;
};


export function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Agora com o tipo correto
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const homeService = new HomeService();
    const produtos = await homeService.listarProdutos();
    if (!produtos) {
      setLoading(false);
      return toast.error('Erro ao carregar produtos!');
    }

    setProducts(produtos);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <PromoBanner />
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-8 h-full">
            <p className="mt-4">Nenhum produto disponível no momento.</p>
          </div>
        ) : (
          <ProductSlider products={products} />
        )}
      </main>
    </div>
  );
}
