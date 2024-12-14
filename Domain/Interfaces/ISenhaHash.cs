namespace BackAppPromo.Domain.Interfaces
{
    public interface ISenhaHash
    {
        string HashSenha(string senha);
        bool VerificarSenha(string hash, string senha);
    }
}
