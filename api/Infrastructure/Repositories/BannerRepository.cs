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
            _context.Entry(banner).State = EntityState.Modified;
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
