using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagemController : ControllerBase
    {
        private readonly ImagemService _imagemService;

        public ImagemController(ImagemService imagemService)
        {
            _imagemService = imagemService;
        }

        [HttpPost]
        [Route("deletar")]
        [Authorize]
        public async Task<IActionResult> DeletarImagem([FromBody] ImagemInputDto url)
        {
            var retorno = await _imagemService.DeletarImagem(url);
            return Ok(retorno);
        }
    }
}
