using BackAppPromo.Application.DTOs.InputDto;
using BackAppPromo.Application.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackAppPromo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservaController : ControllerBase
    {
        private readonly ReservaService _reservaService;
        public ReservaController(ReservaService reservaService)
        {
            _reservaService = reservaService;
        }
        [HttpPost]
        [Route("cadastrar")]
        public async Task<IActionResult> CadastrarReserva([FromBody] ReservaInputDto reserva)
        {
            var adicionar = await _reservaService.AdicionarReserva(reserva);
            return Ok(adicionar);
        }
        [HttpGet]
        [Route("listar")]
        [Authorize]
        public async Task<IActionResult> ObterReservas()
        {
            var reservas = await _reservaService.ObterReservas();
            return Ok(reservas);
        }
        [HttpGet]
        [Route("listar/${id}")]
        [Authorize]
        public async Task<IActionResult> ObterReservaPorId(int id)
        {
            var reserva = await _reservaService.ObterReservaPorId(id);
            return Ok(reserva);
        }
        [HttpPut]
        [Route("atualizar")]
        [Authorize]
        public async Task<IActionResult> AtualizarReserva([FromBody] ReservaInputDto reserva)
        {
            var atualizar = await _reservaService.AtualizarReserva(reserva);
            return Ok(atualizar);
        }
        [HttpDelete]
        [Route("remover/${id}")]
        [Authorize]
        public async Task<IActionResult> RemoverReserva(int id)
        {
            var remover = await _reservaService.RemoverReserva(id);
            return Ok(remover);
        }
    }
}
