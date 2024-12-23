import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BannerService from "../../services/bannerService";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Banner = {
  id: number;
  titulo: string;
  imagem: string;
  temp?: string;
};

export default function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(false);
  const bannerService = new BannerService();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { titulo: "", imagem: null, temp: "" },
  });

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await bannerService.listarBanners();
      if (data) {
        setBanners(data.map((banner: any) => ({
          id: banner.id,
          titulo: banner.titulo,
          imagem: banner.imagem,
          temp: banner.temp,
        })));
      } else {
        toast.error("Erro ao carregar os banners.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    if (data.imagem && data.imagem[0]) {
      formData.append("imagem", data.imagem[0]);
    }
    if (data.temp) {
      formData.append("temp", data.temp);
    }

    let success;
    try {
      if (editingBanner) {
        formData.append("id", editingBanner.id.toString());
        success = await bannerService.EditBanner(formData);
      } else {
        success = await bannerService.cadastrarBanner(formData);
      }

      if (success) {
        toast.success(editingBanner ? "Banner editado!" : "Banner criado!");
        fetchBanners();
        reset();
        setEditingBanner(null);
      } else {
        toast.error("Erro ao salvar o banner.");
      }
    } catch {
      toast.error("Erro inesperado.");
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setValue("titulo", banner.titulo);
    setValue("temp", banner.temp || "");
  };

  const handleDelete = async (id: number) => {
    try {
      const success = await bannerService.deletarBanner(id);
      if (success) {
        toast.success("Banner deletado!");
        fetchBanners();
      } else {
        toast.error("Erro ao deletar o banner.");
      }
    } catch {
      toast.error("Erro inesperado.");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Header */}
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Gerenciamento de Banners
            </h1>
            <nav className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded transition"
                onClick={() => navigate("/admin")} >

                <ArrowLeft className="h-5 w-5" />
                Voltar
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Formulário */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">
          {editingBanner ? "Editar Banner" : "Criar Novo Banner"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-gray-50 p-4 rounded mt-4"
        >
          <div>
            <label className="block text-gray-700">Título</label>
            <input
              {...register("titulo", { required: true })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Título do banner"
            />
          </div>
          <div>
            <label className="block text-gray-700">Imagem</label>
            <input
              type="file"
              {...register("imagem")}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Temp</label>
            <input
              {...register("temp")}
              className="w-full px-3 py-2 border rounded"
              placeholder="Temperatura ou outro valor"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingBanner ? "Salvar Alterações" : "Criar"}
            </button>
            {editingBanner && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setEditingBanner(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Lista de Banners */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Banners Existentes</h2>
        {loading ? (
          <p className="text-gray-500">Carregando...</p>
        ) : banners.length > 0 ? (
          <ul className="space-y-4">
            {banners.map((banner) => (
              <li
                key={banner.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded"
              >
                <div>
                  <p className="text-lg font-medium">{banner.titulo}</p>
                  {banner.imagem && (
                    <img
                      src={banner.imagem}
                      alt={banner.titulo}
                      className="w-24 h-24 mt-2 object-cover rounded"
                    />
                  )}
                  {banner.temp && (
                    <p className="text-sm text-gray-600 mt-1">
                      Temp: {banner.temp}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum banner cadastrado ainda.</p>
        )}
      </section>
    </div>
  );
}
