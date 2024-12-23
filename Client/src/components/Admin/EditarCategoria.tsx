import { useNavigate, useParams } from "react-router-dom";
import CategoriaService from "../../services/categoriaService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CategoriaForm } from "./CategoriaForm";

interface Category {
    id: number;
    nome: string;
}

export default function EditarCategoria() {
    const [categoria, setCategoria] = useState<Category | null>();
    const navigator = useNavigate();
    const { id } = useParams();

    const SCategoria = async () => {
        const categoriaService = new CategoriaService();
        const categoria = await categoriaService.buscarCategoriaPorId(Number(id));
        if (!categoria) {
            return toast.error('Erro ao carregar categoria!');
        }
        setCategoria(categoria);
    }

    useEffect(() => {
        SCategoria();
    }, []);

    const handleSave = async (ECategoria: any) => {
        const categoriaService = new CategoriaService();
        const categoria = await categoriaService.atualizarCategoria({ id: Number(id), nome: ECategoria.categoria });
        if (!categoria) {
            return toast.error('Erro ao atualizar categoria!');
        }
        toast.success('Categoria atualizada com sucesso!');
        navigator('/admin/Categoria');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Categoria</h1>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CategoriaForm initialData={categoria} onSave={handleSave} onCancel={() => {
                    navigator('/admin/Categoria');
                }} />
            </div>
        </div>
    );
}