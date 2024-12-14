using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackAppPromo.Infrastructure.Repositories
{
    public class ImagemRepository : IImagemRepository
    {
        private readonly AppDbContext _context;
        public ImagemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Imagem>> ObterImagensPorId(int id)
        {
            return await _context.Imagem.Where(x => x.Pro_id == id).ToListAsync();
        }

        public async Task<Imagem> AdicionarImagem(Imagem imagem)
        {
            _context.Imagem.Add(imagem);
            await _context.SaveChangesAsync();
            return imagem;
        }

        public async Task<Imagem> AtualizarImagem(Imagem imagem)
        {
            _context.Imagem.Update(imagem);
            await _context.SaveChangesAsync();
            return imagem;
        }

        public async Task<bool> RemoverImagem(int id)
        {
             var imagem = await _context.Imagem.FindAsync(id);
            if (imagem == null)
            {
                return false;
            }
            _context.Remove(imagem);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
