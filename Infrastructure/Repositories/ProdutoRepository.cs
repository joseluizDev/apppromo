using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackAppPromo.Infrastructure.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Produto>> ObterProdutos()
        {
            return await _context.Produto.ToListAsync();
        }

        public async Task<Produto> ObterProdutoPorId(int id)
        {
            return await _context.Produto.FirstOrDefaultAsync(p => p.Pro_id == id);
        }

        public async Task<Produto> AdicionarProduto(Produto produto)
        {
            _context.Produto.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<Produto> AtualizarProduto(Produto produto)
        {
            _context.Produto.Update(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<bool> RemoverProduto(int id)
        {
            Produto produto = await ObterProdutoPorId(id);
            _context.Produto.Remove(produto);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Produto>> ObterProdutosPorCategoria(int categoriaId)
        {
            return await _context.Produto.Where(p => p.Cat_id == categoriaId).ToListAsync();
        }
    }
}
