using System;
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
            if (url == null)
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
            string url = string.Empty; // Inicializa a URL como string vazia.

            // Obtém o banner atual para manter a imagem existente caso nenhuma nova imagem seja enviada.
            var bannerAtual = await _bannerRepository.ObterBannerPorId(banner.Id);
            if (bannerAtual == null)
            {
                throw new KeyNotFoundException("O banner especificado não foi encontrado.");
            }

            // Se houver imagem, processa o upload. Caso contrário, mantém a URL da imagem atual.
            if (banner.Imagem != null)
            {
                string bucketName = "apppromo";
                string contentType = banner.Imagem.ContentType;

                // Verifica se o tipo do conteúdo é válido.
                if (string.IsNullOrWhiteSpace(contentType) || !contentType.Contains("/"))
                {
                    throw new ImagemInvalidoException("Tipo de imagem inválido.");
                }

                string fileExtension = contentType.Split('/')[1];
                string objectName = $"{Guid.NewGuid()}.{fileExtension}";

                url = await _minioStorage.UploadFileAsync(bucketName, objectName, banner.Imagem.OpenReadStream(), contentType);

                if (string.IsNullOrWhiteSpace(url))
                {
                    throw new ImagemInvalidoException("Imagem não foi salva no armazenamento.");
                }
            }
            else
            {
                // Mantém a URL da imagem atual se nenhuma nova imagem for enviada.
                url = bannerAtual.Ban_imagem;
            }

            // Mapeia o banner com a URL atualizada ou a existente.
            Banner mappedBanner = MapBanner(banner, url);

            // Atualiza o banner no repositório.
            Banner updatedBanner = await _bannerRepository.AtualizarBanner(mappedBanner);

            // Verifica se o banner foi atualizado com sucesso.
            if (updatedBanner == null)
            {
                throw new InvalidOperationException("Falha ao atualizar o banner no repositório.");
            }

            return updatedBanner;
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
