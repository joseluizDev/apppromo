import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
const productSchema = z.object({
    categoria: z.string().min(1, 'Categoria é obrigatória'),
});

interface Category {
    id: number;
    nome: string;
}

type ProductFormData = z.infer<typeof productSchema>;
interface ProductFormProps {
    initialData?: Category | null;
    onSave: (data: any) => void;
    onCancel: () => void;
}

export function CategoriaForm({ initialData, onSave, onCancel }: ProductFormProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            categoria: initialData.nome,
        } : undefined,
    });

    const onSubmit = async (data: ProductFormData) => {
        onSave(
            {
                ...data,
                categoria: data.categoria,
            }
        );
    };

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                categoria: initialData?.nome,
            });
        }
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-6">
                {initialData ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria
                    </label>
                    <input
                        {...register('categoria')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue={initialData?.nome}
                    />
                    {errors.categoria && (
                        <p className="text-red-500 text-sm mt-1">{errors.categoria.message}</p>
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