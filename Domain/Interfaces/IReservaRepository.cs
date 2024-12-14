using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface IReservaRepository
    {
        Task<List<Reserva>> ObterReservas();
        Task<Reserva> ObterReservaPorId(int id);
        Task<Reserva> AdicionarReserva(Reserva reserva);
        Task<Reserva> AtualizarReserva(Reserva reserva);
        Task<bool> RemoverReserva(int id);
    }
}
