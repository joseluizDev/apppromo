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
            // Obter todas as imagens associadas ao produto
            var imagens = await _context.Imagem
                .Where(p => p.Pro_id == id)
                .ToListAsync();

            // Remover todas as imagens encontradas
            if (imagens.Count > 0)
            {
                _context.RemoveRange(imagens);
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<bool> RemoverImagemPorUrl(string url)
        {
            var imagem = await _context.Imagem.FirstOrDefaultAsync(x => x.Img_url == url);

            _context.Imagem.Remove(imagem);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
