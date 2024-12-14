using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface IProdutoRepository
    {
        Task<List<Produto>> ObterProdutos();
        Task<Produto> ObterProdutoPorId(int id);
        Task<Produto> AdicionarProduto(Produto produto);
        Task<Produto> AtualizarProduto(Produto produto);
        Task<bool> RemoverProduto(int id);
        Task<List<Produto>> ObterProdutosPorCategoria(int categoriaId);
    }
}
