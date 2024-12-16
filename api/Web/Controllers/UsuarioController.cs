using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.Service;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        [Route("cadastrar")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] UsuarioInputDto usuario)
        {
            try
            {
                var adicionar = await _usuarioService.AddUsuario(usuario);
                return Ok(adicionar);
            }
            catch (EmailInvalidoException ex)
            {
                return BadRequest(new { Mensagem = ex.Message });
            }
            catch (SenhaInvalidaException ex)
            {
                return BadRequest(new { Mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Erro interno no servidor", Detalhes = ex.Message });
            }
        }

        [HttpGet]
        [Route("obter")]
        public async Task<IActionResult> ObterUsuarioEmail(string email)
        {
            try
            {
                var obter = await _usuarioService.ObterUsuarioEmail(email);
                return Ok(obter);
            }
            catch (EmailInvalidoException ex)
            {
                return BadRequest(new { Mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Erro interno no servidor", Detalhes = ex.Message });
            }
        }
    }
}
