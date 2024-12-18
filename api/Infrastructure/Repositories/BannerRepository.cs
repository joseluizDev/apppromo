using System.Runtime.CompilerServices;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackAppPromo.Infrastructure.Repositories
{
    public class BannerRepository : IBannerRepository
    {
        private readonly AppDbContext _context;
        public BannerRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Banner>> ObterBanner()
        {
            return await _context.Banner.ToListAsync();
        }

        public async Task<Banner> ObterBannerPorId(int id)
        {
            return await _context.Banner.FindAsync(id);
        }

        public async Task<Banner> AdicionarBanner(Banner banner)
        {
            _context.Banner.Add(banner);
            await _context.SaveChangesAsync();
            return banner;
        }

        public async Task<Banner> AtualizarBanner(Banner banner)
        {
            // Verifica se o banner está sendo rastreado e resolve o problema de múltiplas instâncias.
            var trackedEntity = _context.ChangeTracker.Entries<Banner>()
                .FirstOrDefault(e => e.Entity.Ban_id == banner.Ban_id);

            if (trackedEntity != null)
            {
                _context.Entry(trackedEntity.Entity).State = EntityState.Detached;
            }

            // Atualiza o banner
            _context.Banner.Update(banner);

            // Salva as alterações no banco de dados
            await _context.SaveChangesAsync();

            return banner;
        }

        public async Task<bool> RemoverBanner(int id)
        {
            var banner = await _context.Banner.FindAsync(id);
            _context.Banner.Remove(banner);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
