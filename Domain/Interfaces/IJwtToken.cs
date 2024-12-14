using BackAppPromo.Domain.Entities;

namespace BackAppPromo.Domain.Interfaces
{
    public interface IJwtToken
    {
        string GerarToken(Usuario email);
        bool ValidarToken(string token);
    }
}
