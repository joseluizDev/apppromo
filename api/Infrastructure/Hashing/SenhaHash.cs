using BackAppPromo.Domain.Interfaces;
using BCrypt.Net;

namespace BackAppPromo.Infrastructure.Hashing
{
    public class SenhaHash : ISenhaHash
    {
        public string HashSenha(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerificarSenha(string hash, string senha)
        {
            return BCrypt.Net.BCrypt.Verify(senha, hash);
        }
    }
}
