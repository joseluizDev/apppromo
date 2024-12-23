import { useEffect, useState } from "react";
import CategoriaService from "../../services/categoriaService";
import { toast } from "react-toastify";
import { ArrowLeft, LogOut, Pencil, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { CategoriaForm } from "./CategoriaForm";

type Category = {
    id: number;
    nome: string;
};

export default function CategoriaManager() {
    const [categoria, setCategoria] = useState<Category[]>([]);
    const [isloading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingCategoria, setEditingProduct] = useState<Category | null>(null);
    const navigate = useNavigate();

    const loadCategories = async () => {
        setIsLoading(true);
        const homeService = new CategoriaService();
        const categorias = await homeService.listarCategorias();
        if (!categorias) {
            toast.error("Erro ao carregar categorias!");
        } else {
            setCategoria(categorias);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Deseja realmente excluir esta categoria?")) {
            const categoriaService = new CategoriaService();
            const remover = await categoriaService.deletarCategoria(id);
            if (!remover) {
                toast.error("Erro ao excluir categoria!");
            } else {
                toast.success("Categoria excluída com sucesso!");
                loadCategories();
            }
        }
    };

    const handleEdit = (productId: number) => {
        navigate(`/admin/Categoria/${productId}`);
        setShowForm(true);
    };

    const handleSave = async (product: any) => {
        const categoriaService = new CategoriaService();
        const categoria = await categoriaService.criarCategoria(product.categoria);
        if (!categoria) {
            return toast.error("Erro ao salvar categoria!");
        }
        toast.success("Categoria salva com sucesso!");
        loadCategories();
        setShowForm(false);
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Gerenciamento de Categorias
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate("/admin")}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            {isloading ? (
                <Loading />
            ) : (
                <main className="flex-1 px-4 py-8">
                    {showForm ? (
                        <div className="max-w-4xl w-full mx-auto">
                            <CategoriaForm
                                initialData={editingCategoria}
                                onSave={handleSave}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingProduct(null);
                                }}
                            />
                        </div>) : (
                        <div className="max-w-4xl w-full mx-auto">
                            <div className="mb-6">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md font-medium"
                                >
                                    <Plus className="h-5 w-5" />
                                    Adicionar Categoria
                                </button>
                            </div>

                            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 w-full max-w-4xl mx-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Nome
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categoria.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    className="px-6 py-4 text-sm text-gray-600 text-center"
                                                >
                                                    Nenhuma categoria encontrada
                                                </td>
                                            </tr>
                                        ) : (
                                            categoria.map((product) => (
                                                <tr
                                                    key={product.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {product.nome}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEdit(product.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4 p-2 hover:bg-indigo-50 rounded-lg transition-all"
                                                            title="Editar categoria"
                                                        >
                                                            <Pencil className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-all"
                                                            title="Excluir categoria"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
}
