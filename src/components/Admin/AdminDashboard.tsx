import { LogOut, Pencil, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '../Drawer';
import { ProductForm } from './ProductForm';
import ProdutoService from '../../services/produtoService';
import { toast } from 'react-toastify';
import AdminService from '../../services/adminService';

type Product = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  precoPromocional: number;
  quantidade: number;
  imagens: Array<{ url: string }>;
}[];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState<Product>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loadProducts = async () => {
    const produtoService = new AdminService();
    const produtos = await produtoService.listarProdutos();
    if (!produtos) {
      return toast.error('Erro ao carregar produtos!');
    }

    setProducts(produtos);
  };

  useEffect(() => {    
    loadProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = async (product: any) => {
    if (editingProduct) {
      // setProducts(products.map(p => p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p));
    } else {
      const produtoService = new ProdutoService();
      const produto = await produtoService.cadastrarProduto(product);
      if (!produto) {
        return toast.error('Erro ao cadastrar produto!');
      }
      loadProducts();
      toast.success('Produto cadastrado com sucesso!');
    }
    setShowForm(false);
    setEditingProduct(null);
  };  

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Produtos</h1>
            <div className="flex gap-4">
              <button
                onClick={toggleDrawer}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <ShoppingBag className="h-5 w-5" />
                Vendas
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <ProductForm
            initialData={editingProduct}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        ) : (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md font-medium"
              >
                <Plus className="h-5 w-5" />
                Adicionar Produto
              </button>
            </div>

            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-14 w-14 flex-shrink-0">
                            <img
                              className="h-14 w-14 rounded-lg object-cover shadow-sm"
                              src={product.imagens[0].url}
                              alt={product.titulo}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.titulo}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.descricao.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(product.preco)}
                        </div>
                        {product.precoPromocional > 0 && (
                          <div className="text-xs text-green-600 font-medium">
                            Promoção: {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(product.precoPromocional)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${product.quantidade > 10 ? 'bg-green-100 text-green-800' : 
                            product.quantidade > 0 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {product.quantidade} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 p-2 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Editar produto"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-all"
                          title="Excluir produto"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Vendas Realizadas</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Pedido #1234</span>
                <span className="text-green-600">R$ 699,90</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Cliente: João Silva</p>
                <p>Data: 15/04/2024</p>
                <p>Produtos: Relógio Smart Premium</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}