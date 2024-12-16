using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
        Task<List<Categoria>> ObterCategorias();
        Task<Categoria> ObterCategoriaPorId(int id);
        Task<Categoria> AdicionarCategoria(Categoria categoria);
        Task<Categoria> AtualizarCategoria(Categoria categoria);
        Task<bool> RemoverCategoria(int id);
    }
}
