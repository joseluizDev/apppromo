using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaSerivce _categoriaService;
        public CategoriaController(CategoriaSerivce categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObterCategorias()
        {
            var categorias = await _categoriaService.ObterCategorias();
            return Ok(categorias);
        }

        [HttpGet]
        [Route("listar/${id}")]
        [Authorize]
        public async Task<IActionResult> ObterCategoriaPorId(int id)
        {
            var categoria = await _categoriaService.ObterCategoriaPorId(id);
            return Ok(categoria);
        }

        [HttpPost]
        [Route("cadastrar")]
        [Authorize]
        public async Task<IActionResult> AdicionarCategoria([FromBody] CategoriaInputDto categoria)
        {
            var retorno = await _categoriaService.AdicionarCategoria(categoria);
            return Ok(retorno);
        }

        [HttpPut]
        [Route("atualizar")]
        [Authorize]
        public async Task<IActionResult> AtualizarCategoria([FromBody] CategoriaInputDto categoria)
        {
            var retorno = await _categoriaService.AtualizarCategoria(categoria);
            return Ok(retorno);
        }

        [HttpDelete]
        [Route("remover/${id}")]
        [Authorize]
        public async Task<IActionResult> DeletarCategoria(int id)
        {
            var retorno = await _categoriaService.DeletarCategoria(id);
            return Ok(retorno);
        }
    }
}
