using System.ComponentModel.DataAnnotations;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Entities
{
    public class Banner
    {
        [Key]
        public int Ban_id { get; set; }
        [StringLength(100)]
        public string? Ban_titulo { get; set; }
        [StringLength(100)]
        public string Ban_imagem { get; set; }
        public int Ban_temp { get; set; }
    }
}

public static class BannerExtension
{
    public static BannerOutputDto MapBanner(this Banner banner)
    {
        return new BannerOutputDto
        {
            Id = banner.Ban_id,
            Titulo = banner.Ban_titulo,
            Imagem = banner.Ban_imagem,
            Temp = banner.Ban_temp
        };
    }

    public static List<BannerOutputDto> MapBanner(this List<Banner> banner, List<Banner> banners)
    {
        return banner.Select(x => x.MapBanner()).ToList();
    }
}
