import { HomeIcon, LogOut, Pencil, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminService from '../../services/adminService';
import LoginService from '../../services/loginService';
import ProdutoService from '../../services/produtoService';
import ReservaService from '../../services/reservaService';
import { Drawer } from '../Drawer';
import Loading from '../Loading';
import { ProductForm } from './ProductForm';

type Product = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  precoPromocional: number;
  quantidade: number;
  imagens: Array<{ url: string }>;
};

type Reserva = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  instagram: string;
  endereco: string;
  referencia: string;
  entrega: boolean;
  retirada: boolean;
  quantidade: number;
  valorTotal: number;
  produto: Product;
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReserva, setLoadingReserva] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const produtoService = new AdminService();
    const produtos = await produtoService.listarProdutos();
    if (!produtos) {
      return toast.error('Erro ao carregar produtos!');
    }

    setProducts(produtos);
    setLoading(false);
  };

  const loadReservas = async () => {
    setLoadingReserva(true);
    const produtoService = new ReservaService();
    const reservas = await produtoService.ListarReservas();
    if (!reservas) {
      return toast.error('Erro ao carregar reservas!');
    }

    setReservas(reservas);
    setLoadingReserva(false);
  };

  useEffect(() => {
    loadProducts();
    loadReservas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    const loginService = new LoginService();
    const logout = loginService.logout();
    if (!logout) {
      return toast.error('Erro ao fazer logout!');
    }
    navigate('/login');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      const produtoService = new ProdutoService();
      const remover = await produtoService.deletarProduto(id);
      if (!remover) {
        return toast.error('Erro ao excluir produto!');
      }
      loadProducts();
      toast.success('Produto excluído com sucesso!');
    }
  };

  const handleEdit = (productId: number) => {
    navigate(`/admin/editar/${productId}`);
    setShowForm(true);
  };

  const handleSave = async (product: any) => {

    const produtoService = new ProdutoService();
    const produto = await produtoService.cadastrarProduto(product);
    if (!produto) {
      return toast.error('Erro ao cadastrar produto!');
    }
    loadProducts();
    toast.success('Produto cadastrado com sucesso!');

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
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <HomeIcon className="h-5 w-5" />
                Inicio
              </button>
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
            <div className="flex justify-between items-center mb-6">
              <div className="mb-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md font-medium"
                >
                  <Plus className="h-5 w-5" />
                  Adicionar Produto
                </button>
              </div>
              {/* cadastrar categoria */}
              <div className='flex gap-6'>
                <div className="mb-6">
                  <button
                    onClick={() => navigate('/admin/banner')}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md font-medium"
                  >
                    Banner
                  </button>
                </div>
                {/* cadastrar banner */}
                <div className="mb-6">
                  <button
                    onClick={() => navigate('/admin/Categoria')}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md font-medium"
                  >

                    Categoria
                  </button>
                </div>
              </div>

            </div>
            {loading ? (
              <Loading />
            ) : (
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
                    {products.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-sm text-gray-600 text-center"
                        >
                          Nenhum produto cadastrado.
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-14 w-14 flex-shrink-0">
                                <img
                                  className="h-14 w-14 rounded-lg object-cover shadow-sm"
                                  src={product.imagens[0]?.url}
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
                                currency: 'BRL',
                              }).format(product.preco)}
                            </div>
                            {product.precoPromocional > 0 && (
                              <div className="text-xs text-green-600 font-medium">
                                Promoção:{' '}
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                }).format(product.precoPromocional)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.quantidade > 10
                                ? 'bg-green-100 text-green-800'
                                : product.quantidade > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                                }`}
                            >
                              {product.quantidade} unidades
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit(product.id)}
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>


      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Vendas Realizadas</h2>
          <div
            className="space-y-4 overflow-y-auto"
            style={{ maxHeight: "95vh" }} // Define o máximo de altura e ativa o scroll se necessário
          >
            {
              loadingReserva ? (
                <Loading />
              ) : (
                reservas.map((reserva) => (
                  <div className="border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Pedido #{reserva.id}</span>
                      <span className="text-green-600">R$ {Number(reserva.valorTotal)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Nome: {reserva.nome}</p>
                      <p>Email: {reserva.email}</p>
                      <p>Telefone: {reserva.telefone}</p>
                      <p>Instagram: {reserva.instagram}</p>
                      <p>Endereço: {reserva.endereco == "" ? "Não informado" : reserva.endereco}</p>
                      <p>Referência: {reserva.referencia == "" ? "Não informado" : reserva.referencia}</p>
                      <p>Entrega: {reserva.entrega ? 'Sim' : 'Não'}</p>
                      <p>Retirada: {reserva.retirada ? 'Sim' : 'Não'}</p>
                      <p>Quantidade: {Number(reserva.quantidade)}</p>
                      <p>Produto: {reserva.produto.titulo}</p>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
      </Drawer>

    </div>
  );
}