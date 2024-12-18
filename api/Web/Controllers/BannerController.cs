using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.DTOs.OutputDto;
using BackAppPromo.Application.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BannerController : ControllerBase
    {
        private readonly BannerService _bannerService;
        public BannerController(BannerService bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObterBanner()
        {
            var retorno = await _bannerService.ObterBanner();
            return Ok(retorno);
        }

        [HttpPost]
        [Route("cadastrar")]

        public async Task<IActionResult> CadastrarBanner([FromForm] BannerInputDto banner)
        {
            var retorno = await _bannerService.AdicionarBanner(banner);
            return Ok(retorno);
        }

        [HttpDelete]
        [Route("deletar/${id}")]
        public async Task<IActionResult> DeletarBanner([FromRoute] int id)
        {
            var retorno = await _bannerService.DeletarBanner(id);
            return Ok(retorno);
        }

        [HttpPut]
        [Route("alterar")]
        public async Task<IActionResult> AtualizarBanner([FromForm] BannerInputDto banner)
        {
            var retorno = await _bannerService.AtualizarBanner(banner);
            return Ok(retorno);
        }
    }
}
