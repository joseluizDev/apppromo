import { useEffect, useRef, useState } from 'react';
import { Banner } from '../Banner/Banner';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { PromoBanner } from '../PromoBanner/PromoBanner';
import HomeService from '../../services/homeService';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import CategoriaService from '../../services/categoriaService';

type Product = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  precoPromocional?: number; // Tornei opcional
  quantidade: number;
  imagens: Array<{ url: string }>;
};

type Category = {
  id: number;
  nome: string;
};


export function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Agora com o tipo correto
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const selectCategory = useRef<HTMLSelectElement>(null);

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

  const loadCategories = async () => {
    const homeService = new CategoriaService();
    const categorias = await homeService.listarCategorias();
    if (!categorias) {
      return toast.error('Erro ao carregar categorias!');
    }

    setCategories(categorias);
  }

  const Category = async () => {
    if (Number(selectCategory.current?.value) == 0) {
      loadProducts();
    } else {
      setLoading(true);
      const homeService = new HomeService();
      const produtos = await homeService.listarProdutosPorCategoria(Number(selectCategory.current?.value));
      if (!produtos) {
        setLoading(false);
        return toast.error('Erro ao carregar produtos!');
      }

      setProducts(produtos);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <PromoBanner />
      <main className="container mx-auto px-4 py-6">
        <div className='flex flex-col items-center justify-center text-gray-500 h-full'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="categoria">
              Filtrar por:
            </label>
            <select name="categoria" id="categoria" className='w-75 px-3 py-2 border border-gray-300 rounded-md' ref={selectCategory} onChange={Category}>
              <option value={0}>
                Todas as categorias
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) :
          (
            <>
              <ProductSlider products={products} />
            </>
          )}
      </main>
    </div>
  );
}
