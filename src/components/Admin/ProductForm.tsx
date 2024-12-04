import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.string().min(1, 'Preço é obrigatório'),
  discountPrice: z.string().optional(),
  quantity: z.string().min(1, 'Quantidade é obrigatória'),
  images: z.instanceof(FileList).optional().or(z.string()),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function ProductForm({ initialData, onSave, onCancel }: ProductFormProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: initialData.price.toString(),
      discountPrice: initialData.discountPrice?.toString() || '',
      quantity: initialData.quantity.toString(),
    } : undefined,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedImages(prev => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      URL.revokeObjectURL(prev[indexToRemove]);
      return newImages;
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    if (data.discountPrice) formData.append('discountPrice', data.discountPrice);
    formData.append('quantity', data.quantity);
    
    if (data.images instanceof FileList) {
      Array.from(data.images).forEach((file, index) => {
        formData.append('images', file);
      });
    }

    onSave(formData);
  };

  useEffect(() => {
    return () => {
      selectedImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

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
            {...register('title')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço
            </label>
            <input
              {...register('price')}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço com Desconto (Opcional)
            </label>
            <input
              {...register('discountPrice')}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade
          </label>
          <input
            {...register('quantity')}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
          )}
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
                  onClick={() => removeImage(index)}
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
                {...register('images')}
                onChange={handleImageChange}
                className="hidden"
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
          
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
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