import { useNavigate, useParams } from "react-router-dom";
import AdminService from "../../services/adminService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductForm } from "./ProductForm";
import ProdutoService from "../../services/produtoService";

type Product = {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    precoPromocional: number;
    quantidade: number;
    imagens: Array<{ url: string }>;
}[];


export default function EditarProduto() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const navigate = useNavigate();
    const produto = async () => {
        const adminService = new AdminService();
        const produto = await adminService.listarProdutoPorId(Number(id));
        if (!produto) {
            return toast.error('Erro ao carregar produto!');
        }
        setProduct(produto);
    }

    useEffect(() => {
        produto();
    }, []);

    const handleSave = async (product: FormData) => {
        console.log(product);
        const produtoService = new ProdutoService();
        const produto = await produtoService.atualizarProduto(product);
        if (!produto) {
            return toast.error('Erro ao cadastrar produto!');
        }
        toast.success('Produto cadastrado com sucesso!');
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Produtos</h1>
                    </div>
                </div>
            </div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProductForm initialData={product} onSave={handleSave} onCancel={() => navigate('/admin')} />
            </main>
        </div>
    );
}