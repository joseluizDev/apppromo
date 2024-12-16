using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackAppPromo.Infrastructure.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;
        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Categoria> AdicionarCategoria(Categoria categoria)
        {
            _context.Categoria.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria> AtualizarCategoria(Categoria categoria)
        {
            _context.Categoria.Update(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria> ObterCategoriaPorId(int id)
        {
            return await _context.Categoria.FindAsync(id);
        }

        public async Task<List<Categoria>> ObterCategorias()
        {
            return await _context.Categoria.ToListAsync();
        }

        public async Task<bool> RemoverCategoria(int id)
        {
            var categoria = await _context.Categoria.FindAsync(id);
            _context.Categoria.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
