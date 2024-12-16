using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.Service;
using BackAppPromo.Domain.Exceptions;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Hashing;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController :  ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        private readonly AuthService _authService;

        public AuthController(UsuarioService usuarioService, IJwtToken jwtToken, AuthService authService)
        {
            _usuarioService = usuarioService;
            _authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioInputDto usuario)
        {
            try
            {
                var obejto = await _authService.Login(usuario);
                return Ok(obejto);
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

    }
}
