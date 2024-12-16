using BackAppPromo.Domain.Entities;
using BackAppPromo.Domain.Interfaces;
using BackAppPromo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackAppPromo.Infrastructure.Repositories
{
    public class ReservaRepository : IReservaRepository
    {
        private readonly AppDbContext _context;
        public ReservaRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Reserva> AdicionarReserva(Reserva reserva)
        {
            _context.Reserva.Add(reserva);
            await _context.SaveChangesAsync();
            return reserva;
        }
        public async Task<Reserva> AtualizarReserva(Reserva reserva)
        {
            _context.Reserva.Update(reserva);
            await _context.SaveChangesAsync();
            return reserva;
        }
        public async Task<Reserva> ObterReservaPorId(int id)
        {
            return await _context.Reserva.FirstOrDefaultAsync(r => r.Res_id == id);
        }
        public async Task<List<Reserva>> ObterReservas()
        {
            return await _context.Reserva.ToListAsync();
        }
        public async Task<bool> RemoverReserva(int id)
        {
            var reserva = await ObterReservaPorId(id);
            _context.Reserva.Remove(reserva);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
