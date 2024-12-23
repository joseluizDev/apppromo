using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface IImagemRepository
    {
        Task<List<Imagem>> ObterImagensPorId(int id);
        Task<Imagem> AdicionarImagem(Imagem imagem);
        Task<Imagem> AtualizarImagem(Imagem imagem);
        Task<bool> RemoverImagem(int id);
        Task<bool> RemoverImagemPorUrl(string url);
    }
}
