using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;

        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObterProdutos()
        {
            var produtos = await _produtoService.ObterProdutos();
            return Ok(produtos);
        }

        [HttpGet]
        [Route("listar/${id}")]
        [Authorize]
        public async Task<IActionResult> ObterProdutoPorId(int id)
        {
            var produto = await _produtoService.ObterProdutoPorId(id);
            return Ok(produto);
        }

        [HttpGet]
        [Route("listar/categoria/${categoriaId}")]
        public async Task<IActionResult> ObterProdutosPorCategoria(int categoriaId)
        {
            var produtos = await _produtoService.ObterProdutosPorCategoria(categoriaId);
            return Ok(produtos);
        }

        [HttpPost]
        [Route("cadastrar")]
        [Authorize]
        public async Task<IActionResult> AdicionarProduto([FromForm] ProdutoInputDto produto)
        {
            var adicionar = await _produtoService.AdicionarProduto(produto);
            return Ok(adicionar);
        }

        [HttpPut]
        [Route("atualizar")]
        [Authorize]
        public async Task<IActionResult> AtualizarProduto([FromForm] ProdutoInputDto produto)
        {
            var atualizar = await _produtoService.AtualizarProduto(produto);
            return Ok(atualizar);
        }

        [HttpDelete]
        [Route("remover/${id}")]
        [Authorize]
        public async Task<IActionResult> RemoverProduto(int id)
        {
            var remover = await _produtoService.RemoverProduto(id);
            return Ok(remover);
        }
    }
}
