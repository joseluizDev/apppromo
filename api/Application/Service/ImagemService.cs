using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;

namespace BackAppPromo.Application.Service
{
    public class ImagemService
    {
        private readonly IImagemRepository _imagemRepository;

        public ImagemService(IImagemRepository imagemRepository)
        {
            _imagemRepository = imagemRepository;
        }

        public async Task<bool> DeletarImagem(ImagemInputDto url)
        {
            return await _imagemRepository.RemoverImagemPorUrl(url.Url);
        }
    }
}
