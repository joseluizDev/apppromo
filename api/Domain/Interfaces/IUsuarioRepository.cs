using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> AddUsuario(Usuario usuario);
        Task<Usuario> ObterUsuarioEmail(string email);
    }
}
