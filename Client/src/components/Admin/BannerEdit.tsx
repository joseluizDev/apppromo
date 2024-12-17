import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BannerService from "../../services/bannerService";

type Banner = {
  id: number;
  titulo: string;
  imagem: string;
  temp?: string;
};

export default function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const bannerService = new BannerService();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { titulo: "", imagem: null, temp: "" },
  });

  const fetchBanners = async () => {
    const data = await bannerService.listarBanners();
    if (data) {
      const mappedBanners = data.map((banner: any) => ({
        id: banner.id,
        titulo: banner.titulo,
        imagem: banner.imagem,
        temp: banner.temp,
      }));
      setBanners(mappedBanners);
    } else {
      toast.error("Erro ao carregar os banners.");
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
      formData.append("temp", data.temp); // Adiciona o campo temp
    }

    let success;
    if (editingBanner) {
      formData.append("id", editingBanner.id.toString());
      success = await bannerService.cadastrarBanner(formData);
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
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setValue("titulo", banner.titulo);
    setValue("temp", banner.temp || "");
  };

  const handleDelete = async (id: number) => {
    const success = await bannerService.deletarBanner(id);
    if (success) {
      toast.success("Banner deletado!");
      fetchBanners();
    } else {
      toast.error("Erro ao deletar o banner.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {editingBanner ? "Editar Banner" : "Criar Novo Banner"}
      </h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700">Título</label>
          <input
            {...register("titulo", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Título do banner"
          />
        </div>
        <div>
          <label className="block text-gray-700">Imagem</label>
          <input
            type="file"
            {...register("imagem")}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Temp</label>
          <input
            {...register("temp")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Temperatura ou outro valor"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Banners */}
      <h2 className="text-xl font-semibold mb-4">Banners Existentes</h2>
      {banners.length > 0 ? (
        <ul className="space-y-4">
          {banners.map((banner) => (
            <li
              key={banner.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <p className="text-lg font-medium">{banner.titulo}</p>
                {banner.imagem && (
                  <img
                    src={banner.imagem}
                    alt={banner.titulo}
                    className="w-24 h-24 mt-2 object-cover rounded-md"
                  />
                )}
                {banner.temp && (
                  <p className="text-gray-600 text-sm mt-2">Temp: {banner.temp}</p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
    </div>
  );
}
