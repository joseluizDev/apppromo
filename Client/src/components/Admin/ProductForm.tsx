import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { useUserContext } from '../../context/context';
import CategoriaService from '../../services/categoriaService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProdutoService from '../../services/produtoService';

const productSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  preco: z.string().min(1, 'Preço é obrigatório'),
  precoPromocional: z.string().optional(),
  quantidade: z.string().min(1, 'Quantidade é obrigatória'),
  CategoriaId: z.string().min(1, 'Categoria é obrigatória'),
  imagens: z.any().optional(),
  instagram: z.string().min(1, 'Instagram é obrigatório'),
  whats: z.string().min(1, 'WhatsApp é obrigatório'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

type Category = {
  id: number;
  nome: string;
};


export function ProductForm({ initialData, onSave, onCancel }: ProductFormProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const imagens = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { user } = useUserContext();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      ...initialData,
      preco: initialData.preco.toString(),
      precoPromocional: initialData.precoPromocional?.toString() || '',
      quantidade: initialData.quantidade.toString(),
      CategoriaId: initialData.CategoriaId,
      instagram: initialData.instagram,
      whats: initialData.whats,
    } : undefined,
  });

  console.log(initialData);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImageUrls]);
    }
  };

  const removerImagem = async (url: string) => {
    const produtoService = new ProdutoService();
    const imagem = await produtoService.removerImagem(url);
    if (!imagem) {
      return toast.error('Erro ao remover imagem!');
    }
  };

  const removeImage = (indexToRemove: number, imageUrl: string) => {
    removerImagem(imageUrl);
    setSelectedImages(prev => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      
      URL.revokeObjectURL(prev[indexToRemove]);
      return newImages;
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('descricao', data.descricao);
    formData.append('preco', data.preco);
    formData.append('instagram', data.instagram);
    formData.append('whats', data.whats);
    formData.append('categoriaId', data.CategoriaId);
    if (initialData) {
      formData.append('id', initialData.id);
    }
    if (data.precoPromocional) {
      formData.append('precoPromocional', data.precoPromocional);
    }
    formData.append('quantidade', data.quantidade);

    if (imagens.current?.files && imagens.current.files.length > 0) {
      for (let i = 0; i < imagens.current.files.length; i++) {
        formData.append('imagens', imagens.current.files[i]);
      }
    }
    if (selectedImages.length > 0) {
      selectedImages.forEach(imageUrl => {
        formData.append('existingImages', imageUrl);
      });
    }

    formData.append('usuarioId', user.id);

    onSave(formData);
  };

  const loadCategories = async () => {
    const homeService = new CategoriaService();
    const categorias = await homeService.listarCategorias();
    if (!categorias) {
      return toast.error('Erro ao carregar categorias!');
    }
    setCategories(categorias);
  }

  useEffect(() => {
    loadCategories();

    if (initialData) {
      reset({
        ...initialData,
        preco: initialData.preco.toString(),
        precoPromocional: initialData.precoPromocional?.toString() || '',
        quantidade: initialData.quantidade.toString(),
        CategoriaId: initialData.CategoriaId,
      });

      if (initialData.imagens) {
        setSelectedImages(initialData.imagens.map((img: { url: string }) => img.url));
      }
    }

    return () => {
      selectedImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [initialData, reset]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-6">
        {initialData ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            {...register('titulo')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            defaultValue={initialData?.titulo}
          />
          {errors.titulo && (
            <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            {...register('descricao')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            defaultValue={initialData?.descricao}
          />
          {errors.descricao && (
            <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço
            </label>
            <input
              {...register('preco')}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={initialData?.preco}
            />
            {errors.preco && (
              <p className="text-red-500 text-sm mt-1">{errors.preco.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {initialData ? 'Preço Promocional' : 'Preço Promocional (opcional)'}
            </label>
            <input
              {...register('precoPromocional')}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={initialData?.precoPromocional}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade
            </label>
            <input
              {...register('quantidade')}
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={initialData?.quantidade}
            />
            {errors.quantidade && (
              <p className="text-red-500 text-sm mt-1">{errors.quantidade.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select {...register('CategoriaId')} id="categoria" className='w-75 px-3 py-2 border border-gray-300 w-full rounded-md'>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} >
                  {category.nome}
                </option>
              ))}
            </select>
            {
              errors.CategoriaId && (
                <p className="text-red-500 text-sm mt-1">{errors.CategoriaId.message}</p>
              )
            }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              {...register('instagram')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={initialData?.instagram}
            />
            {errors.instagram && (
              <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp
            </label>
            <input
              {...register('whats')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={initialData?.whats}
            />
            {
              errors.whats && (
                <p className="text-red-500 text-sm mt-1">{errors.whats.message}</p>
              )
            }
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagens do Produto
          </label>

          <div className="mt-2 flex gap-4 overflow-x-auto pb-4">
            {selectedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={imageUrl}
                  alt={`Prévia ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, imageUrl)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <label
              className="flex-shrink-0 w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                ref={imagens}
                onChange={handleImageChange}
                className="hidden"
                defaultValue={initialData?.imagens}
              />
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Adicionar foto
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}