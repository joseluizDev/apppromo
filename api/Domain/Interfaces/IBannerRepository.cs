using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface IBannerRepository
    {
        Task<List<Banner>> ObterBanner();
        Task<Banner> ObterBannerPorId(int id);
        Task<Banner> AdicionarBanner(Banner banner);
        Task<Banner> AtualizarBanner(Banner banner);
        Task<bool> RemoverBanner(int id);
    }
}
