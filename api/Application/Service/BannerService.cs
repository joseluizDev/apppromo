using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Repositories;

namespace BackAppPromo.Application.Service
{
    public class BannerService
    {
        private readonly IBannerRepository _bannerRepository;
        private readonly IMinioStorage _minioStorage;
        public BannerService(IBannerRepository bannerRepository, IMinioStorage minioStorage)
        {
            _bannerRepository = bannerRepository;
            _minioStorage = minioStorage;
        }

        public async Task<List<BannerOutputDto>> ObterBanner()
        {
            List<Banner> banners = await _bannerRepository.ObterBanner();
            return MapOutput(banners);
        }

        public async Task<BannerOutputDto> ObterBannerPorId(int id)
        {
            Banner banner = await _bannerRepository.ObterBannerPorId(id);
            if (banner != null)
            {
                return MapOutput(new List<Banner> { banner }).FirstOrDefault();
            }
            return null;
        }

        public async Task<Banner> AdicionarBanner(BannerInputDto banner)
        {
            string bucketName = "apppromo";
            string type = banner.Imagem.ContentType;
            string typeImg = type.Split('/')[1];
            string objectName = $"{Guid.NewGuid()}.{typeImg}";

            string url = await _minioStorage.UploadFileAsync(bucketName, objectName, banner.Imagem.OpenReadStream(), type);
            if(url == null)
            {
                throw new ImagemInvalidoException("Imagem não foi salva");
            }

            Banner map = MapBanner(banner, url);
            Banner retorno = await _bannerRepository.AdicionarBanner(map);
            if (retorno != null)
            {
                return retorno;
            }

            return null;

        }

        public async Task<Banner> AtualizarBanner(BannerInputDto banner)
        {
            Banner map = MapBanner(banner, "");
            Banner retorno = await _bannerRepository.AtualizarBanner(map);
            if (retorno != null)
            {
                return retorno;
            }
            return null;
        }

        public async Task<bool> DeletarBanner(int id)
        {
            return await _bannerRepository.RemoverBanner(id);
        }

        private Banner MapBanner(BannerInputDto banner, string url)
        {
            return new Banner
            {
                Ban_id = banner.Id,
                Ban_titulo = banner.Titulo,
                Ban_imagem = url,
                Ban_temp = banner.Temp
            };
        }

        private List<BannerOutputDto> MapOutput(List<Banner> banners)
        {
            return banners.MapBanner(banners);
        }
    }


}
